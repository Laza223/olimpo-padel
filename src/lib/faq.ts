// Preguntas frecuentes. Una sola fuente para el HTML y el JSON-LD (FAQPage).
// Nivel comprador: qué recibe, cuánto tarda, qué necesita. Sin detalles de fabricación.
// La respuesta de cobertura sale de site.config.js (dato: 'cobertura').

export interface Pregunta {
  q: string;
  a: string;
  dato?: 'cobertura';
}

export const FAQ: Pregunta[] = [
  {
    q: '¿Cuánto cuesta una cancha de pádel en Argentina?',
    a: `<p>Depende de cuántas canchas son, del vidrio que elijas, de la distancia y de si necesitás platea o techado. Escribinos por WhatsApp y en 24 horas te mandamos el presupuesto, con la cancha, la logística y la instalación por separado.</p>`,
  },
  {
    q: '¿Qué incluye el llave en mano?',
    a: `<p>Todo lo que necesitás para jugar: estructura de acero, 18 vidrios templados, malla, césped sintético con arena, red, iluminación LED, el traslado y la instalación. Aparte, solo si hacen falta, se cotizan la platea de hormigón y el techado.</p>`,
  },
  {
    q: '¿Cuánto tarda, desde que confirmo hasta jugar?',
    a: `<p>Entre 30 y 45 días hábiles desde que confirmás. Ese plazo incluye la fabricación, la instalación y la espera antes del primer partido.</p>`,
  },
  {
    q: '¿Qué necesito tener para instalar la cancha?',
    a: `<p>Un espacio techado con piso de hormigón nivelado, acceso para un camión y electricidad en la obra. Si no tenés la platea o el techo, te los cotizamos aparte.</p>`,
  },
  {
    q: '¿Qué medidas tiene una cancha de pádel reglamentaria?',
    a: `<p>El área de juego mide 20 × 10 metros, 200 m². Contanos las medidas de tu galpón y te decimos si entra.</p>`,
  },
  {
    q: '¿Qué es una cancha Full Panorámica?',
    a: `<p>Es la cancha sin postes en las esquinas: el vidrio de los fondos se une directo con el de los costados y nada tapa la vista del juego. En la nuestra, además, los vidrios van sin agujeros ni tornillos a la vista.</p>`,
  },
  {
    q: '¿Por qué solo para espacios techados?',
    a: `<p>Porque la Full Panorámica que fabricamos está pensada para trabajar bajo techo. Si tenés el terreno pero no el galpón, también hacemos el techado.</p>`,
  },
  {
    q: '¿Vidrio de 10 o de 12 mm?',
    a: `<p>El estándar es vidrio templado de 10 mm. Si preferís 12 mm, se puede, con un costo adicional que te pasamos en el presupuesto.</p>`,
  },
  {
    q: '¿Qué garantía tiene?',
    a: `<p>2 años en estructura, mano de obra, siliconado de vidrios e iluminación, y 3 años en el césped. Cada 6 meses hacemos una revisión técnica. No cubre granizo, inundación, vientos extraordinarios ni rotura de vidrio por impacto.</p>`,
  },
  {
    q: '¿Ustedes fabrican las canchas?',
    a: `<p>Sí. La estructura de acero y los paños de malla los fabricamos nosotros, y la instalación la hace nuestro equipo. No somos revendedores.</p>`,
  },
  {
    q: '¿Hacen el techado?',
    a: `<p>Sí. Lo diseñamos para cada obra y lo presupuestamos aparte de la cancha. Contanos cómo es tu terreno y lo vemos juntos.</p>`,
  },
  {
    q: '¿Qué mantenimiento lleva?',
    a: `<p>Poco: cepillar el césped cada 15 días, reponer arena cada 6 meses y limpiar los vidrios solo con agua y un trapo. Además, cada 6 meses hacemos una revisión técnica.</p>`,
  },
  {
    q: '¿Dónde instalan?',
    a: '',
    dato: 'cobertura',
  },
];
