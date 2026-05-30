
(function () {
  // ─── PALETA ──────────────────────────────────────────────────────────────
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
  };

  const PRODUCTS = [
    {
      name: 'Shampoo Romero',
      tag: 'Limpieza',
      price: '$28.000',
      size: '500 ml',
      icon: '🌿',
      desc: 'Limpieza profunda que estimula el crecimiento capilar desde el primer lavado. Formulado sin sulfatos agresivos.',
      ingredients: 'Extracto de Romero, Agua destilada, Aloe vera, Pantenol (Vitamina B5), Aceite de argán.',
      benefits: ['Estimula la circulación del cuero cabelludo', 'Reduce la caída desde la 1ª semana', 'Apto para uso diario'],
    },
    {
      name: 'Acondicionador Romero',
      tag: 'Nutrición',
      price: '$28.000',
      size: '500 ml',
      icon: '✿',
      desc: 'Hidratación profunda sin residuos pesados. Sella la cutícula para un brillo duradero y suavidad inmediata.',
      ingredients: 'Extracto de Romero, Manteca de karité, Keratina vegetal, Aceite de coco, Vitamina E.',
      benefits: ['Hidratación profunda sin residuos', 'Sella la cutícula para más brillo', 'Desenreda sin dañar'],
    },
    {
      name: 'Tónico Capilar',
      tag: 'Tratamiento',
      price: '$32.000',
      size: 'Romero activo',
      icon: '💧',
      desc: 'Aplicación directa en raíces 2-4 veces por semana. Activa los folículos pilosos. No requiere enjuague.',
      ingredients: 'Extracto concentrado de Romero, Biotina, Zinc, Aceite de ricino, Agua de rosas.',
      benefits: ['Activa folículos inactivos', 'Frena la caída estacional', 'Equilibra la producción de sebo'],
    },
    {
      name: 'Gel Fijador Hidratante',
      tag: 'Styling',
      price: '$25.000',
      size: 'Linaza + Vit E',
      icon: '✨',
      desc: 'Define rizos y ondas con fijación duradera sin efecto cartón. La linaza aporta elasticidad.',
      ingredients: 'Gel de linaza, Vitamina E, Aloe vera, Aceite de romero, Glicerina vegetal.',
      benefits: ['Define rizos sin efecto plástico', 'Hidrata mientras fija', 'Protección antifrizz'],
    },
    {
      name: 'Tratamiento Capilar',
      tag: 'Reparación',
      price: '$35.000',
      size: 'Quinoa · Sábila',
      icon: '🌸',
      desc: 'Mascarilla intensiva para cabellos debilitados por calor, tintura o procesos químicos.',
      ingredients: 'Proteína de Quinoa, Gel de Sábila, Extracto de Romero, Aceite de aguacate.',
      benefits: ['Repara daño por calor y química', 'Hidratación profunda en 15 minutos', 'Fortalece la fibra capilar'],
    },
    {
      name: 'Kit Rutina Completa',
      tag: 'Más vendido',
      price: '$120.000',
      size: '5 productos + 1 regalo',
      icon: '🎁',
      desc: 'Los 5 productos de la línea Romero en un solo kit más el regalo de tu elección. Ahorras $28.000.',
      ingredients: 'Todos los activos de la línea Romero: Romero, Linaza, Quinoa, Sábila, Vitamina E, Biotina.',
      benefits: ['Ahorras $28.000 vs. compra individual', 'Rutina capilar completa 1-5', 'Ideal como regalo'],
    },
  ];

  // ─── HELPERS ─────────────────────────────────────────────────────────────
  function setFill(doc, rgb)   { doc.setFillColor(rgb[0], rgb[1], rgb[2]); }
  function setDraw(doc, rgb)   { doc.setDrawColor(rgb[0], rgb[1], rgb[2]); }
  function setTxt(doc, rgb)    { doc.setTextColor(rgb[0], rgb[1], rgb[2]); }

  function rect(doc, x, y, w, h, rgb) {
    setFill(doc, rgb);
    doc.rect(x, y, w, h, 'F');
  }

  function line(doc, x1, y1, x2, y2, rgb, lw) {
    setDraw(doc, rgb);
    doc.setLineWidth(lw || 0.5);
    doc.line(x1, y1, x2, y2);
  }

  function wrapText(doc, text, x, y, maxW, lineH) {
    const lines = doc.splitTextToSize(text, maxW);
    doc.text(lines, x, y);
    return y + lines.length * lineH;
  }

  function drawHeader(doc, W) {
    rect(doc, 0, 0, W, 14, C.pinkDeep);
    setTxt(doc, C.white);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text('ALMA BOTÁNICA', 14, 8.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.text('Rosa Pérez · Cosmética Natural de Lujo', W - 14, 8.5, { align: 'right' });
    setDraw(doc, C.gold);
    doc.setLineWidth(0.6);
    doc.line(0, 14, W, 14);
  }

  function drawFooter(doc, W, H, pageNum, total) {
    line(doc, 14, H - 14, W - 14, H - 14, C.gold, 0.4);
    setTxt(doc, C.textMid);
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.text('📱 +57 313 548 7027  ·  wa.me/573135487027', 14, H - 8);
    doc.text(`${pageNum} / ${total}`, W - 14, H - 8, { align: 'right' });
  }

  function drawProductCard(doc, p, x, y, cardW) {
    const cardH = 88;
    const radius = 4;

    // Sombra suave
    setFill(doc, [235, 215, 222]);
    doc.roundedRect(x + 1.5, y + 1.5, cardW, cardH, radius, radius, 'F');

    // Fondo tarjeta
    setFill(doc, C.white);
    doc.roundedRect(x, y, cardW, cardH, radius, radius, 'F');
    setDraw(doc, C.pinkPale);
    doc.setLineWidth(0.4);
    doc.roundedRect(x, y, cardW, cardH, radius, radius, 'S');

    // Franja superior coloreada
    setFill(doc, C.pinkPale);
    doc.roundedRect(x, y, cardW, 22, radius, radius, 'F');
    rect(doc, x, y + 14, cardW, 8, C.pinkPale);

    // Tag pill
    setFill(doc, C.pinkDeep);
    doc.roundedRect(x + 4, y + 4, 24, 6, 3, 3, 'F');
    setTxt(doc, C.white);
    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'bold');
    doc.text(p.tag.toUpperCase(), x + 6, y + 8.2);

    // Precio
    setTxt(doc, C.pinkDeep);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(p.price, x + cardW - 5, y + 10, { align: 'right' });

    // Tamaño
    setTxt(doc, C.textMid);
    doc.setFontSize(6);
    doc.setFont('helvetica', 'normal');
    doc.text(p.size, x + cardW - 5, y + 16, { align: 'right' });

    // Nombre producto
    setTxt(doc, C.text);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(p.name, x + 4, y + 30);

    // Descripción
    setTxt(doc, C.textMid);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    const descLines = doc.splitTextToSize(p.desc, cardW - 8);
    doc.text(descLines, x + 4, y + 38);

    let curY = y + 38 + descLines.length * 4;

    // Línea divisora
    line(doc, x + 4, curY + 2, x + cardW - 4, curY + 2, C.pinkPale, 0.3);
    curY += 6;

    // Ingredientes
    setTxt(doc, C.gold);
    doc.setFontSize(6);
    doc.setFont('helvetica', 'bold');
    doc.text('INGREDIENTES', x + 4, curY);
    curY += 4;
    setTxt(doc, C.textMid);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.2);
    const ingLines = doc.splitTextToSize(p.ingredients, cardW - 8);
    doc.text(ingLines, x + 4, curY);
    curY += ingLines.length * 3.5 + 3;

    // Beneficios
    setTxt(doc, C.pinkDeep);
    doc.setFontSize(6);
    doc.setFont('helvetica', 'bold');
    doc.text('BENEFICIOS', x + 4, curY);
    curY += 4;
    setTxt(doc, C.text);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    p.benefits.slice(0, 3).forEach(b => {
      setFill(doc, C.pink);
      doc.circle(x + 6, curY - 1.2, 1, 'F');
      doc.text(b, x + 10, curY);
      curY += 4;
    });
  }

  // ─── GENERADOR PRINCIPAL ─────────────────────────────────────────────────
  async function generarCatalogoPDF(nombreCliente) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const W = 210, H = 297;
    const TOTAL_PAGES = 4;

    // ── PÁGINA 1: PORTADA ──────────────────────────────────────────────────
    // Fondo degradado simulado (capas)
    rect(doc, 0, 0, W, H, C.cream);
    setFill(doc, [252, 238, 243]);
    doc.rect(0, 0, W, H * 0.45, 'F');

    // Círculos decorativos
    setFill(doc, [248, 224, 232]);
    doc.circle(W - 20, 30, 60, 'F');
    setFill(doc, [252, 243, 215]);
    doc.circle(20, H - 40, 45, 'F');
    setFill(doc, [255, 244, 247]);
    doc.circle(W / 2, H * 0.5, 90, 'F');

    // Logo
    try {
      const img = new Image();
      img.src = 'img/LOGO - ALMA BOTANICA.jpg';
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
        setTimeout(rej, 3000);
      });
      const logoSize = 72;
      doc.addImage(img, 'JPEG', (W - logoSize) / 2, 28, logoSize, logoSize);
    } catch {
      // Fallback si no carga el logo
      setFill(doc, C.pinkDeep);
      doc.circle(W / 2, 64, 36, 'F');
      setFill(doc, C.gold);
      doc.circle(W / 2, 64, 33, 'S');
      setTxt(doc, C.white);
      doc.setFontSize(28);
      doc.setFont('helvetica', 'bold');
      doc.text('AB', W / 2, 70, { align: 'center' });
    }

    // Línea dorada
    line(doc, 40, 108, W - 40, 108, C.gold, 0.8);

    // Nombre marca
    setTxt(doc, C.pinkDeep);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('ALMA BOTÁNICA', W / 2, 122, { align: 'center' });

    // Script "Rosa Pérez"
    setTxt(doc, C.gold);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'italic');
    doc.text('Rosa Pérez', W / 2, 133, { align: 'center' });

    // Subtítulo
    setTxt(doc, C.textMid);
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'normal');
    doc.text('COSMÉTICA NATURAL DE LUJO', W / 2, 142, { align: 'center' });

    // Franja teal
    rect(doc, 30, 150, W - 60, 12, C.teal);
    setTxt(doc, C.white);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.text('HUMECTA  •  NUTRE  •  FORTALECE  •  RESTAURA', W / 2, 157.5, { align: 'center' });

    // Saludo personalizado
    rect(doc, 20, 172, W - 40, 46, C.pinkSoft);
    setDraw(doc, C.pinkPale);
    doc.setLineWidth(0.4);
    doc.rect(20, 172, W - 40, 46, 'S');

    setTxt(doc, C.pinkDeep);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    const saludo = nombreCliente ? `Hola ${nombreCliente},` : '¡Bienvenida!';
    doc.text(saludo, W / 2, 183, { align: 'center' });

    setTxt(doc, C.text);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    const msg = 'Preparamos este catálogo especialmente para ti.\nDescubre nuestra línea de productos botánicos formulados\ncon los mejores ingredientes naturales para tu cabello.';
    const msgLines = doc.splitTextToSize(msg, W - 60);
    doc.text(msgLines, W / 2, 193, { align: 'center' });

    // Tagline inferior
    setTxt(doc, C.textMid);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'italic');
    doc.text('"Embellecemos con la naturaleza, realzamos tu belleza natural."', W / 2, 230, { align: 'center' });

    // Línea dorada inferior
    line(doc, 40, 238, W - 40, 238, C.gold, 0.6);

    // Calidad premium
    setTxt(doc, C.gold);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text('CALIDAD PREMIUM ARTESANAL', W / 2, 246, { align: 'center' });

    // Footer portada
    line(doc, 14, H - 14, W - 14, H - 14, C.gold, 0.4);
    setTxt(doc, C.textMid);
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.text('📱 +57 313 548 7027  ·  wa.me/573135487027', 14, H - 8);
    doc.text('1 / 4', W - 14, H - 8, { align: 'right' });

    // ── PÁGINA 2: PRODUCTOS 1-3 ────────────────────────────────────────────
    doc.addPage();
    rect(doc, 0, 0, W, H, C.cream);
    drawHeader(doc, W);

    // Título de sección
    setTxt(doc, C.pinkDeep);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Nuestros Productos', W / 2, 26, { align: 'center' });
    line(doc, 60, 30, W - 60, 30, C.gold, 0.5);

    // 3 productos en columna
    const cardW = (W - 42) / 3;
    const startX = [14, 14 + cardW + 7, 14 + (cardW + 7) * 2];
    const cardY = 36;

    PRODUCTS.slice(0, 3).forEach((p, i) => {
      drawProductCard(doc, p, startX[i], cardY, cardW);
    });

    drawFooter(doc, W, H, 2, TOTAL_PAGES);

    // ── PÁGINA 3: PRODUCTOS 4-6 ────────────────────────────────────────────
    doc.addPage();
    rect(doc, 0, 0, W, H, C.cream);
    drawHeader(doc, W);

    setTxt(doc, C.pinkDeep);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Más Productos', W / 2, 26, { align: 'center' });
    line(doc, 70, 30, W - 70, 30, C.gold, 0.5);

    PRODUCTS.slice(3, 6).forEach((p, i) => {
      drawProductCard(doc, p, startX[i], cardY, cardW);
    });

    // Banner kit destacado
    rect(doc, 14, 145, W - 28, 28, C.pinkDeep);
    setTxt(doc, C.goldLight);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('🎁  Kit Rutina Completa — El más elegido', W / 2, 156, { align: 'center' });
    setTxt(doc, C.white);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('5 productos + 1 regalo · Ahorra $28.000 · Precio especial: $120.000', W / 2, 165, { align: 'center' });

    drawFooter(doc, W, H, 3, TOTAL_PAGES);

    // ── PÁGINA 4: CONTACTO Y CIERRE ────────────────────────────────────────
    doc.addPage();
    rect(doc, 0, 0, W, H, C.cream);
    setFill(doc, [248, 224, 232]);
    doc.rect(0, 0, W, 80, 'F');
    setFill(doc, C.pinkDeep);
    doc.rect(0, 60, W, 20, 'F');

    // Logo pequeño
    try {
      const img2 = new Image();
      img2.src = 'img/LOGO - ALMA BOTANICA.jpg';
      await new Promise((res, rej) => { img2.onload = res; img2.onerror = rej; setTimeout(rej, 2000); });
      doc.addImage(img2, 'JPEG', (W - 36) / 2, 8, 36, 36);
    } catch {
      setFill(doc, C.pinkDeep);
      doc.circle(W / 2, 26, 18, 'F');
      setTxt(doc, C.white);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('AB', W / 2, 31, { align: 'center' });
    }

    setTxt(doc, C.white);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('¡Gracias por tu confianza!', W / 2, 71, { align: 'center' });

    // Mensaje de cierre
    rect(doc, 20, 90, W - 40, 55, C.pinkSoft);
    setDraw(doc, C.pinkPale);
    doc.setLineWidth(0.4);
    doc.rect(20, 90, W - 40, 55, 'S');

    setTxt(doc, C.pinkDeep);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    const cierre = nombreCliente ? `${nombreCliente}, gracias por elegir Alma Botánica.` : 'Gracias por elegir Alma Botánica.';
    doc.text(cierre, W / 2, 103, { align: 'center' });

    setTxt(doc, C.text);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const cierreMsg = 'Cada producto está elaborado con amor y con los mejores ingredientes botánicos\npara que tu cabello luzca en su mejor versión. Estamos aquí para acompañarte\nen cada paso de tu rutina de cuidado capilar.';
    const cierreLines = doc.splitTextToSize(cierreMsg, W - 60);
    doc.text(cierreLines, W / 2, 115, { align: 'center' });

    // Tarjetas de contacto
    const cards = [
      { icon: '💬', title: 'WhatsApp', val: '+57 313 548 7027', sub: 'Escríbenos ahora' },
      { icon: '📦', title: 'Pedidos', val: 'Por WhatsApp', sub: 'Envíos a todo el país' },
      { icon: '🌿', title: 'Garantía', val: 'Satisfacción 100%', sub: 'O te devolvemos' },
    ];
    const cW = (W - 42) / 3;
    cards.forEach((c, i) => {
      const cx = 14 + i * (cW + 7);
      const cy = 158;
      setFill(doc, C.white);
      doc.roundedRect(cx, cy, cW, 38, 3, 3, 'F');
      setDraw(doc, C.pinkPale);
      doc.setLineWidth(0.35);
      doc.roundedRect(cx, cy, cW, 38, 3, 3, 'S');

      doc.setFontSize(14);
      doc.text(c.icon, cx + cW / 2, cy + 12, { align: 'center' });

      setTxt(doc, C.pinkDeep);
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.text(c.title, cx + cW / 2, cy + 20, { align: 'center' });

      setTxt(doc, C.text);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'bold');
      doc.text(c.val, cx + cW / 2, cy + 27, { align: 'center' });

      setTxt(doc, C.textMid);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.text(c.sub, cx + cW / 2, cy + 33, { align: 'center' });
    });

    // Frase final
    setTxt(doc, C.gold);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('"Tu belleza natural merece lo mejor."', W / 2, 215, { align: 'center' });

    line(doc, 40, 220, W - 40, 220, C.gold, 0.5);

    setTxt(doc, C.textMid);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text('Alma Botánica · Rosa Pérez · Cosmética Natural de Lujo', W / 2, 228, { align: 'center' });
    doc.text('CALIDAD PREMIUM ARTESANAL', W / 2, 235, { align: 'center' });

    drawFooter(doc, W, H, 4, TOTAL_PAGES);

    // ── DESCARGAR ──────────────────────────────────────────────────────────
    const nombre = nombreCliente ? nombreCliente.replace(/\s+/g, '-') : 'cliente';
    doc.save(`Catalogo-Alma-Botanica-${nombre}.pdf`);
  }

  window.generarCatalogoPDF = generarCatalogoPDF;
})();
