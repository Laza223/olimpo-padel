// Lectura y validación de site.config.js (el único archivo de datos de contacto).
import config from '../../site.config.js';
import { FAQ } from './faq';

export type CampoPendiente = 'whatsapp' | 'instagram' | 'dominio' | 'zona' | 'cobertura';

export const LABELS: Record<CampoPendiente, string> = {
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
  dominio: 'dominio',
  zona: 'zona del taller',
  cobertura: 'cobertura',
};

export const isMissing = (v: unknown): boolean => !v || String(v).trim().toUpperCase() === 'COMPLETAR';

if (!isMissing(config.whatsapp) && !/^549\d{10}$/.test(String(config.whatsapp))) {
  throw new Error(
    `site.config.js: el WhatsApp "${config.whatsapp}" no tiene el formato 549 + característica + número (13 dígitos, sin + ni espacios).`
  );
}
if (!isMissing(config.dominio) && !/^https:\/\/[^/\s]+$/.test(String(config.dominio))) {
  throw new Error(`site.config.js: el dominio "${config.dominio}" tiene que empezar con https:// y no terminar en barra.`);
}

export const site = config;
if (config.ga4 && !/^G-[A-Z0-9]+$/.test(config.ga4)) {
  throw new Error('site.config.js: ga4 tiene que ser un ID de medición G- válido o quedar vacío.');
}
export const faltan = (Object.keys(LABELS) as CampoPendiente[]).filter((k) => isMissing(config[k]));

/** Link de WhatsApp. Sin número cargado, wa.me/?text= abre el selector de contactos. */
export const waHref = (text: string): string =>
  `https://wa.me/${isMissing(config.whatsapp) ? '' : config.whatsapp}?text=${encodeURIComponent(text)}`;

export const MSG = {
  base: 'Hola Olimpo Padel, vengo de la web. Quiero pedir presupuesto de una cancha de pádel.',
  modelo: 'Hola Olimpo Padel, vengo de la web. Quiero saber más de la cancha Full Panorámica.',
  panoramica: 'Hola Olimpo Padel, vengo de la web. Quiero saber más de la cancha Panorámica.',
  techado: 'Hola Olimpo Padel, vengo de la web. Necesito cancha y techado, quiero pedir presupuesto.',
  cierre: 'Hola Olimpo Padel, vengo de la web. Les cuento de mi proyecto y quiero pedir presupuesto.',
};

export const whatsappTexto = (): string | null =>
  isMissing(config.whatsapp) ? null : `+${String(config.whatsapp).replace(/^54(9)(\d{2,4})/, '54 $1 $2 ')}`;

const strip = (html: string) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

export function jsonLd(): object[] {
  const org: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Olimpo Padel',
    description:
      'Fabricamos e instalamos canchas de pádel Full Panorámica y Panorámica llave en mano, y hacemos el techado.',
  };
  if (!isMissing(config.dominio)) {
    org['@id'] = `${config.dominio}/#organization`;
    org.url = `${config.dominio}/`;
    org.logo = `${config.dominio}/media/logo-navy.png`;
  }
  if (!isMissing(config.instagram)) org.sameAs = [`https://www.instagram.com/${config.instagram}/`];
  if (!isMissing(config.whatsapp))
    org.contactPoint = { '@type': 'ContactPoint', telephone: `+${config.whatsapp}`, contactType: 'sales', availableLanguage: 'es' };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.filter((f) => !(f.dato === 'cobertura' && isMissing(config.cobertura))).map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.dato === 'cobertura' ? String(config.cobertura) : strip(f.a) },
    })),
  };
  if (isMissing(config.dominio)) return [org, faq];
  const website = {
    '@context': 'https://schema.org', '@type': 'WebSite',
    '@id': `${config.dominio}/#website`, url: `${config.dominio}/`,
    name: 'Olimpo Padel', inLanguage: 'es-AR', publisher: { '@id': org['@id'] },
  };
  const product = {
    '@context': 'https://schema.org', '@type': 'Product',
    '@id': `${config.dominio}/#full-panoramica`, name: 'Cancha de pádel Full Panorámica Olimpo',
    description: 'Cancha de pádel de 20 × 10 m, sin postes en las esquinas, para espacios techados.',
    image: `${config.dominio}/media/cancha-full-1024.webp`,
    brand: { '@type': 'Brand', name: 'Olimpo Padel' }, manufacturer: { '@id': org['@id'] },
    offers: {
      '@type': 'Offer', url: `${config.dominio}/#cancha`,
      price: config.fullOffer.price, priceCurrency: config.fullOffer.currency,
      description: 'Precio de la cancha Full Panorámica.', seller: { '@id': org['@id'] },
    },
  };
  const productPanoramica = {
    '@context': 'https://schema.org', '@type': 'Product',
    '@id': `${config.dominio}/#panoramica`, name: 'Cancha de pádel Panorámica Olimpo',
    description: 'Cancha de pádel de 20 × 10 m con postes de acero en la estructura.',
    image: `${config.dominio}/media/cancha-panoramica-1024.webp`,
    brand: { '@type': 'Brand', name: 'Olimpo Padel' }, manufacturer: { '@id': org['@id'] },
    offers: {
      '@type': 'Offer', url: `${config.dominio}/#cancha`,
      price: config.panoramicaOffer.price, priceCurrency: config.panoramicaOffer.currency,
      description: 'Precio de la cancha Panorámica.', seller: { '@id': org['@id'] },
    },
  };
  return [org, website, product, productPanoramica, faq];
}
