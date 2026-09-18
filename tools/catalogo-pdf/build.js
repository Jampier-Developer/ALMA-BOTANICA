const fs=require('fs'), path=require('path');
const D=__dirname;
const P=JSON.parse(fs.readFileSync(D+'/products.json','utf8'));
const FONTS=fs.readFileSync(D+'/fonts-embed.css','utf8');
const B='';
const jpg=s=>decodeURIComponent(s).replace(/\.webp$/,'.jpg').replace(/ /g,'%20');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const money=s=>String(s);
const num=s=>parseInt(String(s).replace(/\D/g,''),10)||0;


const INTRO = {
  'Shampoos':'Tres shampoos con un mismo principio: limpieza profunda sin sulfatos, sin sal y sin parabenos. Cambia el activo botánico, no la suavidad. Elige el que tu cabello necesita.',
  'Acondicionadores':'Cuatro acondicionadores que sellan la cutícula y desenredan sin dejar residuos pesados. Cada uno trabaja con un activo distinto para un tipo de cabello distinto.',
  'Tónicos Capilares':'El tónico es el paso que actúa directo sobre el cuero cabelludo. Se aplica sin enjuagar, después del lavado o sobre el cabello seco, y sigue trabajando durante el día.',
  'Kit Rutina Completa':'La rutina completa en un solo pedido y a precio de kit. Ocho combinaciones pensadas para distintos tipos de cabello — desde la más sencilla hasta la más completa.',
};

const leaf=`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/></svg>`;

function cover(){return `
<section class="pg cover">
  <div class="cover-glow"></div>
  <div class="cover-in">
    <img class="cover-logo" src="${B}img/Img%20Logo/LOGO%20-%20ALMA%20BOTANICA.png">
    <h1 class="cover-title">Alma Botánica</h1>
    <p class="cover-sub">Rosa Pérez · Cosmética Natural</p>
    <div class="cover-rule"><span></span>${leaf}<span></span></div>
    <p class="cover-tag">"Belleza natural que te hace única"</p>
    <div class="cover-foot">
      <p class="cover-cat">Catálogo de productos</p>
      <p class="cover-year">Cartagena de Indias · Colombia · 2026</p>
    </div>
  </div>
</section>`;}

function about(){return `
<section class="pg about">
  <div class="ab-grid">
    <div class="ab-photo"><img src="${B}img/Rosa-Perez-Fundadora/Rosa-Perez2.jpg"></div>
    <div class="ab-txt">
      <span class="kick">❀ Quién está detrás</span>
      <h2>Rosa Pérez</h2>
      <p class="ab-role">Formuladora Botánica</p>
      <p>Cada producto de Alma Botánica lo elabora Rosa desde cero, en Cartagena de Indias. No hay fábricas externas ni intermediarios: ella controla personalmente cada ingrediente y cada paso de la formulación.</p>
      <p>Toda la línea usa extracto puro de romero y activos botánicos seleccionados, pensados para cualquier textura de cabello — liso, ondulado, rizado y muy rizado.</p>
      <div class="ab-promise">
        <p class="ab-promise-t">Nuestra promesa</p>
        <ul>
          <li>Sin sulfatos</li><li>Sin parabenos</li><li>Sin sal</li>
          <li>100% natural y artesanal</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="ab-stats">
    <div><strong>12</strong><span>Productos</span></div>
    <div><strong>26</strong><span>Presentaciones</span></div>
    <div><strong>100%</strong><span>Natural</span></div>
  </div>
</section>`;}

function product(p, idx){
  const vs = p.variants || [p];
  const multi = vs.length>1;
  const min = Math.min(...vs.map(v=>num(v.price)));
  const max = Math.max(...vs.map(v=>num(v.price)));
  const fmt = n=>'$'+n.toLocaleString('es-CO').replace(/,/g,'.');
  const priceLbl = multi ? (min===max?fmt(min):`desde ${fmt(min)}`) : money(vs[0].price);
  const hero = (p.images && p.images[0]) || vs[0].image;
  const base = multi ? null : vs[0];

  const benefits = multi ? [] : (vs[0].benefits||[]);
  const desc = multi ? (INTRO[p.name] || '') : (vs[0].desc||'');

  const varRows = multi ? `
    <div class="v-wrap">
      <p class="v-head">Presentaciones disponibles</p>
      <div class="v-grid" style="grid-template-columns:repeat(${Math.min(vs.length,4)},1fr)">
        ${vs.map(v=>`
          <div class="v-card">
            <div class="v-img"><img src="${B}${jpg(v.image)}"></div>
            <div class="v-info">
              <p class="v-name">${esc(v.name)}</p>
              <p class="v-price">${esc(v.price)}</p>
            </div>
          </div>`).join('')}
      </div>
    </div>` : '';

  const detalle = vs.map(v=>`<div class="vd"><p class="vd-n">${esc(v.icon||'')} ${esc(v.name)} <em>${esc(v.price)}</em></p><p class="vd-d">${esc(v.desc)}</p></div>`).join('');
  // Con mas de 4 presentaciones el detalle no cabe debajo de la rejilla:
  // se lleva a una segunda pagina para que no quede texto cortado.
  const parte2 = multi && vs.length > 4;
  const varDetail = (multi && !parte2) ? `<div class="v-desc">${detalle}</div>` : '';

  return `
<section class="pg prod${multi?' prod-multi':' prod-solo'}">
  <div class="p-head">
    <span class="p-num">${String(idx+1).padStart(2,'0')}</span>
    <div class="p-head-t">
      <span class="p-tag">${esc(p.tag||'')}</span>
      <h2 class="p-name">${esc(p.name)}</h2>
    </div>
    <div class="p-price-box">
      ${multi&&min!==max?'<span class="p-from">desde</span>':''}
      <span class="p-price">${esc(priceLbl.replace('desde ',''))}</span>
      <span class="p-size">${esc(p.size||'')}</span>
    </div>
  </div>

  <div class="p-body">
    <div class="p-img"><img src="${B}${jpg(hero)}"></div>
    <div class="p-txt">
      ${desc?`<p class="p-desc">${esc(desc)}</p>`:''}
      ${benefits.length?`<p class="p-bh">Beneficios</p><ul class="p-ben">${benefits.map(b=>`<li>${leaf}<span>${esc(b)}</span></li>`).join('')}</ul>`:''}
    </div>
  </div>
  ${varRows}
  ${varDetail}
  <div class="p-foot"><span>Alma Botánica · Rosa Pérez</span><span>WhatsApp +57 313 548 7027</span></div>
</section>` + (parte2 ? `
<section class="pg prod prod-cont">
  <div class="p-head">
    <span class="p-num">${String(idx+1).padStart(2,'0')}</span>
    <div class="p-head-t">
      <span class="p-tag">${esc(p.tag||'')}</span>
      <h2 class="p-name">${esc(p.name)}</h2>
    </div>
    <div class="p-price-box"><span class="p-cont">Presentaciones<br>en detalle</span></div>
  </div>
  <div class="v-desc v-desc-full">${detalle}</div>
  <div class="p-foot"><span>Alma Botánica · Rosa Pérez</span><span>WhatsApp +57 313 548 7027</span></div>
</section>` : '');}

function order(){return `
<section class="pg order">
  <span class="kick center">❀ Ya casi</span>
  <h2 class="o-title">Cómo hacer tu <em>pedido</em></h2>
  <div class="o-steps">
    <div class="o-step"><span class="o-n">1</span><p class="o-t">Elige tus productos</p><p class="o-d">Mira el catálogo y decide qué quieres. Si tienes dudas sobre cuál va mejor con tu cabello, pregúntale a Rosa: ella te asesora.</p></div>
    <div class="o-step"><span class="o-n">2</span><p class="o-t">Escríbele por WhatsApp</p><p class="o-d">Rosa atiende personalmente. Le dices qué quieres, ella confirma disponibilidad y el total de tu pedido.</p></div>
    <div class="o-step"><span class="o-n">3</span><p class="o-t">Recibe y paga</p><p class="o-d">Entregamos a domicilio en Cartagena de Indias, contra entrega. Pagas cuando recibes — sin adelantos.</p></div>
  </div>
  <div class="o-pay"><p class="o-pay-t">Medios de pago</p><p class="o-pay-d">Nequi · Bancolombia · Contra entrega</p></div>
  <div class="o-contact">
    <img class="o-logo" src="${B}img/Img%20Logo/LOGO%20-%20ALMA%20BOTANICA.png">
    <p class="o-brand">Alma Botánica</p>
    <p class="o-wa">+57 313 548 7027</p>
    <div class="o-links">
      <span>alma-botanica.store</span><span>@almabotanica26</span><span>@alma.botnica</span>
    </div>
    <p class="o-addr">Barrio El Pozón · Cartagena de Indias · Bolívar · Colombia</p>
  </div>
  <p class="o-legal">Precios vigentes a septiembre de 2026, expresados en pesos colombianos (COP) y sujetos a cambio sin previo aviso. Las fotografías son de los productos reales. Consulta las políticas de venta en alma-botanica.store/ventas</p>
</section>`;}

const CSS = `
${FONTS}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#fbf6ea; --cream:#f7f1e0; --sage-pale:#eef1e6; --sage-soft:#f4f6ee;
  --sage:#77836a; --sage-deep:#4c5641; --sage-mid:#6f6b4a;
  --gold:#c9a15a; --gold-light:#e8c97a; --gold-pale:#fdf3d8;
  --bronze:#8b5a3c; --bronze-light:#ab7248; --bronze-deep:#6b4429;
  --text:#2a2318; --text-m:#6c5f49;
  --fd:'Marcellus',Georgia,serif; --fb:'Poppins',sans-serif;
}
@page{ size:A4; margin:0 }
html,body{width:210mm}
body{font-family:var(--fb);color:var(--text);background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact;line-height:1.6}
img{display:block;max-width:100%}
h1,h2,h3{font-family:var(--fd);font-weight:400;line-height:1.1}
em{font-style:italic;color:var(--bronze)}
.pg{width:210mm;height:297mm;padding:16mm 15mm;position:relative;overflow:hidden;page-break-after:always;background:var(--bg)}
.pg:last-child{page-break-after:auto}
.kick{font-family:'Courier New',monospace;font-size:8pt;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);font-weight:700;display:block;margin-bottom:5mm}
.kick.center{text-align:center}

/* ── PORTADA ── */
.cover{background:linear-gradient(160deg,#6b4429 0%,#8b5a3c 32%,#6f6b4a 68%,#4c5641 100%);padding:0;display:flex;align-items:center;justify-content:center}
.cover-glow{position:absolute;width:150mm;height:150mm;border-radius:50%;background:radial-gradient(circle,rgba(232,201,122,.20),transparent 68%);top:-40mm;right:-45mm}
.cover-in{text-align:center;color:#fff;position:relative;z-index:2;padding:0 20mm}
.cover-logo{width:52mm;height:52mm;border-radius:50%;margin:0 auto 9mm;border:2.5px solid var(--gold-light);object-fit:cover;box-shadow:0 8mm 22mm rgba(0,0,0,.35)}
.cover-title{font-size:40pt;letter-spacing:.012em;margin-bottom:3mm}
.cover-sub{font-family:'Courier New',monospace;font-size:10pt;letter-spacing:.3em;text-transform:uppercase;color:var(--gold-light);font-weight:700}
.cover-rule{display:flex;align-items:center;justify-content:center;gap:4mm;margin:9mm 0}
.cover-rule span{width:26mm;height:1px;background:linear-gradient(90deg,transparent,var(--gold-light),transparent)}
.cover-rule svg{width:6mm;height:6mm;color:var(--gold-light)}
.cover-tag{font-family:var(--fd);font-size:14pt;font-style:italic;color:rgba(255,255,255,.93)}
.cover-foot{margin-top:26mm}
.cover-cat{font-family:var(--fd);font-size:16pt;color:var(--gold-light);margin-bottom:2mm}
.cover-year{font-family:'Courier New',monospace;font-size:8pt;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.62)}

/* ── SOBRE ROSA ── */
.ab-grid{display:grid;grid-template-columns:62mm 1fr;gap:10mm;align-items:start}
.ab-photo img{width:62mm;height:80mm;object-fit:cover;object-position:center 22%;border-radius:3mm;box-shadow:0 4mm 12mm rgba(74,58,26,.2)}
.ab-txt h2{font-size:26pt;color:var(--bronze-deep);margin-bottom:1mm}
.ab-role{font-family:'Courier New',monospace;font-size:8pt;letter-spacing:.18em;text-transform:uppercase;color:var(--sage);font-weight:700;margin-bottom:5mm}
.ab-txt p{font-size:9.5pt;color:var(--text-m);margin-bottom:3.5mm}
.ab-promise{margin-top:6mm;background:var(--sage-soft);border-left:1mm solid var(--sage);border-radius:0 2mm 2mm 0;padding:4mm 5mm}
.ab-promise-t{font-family:'Courier New',monospace;font-size:7.5pt;letter-spacing:.16em;text-transform:uppercase;color:var(--sage-deep);font-weight:700;margin-bottom:2.5mm!important}
.ab-promise ul{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:1.5mm}
.ab-promise li{font-size:9pt;color:var(--sage-deep);font-weight:500;padding-left:5mm;position:relative}
.ab-promise li::before{content:'✓';position:absolute;left:0;color:var(--gold);font-weight:700}
.ab-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:5mm;margin-top:14mm;padding-top:8mm;border-top:1px solid rgba(119,131,106,.25)}
.ab-stats div{text-align:center}
.ab-stats strong{display:block;font-family:var(--fd);font-size:28pt;color:var(--bronze);line-height:1}
.ab-stats span{font-family:'Courier New',monospace;font-size:7.5pt;letter-spacing:.16em;text-transform:uppercase;color:var(--text-m);font-weight:600}

/* ── PRODUCTO ── */
.prod{display:flex;flex-direction:column}
.p-head{display:flex;align-items:flex-start;gap:5mm;padding-bottom:5mm;border-bottom:1px solid rgba(119,131,106,.22);margin-bottom:6mm}
.p-num{font-family:var(--fd);font-size:30pt;color:var(--gold);line-height:.85;opacity:.55}
.p-head-t{flex:1}
.p-tag{display:inline-block;font-family:'Courier New',monospace;font-size:7pt;letter-spacing:.16em;text-transform:uppercase;color:var(--sage-deep);background:var(--sage-pale);border:1px solid rgba(119,131,106,.3);border-radius:99px;padding:1mm 3mm;font-weight:700;margin-bottom:2.5mm}
.p-name{font-size:23pt;color:var(--bronze-deep)}
.p-price-box{text-align:right;flex-shrink:0}
.p-from{display:block;font-family:'Courier New',monospace;font-size:7pt;letter-spacing:.14em;text-transform:uppercase;color:var(--text-m);font-weight:700}
.p-price{display:block;font-family:var(--fd);font-size:22pt;color:var(--bronze);line-height:1.05}
.p-size{display:block;font-family:'Courier New',monospace;font-size:7.5pt;letter-spacing:.12em;text-transform:uppercase;color:var(--text-m);font-weight:600;margin-top:.8mm}
.p-body{display:grid;grid-template-columns:66mm 1fr;gap:8mm;margin-bottom:6mm}
.p-img img{width:66mm;height:72mm;object-fit:cover;border-radius:3mm;box-shadow:0 3mm 10mm rgba(74,58,26,.16)}
.p-desc{font-size:9.5pt;color:var(--text-m);margin-bottom:4mm}
.p-bh{font-family:'Courier New',monospace;font-size:7.5pt;letter-spacing:.16em;text-transform:uppercase;color:var(--sage);font-weight:700;margin-bottom:2.5mm}
.p-ben{list-style:none}
.p-ben li{display:flex;gap:2.5mm;align-items:flex-start;font-size:9pt;color:var(--text);margin-bottom:2mm}
.p-ben svg{width:3.4mm;height:3.4mm;color:var(--sage);flex-shrink:0;margin-top:.9mm}
.v-wrap{margin-top:1mm}
.v-head{font-family:'Courier New',monospace;font-size:7.5pt;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:3mm}
.v-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:3.5mm}
.v-card{background:#fff;border:1px solid rgba(119,131,106,.18);border-radius:2.5mm;overflow:hidden;box-shadow:0 1.5mm 5mm rgba(74,58,26,.07)}
.v-img{height:26mm;overflow:hidden;background:var(--cream)}
.v-img img{width:100%;height:26mm;object-fit:cover}
.v-info{padding:2.5mm}
.v-name{font-size:7.5pt;font-weight:600;color:var(--text);line-height:1.25;margin-bottom:1mm;min-height:7mm}
.v-price{font-family:var(--fd);font-size:12pt;color:var(--bronze);line-height:1}
.v-desc{margin-top:5mm;display:grid;grid-template-columns:1fr 1fr;gap:3mm 6mm}
.vd-n{font-size:8.5pt;font-weight:600;color:var(--sage-deep);margin-bottom:.6mm}
.vd-n em{font-style:normal;color:var(--bronze);font-weight:600}
.vd-d{font-size:7.8pt;color:var(--text-m);line-height:1.45}

/* ── Reparto vertical: ninguna pagina debe quedar con hueco abajo ── */
.about{display:flex;flex-direction:column;justify-content:center}
.ab-stats{margin-top:16mm}
.order{justify-content:space-between}
.o-title{margin-bottom:0}
/* Producto de una sola presentacion: la ficha se reparte en la altura */
.prod-solo .p-body{flex:1;align-items:center;grid-template-columns:78mm 1fr;gap:10mm}
.prod-solo .p-img img{width:78mm;height:100mm}
.prod-solo .p-desc{font-size:10.5pt;margin-bottom:6mm}
.prod-solo .p-ben li{font-size:9.8pt;margin-bottom:3mm}
/* Producto con varias presentaciones: el detalle crece para llenar */
.prod-multi .v-desc{flex:1;align-content:start}
.prod-multi .p-desc{font-size:10pt;font-style:italic;color:var(--sage-deep)}
.p-cont{font-family:'Courier New',monospace;font-size:7.5pt;letter-spacing:.14em;text-transform:uppercase;color:var(--text-m);font-weight:700;text-align:right;line-height:1.6}
.prod-cont .v-desc{margin-top:8mm;gap:5mm 8mm}
.prod-cont .vd-n{font-size:9.5pt;margin-bottom:1.2mm}
.prod-cont .vd-d{font-size:8.6pt;line-height:1.5}
.p-foot{margin-top:auto;padding-top:5mm;border-top:1px solid rgba(119,131,106,.2);display:flex;justify-content:space-between;font-family:'Courier New',monospace;font-size:7pt;letter-spacing:.1em;text-transform:uppercase;color:var(--text-m)}

/* ── PEDIDO ── */
.order{text-align:center;display:flex;flex-direction:column}
.o-title{font-size:28pt;color:var(--bronze-deep);margin-bottom:9mm}
.o-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:5mm;margin-bottom:8mm}
.o-step{background:#fff;border:1px solid rgba(119,131,106,.2);border-radius:3mm;padding:6mm 4mm;box-shadow:0 2mm 8mm rgba(74,58,26,.07)}
.o-n{display:inline-flex;align-items:center;justify-content:center;width:9mm;height:9mm;border-radius:50%;background:var(--bronze);color:#fff;font-family:var(--fd);font-size:13pt;margin-bottom:3mm}
.o-t{font-family:var(--fd);font-size:12pt;color:var(--bronze-deep);margin-bottom:2mm}
.o-d{font-size:8.5pt;color:var(--text-m);line-height:1.5}
.o-pay{background:var(--gold-pale);border:1px solid rgba(201,161,90,.35);border-radius:2.5mm;padding:4mm;margin-bottom:9mm}
.o-pay-t{font-family:'Courier New',monospace;font-size:7.5pt;letter-spacing:.16em;text-transform:uppercase;color:var(--bronze-deep);font-weight:700;margin-bottom:1.5mm}
.o-pay-d{font-family:var(--fd);font-size:12pt;color:var(--bronze)}
.o-contact{background:linear-gradient(150deg,#6b4429,#6f6b4a 70%,#4c5641);border-radius:3mm;padding:9mm 6mm;color:#fff;margin-bottom:6mm}
.o-logo{width:24mm;height:24mm;border-radius:50%;margin:0 auto 4mm;border:1.5px solid var(--gold-light);object-fit:cover}
.o-brand{font-family:var(--fd);font-size:19pt;margin-bottom:1mm}
.o-wa{font-family:var(--fd);font-size:17pt;color:var(--gold-light);margin-bottom:4mm}
.o-links{display:flex;justify-content:center;gap:6mm;font-family:'Courier New',monospace;font-size:7.5pt;letter-spacing:.1em;color:rgba(255,255,255,.88);margin-bottom:3mm}
.o-addr{font-size:8pt;color:rgba(255,255,255,.66)}
.o-legal{margin-top:auto;font-size:6.8pt;color:var(--text-m);line-height:1.5;opacity:.85;max-width:150mm;margin-left:auto;margin-right:auto}
`;

const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
<title>Catálogo Alma Botánica 2026</title><style>${CSS}</style></head><body>
${cover()}${about()}${P.map((p,i)=>product(p,i)).join('')}${order()}
</body></html>`;

fs.writeFileSync(D+'/catalogo.html', html);
console.log('catalogo.html generado:', (html.length/1024).toFixed(0), 'KB');
console.log('paginas:', 2 + P.length + 1);
