// Capturas de revisión: desktop 1440, mobile 390 y mobile sin JS, página completa.
// Uso: node scripts/capturas.mjs [url] [carpeta]   (por defecto el dev server y .impeccable/review)
import { mkdirSync } from 'node:fs';
import { launch } from './cdp.mjs';

const url = process.argv[2] ?? 'http://localhost:4321/';
const dir = process.argv[3] ?? '.impeccable/review';
mkdirSync(dir, { recursive: true });

const casos = [
  { nombre: 'desktop', width: 1440, height: 900 },
  { nombre: 'mobile', width: 390, height: 844, mobile: true },
  { nombre: 'mobile-nojs', width: 390, height: 844, mobile: true, js: false },
];

for (const c of casos) {
  // movimiento reducido: la captura de página completa no dispara las apariciones por scroll
  const b = await launch({ ...c, reducedMotion: true });
  await b.goto(url, 1500);
  await b.shot(`${dir}/${c.nombre}-inicio.png`);
  // sin JS no se puede scrollear por DevTools: queda la primera pantalla (el contenido sin JS lo verifica check.mjs)
  if (c.js !== false) await b.fullPage(`${dir}/${c.nombre}.png`);
  if (b.errores.length) console.log(c.nombre, 'errores:', b.errores);
  await b.close();
  console.log('ok', c.nombre);
}
