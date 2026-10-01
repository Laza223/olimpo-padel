// Genera los medios optimizados de la landing (videos, fotos, favicons y logo)
// a partir del material crudo real de Olimpo/Elite. Se corre con `pnpm run media`.
// Solo módulos nativos de Node + ffmpeg/ffprobe del PATH (child_process.spawnSync).
//
// Escribe en public/media/ y public/ (favicons), y deja .impeccable/media-manifest.json
// con la procedencia de cada archivo (fuera de public/: no se publica).

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MEDIA_DIR = path.join(ROOT, 'public', 'media');
const PUBLIC_DIR = path.join(ROOT, 'public');

// Fuentes fuera del repo (contenido crudo de Elite, heredado por Olimpo).
const VIDEO_SRC_DIR = 'C:\\Users\\Lazar\\Documents\\ELITE PADEL\\Imagenes\\contenido crudo';
const ISOTIPO_PATH = 'C:\\Users\\Lazar\\Documents\\OLIMPO PADEL\\isotipo-olimpo-padel.png';
const LOGO_WHITE_SRC = 'C:\\Users\\Lazar\\Documents\\OLIMPO PADEL\\branding\\logo-white.png';

// Fuentes dentro del repo.
const TALLER_DIR = path.join(ROOT, 'assets-fuente', 'reales', 'taller-fotos');
const TECHADO_DIR = path.join(ROOT, 'assets-fuente', 'reales', 'galpon-techado-obra');
const MODELOS_DIR = path.join(ROOT, 'assets-fuente', 'modelos');

const PHOTO_WIDTHS = [480, 960, 1440];
const MAX_LOOP_BYTES = 1_000_000;
const MAX_HERO_BYTES = 900_000;

const manifest = [];
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'olimpo-media-'));

function runFfmpeg(args) {
  const res = spawnSync('ffmpeg', args, { encoding: 'utf-8' });
  if (res.status !== 0) {
    throw new Error(`ffmpeg fallo (status ${res.status}):\n${args.join(' ')}\n${res.stderr}`);
  }
  return res;
}

function ffprobeDims(file) {
  const res = spawnSync(
    'ffprobe',
    ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=s=x:p=0', file],
    { encoding: 'utf-8' }
  );
  const [width, height] = res.stdout.trim().split('x').map(Number);
  return { width, height };
}

function fileBytes(file) {
  return fs.statSync(file).size;
}

// Corre `buildArgs(param)` subiendo el crf hasta que el archivo entre en maxBytes.
function encodeToBudget({ outFile, maxBytes, crfs, buildArgs }) {
  let bytes = null;
  for (let i = 0; i < crfs.length; i++) {
    const crf = crfs[i];
    runFfmpeg(buildArgs(crf));
    bytes = fileBytes(outFile);
    if (bytes <= maxBytes || i === crfs.length - 1) {
      if (bytes > maxBytes) {
        console.warn(`  ADVERTENCIA: ${path.basename(outFile)} quedo en ${bytes} bytes (> ${maxBytes}) con crf=${crf}`);
      }
      return { bytes, crf };
    }
  }
  return { bytes, crf: crfs[crfs.length - 1] };
}

function pushMediaEntry({ file, kind, dims, source, provenance }) {
  manifest.push({
    file: path.basename(file),
    kind,
    width: dims.width,
    height: dims.height,
    bytes: fileBytes(file),
    source,
    provenance,
  });
}

// ── Loops de fabricación (fab-corte, fab-soldadura, fab-amolado) ──
function buildVideoLoop({ slug, srcFile, start, duration, provenance }) {
  console.log(`[media] ${slug} <- ${srcFile} (t=${start}s, dur=${duration}s)`);
  const srcPath = path.join(VIDEO_SRC_DIR, srcFile);
  const mp4Out = path.join(MEDIA_DIR, `${slug}.mp4`);
  const webmOut = path.join(MEDIA_DIR, `${slug}.webm`);
  const posterJpg = path.join(MEDIA_DIR, `${slug}-poster.jpg`);
  const posterAvif = path.join(MEDIA_DIR, `${slug}-poster.avif`);

  encodeToBudget({
    outFile: mp4Out,
    maxBytes: MAX_LOOP_BYTES,
    crfs: [28, 30, 32, 34, 36, 38],
    buildArgs: (crf) => [
      '-y', '-v', 'error',
      '-ss', String(start), '-i', srcPath, '-t', String(duration),
      '-map_metadata', '-1', '-map_chapters', '-1', '-fflags', '+bitexact',
      '-an', '-vf', 'scale=540:960,fps=30',
      '-c:v', 'libx264', '-crf', String(crf), '-preset', 'slow',
      '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
      '-flags:v', '+bitexact',
      mp4Out,
    ],
  });

  encodeToBudget({
    outFile: webmOut,
    maxBytes: MAX_LOOP_BYTES,
    crfs: [40, 44, 48, 52, 56, 60],
    buildArgs: (crf) => [
      '-y', '-v', 'error',
      '-ss', String(start), '-i', srcPath, '-t', String(duration),
      '-map_metadata', '-1', '-map_chapters', '-1', '-fflags', '+bitexact',
      '-an', '-vf', 'scale=540:960,fps=30',
      '-c:v', 'libvpx-vp9', '-crf', String(crf), '-b:v', '0',
      '-flags:v', '+bitexact',
      webmOut,
    ],
  });

  runFfmpeg([
    '-y', '-v', 'error', '-ss', String(start), '-i', srcPath, '-frames:v', '1',
    '-map_metadata', '-1', '-fflags', '+bitexact',
    '-vf', 'scale=540:960', '-q:v', '4',
    posterJpg,
  ]);
  runFfmpeg([
    '-y', '-v', 'error', '-ss', String(start), '-i', srcPath, '-frames:v', '1',
    '-map_metadata', '-1', '-fflags', '+bitexact',
    '-vf', 'scale=540:960', '-pix_fmt', 'yuv420p',
    '-c:v', 'libaom-av1', '-crf', '32', '-cpu-used', '6', '-still-picture', '1',
    posterAvif,
  ]);

  const dims = ffprobeDims(mp4Out);
  const posterDims = ffprobeDims(posterJpg);
  pushMediaEntry({ file: mp4Out, kind: 'video real', dims, source: srcFile, provenance });
  pushMediaEntry({ file: webmOut, kind: 'video real', dims, source: srcFile, provenance });
  pushMediaEntry({ file: posterJpg, kind: 'poster', dims: posterDims, source: srcFile, provenance });
  pushMediaEntry({ file: posterAvif, kind: 'poster', dims: posterDims, source: srcFile, provenance });
}

function makePhotoSet({ slug, srcPath, source, provenance, widths = PHOTO_WIDTHS }) {
  console.log(`[media] ${slug} <- ${source}`);
  const nativeWidth = ffprobeDims(srcPath).width;
  for (const w of widths) {
    if (w > nativeWidth) {
      console.warn(`  aviso: se salta ancho ${w} para ${slug} (nativo=${nativeWidth}px, no se agranda)`);
      continue;
    }
    const vf = `scale=${w}:-2`;
    const avifOut = path.join(MEDIA_DIR, `${slug}-${w}.avif`);
    const webpOut = path.join(MEDIA_DIR, `${slug}-${w}.webp`);
    const jpgOut = path.join(MEDIA_DIR, `${slug}-${w}.jpg`);

    runFfmpeg([
      '-y', '-v', 'error', '-i', srcPath,
      '-map_metadata', '-1', '-fflags', '+bitexact',
      '-vf', vf, '-pix_fmt', 'yuv420p',
      '-c:v', 'libaom-av1', '-crf', '38', '-cpu-used', '6', '-still-picture', '1',
      avifOut,
    ]);
    runFfmpeg([
      '-y', '-v', 'error', '-i', srcPath,
      '-map_metadata', '-1', '-fflags', '+bitexact',
      '-vf', vf, '-c:v', 'libwebp', '-quality', '72',
      webpOut,
    ]);
    runFfmpeg([
      '-y', '-v', 'error', '-i', srcPath,
      '-map_metadata', '-1', '-fflags', '+bitexact',
      '-vf', vf, '-q:v', '5',
      jpgOut,
    ]);

    for (const file of [avifOut, webpOut, jpgOut]) {
      pushMediaEntry({ file, kind: 'foto real', dims: ffprobeDims(file), source, provenance });
    }
  }
}

function buildFavicons() {
  console.log('[media] favicons <- isotipo-olimpo-padel.png');
  const bg = '0x0E151C';
  const targets = [
    { file: path.join(PUBLIC_DIR, 'favicon-32.png'), canvas: 32 },
    { file: path.join(PUBLIC_DIR, 'apple-touch-icon.png'), canvas: 180 },
    { file: path.join(PUBLIC_DIR, 'icon-512.png'), canvas: 512 },
  ];
  for (const { file, canvas } of targets) {
    const isoSize = Math.round(canvas * 0.7);
    const filter =
      `[1:v]scale=${isoSize}:${isoSize},format=rgba,geq=r='255':g='255':b='255':a='0.7*alpha(X,Y)'[iso];` +
      '[0:v][iso]overlay=(W-w)/2:(H-h)/2:format=auto';
    runFfmpeg([
      '-y', '-v', 'error',
      '-f', 'lavfi', '-i', `color=c=${bg}:s=${canvas}x${canvas}`,
      '-i', ISOTIPO_PATH,
      '-filter_complex', filter,
      '-frames:v', '1',
      '-map_metadata', '-1', '-fflags', '+bitexact',
      file,
    ]);
  }
}

// ── Logo blanco: copia optimizada, sin reescalar ──
function buildLogoWhite() {
  console.log('[media] logo-white.png <- branding/logo-white.png');
  const out = path.join(MEDIA_DIR, 'logo-white.png');
  runFfmpeg([
    '-y', '-v', 'error', '-i', LOGO_WHITE_SRC,
    '-map_metadata', '-1', '-fflags', '+bitexact',
    '-compression_level', '100',
    out,
  ]);
}

// Imagen para compartir (1200 × 630): la Full Panorámica ilustrativa con el logo encima (1024 × 538, sin agrandar).
function buildOg() {
  const out = path.join(MEDIA_DIR, 'og.jpg');
  runFfmpeg([
    '-v', 'error', '-y',
    '-i', path.join(MODELOS_DIR, 'full-panoramica.webp'),
    '-i', LOGO_WHITE_SRC,
    '-filter_complex',
    '[0]crop=1024:538:0:230,drawbox=x=0:y=338:w=1024:h=200:color=0x0b2132@0.55:t=fill[b];[1]scale=320:-1[l];[b][l]overlay=40:538-40-h',
    '-map_metadata', '-1', '-q:v', '3', out,
  ]);
  pushMediaEntry({ file: out, kind: 'og', dims: ffprobeDims(out), source: 'full-panoramica.webp', provenance: 'Recorte de un render ilustrativo con el logo encima.' });
}

function main() {
  fs.mkdirSync(MEDIA_DIR, { recursive: true });
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  buildVideoLoop({
    slug: 'fab-corte',
    srcFile: 'IMG_4059.MOV',
    start: 7.3,
    duration: 3.6,
    provenance: 'Video real de fabricacion: corte de cano con sensitiva, con chispas. Recorte y compresion, sin retoque.',
  });
  buildVideoLoop({
    slug: 'fab-soldadura',
    srcFile: 'IMG_4061.MOV',
    start: 3.0,
    duration: 3.5,
    provenance: 'Video real de fabricacion: soldadura de la esquina de un pano de malla. Recorte y compresion, sin retoque.',
  });
  buildVideoLoop({
    slug: 'fab-amolado',
    srcFile: 'IMG_4057.MOV',
    start: 10.0,
    duration: 4.0,
    provenance: 'Video real de fabricacion: amolado de un pano de malla terminado, con chispas. Recorte y compresion, sin retoque.',
  });

  const techadoProvenance = 'Foto real de obra de techado de un socio de estructuras. Recorte y compresion.';
  makePhotoSet({
    slug: 'techado-exterior',
    srcPath: path.join(TECHADO_DIR, 'WhatsApp Image 2026-07-27 at 3.49.13 PM.jpeg'),
    source: 'WhatsApp Image 2026-07-27 at 3.49.13 PM.jpeg',
    provenance: techadoProvenance,
  });
  makePhotoSet({
    slug: 'techado-estructura',
    srcPath: path.join(TECHADO_DIR, 'WhatsApp Image 2026-07-27 at 3.49.12 PM (1).jpeg'),
    source: 'WhatsApp Image 2026-07-27 at 3.49.12 PM (1).jpeg',
    provenance: techadoProvenance,
  });


  // Renders de IA de terceros: en la página van rotulados "Imagen ilustrativa", nunca como obra propia.
  const ilustrativa = 'Render de IA de terceros; se muestra rotulado como Imagen ilustrativa. Recodificado y redimensionado.';
  for (const [slug, archivo, widths] of [
    ['cancha-full', 'full-panoramica.webp', [640, 1024]],
    ['cancha-panoramica', 'panoramica.webp', [640, 1024]],
  ]) {
    makePhotoSet({ slug, srcPath: path.join(MODELOS_DIR, archivo), source: archivo, provenance: ilustrativa, widths });
  }
  buildOg();

  buildFavicons();
  buildLogoWhite();

  fs.rmSync(tmpDir, { recursive: true, force: true });

  // Procedencia embebida en cada archivo (impeccable embed-prompt; avif/webp/video van a un .json al lado).
  const IMPECCABLE = path.join(os.homedir(), '.claude', 'skills', 'impeccable', 'scripts', process.platform === 'win32' ? 'impeccable.cmd' : 'impeccable');
  // en Windows un .cmd se corre vía cmd /c (sin shell: true, que concatena y corta el texto en los espacios)
  const embed = (file, prompt) => {
    const args = ['embed-prompt', path.join(MEDIA_DIR, file), '--prompt', prompt];
    const r = process.platform === 'win32' ? spawnSync('cmd', ['/c', IMPECCABLE, ...args], { encoding: 'utf-8' }) : spawnSync(IMPECCABLE, args, { encoding: 'utf-8' });
    if (r.status !== 0) console.warn(`  aviso: no se pudo embeber la procedencia de ${file}: ${r.stderr || r.stdout}`);
  };
  for (const m of manifest) embed(m.file, m.provenance);
  embed('logo-navy.png', 'Logo de la marca, copia del archivo de branding sin cambios.');
  embed('logo-white.png', 'Logo de la marca en blanco, del archivo de branding.');

  const manifestPath = path.join(ROOT, '.impeccable', 'media-manifest.json');
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`[media] manifest escrito: ${manifestPath} (${manifest.length} entradas)`);
  console.log('[media] listo.');
}

main();
