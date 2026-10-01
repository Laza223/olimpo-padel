# Product

<!-- impeccable:product-schema 1 -->

<!-- Pre-cargado el 26-sep-2026 desde BRIEF-LANDING.md con las respuestas de Lazar del mismo día. Lo marcado "FALTA (Lazar)" es decisión abierta: no inventar. -->

## Platform

web

## Stack

Delegado: sitio estático con Vite (igual que la landing de Elite Padel), sin framework salvo que la dirección elegida lo necesite (por ejemplo three.js / React Three Fiber para una cancha 3D). **Por ahora solo en local**: sin deploy, sin dominio, sin pixel. Los datos de contacto viven en un único archivo de configuración con placeholders visibles.

## Users

Inversores y dueños de complejos que quieren **una o más canchas de pádel techadas**: dueños de un galpón o terreno que buscan un negocio, clubes que suman canchas indoor, emprendedores. Deciden una inversión de ≈ USD 20.000+ por cancha. Llegan desde Instagram/Meta Ads o Google ("cuánto cuesta una cancha de pádel"), casi siempre desde el celular, y quieren hablar con alguien por WhatsApp antes de comprometerse.

## Product Purpose

Olimpo Padel fabrica e instala **canchas de pádel Full Panorámica llave en mano** para espacios techados, y además construye el techado a pedido. La landing tiene que lograr que el visitante escriba por WhatsApp pidiendo presupuesto.

## Positioning

- **Fabricantes, no revendedores**: los paños de malla y la estructura se hacen en taller propio. El equipo ya fabricó e instaló **unas 15 canchas** (antes de fundar Olimpo; no nombrar la empresa anterior).
- **Full panorámica real, sin postes**: los 18 vidrios templados de 10 mm van **pegados, sin agujeros ni tornillos a la vista**.
- **Solo canchas techadas**: foco en el galpón / club indoor, con techado como segundo producto.
- **La cancha está documentada hasta el último bulón** (manual técnico de 25 páginas): transparencia técnica que la categoría no ofrece.

## Operating Context

Venta consultiva por WhatsApp → presupuesto en PDF con líneas separadas (cancha, logística, instalación) → fabricación en taller → montaje en obra (4–6 personas, ~5 días) → primer partido 14 días después de pegar los vidrios. Precio en USD. Platea de hormigón (H21–H25, 12–14 cm) y techado se cotizan aparte.

## Capabilities and Constraints

- Producto: **Full Panorámica 20×10**. Vidrio 10 mm estándar, 12 mm con costo adicional. 34 paños de malla electrosoldada 50×50. 4 luminarias LED de 33.200 lm. Estructura negra (antióxido + esmalte).
- **Solo para canchas techadas.** No ofrecer exterior.
- **El precio NO se publica**: presupuesto a medida por WhatsApp en 24 h.
- Plazo: **30 a 45 días hábiles** desde la confirmación del proyecto.
- Garantía: **2 años** en estructura, mano de obra, siliconado de vidrios e iluminación · **3 años** en césped · revisión técnica cada 6 meses · excluye granizo, inundación, vientos extraordinarios y rotura de vidrio por impacto.
- El sistema de vidrio pegado está **en validación** (mock-up y ensayos pendientes): se puede describir, no se pueden prometer resistencias ni certificaciones.
- FALTA (Lazar), no bloquea la versión local: WhatsApp, Instagram, dominio, zona del taller y cobertura geográfica → placeholders.

## Brand Commitments

- Nombre: **Olimpo Padel**. Logo: octógono con la cancha y la palabra OLIMPO / PADEL, en **navy #0B2132** con una línea **celeste** (archivos en `../branding/`). El logo es fijo; el resto del mundo visual está abierto.
- Voz: español rioplatense, directo, de fabricante que sabe lo que hace. Sin exageraciones de marketing.
- **Nunca mencionar a Elite Padel** ni usar su dirección, su pixel o sus posts.

## Evidence on Hand

- **Fotos y video reales del taller** (soldadura, corte con sensitiva, amoladora, paños de malla terminados) y de **la obra de un techado** completo: `assets-fuente/reales/`. Uso aprobado: el soldador que aparece es el mismo que fabrica para Olimpo y dio su OK.
- **Especificación técnica real** y planos: `../fabricacion/research/decisiones_fpl_rev_c.md`, `../fabricacion/manual/`.
- **Modelo 3D** de referencia: `C:\Users\Lazar\Documents\github\planos-3D-elite-padel\src\components\PadelCourt.jsx` (hay que sacarle los postes).
- Renders de IA heredados de Elite: `assets-fuente/renders-ia-elite/`. **No son obras reales.**
- **Ausencias que NO se pueden inventar:** no hay fotos de canchas de Olimpo terminadas, ni testimonios, ni años de trayectoria de la empresa, ni certificaciones, ni datos de contacto. La única cifra de trayectoria es "el equipo, unas 15 canchas".

## Product Principles

1. **Prueba antes que promesa**: mostrar el taller, los materiales y los números reales; nada de claims sin respaldo.
2. **Una sola acción**: todo lleva a WhatsApp con el presupuesto.
3. **Transparencia técnica como argumento**: la cancha se explica, no se adorna.
4. **Honestidad de empresa nueva**: ni trayectoria ni obras prestadas.

## Accessibility & Inclusion

Mobile-first (la mayoría llega desde Instagram). Legible al sol, contraste AA, y el contenido tiene que leerse sin JavaScript.
