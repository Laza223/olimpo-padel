# Pendientes para Lazar — landing Olimpo Padel

La web está publicada en https://olimpo-padel.vercel.app (código en https://github.com/Laza223/olimpo-padel). Cada cambio que se sube a `main` se redeploya. Local: `pnpm run dev` → http://localhost:4321.

## Hecho

- `site.config.js` completo: WhatsApp, Instagram, dominio de Vercel, zona ("Buenos Aires") y cobertura. Ya no aparece la banda de pendientes.
- Permiso del socio para las fotos del techado: lo tenés. Se publican 2 fotos (se sacó la del interior del galpón).
- Plazos, garantías y "15 canchas" fuera de la web, por pedido tuyo: los plazos van en el presupuesto. El juez (`scripts/check.mjs`) falla si vuelven a aparecer.
- Rótulo "Imagen ilustrativa" fuera, por pedido tuyo.

## Pendientes

1. **Origen de las dos imágenes de los modelos.** Son renders (no obras de Olimpo) y salen sin rótulo. La de la Full tiene un cartel "PADEL CLUB" en la pared del fondo. Conviene confirmar de dónde salen y que se pueden usar. Originales en `assets-fuente/modelos/` (fuera del repo).
2. **Reemplazar los renders por la primera cancha Olimpo terminada.** Es lo que más va a sumar a la conversión. Con fotos y video reales se cambian en minutos.
3. **Pixel de Meta propio.** La página no tiene ninguno (el de la empresa anterior no se reutiliza). Cuando tengas el tuyo, se agrega.
4. **Datos de la Panorámica.** La web dice que es la misma cancha que la Full, con postes de acero (así figura en `costos/`). No dice si va techada o al aire libre. Si tiene otras medidas, vidrio o iluminación, decímelo y lo ajusto.
5. **Colores de césped** que ofrecen: la web no lo menciona; conviene definirlo para el presupuesto.
6. **Dominio propio** (cuando haya plata): se cambia `dominio` en `site.config.js` y se agrega en Vercel.

## Material que conviene sumar

- Fotos y video de la primera cancha Olimpo terminada.
- Fotos del taller actual del soldador (los videos son de su taller anterior; por eso dicen "el soldador que fabrica nuestras canchas" y no "nuestro taller").
- Testimonios verdaderos cuando haya clientes que quieran opinar (hoy no hay ninguno y no se inventa).
