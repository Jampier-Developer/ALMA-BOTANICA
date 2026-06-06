(function () {
  'use strict';

  const WA_NUMBER  = '573135487027';
  const STORAGE_KEY = 'botanica_cart_v1';

  /* ── ESTADO ─────────────────────────────────────── */
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch (_) { cart = []; }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (_) {}
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  /* ── API PÚBLICA ─────────────────────────────────── */
  window.cartAddItem = function (item) {
    const existing = cart.find(c => c.name === item.name);
    if (existing) {
      existing.qty = Math.min(existing.qty + 1, 99);
    } else {
      cart.push({
        id: uid(), qty: 1,
        name:     item.name     || '',
        price:    item.price    || '',
        priceNum: item.priceNum || 0,
        image:    item.image    || '',
        tag:      item.tag      || '',
      });
    }
    save();
    updateBadge();
    punchBadge();
    showAddedToast(item.name);
  };

  window.cartGetCount = function () {
    return cart.reduce((s, i) => s + i.qty, 0);
  };

  /* ── BADGE ───────────────────────────────────────── */
  function updateBadge() {
    const n  = window.cartGetCount();
    const el = document.getElementById('cartCount');
    if (!el) return;
    el.textContent = n > 99 ? '99+' : String(n);
    el.hidden = (n === 0);
  }

  function punchBadge() {
    const btn = document.getElementById('cartBtn');
    if (!btn) return;
    btn.classList.remove('cart-btn-pop');
    requestAnimationFrame(() => requestAnimationFrame(() => btn.classList.add('cart-btn-pop')));
    setTimeout(() => btn.classList.remove('cart-btn-pop'), 500);
  }

  /* ── TOAST ───────────────────────────────────────── */
  function showAddedToast(name) {
    const toast = document.getElementById('toast');
    const ico   = document.getElementById('toast-ico');
    const msg   = document.getElementById('toast-msg');
    if (!toast || !msg) return;
    if (ico) ico.textContent = '🛒';
    msg.textContent = name + ' agregado al carrito';
    toast.classList.add('vis');
    clearTimeout(window._cartToastT);
    window._cartToastT = setTimeout(() => toast.classList.remove('vis'), 3200);
  }

  /* ── UTILIDADES ──────────────────────────────────── */
  function getTotal() {
    return cart.reduce((s, i) => s + i.priceNum * i.qty, 0);
  }

  function fmtCOP(n) {
    if (!n) return '';
    return '$' + Number(n).toLocaleString('es-CO');
  }

  /* ── RENDER ──────────────────────────────────────── */
  function renderCart() {
    const body   = document.getElementById('cartBody');
    const footer = document.getElementById('cartFooter');
    if (!body || !footer) return;
    const hCount = document.getElementById('cartHeaderCount');
    const n = window.cartGetCount();
    if (hCount) hCount.textContent = n > 0 ? `${n} ${n === 1 ? 'producto' : 'productos'}` : '';

    if (cart.length === 0) {
      body.innerHTML = `
        <div class="cart-empty">
          <div class="ce-icon">🛒</div>
          <h3 class="ce-title">Tu carrito está vacío</h3>
          <p class="ce-desc">Explora nuestros productos y añade los que más te gusten.</p>
          <button class="btn btn-primary" id="cartGoShop">Ver productos</button>
        </div>`;
      footer.innerHTML = '';
      document.getElementById('cartGoShop')?.addEventListener('click', () => {
        closeCart();
        document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }

    body.innerHTML = cart.map(item => `
      <article class="cart-item" data-id="${item.id}">
        <div class="ci-img-wrap">
          ${item.image
            ? `<img src="${item.image}" alt="${item.name}" class="ci-img" loading="lazy">`
            : `<div class="ci-img-ph">🌿</div>`}
        </div>
        <div class="ci-info">
          ${item.tag ? `<span class="ci-tag">${item.tag}</span>` : ''}
          <p class="ci-name">${item.name}</p>
          <p class="ci-unit">${item.price}</p>
          <div class="ci-qty-row">
            <button class="ci-q ci-dec" data-id="${item.id}" aria-label="Menos">−</button>
            <span class="ci-qty-val">${item.qty}</span>
            <button class="ci-q ci-inc" data-id="${item.id}" aria-label="Más">+</button>
          </div>
        </div>
        <div class="ci-right">
          ${item.priceNum > 0 ? `<p class="ci-sub">${fmtCOP(item.priceNum * item.qty)}</p>` : ''}
          <button class="ci-rm" data-id="${item.id}" aria-label="Eliminar ${item.name}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
        </div>
      </article>`).join('');

    /* eventos items */
    body.querySelectorAll('.ci-dec').forEach(b => b.addEventListener('click', () => changeQty(b.dataset.id, -1)));
    body.querySelectorAll('.ci-inc').forEach(b => b.addEventListener('click', () => changeQty(b.dataset.id, +1)));
    body.querySelectorAll('.ci-rm' ).forEach(b => b.addEventListener('click', () => removeItem(b.dataset.id)));

    /* footer */
    const total = getTotal();
    const count = window.cartGetCount();
    footer.innerHTML = `
      <div class="cart-summary">
        <div class="cs-row">
          <span>Subtotal <span class="cs-count">(${count} ${count === 1 ? 'producto' : 'productos'})</span></span>
          ${total > 0 ? `<strong class="cs-total">${fmtCOP(total)}</strong>` : ''}
        </div>
        <p class="cs-note">🌿 Rosa confirmará disponibilidad y precio final por WhatsApp.</p>
      </div>
      <button class="btn btn-wa cart-wa-btn" id="cartSendWa">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
        Enviar pedido por WhatsApp
      </button>
      <div class="cart-meta-row">
        <button class="cart-clear-btn" id="cartClear">Vaciar carrito</button>
        <button class="cart-keep-btn" id="cartKeepShop">Seguir viendo</button>
      </div>`;

    document.getElementById('cartSendWa')?.addEventListener('click', sendToWhatsApp);
    document.getElementById('cartClear')?.addEventListener('click', () => {
      if (!confirm('¿Seguro que quieres vaciar el carrito?')) return;
      cart = []; save(); updateBadge(); renderCart();
    });
    document.getElementById('cartKeepShop')?.addEventListener('click', () => {
      closeCart();
      document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ── OPERACIONES ─────────────────────────────────── */
  function changeQty(id, delta) {
    const item = cart.find(c => c.id === id);
    if (!item) return;
    item.qty = Math.max(1, Math.min(99, item.qty + delta));
    save(); updateBadge(); renderCart();
  }

  function removeItem(id) {
    cart = cart.filter(c => c.id !== id);
    save(); updateBadge(); renderCart();
  }

  /* ── WHATSAPP ─────────────────────────────────────── */
  function sendToWhatsApp() {
    if (!cart.length) return;
    const lines = cart.map(i => {
      const qty     = i.qty > 1 ? ` × ${i.qty}` : '';
      const sub     = i.priceNum > 0 && i.qty > 1 ? ` (= ${fmtCOP(i.priceNum * i.qty)})` : '';
      return `  ♦ *${i.name}*${qty} — ${i.price}${sub}`;
    });
    const total    = getTotal();
    const totalLine = total > 0 ? `\n💰 *Total estimado: ${fmtCOP(total)}*` : '';
    const msg = [
      '¡Hola Rosa! 🌿 Me interesan estos productos de *Alma Botánica*:',
      '',
      '🛒 *Mi pedido:*',
      ...lines,
      totalLine,
      '',
      '¿Están disponibles? ¿Me confirmas disponibilidad y formas de pago? ¡Muchas gracias! 😊',
    ].join('\n');
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  }

  /* ── DRAWER ──────────────────────────────────────── */
  function openCart() {
    const ov = document.getElementById('cartOverlay');
    if (!ov) return;
    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderCart();
  }

  function closeCart() {
    const ov = document.getElementById('cartOverlay');
    if (!ov) return;
    ov.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* Exponer para forms.js */
  window._cartOpen  = openCart;
  window._cartClose = closeCart;

  /* ── INIT ────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    updateBadge();

    document.getElementById('cartBtn')?.addEventListener('click', openCart);
    document.getElementById('cartClose')?.addEventListener('click', closeCart);
    document.getElementById('cartOverlay')?.addEventListener('click', e => {
      if (e.target.id === 'cartOverlay') closeCart();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && document.getElementById('cartOverlay')?.classList.contains('open')) closeCart();
    });
  });

})();
