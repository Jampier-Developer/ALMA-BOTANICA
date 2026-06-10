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
    lbImages=[]; lbCurrent=0; setLbZoom(1);
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
