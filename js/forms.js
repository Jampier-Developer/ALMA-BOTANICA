
(function(){
  const WA_NUMBER = '573135487027';
  let carouselInterval = null;

  // TOAST
  const toast    = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  let tt;
  function showToast(msg, icon='❀'){
    document.getElementById('toast-ico').textContent = icon;
    toastMsg.textContent = msg;
    toast.classList.add('vis');
    clearTimeout(tt);
    tt = setTimeout(() => toast.classList.remove('vis'), 4500);
  }

  // MODALS
  function openModal(id){ document.getElementById(id).classList.add('open'); document.body.style.overflow='hidden'; }
  function closeModal(id){
    if(id === 'productModal') clearInterval(carouselInterval);
    document.getElementById(id).classList.remove('open');
    document.body.style.overflow='';
  }

  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if(e.target === m) closeModal(m.id); });
  });
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape'){ closeModal('productModal'); closeModal('catalogModal'); }
  });
  document.getElementById('modalClose')?.addEventListener('click',   () => closeModal('productModal'));
  document.getElementById('catalogClose')?.addEventListener('click', () => closeModal('catalogModal'));

  // CATALOG MODAL TRIGGERS
  ['catalogBtn','heroCatalogBtn','ctaCatalogBtn','mobCatalogBtn'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', () => {
      document.getElementById('cmSuccess').style.display  = 'none';
      document.getElementById('catalogForm').style.display = 'block';
      document.getElementById('cmDownloadOk').style.display = 'none';
      openModal('catalogModal');
    });
  });

  // PRODUCTS DATA
  const PRODUCTS = [
    {
      name:'Shampoo Romero', tag:'Limpieza', price:'$28.000', size:'500 ml',
      icon:'🌿', bg:'linear-gradient(145deg,#fce4ec,#f8bbd0)',
      desc:'Limpieza profunda que estimula el crecimiento capilar desde el primer lavado. Formulado sin sulfatos agresivos para respetar el cuero cabelludo mientras elimina impurezas y exceso de sebo.',
      ingredients:'Extracto de Romero, Agua destilada, Aloe vera, Pantenol (Vitamina B5), Aceite de argán.',
      benefits:['Estimula la circulación del cuero cabelludo','Reduce la caída desde la 1ª semana','Limpieza profunda sin agredir la fibra','Apto para uso diario en todo tipo de cabello']
    },
    {
      name:'Acondicionador Romero', tag:'Nutrición', price:'$28.000', size:'500 ml',
      icon:'✿', bg:'linear-gradient(145deg,#f3e5f5,#e1bee7)',
      desc:'Hidratación profunda sin residuos pesados. Sella la cutícula para un brillo duradero y suavidad inmediata. Compatible con cabellos rizados, teñidos y muy procesados.',
      ingredients:'Extracto de Romero, Manteca de karité, Keratina vegetal, Aceite de coco, Vitamina E.',
      benefits:['Hidratación profunda sin residuos','Sella la cutícula para más brillo','Desenreda sin dañar','Efecto antiestático duradero']
    },
    {
      name:'Tónico Capilar', tag:'Tratamiento', price:'$32.000', size:'Romero activo',
      icon:'💧', bg:'linear-gradient(145deg,#e8f5e9,#c8e6c9)',
      desc:'Aplicación directa en raíces 2-4 veces por semana. El romero concentrado activa los folículos pilosos para estimular el crecimiento y reducir la caída estacional. No requiere enjuague.',
      ingredients:'Extracto concentrado de Romero, Biotina, Zinc, Aceite de ricino, Agua de rosas.',
      benefits:['Activa folículos inactivos','Frena la caída estacional','Estimula el crecimiento capilar','Equilibra la producción de sebo']
    },
    {
      name:'Gel Fijador Hidratante', tag:'Styling', price:'$25.000', size:'Linaza + Vit E',
      icon:'✨', bg:'linear-gradient(145deg,#fff8e1,#ffecb3)',
      desc:'Define rizos y ondas con fijación duradera sin el efecto cartón. La linaza aporta elasticidad y la Vitamina E protege el cabello mientras mantiene la hidratación.',
      ingredients:'Gel de linaza, Vitamina E, Aloe vera, Aceite de romero, Glicerina vegetal.',
      benefits:['Define rizos sin efecto plástico','Hidrata mientras fija','Protección antifrizz','Fijación flexible todo el día']
    },
    {
      name:'Tratamiento Capilar', tag:'Reparación', price:'$35.000', size:'Quinoa · Sábila',
      icon:'🌸', bg:'linear-gradient(145deg,#fce4ec,#ffcdd2)',
      desc:'Mascarilla intensiva para cabellos debilitados por calor, tintura o procesos químicos. La quinoa repara la fibra capilar mientras la sábila hidrata y el romero estimula.',
      ingredients:'Proteína de Quinoa, Gel de Sábila, Extracto de Romero, Aceite de aguacate, Manteca de cacao.',
      benefits:['Repara daño por calor y química','Hidratación profunda en 15 minutos','Fortalece la fibra capilar','Estimula el crecimiento desde la raíz']
    },
    {
      name:'Kit Rutina Completa', tag:'Más vendido', price:'$120.000', size:'3 kits disponibles',
      icon:'🎁', bg:'linear-gradient(145deg,#fce4ec,#e8a0b5)',
      desc:'Los 3 kits de la línea Alma Botánica: Romero, Linaza y Nutritivo. Una rutina botánica completa para el cuidado de tu cabello.',
      ingredients:'Kit Romero: $60.000  ·  Kit Linaza: $75.000  ·  Kit Nutritivo: $130.000',
      benefits:['Te ayuda con el crecimiento de tu cabello','Fortalecimiento de las raíces','Es una bomba hidratante que te ayudará con el brillo, suavidad y reparación de tu cabello']
    },
  ];

  // PRODUCT MODAL
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.product);
      const p = PRODUCTS[idx];
      if(!p) return;

      document.getElementById('modalTag').textContent         = p.tag;
      document.getElementById('modalTitle').textContent       = p.name;
      document.getElementById('modalDesc').textContent        = p.desc;
      document.getElementById('modalIngredients').textContent = p.ingredients;
      const priceEl = document.getElementById('modalPrice');
      priceEl.style.display = 'flex';
      priceEl.style.alignItems = 'center';
      priceEl.innerHTML = '<span style="font-size:2.8rem;filter:drop-shadow(0 2px 6px rgba(0,0,0,.12))">🌿</span>';
      document.querySelector('.modal-ingredients h4').textContent = idx === 5 ? 'Precios por kit' : 'Ingredientes clave';

      const imgWrap = document.getElementById('modalImg');
      clearInterval(carouselInterval);
      carouselInterval = null;

      if (idx === 5) {
        imgWrap.style.background = p.bg;
        imgWrap.style.fontSize = '';
        imgWrap.style.position = 'relative';
        imgWrap.innerHTML =
          '<div class="modal-carousel">'
          + '<div class="mc-track" id="mcTrack">'
          + '<div class="mc-slide"><img src="img/Kit1.jpeg" alt="Kit Rutina Completa - foto 1"></div>'
          + '<div class="mc-slide"><img src="img/Kit2.jpeg" alt="Kit Rutina Completa - foto 2"></div>'
          + '<div class="mc-slide"><img src="img/Kit3.jpeg" alt="Kit Rutina Completa - foto 3"></div>'
          + '</div>'
          + '<button class="mc-btn mc-prev" aria-label="Anterior">'
          + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>'
          + '</button>'
          + '<button class="mc-btn mc-next" aria-label="Siguiente">'
          + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'
          + '</button>'
          + '<div class="mc-dots">'
          + '<button class="mc-dot active" data-slide="0" aria-label="Foto 1"></button>'
          + '<button class="mc-dot" data-slide="1" aria-label="Foto 2"></button>'
          + '<button class="mc-dot" data-slide="2" aria-label="Foto 3"></button>'
          + '</div>'
          + '</div>';

        let cur = 0;
        const slides  = imgWrap.querySelectorAll('.mc-slide');
        const dotBtns = imgWrap.querySelectorAll('.mc-dot');
        const carousel = imgWrap.querySelector('.modal-carousel');

        slides[0].classList.add('active');

        function goTo(n) {
          slides[cur].classList.remove('active');
          cur = ((n % 3) + 3) % 3;
          slides[cur].classList.add('active');
          dotBtns.forEach((d, i) => d.classList.toggle('active', i === cur));
        }

        imgWrap.querySelector('.mc-prev').addEventListener('click', e => { e.stopPropagation(); goTo(cur - 1); });
        imgWrap.querySelector('.mc-next').addEventListener('click', e => { e.stopPropagation(); goTo(cur + 1); });
        dotBtns.forEach(d => d.addEventListener('click', e => { e.stopPropagation(); goTo(+d.dataset.slide); }));

        carouselInterval = setInterval(() => goTo(cur + 1), 3500);
        carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
        carousel.addEventListener('mouseleave', () => { carouselInterval = setInterval(() => goTo(cur + 1), 3500); });

        // Swipe táctil para móvil
        let mcTouchX = 0;
        carousel.addEventListener('touchstart', e => { mcTouchX = e.touches[0].clientX; }, {passive:true});
        carousel.addEventListener('touchend', e => {
          const diff = mcTouchX - e.changedTouches[0].clientX;
          if(Math.abs(diff) > 35) goTo(diff > 0 ? cur + 1 : cur - 1);
        }, {passive:true});

      } else {
        imgWrap.style.background = p.bg;
        imgWrap.style.position   = '';
        imgWrap.textContent      = p.icon;
        imgWrap.style.fontSize   = '6rem';
      }

      const ul = document.getElementById('modalBenefits');
      ul.innerHTML = p.benefits.map(b => `<li>${b}</li>`).join('');

      const waMsg = encodeURIComponent(`🌿 *Alma Botánica* — Rosa Pérez\n\nHola Rosa! Me interesa un kit. ¿Me puedes contar más detalles y disponibilidad?`);
      document.getElementById('modalWa').href = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;

      openModal('productModal');
    });
  });

  // CATALOG FORM — genera y descarga el PDF
  const catalogForm = document.getElementById('catalogForm');
  const cmSubmit    = document.getElementById('cmSubmit');
  const cmBtnText   = document.getElementById('cmBtnText');
  const cmBtnLoad   = document.getElementById('cmBtnLoad');
  const cmSuccess   = document.getElementById('cmSuccess');

  let nombreGuardado = '';

  catalogForm?.addEventListener('submit', async(e) => {
    e.preventDefault();
    const name  = document.getElementById('cmName').value.trim();
    const email = document.getElementById('cmEmail').value.trim();

    if(!name)             { highlight('cmName');  return; }
    if(!isValidEmail(email)) { highlight('cmEmail'); return; }

    nombreGuardado = name;

    cmBtnText.style.display = 'none';
    cmBtnLoad.style.display = 'inline';
    cmSubmit.disabled = true;

    await new Promise(r => setTimeout(r, 600));

    catalogForm.style.display = 'none';
    cmSuccess.style.display   = 'block';

    const nameSpan = document.getElementById('cmSuccessName');
    if(nameSpan) nameSpan.textContent = name;

    cmBtnText.style.display = 'inline';
    cmBtnLoad.style.display = 'none';
    cmSubmit.disabled = false;

    showToast('¡Tu catálogo está listo para descargar! 🌿', '🌿');
  });

  // BOTÓN DE DESCARGA
  document.getElementById('cmDownloadBtn')?.addEventListener('click', async() => {
    const btn = document.getElementById('cmDownloadBtn');
    const ok  = document.getElementById('cmDownloadOk');

    btn.disabled = true;
    btn.style.opacity = '0.7';
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 1s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Generando PDF...`;

    try {
      if(typeof window.generarCatalogoPDF === 'function'){
        await window.generarCatalogoPDF(nombreGuardado);
      }
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> ¡Descargado!`;
      btn.style.background = 'linear-gradient(135deg,#2e7d6e,#38756e)';
      btn.style.opacity = '1';
      ok.style.display = 'flex';
      showToast('¡Catálogo descargado correctamente! 📥', '📥');
    } catch(err) {
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Descargar catálogo PDF`;
      showToast('Error al generar el PDF. Inténtalo de nuevo.', '⚠️');
      console.warn('PDF error:', err);
    }
  });

  // KIT CARD CAROUSEL
  (function(){
    const slides = document.querySelectorAll('#kitCarousel .pcc-slide');
    const dots   = document.querySelectorAll('#kitCarousel .pcc-dot');
    const prev   = document.getElementById('kitPrev');
    const next   = document.getElementById('kitNext');
    if(!slides.length) return;
    let cur = 0;
    function goTo(n){
      slides[cur].classList.remove('active');
      dots[cur].classList.remove('active');
      cur = ((n % 3) + 3) % 3;
      slides[cur].classList.add('active');
      dots[cur].classList.add('active');
    }
    prev.addEventListener('click', e => { e.stopPropagation(); goTo(cur - 1); });
    next.addEventListener('click', e => { e.stopPropagation(); goTo(cur + 1); });
    setInterval(() => goTo(cur + 1), 4000);

    // Swipe táctil para móvil
    const carouselEl = document.getElementById('kitCarousel');
    let pccTouchX = 0;
    carouselEl.addEventListener('touchstart', e => { pccTouchX = e.touches[0].clientX; }, {passive:true});
    carouselEl.addEventListener('touchend', e => {
      const diff = pccTouchX - e.changedTouches[0].clientX;
      if(Math.abs(diff) > 35) { e.stopPropagation(); goTo(diff > 0 ? cur + 1 : cur - 1); }
    }, {passive:true});
  })();

  function highlight(id){
    const el = document.getElementById(id);
    if(!el) return;
    el.classList.add('err');
    el.focus();
    setTimeout(() => el.classList.remove('err'), 800);
  }

  function isValidEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
})();
