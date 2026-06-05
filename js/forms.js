
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
    if(id === 'productModal'){
      clearInterval(carouselInterval);
      document.querySelector('.modal-box')?.classList.remove('kit-modal');
      document.getElementById('kitModalWrap')?.classList.remove('kit-active');
    }
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
      name:'Shampoos', tag:'Limpieza', size:'500 ml',
      bg:'linear-gradient(145deg,#fce4ec,#f8bbd0)',
      variants:[
        {
          name:'Shampoo Romero', price:'$32.000', icon:'🌿',
          image:'img/Shampoos/shampoo%201.jpeg',
          desc:'Con extracto de romero rico en ácido rosmarínico que mejora la circulación del cuero cabelludo. Estudios clínicos demuestran que el romero es tan efectivo como el minoxidil para estimular el crecimiento capilar.',
          benefits:['Estimula la circulación del cuero cabelludo','Reduce la caída bloqueando causas hormonales','Limpieza profunda sin sulfatos agresivos','Apto para uso diario en todo tipo de cabello']
        },
        {
          name:'Shampoo Nutritivo', price:'$34.000', icon:'⭐',
          image:'img/Shampoos/shampoo%202.jpeg',
          desc:'Fórmula nutritiva que fortalece la fibra capilar desde el primer lavado. Limpia en profundidad mientras aporta nutrición activa, devolviendo vida y brillo sin residuos pesados.',
          benefits:['Nutrición activa desde la raíz','Fortalece la fibra capilar debilitada','Brillo y suavidad inmediata','Sin sulfatos ni parabenos']
        },
        {
          name:'Shampoo Aguacate', price:'$32.000', icon:'🥑',
          image:'img/Shampoos/shampoo%203.jpeg',
          desc:'Enriquecido con aceite de aguacate, rico en Omega-9, vitaminas A, B, C y E. Sus ácidos grasos monoinsaturados penetran la fibra capilar restaurando la barrera lipídica del cabello seco o poroso.',
          benefits:['Hidratación profunda con Omega-9 y vitaminas','Restaura la barrera lipídica del cabello','Controla el frizz y encrespamiento','Ideal para cabello seco, poroso o dañado']
        },
      ]
    },
    {
      name:'Acondicionadores', tag:'Nutrición', size:'500 ml',
      bg:'linear-gradient(145deg,#f3e5f5,#e1bee7)',
      variants:[
        {
          name:'Acondicionador Romero', price:'$32.000', icon:'🌿',
          image:'img/acondicionador/acondicionador1.jpeg',
          desc:'El romero mejora la circulación del cuero cabelludo y reduce activamente la caída. Sella la cutícula para un brillo duradero y suavidad inmediata sin residuos pesados.',
          benefits:['Sella la cutícula para más brillo','Reduce la caída activamente','Desenreda sin dañar la fibra','Efecto antiestático duradero']
        },
        {
          name:'Acondicionador Nutritivo', price:'$34.000', icon:'⭐',
          image:'img/acondicionador/acondicionador2.jpeg',
          desc:'Fórmula nutritiva concentrada con aminoácidos esenciales que reparan y fortalecen la fibra capilar desde adentro. Ideal para cabello debilitado por tintes o procesos químicos.',
          benefits:['Reparación profunda de la fibra capilar','Nutrición con aminoácidos esenciales','Fortalece y reduce el quiebre','Compatible con cabello teñido o procesado']
        },
        {
          name:'Acondicionador Aguacate', price:'$32.000', icon:'🥑',
          image:'img/acondicionador/Acondicionador3.jpeg',
          desc:'Rico en Omega-9, vitaminas A, B, C y E del aceite de aguacate. Sus ácidos grasos penetran la fibra capilar restaurando la barrera lipídica y devolviendo elasticidad al cabello más seco.',
          benefits:['Penetra la fibra con Omega-9 y vitaminas','Restaura elasticidad y barrera lipídica','Controla el frizz desde adentro','Ideal para cabello muy seco o poroso']
        },
        {
          name:'Acondicionador Cebolla', price:'$32.000', icon:'🧅',
          image:'img/acondicionador/Acondicionador4.jpeg',
          desc:'El extracto de cebolla aporta compuestos sulfurados esenciales para la producción de queratina. Estudios clínicos demuestran que estimula el crecimiento y reduce la caída en pocas semanas de uso.',
          benefits:['Frena la caída con compuestos sulfurados','Estimula la producción de queratina natural','Aporta densidad y volumen al cabello','Desenreda y suaviza sin residuos']
        },
      ]
    },
    {
      name:'Tónicos Capilares', tag:'Crecimiento', size:'120 ml',
      bg:'linear-gradient(145deg,#e8f5e9,#c8e6c9)',
      variants:[
        {
          name:'Tónico Capilar Romero', price:'$15.000', icon:'🌿',
          image:'img/Tonicos-Capilares/tonico%20capilar%201.jpeg',
          desc:'Aplicación directa en raíces 2-4 veces por semana. El romero contiene ácido rosmarínico que mejora la circulación del cuero cabelludo, activa los folículos y reduce la caída. No requiere enjuague.',
          benefits:['Activa folículos pilosos inactivos','Reduce la caída estacional','Mejora la circulación del cuero cabelludo','Sin enjuague — absorción directa']
        },
        {
          name:'Tónico Capilar 7 Aceites', price:'$20.000', icon:'✨',
          image:'img/Tonicos-Capilares/tonico%20capilar%202.jpeg',
          desc:'Sinergia de 7 aceites naturales que nutren, fortalecen y revitalizan el cabello desde la raíz. Los lípidos de los aceites vegetales son responsables del brillo y la salud capilar. Aplicación directa sin enjuague.',
          benefits:['7 aceites naturales en sinergia','Nutrición profunda y brillo intenso','Fortalece la fibra y reduce el quiebre','Revitaliza el cuero cabelludo sin residuos']
        },
        {
          name:'Tónico Bomba', price:'$25.000', icon:'💣',
          image:'img/Tonicos-Capilares/tonico%20capilar%203.jpeg',
          desc:'Crecimiento extremo y reparador en una sola fórmula. El tónico más potente de la línea — activa el ciclo capilar, aumenta el flujo sanguíneo al folículo y repara la fibra desde la primera aplicación. Sin enjuague.',
          benefits:['Crecimiento extremo y reparación simultánea','Activa el ciclo capilar completo','Aumenta el flujo sanguíneo al folículo','Resultados visibles desde la primera semana']
        },
      ]
    },
    {
      name:'Gel Fijador Hidratante', tag:'Fijador', price:'$13.000', size:'300 ml', icon:'✨',
      bg:'linear-gradient(145deg,#fff8e1,#ffecb3)',
      images:['img/Gel/Gel%201.jpeg'],
      desc:'El gel de linaza contiene mucílagos que recubren la fibra capilar creando una película protectora. Aporta Omega-3, antioxidantes y Vitamina E que protegen contra el daño oxidativo mientras define y fija sin efecto cartón.',
      benefits:['Define rizos sin efecto plástico ni residuos','Hidratación sin peso con Omega-3 y Vitamina E','Protección antifrizz y antioxidante','Fijación flexible y duradera todo el día']
    },
    {
      name:'Tratamiento Capilar', tag:'Reparación', price:'$23.000', size:'250 ml', icon:'🌸',
      bg:'linear-gradient(145deg,#fce4ec,#ffcdd2)',
      images:['img/Tratamientos/tratamiento%201.jpeg'],
      desc:'La proteína de quinoa contiene 9 aminoácidos esenciales que reparan las hebras dañadas, mientras la sábila aporta enzimas proteolíticas, vitaminas y minerales que nutren y protegen. Mascarilla de 15 minutos de acción profunda.',
      benefits:['Repara hebras dañadas por calor o química','9 aminoácidos esenciales de la quinoa','Nutre y protege con enzimas de sábila','Resultados visibles desde la 1ª aplicación']
    },
    {
      name:'Kit Rutina Completa', tag:'Más vendido', size:'500 ml',
      bg:'linear-gradient(145deg,#fce4ec,#e8a0b5)',
      variants:[
        {
          name:'Kits Linaza', price:'$75.000', icon:'✨',
          image:'img/Kits/Kit1.jpeg',
          desc:'Kit de la línea Linaza con varios productos que definen, hidratan y fortalecen el cabello. El gel de linaza aporta Omega-3 y mucílagos que protegen la fibra capilar sin efecto cartón ni residuos.',
          benefits:['Define rizos y ondas sin efecto plástico','Hidratación sin peso con Omega-3','Protección antifrizz duradera','Apto para cabello rizado y muy rizado']
        },
        {
          name:'Kits Nutritivo', price:'$130.000', icon:'⭐',
          image:'img/Kits/Kit2.jpeg',
          desc:'Kit de la línea Nutritiva con varios productos de nutrición profunda. Sus aminoácidos esenciales reparan y fortalecen la fibra capilar debilitada por calor, tintes o procesos químicos.',
          benefits:['Nutrición profunda con aminoácidos esenciales','Repara cabello dañado por calor o química','Fortalece y devuelve brillo natural','Compatible con cabello teñido o procesado']
        },
        {
          name:'Kits Romero', price:'$60.000', icon:'🌿',
          image:'img/Kits/Kit3.jpeg',
          desc:'Kit de la línea Romero con varios productos que estimulan el crecimiento y reducen la caída. El romero mejora la circulación del cuero cabelludo con resultados clínicamente respaldados.',
          benefits:['Estimula el crecimiento capilar','Reduce la caída desde la primera semana','Limpieza profunda e hidratación balanceada','Ingredientes 100% naturales']
        },
        {
          name:'Kit Capilar Romero Premium', price:'$90.000', icon:'👑',
          image:'img/Kits/Kits4.jpeg',
          desc:'El kit más completo de la línea. Incluye Shampoo Romero, Acondicionador Romero, Tónico Capilar y Tratamiento Capilar — todo lo que necesitas para una rutina capilar integral en un solo kit.',
          benefits:['Incluye Shampoo Romero + Acondicionador Romero','Más Tónico Capilar + Tratamiento Capilar','Rutina completa de crecimiento y reparación','El kit más completo y valorado de la línea']
        },
        {
          name:'Kits Cebolla', price:'$64.000', icon:'🧅',
          image:'img/Kits/kit5.jpeg',
          desc:'Kit de la línea Cebolla con varios productos ricos en compuestos sulfurados que estimulan la queratina natural. Estudios clínicos demuestran que el extracto de cebolla reduce la caída en pocas semanas.',
          benefits:['Estimula la producción de queratina natural','Frena la caída con compuestos sulfurados','Aporta densidad y volumen al cabello','Resultados visibles en pocas semanas']
        },
        {
          name:'Kits Aguacate', price:'$64.000', icon:'🥑',
          image:'img/Kits/kit6.jpeg',
          desc:'Kit de la línea Aguacate con varios productos ricos en Omega-9, vitaminas A, B, C y E. Sus ácidos grasos penetran la fibra capilar restaurando la barrera lipídica del cabello más seco y poroso.',
          benefits:['Hidratación profunda con Omega-9 y vitaminas','Restaura la barrera lipídica capilar','Controla el frizz y encrespamiento','Ideal para cabello seco, poroso o muy dañado']
        },
      ]
    },
    {
      name:'Crema para Peinar', tag:'Peinado', price:'$28.000', size:'200 ml', icon:'💆',
      bg:'linear-gradient(145deg,#fef9e7,#fde68a)',
      images:['img/Crema%20para%20Peinar/crema%20de%20peinar%201.jpeg'],
      desc:'Crema para peinar que define y moldea sin rigidez ni residuos. Facilita el desenredo, aporta suavidad y control desde la raíz hasta las puntas. Apta para todo tipo de cabello.',
      benefits:['Define y moldea sin efecto cartón','Facilita el desenredo y peinado','Hidratación sin residuos ni pesadez','Apta para cabello liso, ondulado y rizado']
    },
    {
      name:'Bio Repolarizador', tag:'Reparador', price:'$32.000', size:'120 ml', icon:'💎',
      bg:'linear-gradient(145deg,#e0f7fa,#b2ebf2)',
      images:['img/BIO%20REPOLARIZADOR/BIO%20REPOLARIZADOR%201.jpeg'],
      desc:'Tratamiento intensivo que aplica keratina, colágeno y aceites para restaurar la fibra desde adentro. Sella la cutícula, equilibra la carga electrostática del cabello y reduce significativamente el frizz. Duración 2-4 semanas.',
      benefits:['Restaura la fibra capilar desde el interior','Sella la cutícula y reduce el frizz','Recupera suavidad, fuerza y brillo','Ideal para cabello dañado por tintes o calor']
    },
    {
      name:'Pree Poo', tag:'Pre-lavado', price:'$25.000', size:'250 ml', icon:'🌱',
      bg:'linear-gradient(145deg,#f1f8e9,#dcedc8)',
      images:['img/PREE%20PO/PREE%20PO.jpeg'],
      desc:'Tratamiento que se aplica antes del shampoo para crear una barrera protectora que minimiza el daño del lavado. Mantiene la humedad, aumenta el brillo, mejora la porosidad y reduce el frizz. Especialmente recomendado para cabello rizado, seco o dañado.',
      benefits:['Protege contra la sequedad del champú','Aumenta brillo, suavidad y elasticidad','Mejora la porosidad y reduce el frizz','Especialmente recomendado para rizos y cabello seco']
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

      document.getElementById('modalTag').textContent = p.tag;

      const imgWrap = document.getElementById('modalImg');
      clearInterval(carouselInterval);
      carouselInterval = null;

      const hasVariants = Array.isArray(p.variants) && p.variants.length > 0;
      const imgs = hasVariants ? p.variants.map(v => v.image) : (p.images || []);
      const multi = imgs.length > 1;

      imgWrap.style.background = imgs.length > 0 ? '#fff' : p.bg;
      imgWrap.style.position   = 'relative';
      imgWrap.style.fontSize   = '';

      imgWrap.innerHTML =
        '<div class="modal-carousel">'
        + '<div class="mc-track">'
        + imgs.map((src, i) => `<div class="mc-slide${i === 0 ? ' active' : ''}"><img src="${src}" alt="foto ${i + 1}"></div>`).join('')
        + '</div>'
        + (multi
            ? `<button class="mc-btn mc-prev" aria-label="Anterior">${svgPrev}</button>`
              + `<button class="mc-btn mc-next" aria-label="Siguiente">${svgNext}</button>`
              + '<div class="mc-dots">'
              + imgs.map((_, i) => `<button class="mc-dot${i === 0 ? ' active' : ''}" data-slide="${i}" aria-label="Foto ${i + 1}"></button>`).join('')
              + '</div>'
            : '')
        + '</div>';

      function updateInfo(info) {
        const icon = info.icon ? `<span class="modal-icon">${info.icon}</span>` : '';
        document.getElementById('modalTitle').innerHTML = info.name + icon;
        document.getElementById('modalDesc').textContent = info.desc;
        document.getElementById('modalBenefits').innerHTML = info.benefits.map(b => `<li>${b}</li>`).join('');
        document.getElementById('modalPrice').innerHTML = `<span style="font-size:1.6rem;font-weight:700;color:var(--pink-deep)">${info.price}</span>`;
        const waMsg = encodeURIComponent(`🌿 *Alma Botánica* — Rosa Pérez\n\nHola Rosa! Me interesa ${info.name}. ¿Me puedes contar más detalles y disponibilidad?`);
        document.getElementById('modalWa').href = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;
      }

      updateInfo(hasVariants ? p.variants[0] : p);

      // Brillo dorado en el modal solo para Kits
      const modalBox = document.querySelector('.modal-box');
      const kitWrap  = document.getElementById('kitModalWrap');
      if(idx === 5){ modalBox?.classList.add('kit-modal'); kitWrap?.classList.add('kit-active'); }
      else{ modalBox?.classList.remove('kit-modal'); kitWrap?.classList.remove('kit-active'); }

      if (multi) {
        let cur = 0;
        const slides  = imgWrap.querySelectorAll('.mc-slide');
        const dotBtns = imgWrap.querySelectorAll('.mc-dot');
        const carousel = imgWrap.querySelector('.modal-carousel');
        const total    = slides.length;

        function goTo(n) {
          slides[cur].classList.remove('active');
          cur = ((n % total) + total) % total;
          slides[cur].classList.add('active');
          dotBtns.forEach((d, i) => d.classList.toggle('active', i === cur));
          if (hasVariants) updateInfo(p.variants[cur]);
        }

        imgWrap.querySelector('.mc-prev').addEventListener('click', e => { e.stopPropagation(); goTo(cur - 1); });
        imgWrap.querySelector('.mc-next').addEventListener('click', e => { e.stopPropagation(); goTo(cur + 1); });
        dotBtns.forEach(d => d.addEventListener('click', e => { e.stopPropagation(); goTo(+d.dataset.slide); }));

        // Sin auto-play en modal — solo navegación manual
        let mcTouchX = 0;
        carousel.addEventListener('touchstart', e => { mcTouchX = e.touches[0].clientX; }, {passive:true});
        carousel.addEventListener('touchend', e => {
          const diff = mcTouchX - e.changedTouches[0].clientX;
          if(Math.abs(diff) > 35) goTo(diff > 0 ? cur + 1 : cur - 1);
        }, {passive:true});
      }

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

  // LIGHTBOX
  (function(){
    const overlay  = document.getElementById('lbOverlay');
    const lbImg    = document.getElementById('lbImg');
    const lbClose  = document.getElementById('lbClose');
    const lbZoomIn = document.getElementById('lbZoomIn');
    const lbZoomOut= document.getElementById('lbZoomOut');
    const lbWrap   = document.getElementById('lbImgWrap');
    const lbPrev   = document.getElementById('lbPrev');
    const lbNext   = document.getElementById('lbNext');
    if(!overlay) return;

    let scale = 1;
    let imgs  = [];
    let cur   = 0;

    function updateNav(){
      const multi = imgs.length > 1;
      lbPrev.hidden = !multi;
      lbNext.hidden = !multi;
    }

    function showImg(idx){
      cur = ((idx % imgs.length) + imgs.length) % imgs.length;
      scale = 1;
      lbImg.src = imgs[cur].src;
      lbImg.alt = imgs[cur].alt || '';
      lbImg.style.transform = 'scale(1)';
      lbImg.style.cursor = 'zoom-in';
    }

    function openLb(allImgs, startIdx){
      imgs = allImgs;
      updateNav();
      showImg(startIdx);
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLb(){
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    function setZoom(val){
      scale = Math.min(3, Math.max(0.5, val));
      lbImg.style.transform = `scale(${scale})`;
      lbImg.style.cursor = scale >= 3 ? 'default' : 'zoom-in';
    }

    // Abrir al hacer clic en imagen — solo si el modal ya está abierto
    document.getElementById('modalImg')?.addEventListener('click', e => {
      if(!document.getElementById('productModal')?.classList.contains('open')) return;
      if(e.target.tagName !== 'IMG') return;
      const allImgs = Array.from(document.querySelectorAll('#modalImg .mc-slide img'));
      const idx = allImgs.indexOf(e.target);
      openLb(allImgs.length ? allImgs : [e.target], Math.max(0, idx));
    });

    // Navegar
    lbPrev.addEventListener('click', e => { e.stopPropagation(); showImg(cur - 1); });
    lbNext.addEventListener('click', e => { e.stopPropagation(); showImg(cur + 1); });

    // Cerrar
    lbClose.addEventListener('click', closeLb);
    lbWrap.addEventListener('click', e => { if(e.target === lbWrap) closeLb(); });
    overlay.addEventListener('click', e => { if(e.target === overlay) closeLb(); });
    document.addEventListener('keydown', e => {
      if(!overlay.classList.contains('open')) return;
      if(e.key === 'Escape') closeLb();
      if(e.key === 'ArrowLeft')  { e.preventDefault(); showImg(cur - 1); }
      if(e.key === 'ArrowRight') { e.preventDefault(); showImg(cur + 1); }
    });

    // Clic en imagen → zoom
    lbImg.addEventListener('click', e => { e.stopPropagation(); setZoom(scale + 0.5); });

    // Botones de zoom
    lbZoomIn.addEventListener('click',  e => { e.stopPropagation(); setZoom(scale + 0.5); });
    lbZoomOut.addEventListener('click', e => { e.stopPropagation(); setZoom(scale - 0.5); });

    // Swipe horizontal para navegar, vertical para cerrar
    let tx = 0, ty = 0;
    overlay.addEventListener('touchstart', e => {
      tx = e.touches[0].clientX;
      ty = e.touches[0].clientY;
    }, {passive:true});
    overlay.addEventListener('touchend', e => {
      const dx = tx - e.changedTouches[0].clientX;
      const dy = ty - e.changedTouches[0].clientY;
      if(Math.abs(dy) > 80 && Math.abs(dy) > Math.abs(dx)) { closeLb(); return; }
      if(Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) showImg(dx > 0 ? cur + 1 : cur - 1);
    }, {passive:true});
  })();

  function highlight(id){
    const el = document.getElementById(id);
    if(!el) return;
    el.classList.add('err');
    el.focus();
    setTimeout(() => el.classList.remove('err'), 800);
  }

})();
