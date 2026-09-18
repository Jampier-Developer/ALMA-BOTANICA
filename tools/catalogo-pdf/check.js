const { chromium } = require('playwright');
const D=__dirname;
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 const p=await (await b.newContext({viewport:{width:794,height:1123}})).newPage();
 await p.goto('file://'+D+'/catalogo.html',{waitUntil:'networkidle'});
 await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(1200);
 const r=await p.evaluate(()=>{
   const out=[];
   document.querySelectorAll('.pg').forEach((pg,i)=>{
     const cs=getComputedStyle(pg);
     const padB=parseFloat(cs.paddingBottom), padT=parseFloat(cs.paddingTop);
     const limite=pg.clientHeight-padB;
     let maxB=0, culpable='';
     pg.querySelectorAll('*').forEach(el=>{
       const r=el.getBoundingClientRect(), pr=pg.getBoundingClientRect();
       const bottom=r.bottom-pr.top;
       if(r.height>0 && bottom>maxB){ maxB=bottom; culpable=el.className||el.tagName; }
     });
     const titulo=(pg.querySelector('.p-name,.cover-title,.ab-txt h2,.o-title')||{}).textContent||'?';
     out.push({n:i+1, titulo:titulo.trim().slice(0,28), alto:Math.round(pg.clientHeight), usado:Math.round(maxB),
               limite:Math.round(limite), desborde:Math.round(maxB-limite), culpable:String(culpable).slice(0,24),
               vacio:Math.round(limite-maxB)});
   });
   return out;
 });
 console.log('pag | contenido                    | usado/limite | estado');
 let mal=0;
 r.forEach(x=>{
   let estado;
   if(x.desborde>2){ estado=`DESBORDA +${x.desborde}px (${x.culpable})`; mal++; }
   else if(x.vacio>170) estado=`hueco de ${x.vacio}px`;
   else estado='OK';
   console.log(` ${String(x.n).padStart(2)} | ${x.titulo.padEnd(28)} | ${String(x.usado).padStart(4)}/${x.limite} | ${estado}`);
 });
 console.log(mal? `\n>>> ${mal} pagina(s) con texto cortado` : '\n>>> ninguna pagina corta contenido ✅');
 await b.close();
})();
