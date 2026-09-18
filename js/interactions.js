(function(){
  const progBar=document.getElementById('progBar');
  const nav=document.getElementById('mainNav');

  // HAMBURGER MENU
  const hamburger=document.getElementById('hamburger');
  const mobMenu=document.getElementById('mobMenu');
  function toggleMenu(open){
    hamburger.classList.toggle('open',open);
    mobMenu.classList.toggle('open',open);
    hamburger.setAttribute('aria-expanded',open);
    mobMenu.setAttribute('aria-hidden',!open);
    document.body.style.overflow=open?'hidden':'';
  }
  hamburger?.addEventListener('click',()=>toggleMenu(!hamburger.classList.contains('open')));
  document.querySelectorAll('.mob-link, #mobCatalogBtn').forEach(el=>{
    el.addEventListener('click',()=>toggleMenu(false));
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape')toggleMenu(false)});

  window.addEventListener('scroll',()=>{
    const max=document.documentElement.scrollHeight-window.innerHeight;
    if(progBar)progBar.style.width=(max>0?window.scrollY/max*100:0)+'%';
    if(nav)nav.classList.toggle('scrolled',window.scrollY>60);
  },{passive:true});

  const ro=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('on');ro.unobserve(x.target)}})},{threshold:.1,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

  document.querySelectorAll('.fi-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const id=btn.getAttribute('aria-controls');
      const ans=document.getElementById(id);
      const open=btn.getAttribute('aria-expanded')==='true';
      document.querySelectorAll('.fi-btn').forEach(b=>{if(b!==btn){b.setAttribute('aria-expanded','false');const a=document.getElementById(b.getAttribute('aria-controls'));if(a)a.style.maxHeight='0'}});
      btn.setAttribute('aria-expanded',open?'false':'true');
      if(ans)ans.style.maxHeight=open?'0':ans.scrollHeight+'px';
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const t=document.querySelector(a.getAttribute('href'));
      if(t){e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-80,behavior:'smooth'})}
    });
  });
})();

// ── CAROUSELS DE RESULTADOS + LIGHTBOX ───────────────────
(function(){
  const lightbox  = document.getElementById('rcLightbox');
  const lbImg     = document.getElementById('rcLbImg');
  const lbClose   = document.getElementById('rcLbClose');
  const lbPrev    = document.getElementById('rcLbPrev');
  const lbNext    = document.getElementById('rcLbNext');
  const lbDotsEl  = document.getElementById('rcLbDots');
  const lbZoomIn  = document.getElementById('rcLbZoomIn');
  const lbZoomOut = document.getElementById('rcLbZoomOut');

  let lbImages  = [];
  let lbCurrent = 0;
  let lbScale   = 1;

  function setLbZoom(val){
    lbScale = Math.min(3, Math.max(0.5, val));
    if(lbImg){ lbImg.style.transform=`scale(${lbScale})`; lbImg.style.cursor=lbScale>=3?'default':'zoom-in'; }
  }

  function buildLbDots(){
    if(!lbDotsEl) return;
    lbDotsEl.innerHTML = lbImages.map((_,i)=>
      `<span class="rc-dot${i===lbCurrent?' rc-dot-active':''}"></span>`
    ).join('');
    lbDotsEl.querySelectorAll('.rc-dot').forEach((d,i)=>{
      d.addEventListener('click', e=>{ e.stopPropagation(); lbGoTo(i); });
    });
  }

  function lbGoTo(idx){
    lbCurrent = ((idx % lbImages.length) + lbImages.length) % lbImages.length;
    if(lbImg){ lbImg.src=lbImages[lbCurrent].src; lbImg.alt=lbImages[lbCurrent].alt; }
    setLbZoom(1);
    lbDotsEl?.querySelectorAll('.rc-dot').forEach((d,i)=>d.classList.toggle('rc-dot-active',i===lbCurrent));
  }

  function openLb(images, startIdx){
    if(!lightbox||!lbImg) return;
    lbImages  = images;
    lbCurrent = startIdx;
    lbImg.src = lbImages[lbCurrent].src;
    lbImg.alt = lbImages[lbCurrent].alt || '';
    setLbZoom(1);
    buildLbDots();
    const single = lbImages.length < 2;
    if(lbPrev) lbPrev.style.display = single ? 'none' : '';
    if(lbNext) lbNext.style.display = single ? 'none' : '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLb(){
    if(!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lbImages=[]; lbCurrent=0; lbScale=1;
    if(lbImg){ lbImg.style.transform=''; lbImg.style.cursor=''; }
  }

  lbClose?.addEventListener('click', closeLb);
  lbPrev?.addEventListener('click',  e=>{ e.stopPropagation(); lbGoTo(lbCurrent-1); });
  lbNext?.addEventListener('click',  e=>{ e.stopPropagation(); lbGoTo(lbCurrent+1); });
  lbZoomIn?.addEventListener('click',  e=>{ e.stopPropagation(); setLbZoom(lbScale+0.5); });
  lbZoomOut?.addEventListener('click', e=>{ e.stopPropagation(); setLbZoom(lbScale-0.5); });
  lbImg?.addEventListener('click', e=>{ e.stopPropagation(); setLbZoom(lbScale+0.5); });
  // Cierra al tocar el fondo (lb-img-wrap cubre todo el overlay, por eso verificamos el wrap también)
  const lbWrap = document.querySelector('#rcLightbox .lb-img-wrap');
  lbWrap?.addEventListener('click', e=>{ if(e.target===lbWrap) closeLb(); });
  lightbox?.addEventListener('click', e=>{ if(e.target===lightbox) closeLb(); });

  // Swipe en lightbox (móvil)
  let lbTx=0;
  lightbox?.addEventListener('touchstart', e=>{ lbTx=e.touches[0].clientX; }, {passive:true});
  lightbox?.addEventListener('touchend', e=>{
    const diff=lbTx-e.changedTouches[0].clientX;
    if(Math.abs(diff)>40){ diff>0 ? lbGoTo(lbCurrent+1) : lbGoTo(lbCurrent-1); }
  });

  // Teclado
  document.addEventListener('keydown', e=>{
    if(!lightbox?.classList.contains('open')) return;
    if(e.key==='Escape')     closeLb();
    if(e.key==='ArrowRight') lbGoTo(lbCurrent+1);
    if(e.key==='ArrowLeft')  lbGoTo(lbCurrent-1);
    if(e.key==='+')          setLbZoom(lbScale+0.5);
    if(e.key==='-')          setLbZoom(lbScale-0.5);
  });

  // ── Carousels ─────────────────────────────────────────
  document.querySelectorAll('[data-carousel]').forEach(car=>{
    const track  = car.querySelector('.rc-track');
    const slides = car.querySelectorAll('.rc-slide');
    const dots   = car.querySelectorAll('.rc-dot');
    const total  = slides.length;
    let current  = 0;
    let timer;

    // Recoge las imágenes de este carousel para el lightbox
    const carImages = Array.from(slides).map(sl=>{
      const img = sl.querySelector('img');
      return { src: img?.src||'', alt: img?.alt||'' };
    });

    function goTo(idx){
      current = ((idx % total) + total) % total;
      track.style.transform = `translateX(-${current*(100/total)}%)`;
      dots.forEach((d,i)=>d.classList.toggle('rc-dot-active', i===current));
    }

    function startAuto(){ timer = setInterval(()=>goTo(current+1), 8000); }
    function stopAuto(){  clearInterval(timer); }

    car.querySelector('.rc-prev')?.addEventListener('click', e=>{
      e.stopPropagation(); stopAuto(); goTo(current-1); startAuto();
    });
    car.querySelector('.rc-next')?.addEventListener('click', e=>{
      e.stopPropagation(); stopAuto(); goTo(current+1); startAuto();
    });
    dots.forEach((dot,i)=>{
      dot.addEventListener('click', e=>{
        e.stopPropagation(); stopAuto(); goTo(i); startAuto();
      });
    });

    car.addEventListener('mouseenter', stopAuto);
    car.addEventListener('mouseleave', startAuto);

    // Swipe táctil (móvil)
    let tx=0;
    car.addEventListener('touchstart', e=>{ tx=e.touches[0].clientX; }, {passive:true});
    car.addEventListener('touchend', e=>{
      const diff = tx - e.changedTouches[0].clientX;
      if(Math.abs(diff)>42){ stopAuto(); goTo(diff>0?current+1:current-1); startAuto(); }
    });

    // Click en slide → abre lightbox en la foto correcta
    slides.forEach((slide, i)=>{
      slide.addEventListener('click', ()=>openLb(carImages, i));
    });

    startAuto();
  });
})();

// ── Footer product links → abre modal del producto ───────
document.querySelectorAll('[data-open-product]').forEach(el=>{
  el.addEventListener('click', e=>{
    e.preventDefault();
    const idx = el.dataset.openProduct;
    document.querySelector(`.product-card[data-product="${idx}"]`)?.click();
  });
});

/* ── ANUNCIO EN VIDEO ─────────────────────────────────────────────
   Se abre una sola vez por visita y dura lo que dura el video.

   Dos reglas que no se pueden saltar:

   1. Nada puede taparle el banner de cookies. La norma colombiana pide
      un consentimiento previo, expreso e informado, y eso significa que
      la persona tiene que poder decidir sin obstáculos encima. Por eso
      el anuncio espera al aviso 'alma:cookies-resueltas' que manda
      js/cookies.js cuando el banner se va.

   2. El video arranca en silencio. Los navegadores bloquean el arranque
      automático con sonido, así que el sonido lo activa la persona. */
(function () {
  var overlay = document.getElementById('annOverlay');
  if (!overlay) return;

  var video    = document.getElementById('annVideo');
  var cerrar   = document.getElementById('annClose');
  var sonido   = document.getElementById('annSound');
  var quitarMute = document.getElementById('annUnmute');
  var barra    = document.getElementById('annTimerBar');
  var etiqueta = document.getElementById('annTimerLabel');
  var cta      = document.getElementById('annCta');

  var CLAVE = 'botanica_anuncio_visto';
  var RESPALDO_MS = 6000;   /* por si el aviso de cookies nunca llega */
  var ESPERA_VIDEO_MS = 5000;  /* si el video no carga, no se deja el modal colgado */
  var TOPE_MS = 90000;         /* techo absoluto: nunca se queda abierto más */
  var abierto = false, animando = null, arrancado = false;
  var relojCarga = null, relojTope = null;

  /* Una vez por visita: se guarda en sessionStorage, que se borra al
     cerrar la pestaña. Recargar con F5 no lo vuelve a mostrar; volver
     mañana, sí. */
  function yaLoVio() {
    try { return sessionStorage.getItem(CLAVE) === '1'; } catch (_) { return false; }
  }
  function marcarVisto() {
    try { sessionStorage.setItem(CLAVE, '1'); } catch (_) {}
  }

  var SVG_MUDO  = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>';
  var SVG_AUDIO = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';
  if (sonido) sonido.innerHTML = SVG_MUDO;

  function activarSonido() {
    if (!video) return;
    video.muted = false;
    if (sonido) { sonido.innerHTML = SVG_AUDIO; sonido.style.display = 'flex'; }
    if (quitarMute) {
      quitarMute.classList.add('out');
      setTimeout(function () { quitarMute.style.display = 'none'; }, 380);
    }
  }

  /* La barra baja al ritmo real del video en vez de con una duración
     fija, para que lo que se ve coincida con lo que queda por ver. */
  function seguirProgreso() {
    if (!video || !video.duration || !isFinite(video.duration)) return;
    if (relojCarga) { clearTimeout(relojCarga); relojCarga = null; }
    var restante = Math.max(0, video.duration - video.currentTime);
    if (barra) barra.style.width = (restante / video.duration * 100) + '%';
    if (etiqueta) {
      var seg = Math.ceil(restante);
      etiqueta.innerHTML = seg > 0 ? 'Se cierra en <strong>' + seg + '</strong>s' : 'Cerrando…';
    }
    animando = requestAnimationFrame(seguirProgreso);
  }

  /* Solo se abre si el video está listo para verse. Antes se abría de
     una y, si el archivo fallaba, la persona veía un rectángulo negro
     unos segundos antes de que la red de seguridad lo cerrara. Mejor no
     enseñar nada que enseñar algo roto. */
  function abrirCuandoEsteListo() {
    if (abierto || yaLoVio() || !video) return;

    if (video.readyState >= 1) { abrir(); return; }   /* metadatos ya cargados */

    var listo = false;
    var seguir = function () {
      if (listo) return;
      listo = true;
      clearTimeout(espera);
      abrir();
    };
    video.addEventListener('loadedmetadata', seguir, { once: true });
    video.addEventListener('error', function () { listo = true; clearTimeout(espera); }, { once: true });
    /* Si no hay metadatos a tiempo, el anuncio simplemente no sale */
    var espera = setTimeout(function () { listo = true; }, ESPERA_VIDEO_MS);
    video.load();
  }

  function abrir() {
    if (abierto || yaLoVio()) return;
    abierto = true;
    marcarVisto();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (video) {
      video.muted = true;
      var intento = video.play();
      if (intento && intento.catch) intento.catch(function () {
        /* Si el navegador ni siquiera deja arrancar en silencio, se
           cierra el plazo por duración para no dejar el modal colgado. */
        if (etiqueta) etiqueta.textContent = 'Toca para reproducir';
      });
      video.addEventListener('ended', cerrarAnuncio);

      /* Si el video no se puede reproducir —formato no admitido, archivo
         que no llega, datos cortados— no hay evento 'ended' ni duración,
         así que sin esto el anuncio se quedaría abierto para siempre
         mostrando un rectángulo negro. */
      video.addEventListener('error', cerrarAnuncio);
      relojCarga = setTimeout(function () {
        if (!video.duration || !isFinite(video.duration)) cerrarAnuncio();
      }, ESPERA_VIDEO_MS);
      relojTope = setTimeout(cerrarAnuncio, TOPE_MS);

      seguirProgreso();
    }
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'anuncio_video_visto', {});
    }
  }

  function cerrarAnuncio() {
    if (!abierto) return;
    abierto = false;
    if (animando) cancelAnimationFrame(animando);
    if (relojCarga) clearTimeout(relojCarga);
    if (relojTope) clearTimeout(relojTope);
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (video) { video.pause(); }
  }

  cerrar && cerrar.addEventListener('click', cerrarAnuncio);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) cerrarAnuncio(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && abierto) cerrarAnuncio();
  });
  cta && cta.addEventListener('click', cerrarAnuncio);

  quitarMute && quitarMute.addEventListener('click', activarSonido, { once: true });
  quitarMute && quitarMute.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activarSonido(); }
  }, { once: true });

  sonido && sonido.addEventListener('click', function (e) {
    e.stopPropagation();
    if (!video) return;
    video.muted = !video.muted;
    sonido.innerHTML = video.muted ? SVG_MUDO : SVG_AUDIO;
  });

  /* Arranque: en cuanto el banner de cookies deja la pantalla libre.
     El plazo de respaldo cubre el caso de que ese aviso no llegue. */
  function arrancar() {
    if (arrancado) return;
    arrancado = true;
    setTimeout(abrirCuandoEsteListo, 450);
  }
  /* La comprobación va dentro de DOMContentLoaded a propósito. Este
     archivo se ejecuta antes que el arranque de js/cookies.js, así que
     mirar 'ck-abierto' aquí mismo daría siempre falso y el anuncio se
     abriría encima del banner. Como cookies.js registra su escucha antes
     que esta, para cuando llega este turno el banner ya está puesto. */
  function decidirArranque() {
    if (document.body.classList.contains('ck-abierto')) {
      document.addEventListener('alma:cookies-resueltas', arrancar, { once: true });
      setTimeout(arrancar, RESPALDO_MS);
    } else {
      /* Sin banner, porque ya había decidido antes: se abre enseguida */
      setTimeout(arrancar, 700);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', decidirArranque);
  } else {
    decidirArranque();
  }
})();
