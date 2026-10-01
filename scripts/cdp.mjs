// Chrome headless por DevTools Protocol, sin dependencias: lo usan render-court.mjs y las capturas de revisión.
// Usa el Chrome instalado y WebGL por software (SwiftShader).
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = process.env.CHROME ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function launch({ width = 1440, height = 900, mobile = false, js = true, reducedMotion = false } = {}) {
  const perfil = mkdtempSync(join(tmpdir(), 'olimpo-cdp-'));
  const port = 9300 + Math.floor(Math.random() * 500);
  const proc = spawn(CHROME, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${perfil}`,
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--hide-scrollbars',
    '--mute-audio',
    '--no-first-run',
    `--window-size=${width},${height}`,
    'about:blank',
  ]);

  let ws;
  for (let i = 0; i < 50 && !ws; i++) {
    await sleep(200);
    try {
      const tabs = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
      const page = tabs.find((t) => t.type === 'page');
      if (page) ws = new WebSocket(page.webSocketDebuggerUrl);
    } catch {}
  }
  if (!ws) throw new Error('Chrome no abrió el puerto de depuración');
  await new Promise((r, j) => ((ws.onopen = r), (ws.onerror = j)));

  let id = 0;
  const pend = new Map();
  const oyentes = new Map();
  ws.onmessage = (m) => {
    const d = JSON.parse(m.data);
    if (d.id && pend.has(d.id)) {
      const { r, j } = pend.get(d.id);
      pend.delete(d.id);
      d.error ? j(new Error(d.error.message)) : r(d.result);
    } else if (d.method) oyentes.get(d.method)?.forEach((f) => f(d.params));
  };
  const send = (method, params = {}) =>
    new Promise((r, j) => {
      const n = ++id;
      pend.set(n, { r, j });
      ws.send(JSON.stringify({ id: n, method, params }));
    });
  const once = (method) => new Promise((r) => oyentes.set(method, [...(oyentes.get(method) ?? []), r]));

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile });
  if (mobile) await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  if (!js) await send('Emulation.setScriptExecutionDisabled', { value: true });
  if (reducedMotion) await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });

  const errores = [];
  oyentes.set('Runtime.exceptionThrown', [(p) => errores.push(p.exceptionDetails?.exception?.description ?? p.exceptionDetails?.text)]);

  return {
    errores,
    async goto(url, espera = 1500) {
      const cargado = once('Page.loadEventFired');
      await send('Page.navigate', { url });
      await Promise.race([cargado, sleep(15000)]);
      await sleep(espera);
    },
    async eval(expr) {
      const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
      return r.result.value;
    },
    async shot(file, { clip } = {}) {
      const { writeFile } = await import('node:fs/promises');
      const params = { format: 'png' };
      if (clip) params.clip = { ...clip, scale: 1 };
      const { data } = await send('Page.captureScreenshot', params);
      await writeFile(file, Buffer.from(data, 'base64'));
    },
    /** Página completa: captura por tramos scrolleando y los une con ffmpeg (una captura gigante cuelga a SwiftShader). */
    async fullPage(file) {
      const { execFileSync } = await import('node:child_process');
      await this.eval(`(() => { const s = document.createElement('style'); s.textContent = '.top{position:static!important}.wa-flotante{display:none!important}'; document.head.append(s); })()`);
      const alto = await this.eval('document.documentElement.scrollHeight');
      const tramos = [];
      for (let y = 0; y < alto; y += height) {
        const real = await this.eval(`(scrollTo(0, ${y}), new Promise((r) => setTimeout(() => r(scrollY), 500)))`);
        if (y - real >= height) break; // el documento terminó antes
        const f = `${file}.tramo${tramos.length}.png`;
        await this.shot(f);
        tramos.push({ f, recorte: y - real });
      }
      const entradas = tramos.flatMap((t) => ['-i', t.f]);
      const filtros = tramos.map((t, i) => `[${i}]crop=iw:ih-${t.recorte}:0:${t.recorte}[t${i}]`).join(';');
      const pila = tramos.map((_, i) => `[t${i}]`).join('') + `vstack=${tramos.length}`;
      execFileSync('ffmpeg', ['-v', 'error', '-y', ...entradas, '-filter_complex', tramos.length > 1 ? `${filtros};${pila}` : `${filtros.replace('[t0]', '')}`, file]);
      const { rmSync } = await import('node:fs');
      tramos.forEach((t) => rmSync(t.f));
      await this.eval('scrollTo(0, 0)');
    },
    sleep,
    async close() {
      ws.close();
      proc.kill();
      await sleep(300);
      try {
        rmSync(perfil, { recursive: true, force: true });
      } catch {}
    },
  };
}
