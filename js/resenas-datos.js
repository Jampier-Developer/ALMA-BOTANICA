/* ── RESEÑAS ───────────────────────────────────────────────────────
   Este archivo lo mantiene Rosa. Cada entrada es una reseña de verdad,
   de una clienta de verdad, que dio permiso para publicarla.

   Cómo se anota una:

     { nombre:'Estrella', lugar:'Cartagena', estrellas:5,
       producto:'Kit Romero', fecha:'2026-08-14',
       texto:'Lo que la clienta escribió, sin retocar.' }

   ⚠️ Las que llevan ejemplo:true son de muestra, para ver cómo queda la
   sección. NO se le enseñan a nadie: solo salen con ?demo=1 al final de
   la dirección.

   Y hay algo más importante todavía: mientras haya ejemplos, la página
   NO le manda a Google la nota media. Publicar valoraciones inventadas
   en los datos estructurados va contra las normas de Google —puede
   costar que el sitio pierda sus resultados enriquecidos— y en Colombia
   es publicidad engañosa (Ley 1480 de 2011).

   Cuando haya reseñas reales se les quita el ejemplo:true y entonces sí:
   se muestran a todo el mundo y la nota media viaja a Google, que es lo
   que pone las estrellitas doradas en los resultados de búsqueda. */
window.ALMA_RESENAS = [
  { ejemplo:true, nombre:'Estrella', lugar:'Cartagena',      estrellas:5, producto:'Kit Romero',           fecha:'2026-08-14',
    texto:'Llevaba tiempo buscando algo que de verdad le funcionara a mi cabello. La caída bajó desde las primeras semanas y ahora luce más fuerte y brillante.' },
  { ejemplo:true, nombre:'Yina',     lugar:'El Pozón',       estrellas:5, producto:'Shampoo de Romero',    fecha:'2026-08-02',
    texto:'Lo uso hace dos meses. Se me nota el cabello con más cuerpo y ya no se me cae como antes cuando me peino.' },
  { ejemplo:true, nombre:'Dioneris', lugar:'Olaya Herrera',  estrellas:5, producto:'Tratamiento Capilar',  fecha:'2026-07-21',
    texto:'Tenía el pelo muy maltratado por la plancha. Con el tratamiento lo siento mucho más suave y manejable.' },
  { ejemplo:true, nombre:'Marcela',  lugar:'Bocagrande',     estrellas:4, producto:'Crema para Peinar',    fecha:'2026-07-09',
    texto:'Me gusta que no deja el cabello duro. Lo único es que a mí se me acaba rápido porque tengo mucho pelo.' }
];
