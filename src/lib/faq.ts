// Preguntas frecuentes. Una sola fuente para el HTML y el JSON-LD (FAQPage).
// Nivel comprador: qué recibe, cuánto tarda, qué necesita. Sin detalles de fabricación.
// La respuesta de cobertura sale de site.config.js (dato: 'cobertura').
import { fullOffer, formatUSD } from '../../site.config.js';

export interface Pregunta {
  q: string;
  a: string;
  dato?: 'cobertura';
}

export const FAQ: Pregunta[] = [
  {
    q: '¿Cuánto cuesta una cancha de pádel en Argentina?',
    a: `<p>La cancha Full Panorámica está en oferta a ${formatUSD(fullOffer.price)}, antes ${formatUSD(fullOffer.previousPrice)}. Es el precio de la cancha para espacios techados. Para la Panorámica y el detalle de tu proyecto, escribinos por WhatsApp: en 24 horas te mandamos el presupuesto con especificaciones técnicas, tiempos y formas de pago.</p>`,
  },
  {
    q: '¿Qué trae la cancha?',
    a: `<p>Estructura de acero, vidrios templados, malla, césped sintético premium con arena de sílice, red e iluminación LED. Te mandamos las especificaciones y el detalle de tu proyecto en el presupuesto.</p>`,
  },
  {
    q: '¿Cuánto tarda?',
    a: `<p>Los plazos dependen de la demanda y de cada obra, por eso los detallamos en el presupuesto, que te mandamos en 24 horas.</p>`,
  },
  {
    q: '¿Qué necesito tener para instalar la cancha?',
    a: `<p>Un piso de hormigón nivelado (platea), acceso para un camión y electricidad en la obra. Si no tenés la platea o el techo, te los cotizamos aparte.</p>`,
  },
  {
    q: '¿Qué medidas tiene una cancha de pádel reglamentaria?',
    a: `<p>El área de juego mide 20 × 10 metros, 200 m². Contanos las medidas de tu espacio y te decimos si entra.</p>`,
  },
  {
    q: '¿Qué es una cancha Full Panorámica?',
    a: `<p>Es la cancha sin postes en las esquinas: el vidrio de los fondos se une directo con el de los costados y nada tapa la vista del juego. En la nuestra, además, los vidrios van sin agujeros ni tornillos a la vista.</p>`,
  },
  {
    q: '¿Qué diferencia hay entre la Full Panorámica y la Panorámica?',
    a: `<p>La Full Panorámica no tiene postes en las esquinas y está pensada para espacios techados. La Panorámica es la misma cancha, con postes de acero en la estructura. Contanos tu espacio y te asesoramos cuál te conviene.</p>`,
  },
  {
    q: '¿Necesito un galpón o un techo?',
    a: `<p>La Full Panorámica está pensada para trabajar bajo techo. Si tenés el terreno pero no el galpón, también hacemos el techado. Para la Panorámica, escribinos y te decimos qué conviene según tu espacio.</p>`,
  },
  {
    q: '¿Qué tipo de vidrio usan?',
    a: `<p>Usamos vidrio templado. Definimos sus características según tu proyecto y te las detallamos en el presupuesto.</p>`,
  },
  {
    q: '¿Ustedes fabrican las canchas?',
    a: `<p>Sí. Fabricamos canchas de pádel a medida y las instalamos con nuestro equipo. No somos revendedores.</p>`,
  },
  {
    q: '¿Hacen el techado?',
    a: `<p>Sí. Lo diseñamos para cada obra y lo presupuestamos aparte de la cancha. Contanos cómo es tu terreno y lo vemos juntos.</p>`,
  },
  {
    q: '¿Qué mantenimiento lleva?',
    a: `<p>Poco: cepillar el césped cada 15 días, reponer arena cada 6 meses y limpiar los vidrios solo con agua y un trapo.</p>`,
  },
  {
    q: '¿Dónde instalan?',
    a: '',
    dato: 'cobertura',
  },
];
