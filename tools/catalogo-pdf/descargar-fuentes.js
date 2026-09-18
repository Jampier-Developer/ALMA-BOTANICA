/* Baja Marcellus y Poppins de Google Fonts y las deja incrustadas en
   fonts-embed.css como data URIs. Hace falta porque Chromium exporta el
   PDF sin conexión: si las fuentes no van dentro del CSS, el catálogo
   sale en Georgia y Arial en vez de las tipografías de la marca. */
const fs = require('fs'), https = require('https'), path = require('path');

const CSS_URL = 'https://fonts.googleapis.com/css2?family=Marcellus&family=Poppins:wght@300;400;500;600;700&display=swap';
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';

const bajar = url => new Promise((ok, mal) => {
  https.get(url, { headers: { 'User-Agent': UA } }, r => {
    if (r.statusCode !== 200) return mal(new Error(`${r.statusCode} en ${url}`));
    const trozos = [];
    r.on('data', t => trozos.push(t));
    r.on('end', () => ok(Buffer.concat(trozos)));
  }).on('error', mal);
});

(async () => {
  let css = (await bajar(CSS_URL)).toString('utf8');
  const urls = [...new Set([...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map(m => m[1]))];
  console.log(`${urls.length} archivos de fuente`);
  for (const u of urls) {
    const buf = await bajar(u);
    css = css.split(u).join(`data:font/woff2;base64,${buf.toString('base64')}`);
  }
  const salida = path.join(__dirname, 'fonts-embed.css');
  fs.writeFileSync(salida, css);
  console.log(`fonts-embed.css -> ${(fs.statSync(salida).size / 1024).toFixed(0)} KB`);
})();
