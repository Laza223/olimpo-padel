---
name: Olimpo Padel
description: Landing de conversión clásica para canchas de pádel Full Panorámica llave en mano
colors:
  navy: "#0b2132"
  navy-2: "#0f2b41"
  navy-3: "#173a57"
  azul: "#1d5f8f"
  celeste: "#4095b6"
  celeste-claro: "#7cc0dc"
  rojo: "#d42f38"
  rojo-2: "#b8242d"
  tinta: "#0b2132"
  tinta-2: "#4a5d6d"
  linea: "#dbe3ea"
  fondo: "#f3f6f9"
  blanco: "#ffffff"
typography:
  display:
    fontFamily: "Archivo, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.9rem, 1.6rem + 6vw, 5.6rem)"
    fontWeight: 900
    fontStretch: "85%"
    lineHeight: 0.92
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Archivo, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 3.2vw, 3.4rem)"
    fontWeight: 850
    fontStretch: "88%"
    lineHeight: 0.98
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Archivo, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(2rem, 1.6rem + 1.8vw, 2.8rem)"
    fontWeight: 900
    fontStretch: "85%"
    lineHeight: 1
  body:
    fontFamily: "Archivo, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    letterSpacing: "0.01em"
rounded:
  sm: "14px"
  lg: "22px"
  pill: "999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1.25rem"
  lg: "2rem"
  xl: "2.5rem"
  gutter: "clamp(1rem, 4vw, 2.5rem)"
  seccion: "clamp(4rem, 3rem + 5vw, 7.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.rojo}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.5rem"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.rojo-2}"
  button-navy:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.blanco}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.5rem"
    height: "52px"
  button-navy-hover:
    backgroundColor: "{colors.navy-3}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.blanco}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.5rem"
    height: "52px"
  card:
    backgroundColor: "{colors.blanco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.lg}"
    padding: "clamp(1.75rem, 1.4rem + 1.2vw, 2.5rem)"
---

# Design System: Olimpo Padel

## Overview

**Creative North Star: "El folleto del fabricante"**

Olimpo vende una obra grande (~USD 20.000) a alguien que decide desde el celular, sin trayectoria de empresa ni obras propias que mostrar todavía. El sistema visual responde con el oficio clásico del rubro: navy de marca dominando fondos y secciones oscuras, blanco para respirar, y rojo reservado casi por completo a un solo gesto — empujar al botón de WhatsApp. No hay exploración de mundo nuevo acá: es la estructura de landing de conversión de siempre (hero, modelo, beneficios, pasos, fabricación, techado, garantía, FAQ, cierre), bien tipografiada y sin relleno.

Todo el peso tipográfico corre por una sola familia variable, Archivo, usada en su eje de ancho (`font-stretch`) para lograr títulos condensados en mayúscula sin sumar una segunda fuente. El rojo nunca decora: aparece en el botón de WhatsApp, en la barra bajo cada título, en el número de cada paso, en la marca de cada ítem de lista y en la unidad de cada cifra (24 **h**, 2 **años**). Fuera de esos usos puntuales, el color lo llevan el navy y sus dos tonos más claros.

**Key Characteristics:**
- Navy dominante en secciones oscuras (hero, pasos, fabricación, cierre, pie) alternado con blanco/gris azulado en secciones claras.
- Rojo estrictamente de detalle: nunca fondo de sección, nunca cuerpo de texto.
- Una sola familia (Archivo) llevando displays condensados en mayúscula y texto corrido sin condensar.
- Tarjetas blancas redondeadas con sombra suave; nada de sombras duras ni bordes gruesos.
- Toda imagen de terceros lleva la etiqueta "Imagen ilustrativa"; las fotos/videos reales llevan una leyenda de texto que dice "reales", nunca la píldora de etiqueta.

## Colors

Paleta de marca (navy + celeste) para identidad y fondo, con el rojo aislado como único color de acción.

### Primary
- **Navy** (`#0b2132`): color de marca dominante. Fondo de las secciones oscuras (hero, pasos, fabricación, cierre), barra superior, pie de página, chip del logo, e ícono de fondo de cada beneficio.
- **Navy medio** (`#0f2b41`): variante tonal de Navy, usada como fondo alternativo de sección (fabricación) para separarla visualmente del hero sin salir de la familia navy.
- **Navy claro** (`#173a57`): variante tonal de Navy, usada solo en `:hover` del botón navy.

### Secondary
- **Verde WhatsApp** (`#25d366`, hover `#1ebe5b`; token `--wa`): el color de acción. Fondo de todos los botones que van a WhatsApp (fijo, flotante y CTA), con texto navy para mantener el contraste.
- **Rojo** (`#d42f38`): solo detalle. Barra bajo cada `.titulo`, número de cada paso, marca de cada ítem de las listas (techado, fabricación), unidad de cada cifra grande, y el signo `+` del acordeón de FAQ al abrirse.
- **Rojo oscuro** (`#b8242d`): estado `:hover`/`:active` del rojo, nunca un tono independiente.

### Tertiary
- **Celeste** (`#4095b6`): definido como token pero sin uso confirmado en el CSS actual (ver inconsistencia al final).
- **Celeste claro** (`#7cc0dc`): acento del titular del hero (`Full Panorámica, lista para jugar.`) y color del anillo de foco (`:focus-visible`) en todo el sitio.

### Neutral
- **Azul** (`#1d5f8f`): un solo uso confirmado, el link "también hacemos el techado" dentro de la ficha de la cancha.
- **Tinta** (`#0b2132`): color de texto por defecto del body. Mismo valor hexadecimal que Navy (ver inconsistencia al final).
- **Tinta secundaria** (`#4a5d6d`): texto de apoyo (bajadas, párrafos de tarjetas, notas) sobre fondo claro; su par sobre fondo oscuro es un gris azulado hardcodeado (`#b9c9d6`, sin token propio).
- **Línea** (`#dbe3ea`): bordes y separadores sobre fondo claro (beneficios, FAQ).
- **Fondo** (`#f3f6f9`): fondo de las secciones `.claro`.
- **Blanco** (`#ffffff`): tarjetas, texto sobre fondo oscuro, fondo del body.

### Named Rules
**La Regla del Verde de Acción.** Todo lo que lleva a WhatsApp es verde WhatsApp; el rojo ya no es de acción y vive solo como detalle: la barra bajo cada título, los números de paso, las marcas de lista y las unidades de las cifras. Nunca es fondo de sección ni color de texto corrido.

## Typography

**Display/Body Font:** Archivo (variable), con `system-ui, -apple-system, 'Segoe UI', sans-serif` de respaldo. Es la única familia del sitio.

**Character:** Una sola fuente que cambia de carácter por su eje de ancho variable: condensada y en mayúscula para títulos (`font-stretch` 85–92%), sin condensar para texto corrido. El peso sube hasta 850–900 en titulares, dándoles peso de afiche sin sumar una segunda tipografía.

### Hierarchy
- **Display** (900, clamp(2.9rem, 1.6rem + 6vw, 5.6rem), line-height 0.92, `font-stretch` 85%): el `<h1>` del hero, en mayúscula.
- **Headline** (850, clamp(2rem, 1.3rem + 3.2vw, 3.4rem), line-height 0.98, `font-stretch` 88%): todos los `<h2>` de sección (`.titulo`), siempre seguidos de la barra roja de 56×5px.
- **Title** (900, clamp(2rem, 1.6rem + 1.8vw, 2.8rem), line-height 1, `font-stretch` 85%): nombre del producto (`Full Panorámica`) y las cifras grandes (stats del hero, números de garantía).
- **Body** (400, 1.0625rem, line-height 1.6): párrafos y bajadas; la bajada limita a 58ch de ancho de línea.
- **Label** (600–700, 0.9375rem, letter-spacing 0.01em): navegación superior, texto de botones y leyendas en mayúscula de los pasos.

### Named Rules
**La Regla de la Familia Única.** Todo el sitio usa Archivo. La jerarquía se construye variando peso y `font-stretch`, nunca sumando otra tipografía.

## Layout

Contenedor centrado de 1200px máximo (`.contenedor`, `width: min(100% - 2 × gutter, 1200px)`), con gutter fluido `clamp(1rem, 4vw, 2.5rem)`. Las secciones usan padding vertical fluido `clamp(4rem, 3rem + 5vw, 7.5rem)` (`.seccion`).

Mobile-first: todas las grillas de dos columnas (hero, modelo, pasos, fabricación, techado) apilan a una columna por debajo de 800–960px y pasan a dos columnas recién en desktop (breakpoints puntuales en 600, 700, 800, 900, 960 y 1040px según la sección). El botón de WhatsApp flotante (`.wa-flotante`) es fijo en la esquina inferior derecha en todo tamaño de pantalla, y el pie reserva espacio extra (`76px`) para que no lo tape.

## Elevation & Depth

Sistema plano con sombras suaves y difusas de tinte navy; nada de sombras duras ni bordes gruesos como recurso de profundidad. Las secciones oscuras usan bloques de color sólido (navy / navy-2), no capas tonales tipo Material.

### Shadow Vocabulary
- **Sombra** (`0 1px 2px rgb(11 33 50 / 0.06), 0 12px 32px -12px rgb(11 33 50 / 0.18)`): tarjetas en reposo (beneficios).
- **Sombra alta** (`0 2px 4px rgb(11 33 50 / 0.08), 0 28px 60px -20px rgb(11 33 50 / 0.35)`): piezas destacadas — la foto del hero, la ficha de la cancha, la foto de los pasos.

### Named Rules
**La Regla de la Sombra Difusa.** Toda sombra usa tinte navy translúcido y desenfoque amplio, nunca un offset duro ni un color neutro.

## Shapes

Dos radios conviven: 14px (`--r`) para tarjetas y bloques de contenido, 22px (`--r-lg`) para las piezas destacadas (foto del hero, ficha de la cancha, foto de los pasos). Los botones y los chips son siempre píldora completa (`border-radius: 999px`). Sin bordes duros: cuando una tarjeta necesita separación interna (beneficios, garantías), es una línea de 1px en `--linea`, nunca un borde grueso.

## Components

### Buttons
- **Shape:** píldora completa (999px), altura mínima 52px (58px en la variante `--grande`).
- **Primary (`.btn--wa`):** fondo verde WhatsApp, texto navy, sombra verde translúcida (`0 10px 24px -10px rgb(37 211 102 / 0.65)`); es el único botón que lleva el ícono de WhatsApp inline. Hover: verde más oscuro.
- **Navy (`.btn--navy`):** fondo navy sólido, texto blanco. Hover: navy claro. Se usa cuando el botón vive sobre fondo claro y no debe competir con el rojo (CTA de techado).
- **Ghost (`.btn--linea`):** borde blanco translúcido, texto blanco, fondo transparente; solo aparece sobre el hero navy como CTA secundario ("Ver la cancha").

### Cards / Containers
- **Corner Style:** 22px (piezas destacadas) o 14px (FAQ).
- **Background:** blanco sobre fondo claro o navy.
- **Shadow Strategy:** ver Elevation & Depth; sombra suave en reposo, sombra alta en piezas destacadas.
- **Border:** ninguno salvo la línea de separación interna entre columnas de beneficios y el borde de 1px en `--linea` de las tarjetas de FAQ.
- **Internal Padding:** escala fluida `clamp(1.75rem, 1.4rem + 1.2vw, 2.5rem)`.

### FAQ (acordeón)
- **Estilo:** `<details>`/`<summary>` nativo, tarjeta blanca con borde `--linea`, sin marcador nativo.
- **Estado:** el signo `+` (dos barras blancas sobre círculo navy) gira 45° y el círculo pasa a rojo cuando el acordeón está abierto.

### Navigation
- **Barra superior:** fija (`sticky`), fondo navy translúcido con blur, enlaces en gris azulado claro que pasan a blanco en hover; el CTA de WhatsApp siempre vive a la derecha.
- **Mobile:** los enlaces de navegación se ocultan por debajo de 900px; solo quedan el logo y el botón de WhatsApp (con texto corto "Presupuesto").

### Etiquetas de imagen (componente de contenido, no solo visual)
- **Imagen ilustrativa:** píldora navy translúcida con blur (`.etiqueta`), esquina inferior izquierda (o derecha en el cierre) de toda imagen de stock/render de terceros.
- **Contenido real:** nunca lleva la píldora; va como leyenda de texto simple debajo de la pieza ("Videos reales del soldador que fabrica nuestras canchas", "Fotos reales de una obra de techado de nuestro socio de estructuras").

### Datos pendientes (componente de contenido)
- **Banda superior** (`.banda-pendientes`, fondo rosa `#fde8e9`, texto `#6d1117`): aparece solo mientras falte algún dato en `site.config.js`, listando qué falta.
- **Marca inline** (`<mark class="pendiente">`, mismo par rosa/burdeos, borde punteado): reemplaza en el lugar exacto un dato de contacto que todavía dice `COMPLETAR`.

## Do's and Don'ts

### Do:
- **Do** usar el verde WhatsApp para todo botón que va a WhatsApp y el rojo (`#d42f38`) solo en: barra bajo título, número de paso, marca de lista, unidad de cifra y el signo del FAQ abierto.
- **Do** etiquetar toda imagen de terceros/render con la píldora "Imagen ilustrativa" (`.etiqueta`).
- **Do** rotular el contenido real (fotos y videos del taller/obra) como "reales" en una leyenda de texto simple, nunca con la píldora de `.etiqueta`.
- **Do** tomar todo dato de contacto (WhatsApp, Instagram, dominio, zona, cobertura) únicamente de `site.config.js`, mostrando `<mark class="pendiente">` mientras diga `COMPLETAR`.
- **Do** mantener una sola familia tipográfica (Archivo) y construir jerarquía con peso y `font-stretch`.

### Don't:
- **Don't** usar amarillo en ningún elemento del sistema.
- **Don't** usar el rojo como fondo de sección o color de texto corrido.
- **Don't** sumar una segunda familia tipográfica o un ícono que no sea SVG inline.
- **Don't** aplicar sombras duras con offset marcado; toda sombra es difusa y con tinte navy.
- **Don't** presentar un render de IA o foto de stock como obra terminada de Olimpo: siempre "Imagen ilustrativa".

---

**Inconsistencias detectadas en el CSS (no corregidas, solo registradas):**
1. `--tinta: #0b2132` y `--navy: #0b2132` son el mismo hex bajo dos nombres de token distintos (`src/styles/main.css:15` y `:23`). Semánticamente separan "color de superficie" de "color de texto", pero hoy son idénticos: si se decide diferenciar navy de texto vs. navy de marca, hay que actualizar `--tinta` a mano.
2. `--celeste: #4095b6` (`main.css:19`) está declarado pero no tiene ningún uso confirmado en el CSS ni en los componentes `.astro`; solo se usa su variante `--celeste-claro`. Es un token muerto o un color reservado sin aplicar todavía.
3. El texto secundario sobre fondo oscuro (`#b9c9d6`, usado en `.hero__bajada`, `.stat__l`, `.paso p`) se repite como valor hardcodeado en vez de un token `--tinta-2` oscuro; hoy conviven un token para texto secundario claro y un literal sin nombre para el oscuro.
