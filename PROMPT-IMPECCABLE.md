# Prompt para la sesión nueva (copiar desde la línea de abajo)

Abrir la sesión con la carpeta `C:\Users\Lazar\Documents\OLIMPO PADEL\landing` como directorio de trabajo y pegar:

---

/impeccable Quiero la landing page de **Olimpo Padel**, mi empresa nueva: fabricamos e instalamos canchas de pádel **Full Panorámica llave en mano, solo para espacios techados**, y también hacemos el techado. Es una página para **convencer** (modo Persuade): el visitante tiene que terminar escribiéndonos por WhatsApp para pedir presupuesto.

**Antes de diseñar, leé en este orden** (ahí está todo el contexto; no me hagas repetirlo):
1. `PRODUCT.md`: ya está cargado con los datos confirmados. No re-hagas la entrevista del `init`: preguntame solo si algo te parece mal o contradictorio.
2. `BRIEF-LANDING.md`: la autopsia de la landing de mi empresa anterior (qué funcionaba y qué no), los números reales de la cancha, el inventario de fotos y videos, y qué se puede afirmar y qué no.
3. `../fabricacion/research/decisiones_fpl_rev_c.md` y `../fabricacion/manual/manual-full-panoramica.html`: la ficha técnica y el manual de la cancha, por si necesitás un dato más.

**La vara:** tiene que ser muchísimo mejor que la landing anterior (`C:\Users\Lazar\Documents\github\elite-padel`, en producción en elitepadelargentina.com). Esa tenía renders de IA presentados como obras, testimonios sin verificar y un look de template. Nosotros ganamos con **prueba real**: video y fotos del taller (soldadura, corte, paños) y de una obra de techado, y una cancha documentada hasta el último bulón (18 vidrios de 10 mm pegados sin agujeros, sin postes, 34 paños de malla, 4 × 33.200 lm). Quiero una interacción que muestre el producto de verdad; en el brief dejé ideas (cancha 3D que se desarma, "armá tu cancha" que arma el mensaje de WhatsApp), pero la dirección la proponés vos.

**Reglas que no se negocian:**
- El logo es fijo (`../branding/`, navy #0B2132 + celeste). El resto del mundo visual lo elegís vos con tu proceso.
- **No inventes**: ni testimonios, ni años de experiencia, ni certificaciones. Lo único de trayectoria es "el equipo ya fabricó e instaló unas 15 canchas". Plazo (30–45 días hábiles) y garantía (2 y 3 años) están en PRODUCT.md. **El precio no se muestra**: el CTA es pedir presupuesto por WhatsApp.
- **Todavía no tengo WhatsApp, Instagram, dominio ni dirección.** La quiero lista en local: poné placeholders bien visibles, todos en un único archivo de configuración, para completarlos después. Sin pixel de Meta.
- **Nunca** aparece "Elite Padel", su dirección, su teléfono ni su pixel de Meta.
- Los renders de `assets-fuente/renders-ia-elite/` **no** se presentan como obras nuestras y muestran cosas que no son nuestro producto (canchas al aire libre, con postes). Si hacen falta imágenes de la cancha terminada, generalas nuevas del producto real (galpón, estructura negra, sin postes) y rotulalas como render.
- Contenido que se lea sin JavaScript, mobile-first, rápido (imágenes optimizadas, video corto y comprimido; los originales 4K son pesados).
- Español rioplatense, directo, sin chamuyo de marketing.
- Subagentes: solo Sonnet.

**Stack:** si nadie decide otra cosa, sitio estático con Vite (como la anterior), con three.js / React Three Fiber solo si la dirección elegida lo usa. El modelo 3D de referencia está en `C:\Users\Lazar\Documents\github\planos-3D-elite-padel\src\components\PadelCourt.jsx` (hay que sacarle los postes).

**Al terminar:** la landing corriendo en local, capturas desktop y mobile, la revisión final de impeccable, `DESIGN.md`, y una lista de lo que tengo que completar yo (datos de contacto, fotos a reemplazar). No publiques ni hagas deploy: por ahora es solo local.
