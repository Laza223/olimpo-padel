// Juez de la landing: corre sobre dist/ (después de `pnpm run build`). Imprime "check OK" o la lista de fallas.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { gzipSync } from 'node:zlib';
import { spawnSync } from 'node:child_process';
import config from '../site.config.js';

const DIST = 'dist';
const fallas = [];
const falla = (m) => fallas.push(m);
const isMissing = (v) => !v || String(v).trim().toUpperCase() === 'COMPLETAR';

const archivos = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? archivos(p) : [p];
  });

const html = readFileSync(join(DIST, 'index.html'), 'utf-8');
const texto = html
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;| /g, ' ')
  .replace(/\s+/g, ' ');

// 1 · nada que identifique a la empresa anterior (nombre, teléfono, pixel, dirección, coordenadas, testimonios)
const ELITE = /elite|5492323346737|346737|209035|963438552709773|luj[aá]n|las acacias|axxen|mariano|-34\.57|-59\.10|mart[ií]n r\.|lucas d\.|diego m\.|federico a\./i;
const deTexto = (f) => ['.html', '.css', '.js', '.json', '.xml', '.txt', '.webmanifest', '.svg'].includes(extname(f));
for (const f of [...archivos(DIST), ...archivos('src')].filter(deTexto)) {
  const m = readFileSync(f, 'utf-8').match(ELITE);
  if (m) falla(`identificador prohibido "${m[0]}" en ${f}`);
}

// 2 · afirmaciones que no se pueden hacer (plazos y garantías van en el presupuesto, por decisión de Lazar)
const PROHIBIDO = [
  /certific/i, /homolog/i, /\bnormas?\b/i, /\bFIP\b/, /ensayad/i, /años de experiencia/i, /testimonio/i,
  /garant/i, /30\s*[–-]\s*45/, /d[ií]as h[aá]biles/i, /\b[23] años/i, /15 canchas/i, /un solo modelo/i,
  /\blux\b/i, /resisten/i, /rentab/i, /financ/i, /más de 15/i, /provincias/i,
  /\b(córdoba|santa fe|mendoza|tucumán|salta|neuquén|río negro|san juan|chaco|corrientes|misiones|jujuy|chubut|san luis)\b/i,
];
for (const re of PROHIBIDO) {
  const m = texto.match(re);
  if (m) falla(`afirmación prohibida "${m[0]}" en el texto`);
}
// Lazar autorizó los precios: Full Panorámica (USD 21.900 a USD 19.900) y Panorámica (USD 20.900).
for (const price of texto.matchAll(/(?:USD\s*|\$\s*)(\d+(?:[.,]\d+)*)/g)) {
  if (!['21.900', '19.900', '20.900'].includes(price[1])) falla(`precio sin autorización: ${price[0]}`);
}

// 3 · todos los WhatsApp salen de site.config.js
const num = isMissing(config.whatsapp) ? '' : String(config.whatsapp);
const was = [...html.matchAll(/href="(https:\/\/wa\.me\/[^"]*)"/g)].map((m) => m[1]);
if (was.length < 5) falla(`hay solo ${was.length} links de WhatsApp`);
for (const u of was) if (!u.startsWith(`https://wa.me/${num}?text=`)) falla(`link de WhatsApp fuera de la config: ${u}`);

// 4 · banda de pendientes mientras falten datos
const faltan = ['whatsapp', 'instagram', 'dominio', 'zona', 'cobertura'].filter((k) => isMissing(config[k]));
if (faltan.length && !html.includes('banda-pendientes')) falla('faltan datos y no está la banda de pendientes');
if (!faltan.length && html.includes('banda-pendientes')) falla('no faltan datos pero la banda sigue');

// 5 · contenido clave en el HTML, sin JS
for (const t of ['llave en mano', 'Full Panorámica', 'Fabricamos dos modelos', '24 horas', 'No somos revendedores', 'techado']) {
  if (!texto.toLowerCase().includes(t.toLowerCase())) falla(`falta en el HTML: "${t}"`);
}
const preguntas = (html.match(/<details/g) ?? []).length;
if (preguntas < 10) falla(`solo ${preguntas} preguntas frecuentes`);
if (!html.includes('"FAQPage"')) falla('falta el JSON-LD de preguntas');

// 6 · medios servidos sin ubicación, fecha de captura ni dispositivo
const MEDIOS = archivos(join(DIST, 'media')).filter((f) => /\.(jpe?g|png|webp|avif|mp4|webm)$/i.test(f));
for (const f of MEDIOS) {
  const bin = readFileSync(f).toString('latin1');
  if (/Exif\0\0|com\.apple|ISO6709|iPhone|GPSLatitude/.test(bin)) falla(`metadata de cámara o ubicación en ${f}`);
  if (/\.(mp4|webm)$/.test(f)) {
    const r = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format_tags:stream_tags', '-of', 'default', f], { encoding: 'utf-8' });
    if (/location|creation_time|make=|model=/i.test(r.stdout)) falla(`tags de captura en ${f}`);
  }
}

// 7 · peso: carga inicial (HTML + CSS + JS) y medios
const inicial = [join(DIST, 'index.html'), ...archivos(join(DIST, '_astro')).filter((f) => /\.(css|js)$/.test(f))];
const gz = inicial.reduce((s, f) => s + gzipSync(readFileSync(f)).length, 0);
if (gz > 120_000) falla(`carga inicial ${gz} B gz (> 120 KB)`);
for (const f of MEDIOS) {
  const b = statSync(f).size;
  const tope = /\.(mp4|webm)$/.test(f) ? 1_000_000 : 300_000;
  if (b > tope) falla(`${f} pesa ${b} B (> ${tope})`);
}

// 8 · procedencia embebida en todo raster publicado
const scan = spawnSync(
  process.platform === 'win32' ? 'cmd' : 'sh',
  process.platform === 'win32'
    ? ['/c', `${process.env.USERPROFILE}\\.claude\\skills\\impeccable\\scripts\\impeccable.cmd`, 'embed-prompt', '--scan', 'public\\media']
    : [`${process.env.HOME}/.claude/skills/impeccable/scripts/impeccable`, 'embed-prompt', '--scan', 'public/media'],
  { encoding: 'utf-8' }
);
const faltaProc = (scan.stdout + scan.stderr).match(/(\d+) missing/);
if (!faltaProc) falla(`no se pudo correr embed-prompt --scan: ${scan.stderr || scan.stdout}`);
else if (faltaProc[1] !== '0') falla(`rasters sin procedencia: ${faltaProc[1]}`);

if (fallas.length) {
  console.error(`check FALLÓ (${fallas.length}):\n- ` + fallas.join('\n- '));
  process.exit(1);
}
console.log(`check OK · carga inicial ${(gz / 1024).toFixed(1)} KB gz · ${was.length} links de WhatsApp · ${preguntas} preguntas · ${MEDIOS.length} medios`);
