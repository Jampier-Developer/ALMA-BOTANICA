
(function(){
  const WA_NUMBER = '573135487027';
  let carouselInterval = null;
  let confettiTimers = [];

  function clearConfetti() {
    confettiTimers.forEach(t => clearTimeout(t));
    confettiTimers = [];
    if(typeof confetti === 'function') confetti.reset();
  }

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
    if(id === 'catalogModal') clearConfetti();
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
      name:'Shampoo Romero', tag:'Limpieza', price:'$32.000', size:'500 ml',
      bg:'linear-gradient(145deg,#fce4ec,#f8bbd0)',
      images:['img/Shampoos/shampoo%201.jpeg','img/Shampoos/shampoo%202.jpeg','img/Shampoos/shampoo%203.jpeg'],
      desc:'Limpieza profunda que estimula el crecimiento capilar desde el primer lavado. Formulado sin sulfatos agresivos para respetar el cuero cabelludo mientras elimina impurezas y exceso de sebo.',
      benefits:['Estimula la circulación del cuero cabelludo','Reduce la caída desde la 1ª semana','Limpieza profunda sin agredir la fibra','Apto para uso diario en todo tipo de cabello']
    },
    {
      name:'Acondicionador Romero', tag:'Nutrición', price:'$32.000', size:'500 ml',
      bg:'linear-gradient(145deg,#f3e5f5,#e1bee7)',
      images:['img/acondicionador/acondicionador1.jpeg','img/acondicionador/acondicionador2.jpeg','img/acondicionador/Acondicionador3.jpeg','img/acondicionador/Acondicionador4.jpeg'],
      desc:'Hidratación profunda sin residuos pesados. Sella la cutícula para un brillo duradero y suavidad inmediata. Compatible con cabellos rizados, teñidos y muy procesados.',
      benefits:['Hidratación profunda sin residuos','Sella la cutícula para más brillo','Desenreda sin dañar','Efecto antiestático duradero']
    },
    {
      name:'Tónico Capilar', tag:'Tratamiento', price:'$32.000', size:'120 ml',
      bg:'linear-gradient(145deg,#e8f5e9,#c8e6c9)',
      images:['img/Tonicos-Capilares/tonico%20capilar%201.jpeg','img/Tonicos-Capilares/tonico%20capilar%202.jpeg','img/Tonicos-Capilares/tonico%20capilar%203.jpeg'],
      desc:'Aplicación directa en raíces 2-4 veces por semana. El romero concentrado activa los folículos pilosos para estimular el crecimiento y reducir la caída estacional. No requiere enjuague.',
      benefits:['Activa folículos inactivos','Frena la caída estacional','Estimula el crecimiento capilar','Equilibra la producción de sebo']
    },
    {
      name:'Gel Fijador Hidratante', tag:'Styling', price:'$25.000', size:'300 ml',
      bg:'linear-gradient(145deg,#fff8e1,#ffecb3)',
      images:['img/Gel/Gel%201.jpeg'],
      desc:'Define rizos y ondas con fijación duradera sin el efecto cartón. La linaza aporta elasticidad y la Vitamina E protege el cabello mientras mantiene la hidratación.',
      benefits:['Define rizos sin efecto plástico','Hidrata mientras fija','Protección antifrizz','Fijación flexible todo el día']
    },
    {
      name:'Tratamiento Capilar', tag:'Reparación', price:'$35.000', size:'250 ml',
      bg:'linear-gradient(145deg,#fce4ec,#ffcdd2)',
      images:['img/Tratamientos/tratamiento%201.jpeg'],
      desc:'Mascarilla intensiva para cabellos debilitados por calor, tintura o procesos químicos. La quinoa repara la fibra capilar mientras la sábila hidrata y el romero estimula.',
      benefits:['Repara daño por calor y química','Hidratación profunda en 15 minutos','Fortalece la fibra capilar','Estimula el crecimiento desde la raíz']
    },
    {
      name:'Kit Rutina Completa', tag:'Más vendido', price:'$64.000 - $90.000', size:'500 ml',
      bg:'linear-gradient(145deg,#fce4ec,#e8a0b5)',
      images:['img/Kits/Kit1.jpeg','img/Kits/Kit2.jpeg','img/Kits/Kit3.jpeg','img/Kits/Kits4.jpeg'],
      desc:'Los kits de la línea Alma Botánica para el cuidado completo de tu cabello. Disponibles en diferentes opciones para adaptarse a tu rutina.',
      benefits:['Te ayuda con el crecimiento de tu cabello','Fortalecimiento de las raíces','Es una bomba hidratante que te ayudará con el brillo, suavidad y reparación de tu cabello']
    },
    {
      name:'Crema para Peinar', tag:'Styling', price:'$28.000', size:'200 ml',
      bg:'linear-gradient(145deg,#fef9e7,#fde68a)',
      images:['img/Crema%20para%20Peinar/crema%20de%20peinar%201.jpeg'],
      desc:'Crema definidora para peinar y moldear sin rigidez ni residuos. Ideal para todo tipo de cabello, aporta suavidad y control desde la raíz hasta las puntas.',
      benefits:['Define y moldea sin efecto pesado','Hidratación duradera sin residuos','Facilita el peinado y desenredo','Apto para uso diario']
    },
    {
      name:'Bio Repolarizador', tag:'Tratamiento', price:'$35.000', size:'120 ml',
      bg:'linear-gradient(145deg,#e0f7fa,#b2ebf2)',
      images:['img/BIO%20REPOLARIZADOR/BIO%20REPOLARIZADOR%201.jpeg'],
      desc:'Tratamiento intensivo que repolariza y regenera la fibra capilar desde adentro. Devuelve la vitalidad y brillo natural al cabello dañado por calor o químicos.',
      benefits:['Regenera la fibra capilar dañada','Devuelve brillo y suavidad inmediata','Repolariza el cabello con carga eléctrica neutra','Efecto acumulativo con uso constante']
    },
  ];

  // PRODUCT MODAL
  const svgPrev = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';
  const svgNext = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';

  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.product);
      const p = PRODUCTS[idx];
      if(!p) return;

      document.getElementById('modalTag').textContent   = p.tag;
      document.getElementById('modalTitle').textContent = p.name;
      document.getElementById('modalDesc').textContent  = p.desc;

      const priceEl = document.getElementById('modalPrice');
      priceEl.innerHTML = `<span style="font-size:1.6rem;font-weight:700;color:var(--pink-deep)">${p.price}</span>`;

      const imgWrap = document.getElementById('modalImg');
      clearInterval(carouselInterval);
      carouselInterval = null;

      const imgs = p.images || [];
      const multi = imgs.length > 1;

      imgWrap.style.background = imgs.length > 0 ? '#fff' : p.bg;
      imgWrap.style.position   = 'relative';
      imgWrap.style.fontSize   = '';

      imgWrap.innerHTML =
        '<div class="modal-carousel">'
        + '<div class="mc-track">'
        + imgs.map((src, i) => `<div class="mc-slide${i === 0 ? ' active' : ''}"><img src="${src}" alt="${p.name} - foto ${i + 1}"></div>`).join('')
        + '</div>'
        + (multi
            ? `<button class="mc-btn mc-prev" aria-label="Anterior">${svgPrev}</button>`
              + `<button class="mc-btn mc-next" aria-label="Siguiente">${svgNext}</button>`
              + '<div class="mc-dots">'
              + imgs.map((_, i) => `<button class="mc-dot${i === 0 ? ' active' : ''}" data-slide="${i}" aria-label="Foto ${i + 1}"></button>`).join('')
              + '</div>'
            : '')
        + '</div>';

      if (multi) {
        let cur = 0;
        const slides  = imgWrap.querySelectorAll('.mc-slide');
        const dotBtns = imgWrap.querySelectorAll('.mc-dot');
        const carousel = imgWrap.querySelector('.modal-carousel');
        const total = slides.length;

        function goTo(n) {
          slides[cur].classList.remove('active');
          cur = ((n % total) + total) % total;
          slides[cur].classList.add('active');
          dotBtns.forEach((d, i) => d.classList.toggle('active', i === cur));
        }

        imgWrap.querySelector('.mc-prev').addEventListener('click', e => { e.stopPropagation(); goTo(cur - 1); });
        imgWrap.querySelector('.mc-next').addEventListener('click', e => { e.stopPropagation(); goTo(cur + 1); });
        dotBtns.forEach(d => d.addEventListener('click', e => { e.stopPropagation(); goTo(+d.dataset.slide); }));

        carouselInterval = setInterval(() => goTo(cur + 1), 3500);
        carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
        carousel.addEventListener('mouseleave', () => { carouselInterval = setInterval(() => goTo(cur + 1), 3500); });

        let mcTouchX = 0;
        carousel.addEventListener('touchstart', e => { mcTouchX = e.touches[0].clientX; }, {passive:true});
        carousel.addEventListener('touchend', e => {
          const diff = mcTouchX - e.changedTouches[0].clientX;
          if(Math.abs(diff) > 35) goTo(diff > 0 ? cur + 1 : cur - 1);
        }, {passive:true});
      }

      const ul = document.getElementById('modalBenefits');
      ul.innerHTML = p.benefits.map(b => `<li>${b}</li>`).join('');

      const waMsg = encodeURIComponent(`🌿 *Alma Botánica* — Rosa Pérez\n\nHola Rosa! Me interesa ${p.name}. ¿Me puedes contar más detalles y disponibilidad?`);
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
    const name = document.getElementById('cmName').value.trim();
    if(!name){ highlight('cmName'); return; }

    nombreGuardado = name;
    cmBtnText.style.display = 'none';
    cmBtnLoad.style.display = 'inline';
    cmSubmit.disabled = true;

    await new Promise(r => setTimeout(r, 400));

    catalogForm.style.display = 'none';
    cmSuccess.style.display   = 'block';

    const nameSpan = document.getElementById('cmSuccessName');
    if(nameSpan) nameSpan.textContent = name;

    cmBtnText.style.display = 'inline';
    cmBtnLoad.style.display = 'none';
    cmSubmit.disabled = false;

    showToast('¡Tu catálogo está listo! Descárgalo ahora 🌿', '🌿');
  });

  // BOTÓN DE DESCARGA
  document.getElementById('cmDownloadBtn')?.addEventListener('click', async() => {
    const btn = document.getElementById('cmDownloadBtn');
    const ok  = document.getElementById('cmDownloadOk');

    btn.disabled = true;
    btn.style.opacity = '0.85';
    btn.innerHTML = '<span class="cm-spinner"></span> Generando PDF...';

    try {
      if(typeof window.generarCatalogoPDF === 'function'){
        await window.generarCatalogoPDF(nombreGuardado);
      }
      btn.innerHTML = '<em class="cm-checkmark">✓</em> ¡Muchas gracias por tu descarga!';
      btn.style.background = 'linear-gradient(135deg,#2e7d6e,#38756e)';
      btn.style.opacity = '1';
      ok.style.display = 'flex';
      showToast('¡Catálogo descargado! Gracias por tu interés 🌿', '🌿');

      // Confetti 20 segundos — para automáticamente si cierra el modal
      if(typeof confetti === 'function'){
        clearConfetti();
        const K = ['#d4607a','#8b2d45','#c9a15a','#f8bbd0','#fff','#e8c97a'];
        const wave = (opts, delay) => {
          confettiTimers.push(setTimeout(() => { if(typeof confetti==='function') confetti(opts); }, delay));
        };
        confetti({ particleCount:180, spread:100, origin:{y:.6}, colors:K });
        wave({ particleCount:140, spread:130, angle:60,  origin:{x:0,  y:.7}, colors:K }, 700);
        wave({ particleCount:140, spread:130, angle:120, origin:{x:1,  y:.7}, colors:K }, 700);
        wave({ particleCount:120, spread:90,  origin:{y:.55}, colors:K }, 2500);
        wave({ particleCount:110, spread:120, angle:70,  origin:{x:.1, y:.6}, colors:K }, 4500);
        wave({ particleCount:110, spread:120, angle:110, origin:{x:.9, y:.6}, colors:K }, 4500);
        wave({ particleCount:100, spread:90,  origin:{y:.5},  colors:K }, 7000);
        wave({ particleCount:90,  spread:110, origin:{y:.6},  colors:K }, 9000);
        wave({ particleCount:80,  spread:130, angle:60,  origin:{x:0,  y:.7}, colors:K }, 11000);
        wave({ particleCount:80,  spread:130, angle:120, origin:{x:1,  y:.7}, colors:K }, 11000);
        wave({ particleCount:70,  spread:90,  origin:{y:.55}, colors:K }, 13500);
        wave({ particleCount:60,  spread:100, origin:{y:.6},  colors:K }, 16000);
        wave({ particleCount:50,  spread:120, origin:{y:.5},  colors:K }, 18500);
        confettiTimers.push(setTimeout(() => clearConfetti(), 21000));
      }
    } catch(err) {
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Descargar catálogo PDF`;
      showToast('Error al generar el PDF. Inténtalo de nuevo.', '⚠️');
      console.warn('PDF error:', err);
    }
  });

  // CARD CAROUSELS — inicializa todos los carruseles de tarjetas genéricamente
  document.querySelectorAll('.pc-carousel').forEach(car => {
    const slides = car.querySelectorAll('.pcc-slide');
    const dots   = car.querySelectorAll('.pcc-dot');
    const prev   = car.querySelector('.pcc-prev');
    const next   = car.querySelector('.pcc-next');
    if(slides.length <= 1) return;
    const total = slides.length;
    let cur = 0;
    function goTo(n){
      slides[cur].classList.remove('active');
      dots[cur]?.classList.remove('active');
      cur = ((n % total) + total) % total;
      slides[cur].classList.add('active');
      dots[cur]?.classList.add('active');
    }
    prev?.addEventListener('click', e => { e.stopPropagation(); goTo(cur - 1); });
    next?.addEventListener('click', e => { e.stopPropagation(); goTo(cur + 1); });
    dots.forEach((d, i) => d.addEventListener('click', e => { e.stopPropagation(); goTo(i); }));
    setInterval(() => goTo(cur + 1), 4000);
    let tx = 0;
    car.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, {passive:true});
    car.addEventListener('touchend', e => {
      const diff = tx - e.changedTouches[0].clientX;
      if(Math.abs(diff) > 35) { e.stopPropagation(); goTo(diff > 0 ? cur + 1 : cur - 1); }
    }, {passive:true});
  });

  function highlight(id){
    const el = document.getElementById(id);
    if(!el) return;
    el.classList.add('err');
    el.focus();
    setTimeout(() => el.classList.remove('err'), 800);
  }

})();
