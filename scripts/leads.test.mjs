import test from 'node:test';
import assert from 'node:assert/strict';
import { quoteMessage, whatsappEvent } from '../src/lib/leads.ts';

test('la consulta vacía conserva el mensaje directo; la ubicación se limpia y limita', () => {
  assert.equal(quoteMessage('Hola', { location: '  ', quantity: '', roof: '' }), 'Hola');
  assert.equal(quoteMessage('Hola', { location: '  Buenos\nAires   & zona sur ', quantity: '2', roof: 'necesito techado' }),
    'Hola\nUbicación: Buenos Aires & zona sur\nCantidad de canchas: 2\nTecho: necesito techado');
  assert.equal(quoteMessage('Hola', { location: 'a'.repeat(100) }).split(': ')[1].length, 80);
});

test('el mensaje omite respuestas desconocidas y conserva acentos al armar la URL', () => {
  const message = quoteMessage('Hola', { location: 'Rosario', quantity: 'otra cosa', roof: 'a definir' });
  assert.equal(message, 'Hola\nUbicación: Rosario\nTecho: a definir');
  const url = new URL(`https://wa.me/5492323610592?text=${encodeURIComponent(message)}`);
  assert.equal(url.searchParams.get('text'), message);
});

test('Analytics recibe solo la sección y el modelo, sin datos de la consulta', () => {
  assert.deepEqual(whatsappEvent('cancha', 'full_panoramica'), { cta_location: 'cancha', court_model: 'full_panoramica' });
  const payload = whatsappEvent('nombre@mail.com', 'Hola, vivo en Calle 123');
  assert.deepEqual(payload, { cta_location: 'other', court_model: 'general' });
  assert.equal(/mail|Calle|wa.me|text=/.test(JSON.stringify(payload)), false);
});
