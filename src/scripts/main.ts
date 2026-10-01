// Única mejora con JS: los videos del taller se cargan y reproducen solo cuando están en pantalla.
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
