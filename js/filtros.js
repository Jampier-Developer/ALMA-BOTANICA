/* ── BUSCADOR Y FILTROS DEL GRID ───────────────────────────────────
   Una barra de búsqueda y unos botones por necesidad (caída, frizz,
   hidratación, rizos, daño) sobre las tarjetas que ya están en el HTML.

   No se reconstruye el grid: se muestran y se ocultan las tarjetas que
   ya existen. Así los carruseles, los modales y el lazy loading siguen
   funcionando igual, y Google sigue viendo los doce productos en el
   código aunque haya un filtro puesto.

   Lo que se busca sale del propio HTML de cada tarjeta más los datos de
   PRODUCTS[], para que una descripción nueva entre en el buscador sin
   tocar este archivo. */
(function () {
  'use strict';

  var barra = document.getElementById('filtros');
  var grid = document.querySelector('.products-grid');
  if (!barra || !grid) return;

  var tarjetas = [].slice.call(grid.querySelectorAll('.product-card'));
  if (!tarjetas.length) return;

  /* Qué producto entra en cada necesidad, por su posición en PRODUCTS[].

     Se apuntan a mano en vez de buscar palabras dentro del texto. Se
     probaron las dos formas: buscando palabras, "frizz" devolvía 11 de
     los 12 productos y "daño" 10, porque casi toda la línea menciona
     brillo, hidratación o reparación en alguno de sus beneficios. Un
     filtro que no descarta nada no sirve de nada. */
  var NECESIDADES = [
    { id: 'todo',        icono: '🌿', texto: 'Todo' },
    { id: 'caida',       icono: '🍂', texto: 'Caída',       idx: [0, 1, 2, 5] },
    { id: 'hidratacion', icono: '💧', texto: 'Hidratación', idx: [0, 1, 5, 6, 8, 10] },
    { id: 'frizz',       icono: '🌪️', texto: 'Frizz',       idx: [1, 3, 6, 7] },
    { id: 'rizos',       icono: '🌀', texto: 'Rizos',       idx: [3, 5, 6] },
    { id: 'dano',        icono: '💔', texto: 'Daño',        idx: [4, 7, 9, 10, 11] }
  ];

  /* Texto sobre el que se busca: lo visible de la tarjeta más los
     nombres, descripciones y beneficios de sus variantes. */
  function textoDe(card) {
    var t = (card.textContent || '').toLowerCase();
    var lista = window.ALMA_PRODUCTS;
    var idx = parseInt(card.getAttribute('data-product'), 10);
    if (lista && lista[idx]) {
      var p = lista[idx];
      var vs = p.variants || [p];
      t += ' ' + (p.tag || '') + ' ' + vs.map(function (v) {
        return (v.name || '') + ' ' + (v.desc || '') + ' ' + (v.benefits || []).join(' ');
      }).join(' ');
    }
    return t.toLowerCase();
  }

  tarjetas.forEach(function (c) { c._busca = textoDe(c); });

  var filtro = 'todo';
  var texto = '';

  barra.innerHTML =
    '<div class="fl-buscar">' +
      '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
      '<label class="visually-hidden" for="flTexto">Buscar producto</label>' +
      '<input type="search" id="flTexto" placeholder="Buscar: romero, aguacate, cebolla…" autocomplete="off">' +
      '<button type="button" class="fl-limpiar" id="flLimpiar" aria-label="Borrar búsqueda" hidden>✕</button>' +
    '</div>' +
    '<div class="fl-chips" role="group" aria-label="Filtrar por necesidad">' +
      NECESIDADES.map(function (n) {
        return '<button type="button" class="fl-chip' + (n.id === 'todo' ? ' activo' : '') + '" data-f="' + n.id + '" aria-pressed="' + (n.id === 'todo') + '">' +
                 '<span aria-hidden="true">' + n.icono + '</span> ' + n.texto +
               '</button>';
      }).join('') +
    '</div>' +
    '<p class="fl-cuenta" id="flCuenta" role="status" aria-live="polite"></p>';

  var campo = document.getElementById('flTexto');
  var limpiar = document.getElementById('flLimpiar');
  var cuenta = document.getElementById('flCuenta');

  function aplicar() {
    var nec = NECESIDADES.filter(function (n) { return n.id === filtro; })[0];
    var indices = (nec && nec.idx) || null;
    var busca = texto.trim().toLowerCase();
    var visibles = 0;

    tarjetas.forEach(function (c) {
      var pasaFiltro = !indices || indices.indexOf(parseInt(c.getAttribute('data-product'), 10)) !== -1;
      var pasaTexto = !busca || c._busca.indexOf(busca) !== -1;
      var ok = pasaFiltro && pasaTexto;
      c.hidden = !ok;
      /* Las tarjetas llevan .reveal, que las deja en opacity:0 hasta que
         entran en pantalla y js/interactions.js les pone .on. Una tarjeta
         que se ocultó por el filtro antes de haber entrado nunca recibe
         esa clase, y al volver a mostrarla quedaría invisible: se ve el
         hueco pero no el producto. Por eso se le pone .on a mano.
         (La clase es 'on', no 'visible' — se probó con 'visible' y seis
         productos desaparecían al quitar un filtro.) */
      if (ok) { c.classList.add('on'); visibles++; }
    });

    grid.classList.toggle('sin-resultados', visibles === 0);
    if (visibles === 0) {
      cuenta.innerHTML = 'No encontramos nada con eso. <button type="button" class="fl-reset" data-reset>Ver todos los productos</button>';
    } else if (filtro === 'todo' && !busca) {
      cuenta.textContent = 'Los ' + tarjetas.length + ' productos de la línea';
    } else {
      cuenta.textContent = visibles + (visibles === 1 ? ' producto' : ' productos') + ' para lo que buscas';
    }
    limpiar.hidden = !busca;
  }

  barra.addEventListener('click', function (ev) {
    var chip = ev.target.closest('.fl-chip');
    if (chip) {
      filtro = chip.getAttribute('data-f');
      barra.querySelectorAll('.fl-chip').forEach(function (b) {
        var act = b === chip;
        b.classList.toggle('activo', act);
        b.setAttribute('aria-pressed', act);
      });
      aplicar();
      if (typeof window.gtag === 'function' && filtro !== 'todo') {
        window.gtag('event', 'filtro_productos', { necesidad: filtro });
      }
      return;
    }
    if (ev.target.closest('[data-reset]')) {
      filtro = 'todo'; texto = ''; campo.value = '';
      barra.querySelectorAll('.fl-chip').forEach(function (b) {
        var act = b.getAttribute('data-f') === 'todo';
        b.classList.toggle('activo', act);
        b.setAttribute('aria-pressed', act);
      });
      aplicar();
      return;
    }
    if (ev.target.closest('#flLimpiar')) {
      texto = ''; campo.value = ''; campo.focus(); aplicar();
    }
  });

  var reloj;
  campo.addEventListener('input', function () {
    texto = campo.value;
    clearTimeout(reloj);
    reloj = setTimeout(aplicar, 160);   /* se espera a que pare de escribir */
  });

  aplicar();
})();
