import { quoteMessage, whatsappEvent } from '../lib/leads';

// El contexto es opcional: los enlaces originales funcionan sin JavaScript ni Analytics.
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="https://wa.me/"]'));
const originalUrls = new Map(links.map(link => [link, new URL(link.href)]));
const fields = document.querySelectorAll<HTMLInputElement | HTMLSelectElement>('[data-quote-field]');
document.querySelector<HTMLElement>('[data-quote]')?.removeAttribute('hidden');
const updateQuotes = () => {
  const context = Object.fromEntries(Array.from(fields, field => [field.dataset.quoteField!, field.value]));
  for (const link of links) {
    const original = originalUrls.get(link)!;
    const url = new URL(original);
    url.searchParams.set('text', quoteMessage(original.searchParams.get('text') || '', context));
    link.href = url.href;
  }
};
fields.forEach(field => {
  field.addEventListener('input', updateQuotes);
  field.addEventListener('change', updateQuotes);
});
updateQuotes();

const analytics = window as Window & { gtag?: (command: string, event: string, params: Record<string, string>) => void };
links.forEach(link => link.addEventListener('click', () => {
  const section = link.classList.contains('wa-flotante') ? 'floating'
    : link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : link.closest('section')?.id || 'other';
  analytics.gtag?.('event', 'whatsapp_click', whatsappEvent(section, link.dataset.waModel || 'general'));
}));

// Los videos del taller se cargan y reproducen solo cuando están en pantalla.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const vigia = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      const v = e.target as HTMLVideoElement;
      if (!e.isIntersecting) {
        v.pause();
        continue;
      }
      if (!v.dataset.cargado) {
        v.querySelectorAll<HTMLSourceElement>('source[data-src]').forEach((s) => (s.src = s.dataset.src!));
        v.load();
        v.dataset.cargado = '1';
      }
      if (!reduce) v.play().catch(() => {});
    }
  },
  { rootMargin: '200px 0px', threshold: 0.2 }
);

document.querySelectorAll<HTMLVideoElement>('[data-lazy-video]').forEach((v) => {
  if (reduce) v.controls = true;
  vigia.observe(v);
});
