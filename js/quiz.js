/* ── QUIZ "¿CUÁL ES PARA MÍ?" ──────────────────────────────────────
   Cuatro preguntas que terminan en dos o tres productos recomendados,
   con el motivo de cada uno y el botón para agregarlo al carrito.

   Existe porque en cosmética capilar la gente entra sin saber qué
   necesita: ve doce productos, no sabe cuál es el suyo y se va. Esto
   hace lo que hace Rosa por WhatsApp — preguntar y recomendar — sin que
   tenga que estar disponible.

   Los productos NO se describen aquí. Se apuntan por su posición en el
   array PRODUCTS[] de js/forms.js, y de ahí salen nombre, precio, foto y
   descripción. Así un cambio de precio no deja este archivo desfasado.
   Lo único que vive aquí es a qué perfil responde cada producto. */
(function () {
  'use strict';

  var raiz = document.getElementById('quiz');
  if (!raiz) return;

  /* ── Las preguntas ──────────────────────────────────────────── */
  var PREGUNTAS = [
    {
      titulo: '¿Qué es lo que más te preocupa de tu cabello?',
      pie: 'Elige lo que más te pasa. Si son varias, la que más te moleste.',
      opciones: [
        { id: 'caida',      icono: '🍂', texto: 'Se me cae',            detalle: 'Veo pelo en el cepillo o en la ducha' },
        { id: 'resequedad', icono: '🏜️', texto: 'Lo siento reseco',     detalle: 'Áspero, sin brillo, se siente sediento' },
        { id: 'frizz',      icono: '🌪️', texto: 'Se me encrespa',       detalle: 'Frizz, se esponja, no se deja peinar' },
        { id: 'dano',       icono: '💔', texto: 'Está maltratado',      detalle: 'Se quiebra, tiene puntas abiertas' },
        { id: 'rizos',      icono: '🌀', texto: 'Quiero definir rizos', detalle: 'Que se marquen sin quedar duros' }
      ]
    },
    {
      titulo: '¿Cómo se siente normalmente?',
      pie: 'Piensa en cómo está al segundo día de lavarlo.',
      opciones: [
        { id: 'seco',    icono: '🌾', texto: 'Seco en todo',      detalle: 'También en la raíz' },
        { id: 'mixto',   icono: '⚖️', texto: 'Graso arriba, seco abajo', detalle: 'Lo más común' },
        { id: 'normal',  icono: '🌿', texto: 'Normal',            detalle: 'Ni muy seco ni muy graso' },
        { id: 'poroso',  icono: '🧽', texto: 'Muy poroso',        detalle: 'Absorbe todo y se seca enseguida' }
      ]
    },
    {
      titulo: '¿Le das calor o lo tienes con química?',
      pie: 'Plancha, secador, tintes, alisados o permanentes.',
      opciones: [
        { id: 'calor',  icono: '🔥', texto: 'Plancha o secador',  detalle: 'Seguido, casi siempre' },
        { id: 'tinte',  icono: '🎨', texto: 'Tinte o alisado',    detalle: 'Tengo color o proceso químico' },
        { id: 'ambos',  icono: '⚡', texto: 'Las dos cosas',       detalle: 'Calor y química' },
        { id: 'nada',   icono: '🍃', texto: 'Ninguna',            detalle: 'Lo dejo al natural' }
      ]
    },
    {
      titulo: '¿Qué prefieres para empezar?',
      pie: 'No hay respuesta mala: Rosa te ayuda igual por WhatsApp.',
      opciones: [
        { id: 'puntual', icono: '🎯', texto: 'Uno o dos productos', detalle: 'Quiero probar primero' },
        { id: 'rutina',  icono: '✨', texto: 'La rutina completa',   detalle: 'Un kit con todo, sale más a cuenta' }
      ]
    }
  ];

  /* ── Qué recomendar. Cada entrada apunta a PRODUCTS[i].variants[v]
     (o a PRODUCTS[i] si el producto no tiene variantes) y dice por qué
     se recomienda, con el peso que suma cada respuesta. ── */
  var CATALOGO = [
    { p: 0,  v: 0, por: 'El romero mejora la circulación del cuero cabelludo y frena la caída desde el lavado.',        suma: { caida: 5 } },
    { p: 0,  v: 2, por: 'El aguacate devuelve la grasa buena que le falta al cabello seco o poroso.',                   suma: { resequedad: 4, seco: 3, poroso: 3, frizz: 2 } },
    { p: 0,  v: 1, por: 'Fórmula nutritiva para cabello debilitado por tintes o por la plancha.',                       suma: { dano: 4, tinte: 3, ambos: 3 } },
    { p: 1,  v: 3, por: 'La cebolla aporta el azufre con el que tu cabello fabrica queratina.',                         suma: { caida: 5 } },
    { p: 1,  v: 2, por: 'Sella la cutícula y controla el encrespamiento desde dentro.',                                 suma: { frizz: 5, resequedad: 3, poroso: 2 } },
    { p: 2,  v: 0, por: 'Se aplica sin enjuagar y trabaja todo el día sobre el folículo. El más económico para probar.', suma: { caida: 4 } },
    { p: 2,  v: 2, por: 'El más potente de los tónicos: crecimiento y reparación a la vez.',                            suma: { caida: 3, dano: 2 } },
    { p: 3,  v: 0, por: 'Define sin efecto cartón y encima hidrata, gracias a la linaza.',                              suma: { rizos: 5 } },
    { p: 6,  v: 0, por: 'Desenreda y moldea sin dejar el cabello duro ni pesado.',                                      suma: { rizos: 4, frizz: 3 } },
    { p: 4,  v: 0, por: 'Mascarilla intensiva con quinoa: repara lo que el calor y la química rompieron.',              suma: { dano: 5, calor: 3, tinte: 3, ambos: 4 } },
    { p: 11, v: 0, por: 'Reparación extrema para cabello muy castigado por calor o tinte.',                             suma: { dano: 4, ambos: 5, calor: 2 } },
    { p: 9,  v: 0, por: 'Escudo antes de la plancha o el secador: lo que no se daña no hay que repararlo.',             suma: { calor: 6, ambos: 5 } },
    { p: 10, v: 0, por: 'Nutrición profunda en 15 minutos para cabello seco o castigado.',                              suma: { resequedad: 4, seco: 3, dano: 2 } },
    { p: 7,  v: 0, por: 'Reconstruye la fibra por dentro y baja el frizz de raíz.',                                     suma: { frizz: 4, dano: 3, poroso: 3 } },
    { p: 8,  v: 0, por: 'Se pone antes del shampoo para que el lavado no le quite la hidratación.',                     suma: { seco: 4, resequedad: 3, poroso: 3 } },
    /* Kits: solo entran si pidió rutina completa */
    { p: 5,  v: 4, por: 'La rutina del romero completa, pensada para frenar la caída.',                                 suma: { rutina: 4, caida: 4, normal: 1, mixto: 1 } },
    { p: 5,  v: 6, por: 'La rutina de la cebolla: lo más contundente contra la caída.',                                 suma: { rutina: 4, caida: 5 } },
    { p: 5,  v: 7, por: 'La rutina del aguacate, para cabello seco o poroso.',                                          suma: { rutina: 4, resequedad: 5, seco: 4, poroso: 3 } },
    { p: 5,  v: 2, por: 'La rutina de la linaza: definición y frizz bajo control.',                                     suma: { rutina: 4, rizos: 6, frizz: 3 } },
    { p: 5,  v: 3, por: 'La rutina más completa de la línea, para cabello muy dañado.',                                 suma: { rutina: 4, dano: 6, ambos: 5, tinte: 3, calor: 2 } }
  ];

  var paso = 0;
  var respuestas = [];

  /* Los datos del producto salen de forms.js, no se copian aquí */
  function producto(e) {
    var lista = window.ALMA_PRODUCTS;
    if (!lista || !lista[e.p]) return null;
    var base = lista[e.p];
    var variante = base.variants ? base.variants[e.v] : base;
    if (!variante) return null;
    return {
      nombre: base.variants ? variante.name : base.name,
      familia: base.name,
      precio: variante.price || base.price || '',
      imagen: variante.image || (base.images && base.images[0]) || '',
      etiqueta: base.tag || '',
      tamano: base.size || '',
      idx: e.p,
      por: e.por
    };
  }

  function puntuar() {
    var elegidas = {};
    respuestas.forEach(function (r) { elegidas[r] = true; });
    var quiereRutina = !!elegidas.rutina;

    return CATALOGO.map(function (e) {
      var esKit = e.p === 5;
      if (quiereRutina !== esKit) return null;   /* kits solo si pidió rutina */
      var total = 0;
      for (var clave in e.suma) {
        if (elegidas[clave]) total += e.suma[clave];
      }
      /* Un mínimo, para no rellenar el resultado con algo que encaja de
         milagro. Vale más recomendar dos productos acertados que tres
         donde el tercero no viene a cuento. En los kits el mínimo es más
         alto porque el simple hecho de pedir rutina ya suma 4. */
      var minimo = esKit ? 6 : 3;
      return total >= minimo ? { entrada: e, total: total } : null;
    }).filter(Boolean)
      .sort(function (a, b) { return b.total - a.total; })
      .slice(0, quiereRutina ? 2 : 3)
      .map(function (x) { return producto(x.entrada); })
      .filter(Boolean);
  }

  /* ── Pintado ────────────────────────────────────────────────── */
  function puntos() {
    var h = '<div class="qz-dots">';
    for (var i = 0; i < PREGUNTAS.length; i++) {
      h += '<span class="qz-dot' + (i < paso ? ' hecho' : i === paso ? ' activo' : '') + '"></span>';
    }
    return h + '</div>';
  }

  function pintarPregunta() {
    var q = PREGUNTAS[paso];
    raiz.innerHTML =
      '<div class="qz-card">' +
        puntos() +
        '<p class="qz-paso">Pregunta ' + (paso + 1) + ' de ' + PREGUNTAS.length + '</p>' +
        '<h3 class="qz-pregunta">' + q.titulo + '</h3>' +
        '<p class="qz-pie">' + q.pie + '</p>' +
        '<div class="qz-opciones">' +
          q.opciones.map(function (o) {
            return '<button type="button" class="qz-op" data-id="' + o.id + '">' +
                     '<span class="qz-op-ico">' + o.icono + '</span>' +
                     '<span class="qz-op-txt"><strong>' + o.texto + '</strong><em>' + o.detalle + '</em></span>' +
                   '</button>';
          }).join('') +
        '</div>' +
        (paso > 0 ? '<button type="button" class="qz-atras" data-atras>← Volver</button>' : '') +
      '</div>';
  }

  function pintarResultado() {
    var recomendados = puntuar();

    if (!recomendados.length) {
      raiz.innerHTML =
        '<div class="qz-card qz-final">' +
          '<div class="qz-ico">🌿</div>' +
          '<h3 class="qz-pregunta">Mejor te lo dice Rosa</h3>' +
          '<p class="qz-pie">Con lo que nos contaste, prefiere verlo ella misma. Escríbele y te arma la rutina exacta para tu cabello.</p>' +
          '<a class="btn btn-wa" href="https://wa.me/573135487027?text=' +
            encodeURIComponent('Hola Rosa! Hice el test de la página y me gustaría que me recomendaras qué usar 🌿') +
            '" target="_blank" rel="noopener">Preguntarle a Rosa</a>' +
          '<button type="button" class="qz-atras" data-reiniciar>Hacer el test otra vez</button>' +
        '</div>';
      return;
    }

    raiz.innerHTML =
      '<div class="qz-card qz-final">' +
        '<div class="qz-ico">🌿</div>' +
        '<h3 class="qz-pregunta">Esto es lo que te recomendamos</h3>' +
        '<p class="qz-pie">Según lo que nos contaste. Si quieres afinar más, Rosa te atiende por WhatsApp.</p>' +
        '<div class="qz-res">' +
          recomendados.map(function (r, i) {
            return '<article class="qz-item">' +
                     (i === 0 ? '<span class="qz-top">Tu mejor opción</span>' : '') +
                     '<div class="qz-item-img"><img src="' + r.imagen + '" alt="' + r.nombre + '" loading="lazy"></div>' +
                     '<div class="qz-item-info">' +
                       '<p class="qz-item-tag">' + r.etiqueta + '</p>' +
                       '<h4 class="qz-item-name">' + r.nombre + '</h4>' +
                       '<p class="qz-item-por">' + r.por + '</p>' +
                       '<p class="qz-item-precio">' + r.precio + ' <span>' + r.tamano + '</span></p>' +
                       '<button type="button" class="qz-add" data-add="' + i + '">Agregar al carrito</button>' +
                     '</div>' +
                   '</article>';
          }).join('') +
        '</div>' +
        '<div class="qz-final-btns">' +
          '<a class="btn btn-wa" href="https://wa.me/573135487027?text=' +
            encodeURIComponent('Hola Rosa! Hice el test y me salió: ' + recomendados.map(function (r) { return r.nombre; }).join(', ') + '. ¿Me confirmas si es lo mejor para mi cabello? 🌿') +
            '" target="_blank" rel="noopener">Consultarlo con Rosa</a>' +
          '<button type="button" class="qz-atras" data-reiniciar>Hacer el test otra vez</button>' +
        '</div>' +
      '</div>';

    raiz._recomendados = recomendados;
  }

  /* ── Interacción ────────────────────────────────────────────── */
  raiz.addEventListener('click', function (ev) {
    var b = ev.target.closest('button, a');
    if (!b) return;

    if (b.hasAttribute('data-id')) {
      respuestas[paso] = b.getAttribute('data-id');
      paso++;
      if (paso < PREGUNTAS.length) pintarPregunta(); else pintarResultado();
      raiz.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (typeof window.gtag === 'function' && paso === PREGUNTAS.length) {
        window.gtag('event', 'quiz_completado', { respuestas: respuestas.join('|') });
      }
      return;
    }

    if (b.hasAttribute('data-atras')) {
      paso = Math.max(0, paso - 1);
      pintarPregunta();
      return;
    }

    if (b.hasAttribute('data-reiniciar')) {
      paso = 0; respuestas = [];
      pintarPregunta();
      return;
    }

    if (b.hasAttribute('data-add')) {
      var r = (raiz._recomendados || [])[+b.getAttribute('data-add')];
      if (!r || typeof window.cartAddItem !== 'function') return;
      window.cartAddItem({
        name: r.nombre,
        price: r.precio,
        priceNum: parseInt(String(r.precio).replace(/[^0-9]/g, ''), 10) || 0,
        image: r.imagen,
        tag: r.etiqueta,
        productIdx: r.idx
      });
      b.textContent = '¡Agregado! ✓';
      b.classList.add('puesto');
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'quiz_agrega_carrito', { producto: r.nombre });
      }
    }
  });

  pintarPregunta();
})();
