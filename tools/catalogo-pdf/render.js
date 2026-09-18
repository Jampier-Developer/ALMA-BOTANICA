const { chromium } = require('playwright');
const D=__dirname;
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 const c=await b.newContext();
 const p=await c.newPage();
 const fallos=[];
 p.on('requestfailed',r=>fallos.push(r.url().slice(-60)+' :: '+(r.failure()?.errorText||'')));
 p.on('response',r=>{ if(r.status()>=400) fallos.push(r.status()+' '+r.url().slice(-60)); });
 await p.goto('file://'+D+'/catalogo.html',{waitUntil:'networkidle',timeout:60000});
 await p.evaluate(()=>document.fonts.ready);
 await p.waitForTimeout(1500);
 // comprobar que todas las imagenes cargaron
 const imgs=await p.evaluate(()=>{
   const all=[...document.querySelectorAll('img')];
   return {total:all.length, rotas:all.filter(i=>!i.naturalWidth).map(i=>i.src.slice(-50))};
 });
 console.log('imagenes:', imgs.total, '| rotas:', imgs.rotas.length?imgs.rotas:'0 ✅');
 const fuentes=await p.evaluate(()=>{
   const t=document.querySelector('.cover-title');
   return getComputedStyle(t).fontFamily;
 });
 console.log('fuente del titulo:', fuentes);
 await p.pdf({path:D+'/Catalogo-Alma-Botanica.pdf', format:'A4', printBackground:true, preferCSSPageSize:true});
 if(fallos.length) console.log('recursos fallidos:', [...new Set(fallos)].slice(0,5));
 await b.close();
 const fs=require('fs');
 console.log('PDF:', (fs.statSync(D+'/Catalogo-Alma-Botanica.pdf').size/1048576).toFixed(2), 'MB');
})();
