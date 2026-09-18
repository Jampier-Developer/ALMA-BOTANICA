/* ── RUTINA PASO A PASO E INGREDIENTES ─────────────────────────────

   1. LA RUTINA
      El orden en que se usan los productos no es obvio: ¿el pre-poo va
      antes o después del shampoo? ¿el tónico se enjuaga? Puesto en
      orden, se entiende que no compiten entre sí — se complementan. Eso
      es lo que hace que alguien pase de un producto a la rutina.

   2. LOS INGREDIENTES
      Fichas de los activos de la línea. Refuerzan el "100% natural" con
      algo concreto, y traen visitas de Google: mucha gente busca "para
      qué sirve el romero en el cabello" antes de comprar nada. */
(function () {
  'use strict';

  /* ══ RUTINA ══════════════════════════════════════════════════ */
  var PASOS = [
    {
      n: 1, cuando: 'Antes de lavar', icono: '🥥',
      titulo: 'Pree Poo',
      que: 'Se aplica sobre el cabello seco, 20 minutos antes del lavado.',
      por: 'El shampoo, por suave que sea, se lleva algo de grasa natural. El pre-lavado deja una capa que lo protege, así el lavado limpia sin dejarlo sediento.',
      idx: 8, opcional: true
    },
    {
      n: 2, cuando: 'En la ducha', icono: '🧴',
      titulo: 'Shampoo',
      que: 'Se enjabona sobre todo el cuero cabelludo, masajeando con las yemas.',
      por: 'La limpieza va en el cuero cabelludo, no en las puntas. Al masajear se mueve la circulación, que es justo lo que necesita el folículo.',
      idx: 0
    },
    {
      n: 3, cuando: 'En la ducha', icono: '💧',
      titulo: 'Acondicionador',
      que: 'De media melena hacia abajo. En la raíz no hace falta.',
      por: 'Sella la cutícula que el lavado abrió. Por eso desenreda y da brillo: la fibra queda lisa otra vez.',
      idx: 1
    },
    {
      n: 4, cuando: 'Una o dos veces por semana', icono: '✨',
      titulo: 'Mascarilla o Tratamiento',
      que: 'En lugar del acondicionador. Se deja 15 minutos y se enjuaga.',
      por: 'El acondicionador trabaja por fuera; la mascarilla entra en la fibra. Es el paso que repara de verdad lo que el calor o el tinte rompieron.',
      idx: 10
    },
    {
      n: 5, cuando: 'Con el cabello húmedo', icono: '🌿',
      titulo: 'Tónico Capilar',
      que: 'Directo en el cuero cabelludo. No se enjuaga.',
      por: 'Es el único que se queda trabajando todo el día sobre el folículo. Si algo va a frenar la caída, es este.',
      idx: 2
    },
    {
      n: 6, cuando: 'Antes de peinar', icono: '🛡️',
      titulo: 'Termoprotector',
      que: 'Sobre el cabello húmedo, antes del secador o la plancha.',
      por: 'Lo que no se daña no hay que repararlo después. Es el paso más barato de toda la rutina en términos de lo que ahorra.',
      idx: 9, opcional: true
    },
    {
      n: 7, cuando: 'Para terminar', icono: '🌀',
      titulo: 'Crema para Peinar o Gel',
      que: 'En el cabello húmedo, repartiendo con los dedos.',
      por: 'Define y controla el frizz sin dejarlo duro. La crema para el día a día, el gel cuando se buscan rizos marcados.',
      idx: 6, opcional: true
    }
  ];

  var caja = document.getElementById('rutina');
  if (caja) {
    caja.innerHTML =
      '<ol class="rt-lista">' +
        PASOS.map(function (p) {
          return '<li class="rt-paso">' +
                   '<div class="rt-num"><span>' + p.n + '</span></div>' +
                   '<div class="rt-cuerpo">' +
                     '<p class="rt-cuando">' + p.cuando + (p.opcional ? ' · <em>opcional</em>' : '') + '</p>' +
                     '<h3 class="rt-titulo">' + p.icono + ' ' + p.titulo + '</h3>' +
                     '<p class="rt-que">' + p.que + '</p>' +
                     '<p class="rt-por"><strong>Por qué:</strong> ' + p.por + '</p>' +
                   '</div>' +
                 '</li>';
        }).join('') +
      '</ol>' +
      '<p class="rt-nota">No hacen falta los siete pasos para empezar. Con shampoo, acondicionador y tónico ya hay rutina — el resto se va sumando.</p>';
  }

  /* ══ INGREDIENTES ════════════════════════════════════════════ */
  var ACTIVOS = [
    {
      nombre: 'Romero', icono: '🌿', color: 'sage',
      para: 'Caída y crecimiento',
      texto: 'Su ácido rosmarínico mejora la circulación del cuero cabelludo, que es de donde sale el pelo nuevo. Es el activo más estudiado de la línea y el que está en más productos.',
      en: 'Shampoo, acondicionador, tónico y kits'
    },
    {
      nombre: 'Cebolla', icono: '🧅', color: 'bronze',
      para: 'Caída y densidad',
      texto: 'Aporta compuestos de azufre, que es la materia prima con la que el cuerpo fabrica queratina. Sin azufre no hay queratina, y sin queratina el cabello nace débil.',
      en: 'Acondicionador y kits'
    },
    {
      nombre: 'Aguacate', icono: '🥑', color: 'sage',
      para: 'Sequedad y frizz',
      texto: 'Rico en Omega-9 y vitaminas A, B, C y E. Sus grasas son de las pocas que entran en la fibra en vez de quedarse encima, y por eso hidratan de verdad al cabello poroso.',
      en: 'Shampoo, acondicionador y kits'
    },
    {
      nombre: 'Linaza', icono: '✨', color: 'gold',
      para: 'Definir rizos',
      texto: 'Sus mucílagos forman una película que define sin el efecto cartón del gel de siempre, y de paso aporta Omega-3 y vitamina E.',
      en: 'Gel fijador y kits'
    },
    {
      nombre: 'Quinoa', icono: '🌾', color: 'bronze',
      para: 'Reparación',
      texto: 'Tiene los nueve aminoácidos esenciales. El cabello es proteína, así que reparar una fibra rota es, literalmente, devolverle los aminoácidos que perdió.',
      en: 'Tratamiento capilar'
    },
    {
      nombre: 'Sábila', icono: '🌵', color: 'sage',
      para: 'Cuero cabelludo',
      texto: 'Calma la irritación y el picor sin engrasar. Es lo que hace que la línea siente bien en cuero cabelludo sensible o con tendencia a la caspa.',
      en: 'Tratamiento capilar'
    }
  ];

  var cajaIng = document.getElementById('ingredientes');
  if (cajaIng) {
    cajaIng.innerHTML =
      '<div class="ing-grid">' +
        ACTIVOS.map(function (a) {
          return '<article class="ing-card ing-' + a.color + '">' +
                   '<span class="ing-ico">' + a.icono + '</span>' +
                   '<h3 class="ing-nombre">' + a.nombre + '</h3>' +
                   '<p class="ing-para">' + a.para + '</p>' +
                   '<p class="ing-texto">' + a.texto + '</p>' +
                   '<p class="ing-en">En: ' + a.en + '</p>' +
                 '</article>';
        }).join('') +
      '</div>';
  }
})();
