// ─────────────────────────────────────────────────────────────
//  OLIMPO PADEL · DATOS DE CONTACTO DE LA LANDING
//  Este es el ÚNICO archivo que hay que tocar para completarlos.
//  Mientras un dato diga 'COMPLETAR', la página muestra una banda
//  rosa arriba y un aviso en cada lugar donde falta.
//  Después de editar: guardá y recargá (pnpm run dev) o volvé a
//  correr `pnpm run build`.
// ─────────────────────────────────────────────────────────────

// Precios autorizados por Lazar. Precio de la cancha, sin fecha límite definida.
export const fullOffer = { price: 19900, previousPrice: 21900, currency: 'USD' };
export const panoramicaOffer = { price: 20900, currency: 'USD' };
export const formatUSD = (price) => `USD ${Number(price).toLocaleString('es-AR')}`;

export default {
  fullOffer,
  panoramicaOffer,
  // WhatsApp que recibe los pedidos. Solo dígitos, formato internacional
  // de Argentina: 549 + característica sin el 0 + número sin el 15.
  whatsapp: '5492323610592',

  // Usuario de Instagram, sin la @.
  instagram: 'olimpopadelarg',

  // Dominio con https, sin barra final. Se usa para la URL canónica,
  // la imagen al compartir, robots.txt y sitemap.xml.
  dominio: 'https://www.olimpopadel.com',

  // Google Analytics 4. Vacío desactiva la medición. Solo corre en el dominio publicado.
  ga4: 'G-VV66RB0C0R',

  // Dónde fabricamos. Solo Buenos Aires por ahora, sin localidad. Se muestra en el pie.
  zona: 'Buenos Aires, Argentina',

  // Hasta dónde instalan. Se muestra en las preguntas frecuentes.
  cobertura: 'Todo Argentina',

  // Opcional. Si queda vacío, no se muestra.
  email: '',
};
