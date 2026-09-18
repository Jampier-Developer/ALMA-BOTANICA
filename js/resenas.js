/* ── SECCIÓN DE RESEÑAS ────────────────────────────────────────────
   Muestra las reseñas de js/resenas-datos.js con su nota media, y —solo
   cuando son reales— le manda esa nota a Google en formato JSON-LD.

   Eso último es lo que hace que aparezcan las estrellitas doradas en el
   resultado de búsqueda, que suben mucho el porcentaje de clics.

   Por eso mismo hay una regla que no se toca: si queda una sola reseña
   de ejemplo, NO se manda nada a Google. Publicar valoraciones
   inventadas en los datos estructurados va contra sus normas y puede
   costar que el sitio pierda los resultados enriquecidos para siempre. */
(function () {
  'use strict';

  var caja = document.getElementById('resenas');
  var todas = window.ALMA_RESENAS;
  if (!caja || !todas || !todas.length) return;

  var esDemo = /[?&]demo=1\b/.test(window.location.search);
  var reales = todas.filter(function (r) { return !r.ejemplo; });
  var lista = esDemo ? todas : reales;

  if (!lista.length) {
    /* Sin reseñas reales la sección entera desaparece: vale más no tener
       sección que tenerla vacía o inventada. */
    var sec = caja.closest('section');
    if (sec) sec.hidden = true;
    return;
  }

  var hayEjemplos = lista.some(function (r) { return r.ejemplo; });
  var media = lista.reduce(function (a, r) { return a + r.estrellas; }, 0) / lista.length;
  var mediaTxt = (Math.round(media * 10) / 10).toString().replace('.', ',');

  function estrellas(n) {
    var h = '';
    for (var i = 1; i <= 5; i++) h += '<span class="' + (i <= n ? 'on' : 'off') + '">★</span>';
    return '<span class="rs-estrellas" aria-label="' + n + ' de 5 estrellas">' + h + '</span>';
  }

  function fechaCorta(iso) {
    var meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    var d = new Date(iso + 'T12:00:00');
    if (isNaN(d)) return '';
    return meses[d.getMonth()] + ' de ' + d.getFullYear();
  }

  caja.innerHTML =
    '<div class="rs-resumen">' +
      (hayEjemplos ? '<span class="rs-demo">Ejemplo — aún no son reseñas reales</span>' : '') +
      '<p class="rs-nota">' + mediaTxt + '</p>' +
      estrellas(Math.round(media)) +
      '<p class="rs-cuantas">' + lista.length + (lista.length === 1 ? ' reseña' : ' reseñas') + '</p>' +
    '</div>' +
    '<div class="rs-grid">' +
      lista.map(function (r) {
        return '<article class="rs-card">' +
                 (r.ejemplo ? '<span class="rs-card-demo">Ejemplo</span>' : '') +
                 estrellas(r.estrellas) +
                 '<blockquote class="rs-texto">' + r.texto + '</blockquote>' +
                 '<footer class="rs-pie">' +
                   '<p class="rs-quien"><strong>' + r.nombre + '</strong> · ' + r.lugar + '</p>' +
                   '<p class="rs-meta">' + r.producto + ' · ' + fechaCorta(r.fecha) + '</p>' +
                 '</footer>' +
               '</article>';
      }).join('') +
    '</div>' +
    '<p class="rs-pedir">¿Ya probaste los productos? <a href="https://wa.me/573135487027?text=' +
      encodeURIComponent('Hola Rosa! 🌿 Quiero dejarles mi reseña sobre los productos.') +
      '" target="_blank" rel="noopener">Cuéntanos tu experiencia</a></p>';

  /* La nota media a Google — SOLO si todas las reseñas son reales */
  if (!hayEjemplos && reales.length) {
    var datos = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Línea capilar Alma Botánica',
      description: 'Cosmética capilar natural artesanal formulada por Rosa Pérez en Cartagena de Indias.',
      brand: { '@type': 'Brand', name: 'Alma Botánica' },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: (Math.round(media * 10) / 10).toString(),
        reviewCount: reales.length.toString(),
        bestRating: '5',
        worstRating: '1'
      },
      review: reales.map(function (r) {
        return {
          '@type': 'Review',
          author: { '@type': 'Person', name: r.nombre },
          datePublished: r.fecha,
          reviewRating: { '@type': 'Rating', ratingValue: r.estrellas.toString(), bestRating: '5', worstRating: '1' },
          reviewBody: r.texto
        };
      })
    };
    var et = document.createElement('script');
    et.type = 'application/ld+json';
    et.textContent = JSON.stringify(datos);
    document.head.appendChild(et);
  }
})();
