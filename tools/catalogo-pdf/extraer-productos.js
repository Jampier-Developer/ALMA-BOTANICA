/* Saca el array PRODUCTS[] de js/forms.js y lo deja en products.json.
   Se evalúa el array tal cual está escrito — son solo textos y listas,
   sin código — para que el PDF y la web nunca digan precios distintos. */
const fs = require('fs'), path = require('path');
const RAIZ = path.resolve(__dirname, '../..');

const src = fs.readFileSync(path.join(RAIZ, 'js/forms.js'), 'utf8');
const ini = src.indexOf('[', src.indexOf('const PRODUCTS'));
let hondo = 0, fin = -1;
for (let i = ini; i < src.length; i++) {
  if (src[i] === '[') hondo++;
  else if (src[i] === ']' && --hondo === 0) { fin = i; break; }
}
if (fin < 0) throw new Error('No se encontró el cierre del array PRODUCTS[]');

const productos = eval(src.slice(ini, fin + 1));
fs.writeFileSync(path.join(__dirname, 'products.json'), JSON.stringify(productos, null, 1));

const presentaciones = productos.reduce((n, p) => n + (p.variants || [p]).length, 0);
console.log(`${productos.length} productos · ${presentaciones} presentaciones -> products.json`);
