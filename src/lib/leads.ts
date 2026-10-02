export interface QuoteContext { location?: string; quantity?: string; roof?: string }
export function quoteMessage(base: string, context: QuoteContext): string {
  const lines = [base];
  const location = (context.location || '').replace(/\s+/g, ' ').trim().slice(0, 80);
  if (location) lines.push(`Ubicación: ${location}`);
  if (['1', '2', '3+', 'a definir'].includes(context.quantity || '')) lines.push(`Cantidad de canchas: ${context.quantity}`);
  if (['techo existente', 'necesito techado', 'a definir'].includes(context.roof || '')) lines.push(`Techo: ${context.roof}`);
  return lines.join('\n');
}

// Solo valores controlados. Nunca se envían ubicación, mensaje, teléfono ni URL de WhatsApp.
export function whatsappEvent(section: string, model: string): Record<string, string> {
  const sections = ['header', 'inicio', 'cancha', 'llave-en-mano', 'como-trabajamos', 'fabricacion', 'techado', 'preguntas', 'contacto', 'footer', 'floating'];
  return {
    cta_location: sections.includes(section) ? section : 'other',
    court_model: ['full_panoramica', 'panoramica', 'techado'].includes(model) ? model : 'general',
  };
}
