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
  const lightbox = document.getElementById('rcLightbox');
  const lbImg    = document.getElementById('rcLbImg');
  const lbClose  = document.getElementById('rcLbClose');

  function openLb(src, alt){
    if(!lightbox||!lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb(){
    if(!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  lbClose?.addEventListener('click', closeLb);
  lightbox?.addEventListener('click', e=>{ if(e.target===lightbox) closeLb(); });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeLb(); });

  document.querySelectorAll('[data-carousel]').forEach(car=>{
    const track  = car.querySelector('.rc-track');
    const slides = car.querySelectorAll('.rc-slide');
    const dots   = car.querySelectorAll('.rc-dot');
    const total  = slides.length;
    let current  = 0;
    let timer;

    function goTo(idx){
      current = ((idx % total) + total) % total;
      track.style.transform = `translateX(-${current * (100/total)}%)`;
      dots.forEach((d,i)=>{
        d.classList.toggle('rc-dot-active', i===current);
      });
    }

    function startAuto(){ timer = setInterval(()=>goTo(current+1), 4500); }
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

    // Pause on hover (desktop)
    car.addEventListener('mouseenter', stopAuto);
    car.addEventListener('mouseleave', startAuto);

    // Touch swipe (mobile)
    let tx=0;
    car.addEventListener('touchstart', e=>{ tx=e.touches[0].clientX; }, {passive:true});
    car.addEventListener('touchend', e=>{
      const diff = tx - e.changedTouches[0].clientX;
      if(Math.abs(diff)>42){ stopAuto(); goTo(diff>0?current+1:current-1); startAuto(); }
    });

    // Click on image → lightbox
    slides.forEach(slide=>{
      const img = slide.querySelector('img');
      slide.addEventListener('click', ()=>{ if(img) openLb(img.src, img.alt); });
    });

    startAuto();
  });
})();
