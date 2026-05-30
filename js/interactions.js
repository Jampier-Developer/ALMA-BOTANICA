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
