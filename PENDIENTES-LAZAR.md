# Pendientes para Lazar — landing Olimpo Padel

La landing corre en local (`pnpm run dev` → http://localhost:4321). Esto es lo que falta y solo lo podés resolver vos.

## Para poder publicarla

1. **Completar `site.config.js`** (es el único archivo de datos). Mientras falte algo, la página muestra una banda rosa arriba y un aviso donde va cada dato.
   - `whatsapp`: 549 + característica sin el 0 + número sin el 15 (ej.: `5491123456789`). Todos los botones de la página usan este número.
   - `instagram`: el usuario, sin la @.
   - `dominio`: con https y sin barra final (ej.: `https://olimpopadel.com.ar`). Activa la URL canónica, la imagen al compartir, `robots.txt` y el sitemap.
   - `zona`: localidad y provincia del taller (se ve en el pie).
   - `cobertura`: hasta dónde instalan (responde la pregunta "¿Dónde instalan?").
   - `email`: opcional.
2. **Pixel de Meta propio.** La página no tiene ninguno (el de la empresa anterior no se reutiliza). Cuando tengas el tuyo, se agrega.
3. **Deploy.** No se publicó nada. Cuando quieras, se sube `dist/` a Cloudflare Pages, Netlify o Vercel.

## Antes de publicar (bloqueante)

0. **Imagen del hero y de la Full Panorámica.** Las dos fotos de los modelos (Full Panorámica y Panorámica) son las que me pasaste y salen rotuladas "Imagen ilustrativa". La de la Full tiene un cartel "PADEL CLUB" pintado en la pared del fondo. Antes de publicar conviene confirmar de dónde salen las dos y que se pueden usar. Las originales están en `assets-fuente/modelos/` (fuera del repo).

## Para confirmar

4. **Permiso del socio del techado** para publicar las 3 fotos de su obra (y si quiere que lo nombremos). Hoy dicen "Fotos reales de una obra de techado de nuestro socio de estructuras".
5. **Imágenes ilustrativas.** Las dos imágenes de los modelos son renders, y van rotuladas como tales. **Cuando tengas la primera cancha Olimpo terminada, reemplazarlas es lo que más va a sumar.**
6. **Plazos y garantías.** Por pedido tuyo no figuran en la web: los plazos van en el presupuesto. La web tampoco menciona garantía ni "15 canchas". El juez (`scripts/check.mjs`) falla si vuelven a aparecer.
7. **Datos de la Panorámica.** La web dice que es la misma cancha que la Full, con postes de acero en la estructura (así figura en `costos/`). Si tiene otras medidas, otro vidrio u otra iluminación, decímelo y lo ajusto. Tampoco dice si va techada o al aire libre.
8. **Colores de césped** que ofrecen (la web no lo menciona; conviene saberlo para el presupuesto).

## Material que conviene sumar

- Fotos y video de la primera cancha Olimpo terminada (reemplaza las ilustrativas).
- Fotos del taller actual del soldador (los videos son de su taller anterior; por eso dicen "el soldador que fabrica nuestras canchas" y no "nuestro taller").
- Si en el futuro hay clientes reales que quieran dar su opinión, una sección de testimonios verdaderos (hoy no hay ninguno y no se inventa).
