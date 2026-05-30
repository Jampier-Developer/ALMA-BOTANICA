
(function () {
  // ─── PALETA (idéntica al sitio web) ──────────────────────────────────────
  const C = {
    pinkDeep:  [139,  45,  69],
    pink:      [212,  96, 122],
    pinkPale:  [252, 228, 236],
    pinkSoft:  [255, 240, 244],
    gold:      [201, 161,  90],
    goldLight: [232, 201, 122],
    cream:     [255, 248, 245],
    white:     [255, 255, 255],
    text:      [ 45,  21,  32],
    textMid:   [122,  79,  95],
    teal:      [ 56, 117, 100],
    border:    [240, 218, 226],
    dark:      [ 30,  12,  22],
  };

  const PRODUCTS = [
    {
      name: 'Shampoo Romero',
      tag: 'Limpieza',
      price: '$28.000',
      size: '500 ml',
      accentRgb: [212, 96, 122],
      desc: 'Limpieza profunda que estimula el crecimiento capilar desde el primer lavado. Formulado sin sulfatos agresivos para respetar el cuero cabelludo mientras elimina impurezas y exceso de sebo.',
      benefits: ['Estimula la circulación del cuero cabelludo', 'Reduce la caída desde la primera semana', 'Apto para uso diario en todo tipo de cabello'],
    },
    {
      name: 'Acondicionador Romero',
      tag: 'Nutrición',
      price: '$28.000',
      size: '500 ml',
      accentRgb: [180, 110, 160],
      desc: 'Hidratación profunda sin residuos pesados. Sella la cutícula para un brillo duradero y suavidad inmediata. Compatible con cabellos rizados, teñidos y muy procesados.',
      benefits: ['Hidratación profunda sin residuos', 'Sella la cutícula para más brillo', 'Desenreda sin dañar y efecto antiestático'],
    },
    {
      name: 'Tónico Capilar',
      tag: 'Tratamiento',
      price: '$32.000',
      size: 'Romero activo',
      accentRgb: [56, 117, 100],
      desc: 'Aplicación directa en raíces 2-4 veces por semana. El romero concentrado activa los folículos pilosos para estimular el crecimiento y reducir la caída estacional. No requiere enjuague.',
      benefits: ['Activa folículos inactivos', 'Frena la caída estacional', 'Estimula el crecimiento capilar'],
    },
    {
      name: 'Gel Fijador Hidratante',
      tag: 'Styling',
      price: '$25.000',
      size: 'Linaza + Vit E',
      accentRgb: [201, 161, 90],
      desc: 'Define rizos y ondas con fijación duradera sin el efecto cartón. La linaza aporta elasticidad y la Vitamina E protege el cabello mientras mantiene la hidratación todo el día.',
      benefits: ['Define rizos sin efecto plástico', 'Hidrata mientras fija', 'Protección antifrizz todo el día'],
    },
    {
      name: 'Tratamiento Capilar',
      tag: 'Reparación',
      price: '$35.000',
      size: 'Quinoa · Sábila',
      accentRgb: [232, 130, 140],
      desc: 'Mascarilla intensiva para cabellos debilitados por calor, tintura o procesos químicos. La quinoa repara la fibra capilar mientras la sábila hidrata y el romero estimula.',
      benefits: ['Repara daño por calor y química', 'Hidratación profunda en 15 minutos', 'Fortalece la fibra capilar'],
    },
  ];

  const KITS = [
    { name: 'Kit Romero',    price: '$60.000',  desc: 'Shampoo + Acondicionador Romero', color: C.pinkDeep },
    { name: 'Kit Linaza',    price: '$75.000',  desc: 'Shampoo + Acondicionador + Gel Linaza', color: C.teal },
    { name: 'Kit Nutritivo', price: '$130.000', desc: 'Línea completa nutritiva capilar', color: [100, 60, 100] },
  ];

  // ─── HELPERS ──────────────────────────────────────────────────────────────
  function setFill(doc, rgb) { doc.setFillColor(rgb[0], rgb[1], rgb[2]); }
  function setDraw(doc, rgb) { doc.setDrawColor(rgb[0], rgb[1], rgb[2]); }
  function setTxt(doc, rgb)  { doc.setTextColor(rgb[0], rgb[1], rgb[2]); }

  function rect(doc, x, y, w, h, rgb) {
    setFill(doc, rgb);
    doc.rect(x, y, w, h, 'F');
  }

  function line(doc, x1, y1, x2, y2, rgb, lw) {
    setDraw(doc, rgb);
    doc.setLineWidth(lw || 0.5);
    doc.line(x1, y1, x2, y2);
  }

  async function loadImg(src, timeout = 3500) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => res(img);
      img.onerror = rej;
      setTimeout(rej, timeout);
      img.src = src;
    });
  }

  function drawHeader(doc, W) {
    // Fondo header degradado
    rect(doc, 0, 0, W, 16, C.pinkDeep);
    setFill(doc, [160, 55, 80]);
    doc.rect(0, 0, W * 0.4, 16, 'F');

    // Línea dorada
    setDraw(doc, C.gold);
    doc.setLineWidth(0.7);
    doc.line(0, 16, W, 16);

    setTxt(doc, C.white);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.text('ALMA BOTÁNICA', 14, 10);

    setTxt(doc, C.goldLight);
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'italic');
    doc.text('Rosa Pérez · Cosmética Natural', W - 14, 9, { align: 'right' });

    setTxt(doc, [255, 210, 225]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.text('✦ Natural  ✦ Sin parabenos  ✦ Sin sulfatos', W - 14, 14, { align: 'right' });
  }

  function drawFooter(doc, W, H, pageNum, total) {
    rect(doc, 0, H - 16, W, 16, C.dark);
    setDraw(doc, C.gold);
    doc.setLineWidth(0.5);
    doc.line(0, H - 16, W, H - 16);

    setTxt(doc, C.gold);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text('📱 WhatsApp: +57 313 548 7027', 14, H - 9);

    setTxt(doc, [200, 180, 190]);
    doc.setFontSize(6);
    doc.setFont('helvetica', 'normal');
    doc.text('wa.me/573135487027', 14, H - 4.5);

    setTxt(doc, C.goldLight);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text(`${pageNum} / ${total}`, W - 14, H - 9, { align: 'right' });

    setTxt(doc, [200, 180, 190]);
    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'normal');
    doc.text('almabotanica.com', W - 14, H - 4.5, { align: 'right' });
  }

  // Tarjeta de producto horizontal (ancho completo)
  function drawProductCardH(doc, p, x, y, cardW) {
    const cardH = 52;

    // Sombra
    setFill(doc, [230, 210, 218]);
    doc.roundedRect(x + 1.2, y + 1.2, cardW, cardH, 4, 4, 'F');

    // Fondo blanco
    setFill(doc, C.white);
    doc.roundedRect(x, y, cardW, cardH, 4, 4, 'F');

    // Borde
    setDraw(doc, C.border);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, y, cardW, cardH, 4, 4, 'S');

    // Franja de color izquierda
    setFill(doc, p.accentRgb);
    doc.rect(x, y, 7, cardH, 'F');
    // Esquinas redondeadas en la franja izquierda
    setFill(doc, C.white);
    doc.rect(x + 4, y, 4, cardH, 'F');
    setFill(doc, p.accentRgb);
    doc.roundedRect(x, y, 7, cardH, 4, 4, 'F');
    setFill(doc, C.white);
    doc.rect(x + 4, y, 4, cardH, 'F');

    // TAG pill
    setFill(doc, p.accentRgb);
    doc.roundedRect(x + 12, y + 7, 26, 7, 3.5, 3.5, 'F');
    setTxt(doc, C.white);
    doc.setFontSize(5.8);
    doc.setFont('helvetica', 'bold');
    doc.text(p.tag.toUpperCase(), x + 25, y + 12, { align: 'center' });

    // Nombre producto
    setTxt(doc, C.text);
    doc.setFontSize(13.5);
    doc.setFont('helvetica', 'bold');
    doc.text(p.name, x + 12, y + 23);

    // Tamaño
    setTxt(doc, C.textMid);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(p.size, x + 12, y + 30);

    // Descripción
    setTxt(doc, C.text);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    const descLines = doc.splitTextToSize(p.desc, 95);
    doc.text(descLines.slice(0, 3), x + 12, y + 37);

    // Separador vertical
    line(doc, x + cardW * 0.64, y + 8, x + cardW * 0.64, y + cardH - 8, C.border, 0.3);

    // BENEFICIOS — sección derecha
    const bx = x + cardW * 0.66;
    setTxt(doc, C.gold);
    doc.setFontSize(6);
    doc.setFont('helvetica', 'bold');
    doc.text('✦  BENEFICIOS', bx, y + 13);

    setTxt(doc, C.text);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    p.benefits.forEach((b, i) => {
      setFill(doc, p.accentRgb);
      doc.circle(bx + 1.5, y + 21 + i * 9 - 1.5, 1.2, 'F');
      setTxt(doc, C.text);
      const bLines = doc.splitTextToSize(b, cardW * 0.32);
      doc.text(bLines[0], bx + 6, y + 21 + i * 9);
    });

    // PRECIO pill (abajo derecha)
    setFill(doc, p.accentRgb);
    doc.roundedRect(x + cardW - 38, y + cardH - 18, 34, 14, 4, 4, 'F');
    setTxt(doc, C.white);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(p.price, x + cardW - 21, y + cardH - 8, { align: 'center' });
  }

  // ─── GENERADOR PRINCIPAL ──────────────────────────────────────────────────
  async function generarCatalogoPDF(nombreCliente) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const W = 210, H = 297;
    const TOTAL_PAGES = 4;
    const CARD_W = W - 28;

    // ── PÁGINA 1: PORTADA ──────────────────────────────────────────────────
    rect(doc, 0, 0, W, H, C.cream);

    // Capas de fondo
    setFill(doc, [252, 236, 242]);
    doc.rect(0, 0, W, H * 0.55, 'F');
    setFill(doc, C.pinkDeep);
    doc.rect(0, H * 0.55, W, H * 0.45, 'F');

    // Círculos decorativos superiores
    setFill(doc, [248, 222, 232]);
    doc.circle(W - 10, 20, 55, 'F');
    setFill(doc, [252, 243, 215]);
    doc.circle(15, 140, 40, 'F');
    setFill(doc, [255, 240, 248]);
    doc.circle(W * 0.5, 110, 85, 'F');

    // Círculos decorativos inferiores
    setFill(doc, [160, 50, 75]);
    doc.circle(W - 15, H - 20, 50, 'F');
    setFill(doc, [100, 30, 50]);
    doc.circle(15, H - 30, 35, 'F');

    // Logo grande
    let logoLoaded = false;
    try {
      const logoImg = await loadImg('img/LOGO - ALMA BOTANICA.jpg');
      const logoSize = 78;
      doc.addImage(logoImg, 'JPEG', (W - logoSize) / 2, 22, logoSize, logoSize);
      logoLoaded = true;
    } catch {
      setFill(doc, C.pinkDeep);
      doc.circle(W / 2, 62, 38, 'F');
      setDraw(doc, C.gold);
      doc.setLineWidth(1);
      doc.circle(W / 2, 62, 35, 'S');
      setTxt(doc, C.white);
      doc.setFontSize(26);
      doc.setFont('helvetica', 'bold');
      doc.text('AB', W / 2, 69, { align: 'center' });
    }

    // Líneas doradas
    line(doc, 30, 108, W - 30, 108, C.gold, 0.9);
    line(doc, 50, 111, W - 50, 111, C.goldLight, 0.4);

    // Nombre marca
    setTxt(doc, C.pinkDeep);
    doc.setFontSize(30);
    doc.setFont('helvetica', 'bold');
    doc.text('ALMA BOTÁNICA', W / 2, 124, { align: 'center' });

    // "Rosa Pérez"
    setTxt(doc, C.gold);
    doc.setFontSize(17);
    doc.setFont('helvetica', 'italic');
    doc.text('Rosa Pérez', W / 2, 136, { align: 'center' });

    // Subtítulo
    setTxt(doc, C.textMid);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('COSMÉTICA NATURAL · CUIDADO CAPILAR', W / 2, 145, { align: 'center' });

    // Barra teal con lema
    setFill(doc, C.teal);
    doc.roundedRect(25, 152, W - 50, 13, 6, 6, 'F');
    setTxt(doc, C.white);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('HUMECTA  ✦  NUTRE  ✦  FORTALECE  ✦  RESTAURA', W / 2, 160.5, { align: 'center' });

    // Badges de confianza
    const badges = ['🌿 100% Natural', '✓ Sin parabenos', '✓ Sin sulfatos', '❀ Artesanal'];
    badges.forEach((b, i) => {
      const bx = 20 + i * 43;
      setFill(doc, C.white);
      doc.roundedRect(bx, 170, 38, 10, 5, 5, 'F');
      setTxt(doc, C.pinkDeep);
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'bold');
      doc.text(b, bx + 19, 176.5, { align: 'center' });
    });

    // Caja saludo personalizado
    const saludoY = 187;
    setFill(doc, [255, 255, 255]);
    doc.roundedRect(18, saludoY, W - 36, 52, 5, 5, 'F');
    setDraw(doc, C.gold);
    doc.setLineWidth(0.6);
    doc.roundedRect(18, saludoY, W - 36, 52, 5, 5, 'S');

    // Línea decorativa superior en la caja
    setFill(doc, C.pinkDeep);
    doc.roundedRect(18, saludoY, W - 36, 8, 5, 5, 'F');
    rect(doc, 18, saludoY + 4, W - 36, 4, C.pinkDeep);
    setTxt(doc, C.white);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text('✦  CATÁLOGO EXCLUSIVO  ✦', W / 2, saludoY + 5.5, { align: 'center' });

    const saludo = nombreCliente ? `¡Hola ${nombreCliente}!` : '¡Bienvenida!';
    setTxt(doc, C.pinkDeep);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(saludo, W / 2, saludoY + 18, { align: 'center' });

    setTxt(doc, C.text);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    const msg = 'Preparamos este catálogo especialmente para ti.\nDescubre nuestra línea de productos botánicos formulados\ncon los mejores ingredientes naturales para tu cabello.';
    doc.text(doc.splitTextToSize(msg, W - 55), W / 2, saludoY + 27, { align: 'center' });

    setTxt(doc, C.gold);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('"Tu cabello merece lo natural, lo auténtico, lo mejor."', W / 2, saludoY + 46, { align: 'center' });

    // Footer portada
    setTxt(doc, [220, 180, 200]);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text('📱 +57 313 548 7027  ·  wa.me/573135487027', W / 2, H - 8, { align: 'center' });
    setTxt(doc, [160, 120, 140]);
    doc.setFontSize(6);
    doc.text('1 / 4', W / 2, H - 3.5, { align: 'center' });

    // ── PÁGINA 2: PRODUCTOS 1-3 ────────────────────────────────────────────
    doc.addPage();
    rect(doc, 0, 0, W, H, C.cream);
    drawHeader(doc, W);

    // Título sección
    setTxt(doc, C.pinkDeep);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Nuestros Productos', 14, 28);
    setTxt(doc, C.gold);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('Línea Romero · Fórmulas botánicas artesanales', 14, 35);
    line(doc, 14, 38, W - 14, 38, C.pinkPale, 0.5);

    // Foto principal (Kit2 - Romero)
    let img2Loaded = false;
    try {
      const kitImg = await loadImg('img/Kit2.jpeg');
      // Banner foto a lo ancho
      doc.addImage(kitImg, 'JPEG', 14, 41, CARD_W, 52, '', 'FAST');
      // Overlay oscuro para texto
      setFill(doc, [45, 21, 32]);
      doc.setGState(new doc.GState({ opacity: 0.35 }));
      rect(doc, 14, 41, CARD_W, 52, [45, 21, 32]);
      doc.setGState(new doc.GState({ opacity: 1 }));
      img2Loaded = true;
    } catch {
      // Fallback: banner rosa
      setFill(doc, C.pinkDeep);
      doc.roundedRect(14, 41, CARD_W, 52, 3, 3, 'F');
    }

    // Texto sobre la foto
    setTxt(doc, C.white);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Línea Romero', 24, 62);
    setTxt(doc, C.goldLight);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.text('Formulada con Extracto de Romero Puro', 24, 72);
    setTxt(doc, [240, 220, 230]);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.text('Sin sulfatos agresivos · Sin parabenos · Para todo tipo de cabello', 24, 80);

    // Las 3 tarjetas de productos
    const startY2 = 100;
    const gap = 4;
    PRODUCTS.slice(0, 3).forEach((p, i) => {
      drawProductCardH(doc, p, 14, startY2 + i * (52 + gap), CARD_W);
    });

    drawFooter(doc, W, H, 2, TOTAL_PAGES);

    // ── PÁGINA 3: PRODUCTOS 4-5 + KITS ────────────────────────────────────
    doc.addPage();
    rect(doc, 0, 0, W, H, C.cream);
    drawHeader(doc, W);

    setTxt(doc, C.pinkDeep);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Más Productos', 14, 28);
    line(doc, 14, 32, W - 14, 32, C.pinkPale, 0.5);

    // Tarjetas 4 y 5
    PRODUCTS.slice(3, 5).forEach((p, i) => {
      drawProductCardH(doc, p, 14, 36 + i * 56, CARD_W);
    });

    // ── SECCIÓN KITS ─────────────────────────────────────────
    const kitY = 156;

    // Header kits
    setFill(doc, C.pinkDeep);
    doc.roundedRect(14, kitY, CARD_W, 12, 4, 4, 'F');
    setTxt(doc, C.goldLight);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('🎁  NUESTROS KITS — Elige el tuyo', W / 2, kitY + 8.5, { align: 'center' });

    // Foto kit (Kit1)
    try {
      const kitImg1 = await loadImg('img/Kit1.jpeg');
      doc.addImage(kitImg1, 'JPEG', 14, kitY + 15, 68, 68, '', 'FAST');
    } catch {
      setFill(doc, C.pinkPale);
      doc.roundedRect(14, kitY + 15, 68, 68, 3, 3, 'F');
      setTxt(doc, C.pinkDeep);
      doc.setFontSize(28);
      doc.text('🎁', 48, kitY + 56, { align: 'center' });
    }

    // Descripción de los 3 kits (derecha de la foto)
    const ktx = 88;
    setTxt(doc, C.pinkDeep);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Por la compra de 1 Kit', ktx, kitY + 22);
    setTxt(doc, C.gold);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('¡Lleva 1 Producto de regalo!', ktx, kitY + 30);

    setTxt(doc, C.textMid);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.text('Una rutina botánica completa, desde la\nlimpieza hasta el acabado.', ktx, kitY + 39);

    // Tarjetas de precio kits
    KITS.forEach((k, i) => {
      const kcy = kitY + 53 + i * 16;
      setFill(doc, k.color);
      doc.roundedRect(ktx, kcy, CARD_W - (ktx - 14), 12, 3, 3, 'F');
      setTxt(doc, C.white);
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.text(k.name, ktx + 5, kcy + 8);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.text(k.desc, ktx + 5, kcy + 6); // overwritten below
      // Rewrite properly
      setTxt(doc, C.white);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text(k.name, ktx + 5, kcy + 5.5);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      setTxt(doc, [255, 220, 230]);
      doc.text(k.desc, ktx + 5, kcy + 10);
      setTxt(doc, C.goldLight);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(k.price, CARD_W + 14 - 4, kcy + 8.5, { align: 'right' });
    });

    drawFooter(doc, W, H, 3, TOTAL_PAGES);

    // ── PÁGINA 4: CONTACTO Y CIERRE ────────────────────────────────────────
    doc.addPage();
    rect(doc, 0, 0, W, H, C.cream);

    // Header especial portada de cierre
    setFill(doc, C.pinkDeep);
    doc.rect(0, 0, W, 22, 'F');
    setFill(doc, [160, 50, 75]);
    doc.rect(0, 0, W * 0.45, 22, 'F');
    setDraw(doc, C.gold);
    doc.setLineWidth(0.8);
    doc.line(0, 22, W, 22);
    setTxt(doc, C.white);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('ALMA BOTÁNICA', 14, 13);
    setTxt(doc, C.goldLight);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'italic');
    doc.text('Encuéntranos y escríbenos', W - 14, 13, { align: 'right' });

    // Foto Rosa Pérez + info
    let rosaLoaded = false;
    const rosaW = 72, rosaH = 88;
    try {
      const rosaImg = await loadImg('img/rosa-perez2.png.jpeg');
      doc.addImage(rosaImg, 'JPEG', 14, 28, rosaW, rosaH, '', 'FAST');
      rosaLoaded = true;
    } catch {
      try {
        const rosaImg = await loadImg('img/rosa-perez.png');
        doc.addImage(rosaImg, 'JPEG', 14, 28, rosaW, rosaH, '', 'FAST');
        rosaLoaded = true;
      } catch {}
    }

    // Info Rosa (al lado de la foto)
    const rx = 93;
    setTxt(doc, C.pinkDeep);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Rosa Pérez', rx, 42);

    setTxt(doc, C.gold);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.text('FUNDADORA  ·  FORMULADORA', rx, 51);
    line(doc, rx, 55, W - 14, 55, C.pinkPale, 0.5);

    setTxt(doc, C.text);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const bioText = 'Alma Botánica nació de la pasión por el cuidado capilar natural. Cada producto es formulado con amor y con los mejores ingredientes botánicos, para que tu cabello luzca en su mejor versión.';
    doc.text(doc.splitTextToSize(bioText, W - rx - 14), rx, 63);

    // Cita
    setFill(doc, C.pinkSoft);
    doc.roundedRect(rx, 92, W - rx - 14, 20, 3, 3, 'F');
    setDraw(doc, C.pinkPale);
    doc.setLineWidth(0.3);
    doc.roundedRect(rx, 92, W - rx - 14, 20, 3, 3, 'S');
    setTxt(doc, C.pinkDeep);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'italic');
    doc.text('"Belleza natural que te hace única."', rx + 5, 104, { align: 'left' });

    // Mensaje de cierre personalizado
    const cierreY = 124;
    setFill(doc, C.pinkDeep);
    doc.roundedRect(14, cierreY, CARD_W, 10, 5, 5, 'F');
    setTxt(doc, C.goldLight);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    const gracias = nombreCliente ? `¡Gracias, ${nombreCliente}! 🌿` : '¡Gracias por tu confianza! 🌿';
    doc.text(gracias, W / 2, cierreY + 7, { align: 'center' });

    setTxt(doc, C.text);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    const cMsg = 'Cada producto está elaborado con amor y con los mejores ingredientes botánicos para que tu cabello luzca en su mejor versión. Estamos aquí para acompañarte en cada paso de tu rutina.';
    doc.text(doc.splitTextToSize(cMsg, CARD_W - 8), 18, cierreY + 19);

    // Tarjetas de contacto
    const ctY = cierreY + 52;
    const cW3 = (CARD_W - 14) / 3;
    const contacts = [
      { icon: '💬', title: 'WhatsApp', val: '+57 313 548 7027', sub: 'Escríbenos ahora', color: C.teal },
      { icon: '📦', title: 'Pedidos', val: 'Por WhatsApp', sub: 'Envíos a todo el país', color: C.pinkDeep },
      { icon: '🌿', title: 'Garantía', val: 'Satisfacción 100%', sub: 'O te devolvemos', color: [130, 90, 50] },
    ];
    contacts.forEach((c, i) => {
      const cx = 14 + i * (cW3 + 7);
      setFill(doc, c.color);
      doc.roundedRect(cx, ctY, cW3, 42, 4, 4, 'F');
      setTxt(doc, C.white);
      doc.setFontSize(16);
      doc.text(c.icon, cx + cW3 / 2, ctY + 14, { align: 'center' });
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'bold');
      doc.text(c.title, cx + cW3 / 2, ctY + 23, { align: 'center' });
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      setTxt(doc, C.goldLight);
      doc.text(c.val, cx + cW3 / 2, ctY + 31, { align: 'center' });
      setTxt(doc, [220, 200, 210]);
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'normal');
      doc.text(c.sub, cx + cW3 / 2, ctY + 37, { align: 'center' });
    });

    // Foto Kit3 en la parte inferior (si carga)
    try {
      const kit3 = await loadImg('img/Kit3.jpeg');
      doc.addImage(kit3, 'JPEG', 14, ctY + 48, CARD_W, 55, '', 'FAST');
    } catch {}

    // Frase final
    setTxt(doc, C.gold);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'italic');
    doc.text('"Tu belleza natural merece lo mejor."', W / 2, H - 28, { align: 'center' });
    line(doc, 40, H - 23, W - 40, H - 23, C.gold, 0.5);
    setTxt(doc, C.textMid);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text('Alma Botánica · Rosa Pérez · Cosmética Natural de Lujo', W / 2, H - 18, { align: 'center' });

    drawFooter(doc, W, H, 4, TOTAL_PAGES);

    // ── GUARDAR ───────────────────────────────────────────────────────────
    const nombre = (nombreCliente || 'cliente').replace(/\s+/g, '-');
    doc.save(`Catalogo-Alma-Botanica-${nombre}.pdf`);
  }

  window.generarCatalogoPDF = generarCatalogoPDF;
})();
