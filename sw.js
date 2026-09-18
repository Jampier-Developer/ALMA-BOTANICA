/* ── SERVICE WORKER ────────────────────────────────────────────────
   Hace que la página siga abriéndose aunque no haya internet, y que en
   la segunda visita cargue casi al instante.

   Importa de verdad en Cartagena: mucha gente entra con datos móviles
   flojos o se queda sin señal a mitad de la carga.

   Dos formas de guardar, cada una donde conviene:

   - Las páginas se piden SIEMPRE a la red primero. Así un cambio de
     precio se ve enseguida. Solo si la red falla se saca la copia.
   - El CSS, el JavaScript y las fotos salen de la copia primero, porque
     van versionados con ?v= y solo cambian cuando cambia ese número.

   El PDF del catálogo y el video del anuncio NO se guardan: son 7 MB
   entre los dos y no vale la pena ocupar el móvil de nadie con eso.

   Al cambiar la VERSION de aquí abajo se borran las copias viejas. Hay
   que subirla cuando se suba el ?v= del HTML. */

const VERSION = 'alma-v20260920';
const ESENCIALES = [
  '/',
  '/index.html',
  '/css/reset.css?v=20260920',
  '/css/layout.css?v=20260920',
  '/img/Img%20Logo/LOGO%20-%20ALMA%20BOTANICA.webp',
  '/favicon.ico',
  '/site.webmanifest'
];

self.addEventListener('install', (ev) => {
  ev.waitUntil(
    caches.open(VERSION)
      /* addAll falla entero si un archivo falla; se guardan de uno en
         uno para que una foto que no esté no tumbe la instalación. */
      .then((c) => Promise.all(ESENCIALES.map((u) => c.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (ev) => {
  ev.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(
        claves.filter((k) => k !== VERSION).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (ev) => {
  const req = ev.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   /* fuentes, analytics: a su aire */

  /* Los archivos pesados no se guardan */
  if (url.pathname.endsWith('.pdf') || url.pathname.startsWith('/video/')) return;

  const esPagina = req.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname === '/';

  if (esPagina) {
    /* Red primero: lo que se ve tiene que estar al día */
    ev.respondWith(
      fetch(req)
        .then((res) => {
          const copia = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copia));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('/index.html')))
    );
    return;
  }

  /* Lo demás: copia primero, y si no está se pide y se guarda */
  ev.respondWith(
    caches.match(req).then((guardado) => {
      if (guardado) return guardado;
      return fetch(req).then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copia = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copia));
        }
        return res;
      }).catch(() => guardado);
    })
  );
});
