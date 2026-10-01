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
  return [org, faq];
}
