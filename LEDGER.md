# Ledger — Landing Olimpo Padel

Esfuerzo: landing Persuade (WhatsApp) solo local, con /impeccable. Arranque: 26-sep-2026.
Plan aprobado: `C:\Users\Lazar\.claude\plans\pasted-content-id-9cac-impeccable-quier-giggly-swan.md`
Dirección: Despiece de taller (seed 7c7b7b9b, kind pick). Contrato: `.impeccable/surfaces/index-html.md`.

## Decisiones de Lazar (26-sep)

- Dirección: Despiece de taller (sobre la tirada "Canto verde").
- Material del taller: filmado en la fábrica anterior → rótulos seguros, nunca "nuestro taller".
- Obra de techado: de un tercero/socio → "Obra de techado de nuestro socio de estructuras".
- Plazo: incluye el curado → "en 30 a 45 días hábiles estás jugando".
- Garantía: tal cual PRODUCT.md (aprobó el plan sin pedir cambios).
- Telemetría de impeccable: salteada (Lazar rechazó esa llamada).

## Delegaciones

| # | Agente | Finalidad | Costo aprox. | Resultado |
|---|---|---|---|---|
| 1 | Explore (Sonnet) | Mapa del modelo 3D vs Rev. C | ~191k | OK: geometría cercana; anillo redondo, sin zócalo ni mástiles, sombras fantasma |
| 2 | Explore (Sonnet) | Landing anterior + manual | ~225k | OK: FAQ, identificadores a evitar, 18 SVG del manual |
| 3 | Explore (Sonnet) | Inventario de fotos, videos y logos | ~273k | OK: top picks; marcas de terceros, patente, GPS a limpiar |
| 4 | Plan (Sonnet) | Crítica del plan | ~? | OK: GPS en MOV, rotación, garantía, sobreingeniería; aplicado |
| 5 | sonnet-implementer | geometry.js + check-geometry (3D Rev. C) | ~143k | OK técnico; **descartado** con el cambio de dirección |
| 6 | sonnet-implementer | Pipeline de media (videos, fotos, favicons, metadata) | ~188k | OK: 0 GPS/EXIF; techado-estructura solo 480 px (nativo 900) |

## Cambio de dirección (26-sep, tarde)

- Stack: Astro (Lazar pidió "lo más moderno para liviandad y SEO"; eligió Astro sobre Next).
- Lazar rechazó entera la dirección "Despiece de taller": nada de remito, cancha 3D por pasos ni cortes técnicos
  ("¿vamos a vender una big mac con la receta de la salsa secreta?"). Pidió una landing de conversión clásica,
  inspirada en la de Elite (que "convertía muchísimo"), mucho más linda.
- Paleta: navy de marca + azules con detalles rojos; sin amarillo.
- Imágenes de cancha terminada: los renders de IA de la web anterior (Lazar: "no va a pasar nada"), siempre
  rotulados "Imagen ilustrativa" y con nota en el pie. Solo los que no muestran marcas de terceros.
- Sección "Fabricación propia" corta con los videos reales del soldador: sí.
- Se borraron: escena 3D (three.js desinstalado), geometry.js, check-geometry, fuentes Chivo Mono y marcador,
  medios sin uso (hero-panos, panos-pila, panos-pasillo, malla-macro).
- Juez nuevo: `pnpm run build` + `pnpm run check` (scripts/check.mjs).

## Verificación (landing nueva)

| # | Agente | Finalidad | Costo aprox. | Resultado |
|---|---|---|---|---|
| 7 | general-purpose (Sonnet) | Revisión final de diseño (finish-reviewer) | ~177k | fix: 4 hallazgos (animación repetida, tarjetas de plantilla, elevación doble, comentario) → aplicados |
| 8 | sonnet-adversarial-reviewer | Auditoría de afirmaciones | ~92k | NO APTO: alt "sin postes" sobre imagen con poste, cartel de terceros, "se sueldan en taller" → aplicados |
| 9 | sonnet-ux-verifier | Flujos reales (WA, nav, FAQ, sin JS, mobile, video, foco, 404) | ~84k | OK; flotante tapaba el pie legal en mobile → aplicado |

- Hallazgo propio: marca de agua de terceros tenue en `model-full-panoramica.webp` → no se retoca; a PENDIENTES como bloqueante para publicar.
| 10 | sonnet-release-verifier | Gate final | — | GO: build, check y tsc en verde; script check:geometry huérfano → quitado |
