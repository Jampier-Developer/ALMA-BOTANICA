/* ── PEDIDOS RECIENTES ─────────────────────────────────────────────
   Este archivo lo mantiene Rosa. Cada entrada es un pedido de verdad.

   Cómo se anota uno:

     { nombre:'Marcela', lugar:'Cartagena', producto:'un Kit Romero',
       hace:120, imagen:'img/Kits/kit5.webp' }

     nombre   — solo el nombre de pila, nunca apellidos ni teléfono
     lugar    — el barrio o la ciudad
     producto — cómo lo diría ella: "un Shampoo de Romero"
     hace     — minutos desde el pedido (120 = hace 2 horas)
     imagen   — opcional; si no hay, sale una hojita

   ⚠️ Las entradas con ejemplo:true son de muestra, para ver cómo queda.
   NO se le enseñan a nadie: solo salen abriendo la página con ?demo=1.
   Cuando Rosa ponga pedidos reales, se les quita el ejemplo:true y los
   avisos empiezan a salir solos. Inventar pedidos es publicidad
   engañosa (Ley 1480 de 2011) y la forma más rápida de que alguien deje
   de creerte.

   Conviene repasarlo de vez en cuando: un pedido de "hace 3 días" que
   lleve un mes ahí se nota. */
window.ALMA_PEDIDOS = [
  { ejemplo:true, nombre:'Marcela',  lugar:'El Pozón',            producto:'un Kit Romero',           hace:95,  imagen:'img/Kits/kit5.webp' },
  { ejemplo:true, nombre:'Yuranis',  lugar:'Olaya Herrera',       producto:'un Shampoo de Romero',    hace:240, imagen:'img/Shampoos/shampoo%201.webp' },
  { ejemplo:true, nombre:'Katherine',lugar:'Cartagena',           producto:'un Tónico Capilar',       hace:420, imagen:'img/Tonicos-Capilares/tonico%20capilar%201.webp' },
  { ejemplo:true, nombre:'Dayana',   lugar:'Bocagrande',          producto:'la Mascarilla Nutritiva', hace:1380,imagen:'img/Mascarilla%20Nutritiva/Mascarilla%20Nutritiva1.webp' },
  { ejemplo:true, nombre:'Luz Mery', lugar:'Barrio España',       producto:'un Termoprotector',       hace:2880,imagen:'img/Termoprotector/Termoprotector%202%20Important.webp' }
];
