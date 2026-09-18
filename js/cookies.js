/* ═══════════════════════════════════════════════════════════════
   cookies.js — Consentimiento de cookies + carga condicionada
   ───────────────────────────────────────────────────────────────
   QUÉ HACE:
   1. Muestra el banner de consentimiento la primera vez que alguien
      entra al sitio.
   2. Guarda la decisión (aceptado / rechazado) en localStorage.
   3. SOLO si la persona acepta, inyecta Google Analytics, ContentSquare
      y el mapa de Google. Si rechaza o todavía no decide, no se carga
      NADA de eso.
   4. Deja un enlace permanente en el pie ("Configuración de cookies")
      para cambiar la decisión cuando quiera.
   5. De paso escribe el año actual en el copyright del pie.

   POR QUÉ ES ASÍ:
   En Colombia la Resolución 32.126 de 2022 de la SIC exige consentimiento
   PREVIO, EXPRESO E INFORMADO. No hay categorías exentas como en Europa y
   el consentimiento tácito (por seguir navegando) está prohibido. Por eso
   los scripts de medición ya NO van en el <head> de las páginas: los
   inyecta este archivo, y solo después del "Aceptar".

   DE QUÉ DEPENDE:
   - js/analytics.js  → Google Analytics 4 (G-D9VGNFGPMP)
   - js/hotjar.js     → ContentSquare
   Ambos se cargan dinámicamente desde aquí. No los enlaces en el HTML.

   OJO CON LOS ESTILOS:
   El banner aparece en index.html, catalogo.html, las páginas legales y
   la 404. Pero catalogo.html NO carga reset.css ni layout.css: tiene su
   propio :root donde --font-m es Poppins, mientras que en reset.css esa
   misma variable es una fuente monoespaciada. Para que el banner se vea
   idéntico en todas, sus estilos se inyectan desde aquí con valores de
   respaldo explícitos —  var(--x, valorFijo)  — y las fuentes se declaran
   directas, sin variable. No cambiar esto por variables "más limpias":
   se rompería en el catálogo.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Configuración ──────────────────────────────────────────── */
  var CLAVE = 'alma_cookies_consent_v1';
  var ACEPTADO = 'aceptado';
  var RECHAZADO = 'rechazado';

  /* Rutas de los scripts de medición. Son relativas porque todas las
     páginas que cargan este archivo están en la raíz del sitio.

     El ?v= tiene que coincidir con el que llevan los <link> y <script>
     del HTML: js/ se guarda en caché para siempre y la versión es lo
     único que hace que el navegador vuelva a pedir el archivo. */
  var VERSION = '20260918';
  var SCRIPT_ANALYTICS = 'js/analytics.js?v=' + VERSION;
  var SCRIPT_CONTENTSQUARE = 'js/hotjar.js?v=' + VERSION;

  /* ── Lectura y escritura de la decisión ─────────────────────────
     Todo va envuelto en try/catch: en navegación privada o con las
     cookies bloqueadas por completo, localStorage lanza excepción y
     sin esto el sitio quedaría en blanco. */
  function leerDecision() {
    try {
      return window.localStorage.getItem(CLAVE);
    } catch (e) {
      return null;
    }
  }

  function guardarDecision(valor) {
    try {
      window.localStorage.setItem(CLAVE, valor);
    } catch (e) {
      /* Si no se puede guardar, la decisión vale solo para esta visita.
         Es preferible eso a romper la página. */
    }
  }

  /* ── Carga de los scripts de medición ────────────────────────── */
  var yaCargado = false;

  function cargarMedicion() {
    if (yaCargado) return;          // evita duplicados si acepta dos veces
    yaCargado = true;

    inyectarScript(SCRIPT_ANALYTICS, function () {
      /* Los eventos se registran apenas gtag existe, no antes. */
      registrarEventos();
    });
    inyectarScript(SCRIPT_CONTENTSQUARE, null);
    activarMapa();
  }

  function inyectarScript(src, alCargar) {
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
    if (alCargar) s.onload = alCargar;
    document.head.appendChild(s);
  }

  /* ── Mapa de ubicación ───────────────────────────────────────────
     El mapa de Google pone cookies de terceros, así que no se carga
     hasta que haya consentimiento. En el HTML vive como un contenedor
     vacío con data-mapa; aquí se le mete el iframe.
     Si la página no tiene mapa, esta función no hace nada. */
  function activarMapa() {
    var cajas = document.querySelectorAll('[data-mapa]');
    for (var i = 0; i < cajas.length; i++) {
      var caja = cajas[i];
      if (caja.getAttribute('data-mapa-cargado') === 'si') continue;

      var url = caja.getAttribute('data-mapa');
      if (!url) continue;

      var iframe = document.createElement('iframe');
      iframe.src = url;
      iframe.title = 'Mapa de ubicación de Alma Botánica en el barrio El Pozón, Cartagena de Indias';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.setAttribute('allowfullscreen', '');

      caja.innerHTML = '';
      caja.appendChild(iframe);
      caja.setAttribute('data-mapa-cargado', 'si');
    }
  }

  /* ── Eventos de conversión de Google Analytics ───────────────────
     Solo se registran si hubo consentimiento (esta función se llama
     desde cargarMedicion). Miden lo que de verdad importa para el
     negocio de Rosa: cuánta gente termina escribiéndole.
     Se usa delegación en document para que también funcione con los
     botones que el carrito y los modales crean después. */
  function registrarEventos() {
    document.addEventListener('click', function (ev) {
      if (typeof window.gtag !== 'function') return;

      var el = ev.target.closest ? ev.target.closest('a, button') : null;
      if (!el) return;

      /* Botón flotante de WhatsApp */
      if (el.classList.contains('wa-btn') || el.classList.contains('wa-float')) {
        window.gtag('event', 'whatsapp_flotante', {
          origen: document.title
        });
        return;
      }

      /* Botones "Pedir por WhatsApp" del modal de producto y del carrito */
      if (el.classList.contains('btn-wa')) {
        window.gtag('event', 'pedido_whatsapp', {
          origen: el.classList.contains('cart-wa-btn') ? 'carrito' : 'modal_producto'
        });
        return;
      }

      /* Cualquier otro enlace a WhatsApp (footer, políticas, testimonios) */
      var href = el.getAttribute && el.getAttribute('href');
      if (href && href.indexOf('wa.me') !== -1) {
        window.gtag('event', 'whatsapp_enlace', { destino: href });
        return;
      }

      /* Enlace de teléfono, si algún día se agrega */
      if (href && href.indexOf('tel:') === 0) {
        window.gtag('event', 'clic_telefono', { numero: href });
        return;
      }

      /* Botón "Cómo llegar" del mapa */
      if (el.hasAttribute && el.hasAttribute('data-como-llegar')) {
        window.gtag('event', 'como_llegar_mapa', {});
        return;
      }

      /* Descarga del catálogo en PDF desde catalogo.html.
         La del modal de la portada la registra js/forms.js. */
      if (el.hasAttribute && el.hasAttribute('data-descarga-catalogo')) {
        window.gtag('event', 'catalogo_descarga', { origen: 'pagina_catalogo' });
      }
    });
  }

  /* ── Estilos del banner ──────────────────────────────────────────
     Se inyectan una sola vez. Cada var() lleva su valor de respaldo
     por lo explicado en el encabezado del archivo. */
  function inyectarEstilos() {
    if (document.getElementById('alma-cookies-css')) return;

    var css = [
      /* Contenedor fijo abajo. z-index 400: por encima del botón de
         WhatsApp (200) pero por debajo de los modales (500+), para que
         un modal abierto nunca quede tapado por el banner. */
      '.ck-banner{',
      'position:fixed;left:0;right:0;bottom:0;z-index:400;',
      'background:var(--cream,#f7f1e0);',
      'border-top:1px solid var(--border-sage,rgba(119,131,106,.32));',
      'box-shadow:0 -6px 28px rgba(74,58,26,.14);',
      'padding:1rem 1.25rem calc(1rem + env(safe-area-inset-bottom,0px));',
      'font-family:"Poppins",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;',
      'transform:translateY(110%);transition:transform .38s cubic-bezier(.2,.9,.3,1);',
      '}',
      '.ck-banner.ck-visible{transform:translateY(0)}',

      /* Distribución: texto a la izquierda, botones a la derecha */
      '.ck-inner{',
      'max-width:1140px;margin:0 auto;',
      'display:flex;align-items:center;gap:1.25rem;flex-wrap:wrap;',
      '}',
      '.ck-texto{flex:1;min-width:min(100%,260px)}',
      '.ck-titulo{',
      'font-family:"Marcellus",Georgia,serif;font-size:1.05rem;',
      'color:var(--text,#2a2318);margin:0 0 .25rem;line-height:1.3;',
      '}',
      '.ck-desc{',
      'font-size:.86rem;line-height:1.6;margin:0;',
      'color:#6c5f49;',                       /* fijo: --text-m/--text-mid cambian de nombre entre hojas */
      '}',
      '.ck-desc a{color:var(--bronze,#8b5a3c);text-decoration:underline;text-underline-offset:.2em}',

      /* Botones: MISMO tamaño y MISMO peso visual.
         La norma colombiana exige que rechazar sea tan fácil como
         aceptar, así que no se disimula el botón de rechazo. */
      '.ck-botones{display:flex;gap:.6rem;flex-shrink:0}',
      '.ck-btn{',
      'font-family:inherit;font-size:.78rem;font-weight:600;',
      'letter-spacing:.08em;text-transform:uppercase;',
      'padding:.85rem 1.5rem;min-height:48px;',   /* zona táctil cómoda */
      'border-radius:999px;cursor:pointer;',
      'border:1.5px solid transparent;',
      'transition:transform .2s,box-shadow .2s,background .2s;',
      'white-space:nowrap;',
      '}',
      '.ck-aceptar{',
      'background:linear-gradient(135deg,var(--bronze-light,#ab7248),var(--bronze,#8b5a3c) 55%,var(--bronze-deep,#6b4429));',
      'color:#fff;box-shadow:0 4px 14px rgba(139,90,60,.3);',
      '}',
      '.ck-rechazar{',
      'background:transparent;color:var(--bronze,#8b5a3c);',
      'border-color:var(--bronze,#8b5a3c);',
      '}',
      '@media (hover:hover){',
      '.ck-btn:hover{transform:translateY(-2px)}',
      '.ck-rechazar:hover{background:var(--sage-soft,#f4f6ee)}',
      '}',
      '.ck-btn:focus-visible{outline:3px solid var(--gold,#c9a15a);outline-offset:2px}',

      /* Mientras el banner está abierto, el botón flotante de WhatsApp
         sube para no quedar tapado. */
      'body.ck-abierto .wa-btn{bottom:9.5rem}',
      'body.ck-abierto .wa-float{bottom:9.5rem}',

      /* ── Responsive ── */
      '@media(max-width:900px){',
      '.ck-inner{gap:1rem}',
      '.ck-titulo{font-size:1rem}',
      '}',
      '@media(max-width:600px){',
      '.ck-banner{padding:.9rem 1rem calc(.9rem + env(safe-area-inset-bottom,0px))}',
      '.ck-inner{flex-direction:column;align-items:stretch;gap:.85rem}',
      '.ck-botones{width:100%}',
      '.ck-btn{flex:1;padding:.85rem .75rem}',   /* los dos botones, mismo ancho */
      '.ck-desc{font-size:.82rem}',
      'body.ck-abierto .wa-btn{bottom:13rem}',
      'body.ck-abierto .wa-float{bottom:13rem}',
      '}',
      '@media(max-width:380px){',
      '.ck-btn{font-size:.72rem;letter-spacing:.05em;padding:.8rem .5rem}',
      '.ck-titulo{font-size:.95rem}',
      '.ck-desc{font-size:.8rem}',
      '}',

      /* Quien pide menos movimiento, no recibe la animación de entrada */
      '@media (prefers-reduced-motion:reduce){',
      '.ck-banner{transition:none}',
      '.ck-btn{transition:none}',
      '.ck-btn:hover{transform:none}',
      '}'
    ].join('');

    var style = document.createElement('style');
    style.id = 'alma-cookies-css';
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ── Construcción del banner ─────────────────────────────────── */
  var banner = null;

  function construirBanner() {
    if (banner) return banner;

    inyectarEstilos();

    banner = document.createElement('div');
    banner.className = 'ck-banner';
    /* role="dialog" + aria-live: los lectores de pantalla lo anuncian
       sin robar el foco de golpe a quien está navegando. */
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    banner.setAttribute('aria-live', 'polite');

    banner.innerHTML =
      '<div class="ck-inner">' +
        '<div class="ck-texto">' +
          '<p class="ck-titulo">Usamos cookies</p>' +
          '<p class="ck-desc">' +
            'Nos ayudan a saber cómo se usa la página para mejorarla. ' +
            'No se activa nada hasta que tú decidas. ' +
            'Puedes cambiar de opinión cuando quieras desde el pie de página. ' +
            '<a href="cookies.html">Ver política de cookies</a>.' +
          '</p>' +
        '</div>' +
        '<div class="ck-botones">' +
          '<button type="button" class="ck-btn ck-rechazar">Rechazar</button>' +
          '<button type="button" class="ck-btn ck-aceptar">Aceptar</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);

    banner.querySelector('.ck-aceptar').addEventListener('click', function () {
      guardarDecision(ACEPTADO);
      ocultarBanner();
      cargarMedicion();
    });

    banner.querySelector('.ck-rechazar').addEventListener('click', function () {
      guardarDecision(RECHAZADO);
      ocultarBanner();
      /* No se carga nada. Si la persona ya había aceptado antes en esta
         misma visita, los scripts siguen en memoria hasta que recargue:
         se lo advertimos en cookies.html. */
    });

    return banner;
  }

  /* El banner es fijo y se apoya abajo, así que taparía el final del pie
     (los enlaces legales y el crédito). Para que no pase, mientras está
     abierto se le añade al body un espacio inferior igual a la altura
     real del banner. Se mide en vivo porque esa altura cambia según el
     ancho de la pantalla: en móvil el texto ocupa más líneas. */
  function ajustarEspacioInferior() {
    if (!banner) return;
    var alto = banner.offsetHeight;
    document.body.style.paddingBottom = alto + 'px';
  }

  function limpiarEspacioInferior() {
    document.body.style.paddingBottom = '';
  }

  function mostrarBanner() {
    construirBanner();
    document.body.classList.add('ck-abierto');
    /* El doble rAF garantiza que el navegador pinte el estado inicial
       antes de animar; si no, el banner aparece de golpe. */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        banner.classList.add('ck-visible');
        ajustarEspacioInferior();
      });
    });
    /* Si giran el teléfono o cambian el tamaño, se recalcula */
    window.addEventListener('resize', ajustarEspacioInferior);
  }

  function ocultarBanner() {
    if (!banner) return;
    banner.classList.remove('ck-visible');
    document.body.classList.remove('ck-abierto');
    limpiarEspacioInferior();
    window.removeEventListener('resize', ajustarEspacioInferior);
  }

  /* ── Enlace "Configuración de cookies" del pie ────────────────── */
  function conectarBotonAjustes() {
    var botones = document.querySelectorAll('[data-cookie-settings]');
    for (var i = 0; i < botones.length; i++) {
      botones[i].addEventListener('click', function (ev) {
        ev.preventDefault();
        mostrarBanner();
      });
    }
  }

  /* ── Año dinámico del copyright ──────────────────────────────────
       Vive aquí porque este archivo se carga en todas las páginas y no
       vale la pena un script aparte solo para esto. */
  function escribirAno() {
    var año = new Date().getFullYear();
    var marcas = document.querySelectorAll('[data-year]');
    for (var i = 0; i < marcas.length; i++) {
      marcas[i].textContent = año;
    }
  }

  /* ── Arranque ────────────────────────────────────────────────── */
  function iniciar() {
    escribirAno();
    conectarBotonAjustes();

    var decision = leerDecision();

    if (decision === ACEPTADO) {
      cargarMedicion();             // ya había aceptado: se respeta
    } else if (decision !== RECHAZADO) {
      mostrarBanner();              // sin decisión previa: se pregunta
    }
    /* Si es RECHAZADO no se hace nada: ni banner ni scripts. */
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
