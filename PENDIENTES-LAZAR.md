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

0. **Marca de agua en una imagen.** La imagen de la cancha techada (`assets-fuente/renders-ia-elite/model-full-panoramica.webp`, usada en el hero, en la tarjeta de la cancha y en la imagen para compartir) tiene en la pared del fondo un texto tenue que parece la marca de agua de un banco de imágenes o de otra empresa. A tamaño web casi no se lee, pero está. No la borré: sacar una marca de agua de una imagen ajena no corresponde. Conviene reemplazar esa imagen (o confirmar de dónde salió y que se puede usar) antes de subir la página.

## Para confirmar

4. **Permiso del socio del techado** para publicar las 3 fotos de su obra (y si quiere que lo nombremos). Hoy dicen "Fotos reales de una obra de techado de nuestro socio de estructuras".
5. **Imágenes ilustrativas.** Por tu pedido se usan 3 renders de IA de la web anterior (hero y tarjeta de la cancha, pasos, cierre), todos con el rótulo "Imagen ilustrativa" y una nota en el pie. Son las mismas imágenes que ya vio mucha gente en la otra web; dos muestran canchas al aire libre (pasos y cierre), aunque vendemos solo techadas; la de instalación se sacó porque tenía un cartel de otra obra legible. **Cuando tengas la primera cancha Olimpo terminada, reemplazarlas es lo que más va a sumar.**
6. **Garantía del siliconado.** Se publica "2 años en estructura, mano de obra, siliconado de vidrios e iluminación", como pediste. El pegado todavía está en validación: el riesgo comercial es tuyo.
7. **Plazo.** "30–45 días hábiles de la confirmación al primer partido" incluye los días de espera antes de jugar. Validarlo en la primera obra.
8. **Colores de césped** que ofrecen (la web no lo menciona; conviene saberlo para el presupuesto).

## Material que conviene sumar

- Fotos y video de la primera cancha Olimpo terminada (reemplaza las ilustrativas).
- Fotos del taller actual del soldador (los videos son de su taller anterior; por eso dicen "el soldador que fabrica nuestras canchas" y no "nuestro taller").
- Si en el futuro hay clientes reales que quieran dar su opinión, una sección de testimonios verdaderos (hoy no hay ninguno y no se inventa).
