import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const html = readFileSync('dist/index.html', 'utf8');
const graph = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));

test('la canonical y el descubrimiento de URLs usan el dominio público, sin el host retirado', () => {
  assert.equal(html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1], 'https://www.olimpopadel.com/');
  for (const file of ['index.html', 'robots.txt', 'sitemap-index.xml', 'sitemap-0.xml']) {
    assert.doesNotMatch(readFileSync(`dist/${file}`, 'utf8'), /olimpo-padel\.vercel\.app/);
  }
  assert.match(readFileSync('dist/robots.txt', 'utf8'), /Sitemap: https:\/\/www\.olimpopadel\.com\/sitemap-index\.xml/);
});

test('las entidades identifican a Olimpo con el dominio publicado', () => {
  const org = graph.find((entry) => entry['@type'] === 'Organization');
  assert.equal(org.url, 'https://www.olimpopadel.com/');
  assert.equal(org.logo, 'https://www.olimpopadel.com/media/logo-navy.png');
});

test('la oferta visible y los productos publican el precio de la cancha Full y de la Panorámica', () => {
  const full = html.match(/<article[^>]*data-model="full_panoramica"[\s\S]*?<\/article>/)?.[0];
  const pano = html.match(/<article[^>]*data-model="panoramica"[\s\S]*?<\/article>/)?.[0];
  assert.ok(full?.includes('19.900'), 'la ficha Full debe mostrar USD 19.900');
  assert.ok(full?.includes('21.900'), 'la ficha Full debe mostrar el precio anterior');
  assert.ok(pano?.includes('20.900'), 'la ficha Panorámica debe mostrar USD 20.900');
  assert.ok(pano && !pano.includes('19.900'), 'la Panorámica no debe mostrar el precio de la Full');
  const product = graph.find(entry => entry['@type'] === 'Product');
  assert.equal(product?.offers.price, 19900);
  assert.equal(product?.offers.priceCurrency, 'USD');
  assert.equal(product?.offers.description, 'Precio de la cancha Full Panorámica.');
  assert.equal(product?.offers.priceValidUntil, undefined);
  assert.equal(product?.offers.availability, undefined);

  const products = graph.filter(entry => entry['@type'] === 'Product');
  const panoProduct = products.find(p => p['@id']?.includes('panoramica') && !p['@id']?.includes('full'));
  assert.ok(panoProduct, 'debe existir la entidad de Producto para la Panorámica');
  assert.equal(panoProduct?.offers.price, 20900);
  assert.equal(panoProduct?.offers.priceCurrency, 'USD');
});

test('el contenido y las respuestas para buscadores omiten el espesor y la promesa de todo incluido', () => {
  assert.equal(/\b\d+\s*mm\b|espesor|Todo incluido/i.test(html), false);
  const faq = graph.find(entry => entry['@type'] === 'FAQPage');
  assert.ok(faq.mainEntity.some(entry => entry.acceptedAnswer.text.includes('USD 19.900')));
});

test('GA4 solo se activa en el dominio publicado y descarta parámetros de la URL', () => {
  const code = html.match(/<script\b[^>]*data-ga4[^>]*>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(code, 'debe existir la inicialización de GA4');
  const simulate = (hostname) => {
    const scripts = [];
    const window = {};
    runInNewContext(code, { window, location: { hostname }, document: {
      referrer: 'https://example.com/?email=persona@example.com',
      createElement: () => ({}), head: { appendChild: (script) => scripts.push(script) },
    }, URL });
    return { scripts, commands: Array.from(window.dataLayer || [], entry => Array.from(entry)) };
  };
  assert.equal(simulate('localhost').scripts.length, 0);
  const live = simulate('www.olimpopadel.com');
  assert.equal(live.scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-VV66RB0C0R');
  const config = live.commands.find(entry => entry[0] === 'config');
  assert.equal(config[1], 'G-VV66RB0C0R');
  assert.equal(config[2].page_location, 'https://www.olimpopadel.com/');
  assert.equal(config[2].page_referrer, 'https://example.com');
  assert.equal(config[2].allow_google_signals, false);
});
