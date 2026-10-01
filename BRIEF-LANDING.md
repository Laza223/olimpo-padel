# Brief de la landing de Olimpo Padel

Material de referencia para la sesión que diseña y construye la landing con la skill **impeccable**. Armado el 26-sep-2026 a partir de la landing de Elite Padel (`C:\Users\Lazar\Documents\github\elite-padel`, en producción en elitepadelargentina.com), su material crudo y la carpeta `OLIMPO PADEL\`.

Regla de este documento: **todo dato tiene fuente**. Lo que falta dice **FALTA (Lazar)** y no se inventa.

---

## 1. Qué es Olimpo (hechos confirmados)

- Empresa nueva de **Lazar y Tomás**: **fabrica e instala canchas de pádel llave en mano** en Argentina. Nace del cierre de Elite Padel, donde Lazar trabajaba.
- **Producto único para arrancar:** cancha **Full Panorámica 20×10** (modelo técnico OP-FPL Rev. C).
- **Precio:** van a salir con **USD 19.900** "por ahora" (Lazar, 26-sep), pero **NO se muestra en la web**: presupuesto por WhatsApp, como hacía Elite (Lazar, 26-sep).
- **Trayectoria del equipo:** el equipo ya fabricó e instaló **unas 15 canchas** (Lazar, 26-sep). Se puede decir así, aproximado y **sin nombrar a Elite**.
- **Plazo y garantía:** los mismos que usaba Elite, por ahora (Lazar, 26-sep): **30 a 45 días hábiles** desde la confirmación · garantía de **2 años** en estructura, mano de obra, siliconado de vidrios e iluminación y **3 años** en césped · revisión técnica cada 6 meses · excluye granizo, inundación, vientos extraordinarios y rotura de vidrio por impacto. Presupuesto a medida en **24 h** (práctica de Elite).
- **Contacto:** todavía **no hay** WhatsApp, Instagram, dominio ni dirección (Lazar, 26-sep). La landing se hace **para tenerla lista en local**: los datos de contacto van como placeholders bien visibles y centralizados en un solo lugar, para completarlos después.
- **Fabricación:** en el **taller propio del soldador**, con espacio para acopio, hasta poder alquilar galpón (Lazar, 26-sep). Se fabrican los paños de malla y se cortan postes/dinteles; el resto se compra.
- **Presupuestos:** mismo formato que Elite (modelo + logística + instalación como líneas separadas), con el estilo del logo de Olimpo.
- **También ofrecen techado:** el presupuesto del 25-sep es "Cancha Full Panorámica + Techado completo".
- Marca: logo octógono-cancha + "OLIMPO PADEL" en **navy #0B2132** con una línea **celeste** (`../branding/logo-olimpo-2.png`, `logo-navy.png`, `logo-white.png`, `logo-olimpo-1.png`).

## 2. La cancha, con los números reales (esto es lo que nadie más puede publicar)

Fuente: `../fabricacion/research/decisiones_fpl_rev_c.md` y el manual de 25 páginas `../fabricacion/Manual-Fabricacion-Instalacion-Full-Panoramica-Olimpo.pdf`.

| Dato | Valor |
|---|---|
| Medidas | 20 × 10 m, altura de vidrio 3 m, coronamiento de malla hasta 4 m |
| Vidrios | **18 templados de 10 mm** (1.995 × 2.995 mm). **12 mm opcional** con costo extra |
| Vidrio **sin agujeros** | Los 18 vidrios van **ciegos, pegados con silicona estructural**: sin tornillos a la vista, sin perforar el templado |
| **Sin postes** | Full panorámica real: ni postes en las esquinas ni detrás de los vidrios. El anillo superior (caño 200×100×3,2) apoya sobre el canto de los vidrios de esquina |
| Paños de malla | 34 paños fabricados (16 laterales 3×1,20 · 4 jambas 3×0,30 · 2 puerta superior 1,60×1 · 8 fondo 2,50×1 · 4 fondo-lateral 2×1). Malla electrosoldada 50×50 |
| Acero | ≈ 1.392 kg de acero útil + 205 kg de malla. Vidrio: 2.700 kg por cancha |
| Terminación | Antióxido + esmalte sintético **negro**, a soplete |
| Luz | **4 luminarias LED Energyc de 33.200 lm** |
| Césped | Sintético con arena de sílice (proveedor a cotizar) |
| Uso | **Solo canchas techadas** (galpón / club indoor). No se vende para exterior |
| Montaje | 4–6 personas, ~5 días de obra; **primer partido 14 días después de pegar los vidrios** (curado de la silicona) |

⚠ **No validado todavía:** el sistema de vidrio pegado (mock-up de esquina, ensayo de adherencia Sika y probeta de soldadura pendientes; ver `../docs/03-estado-y-pendientes.md`). La landing puede **describir** el sistema, pero **no prometer desempeño** ("más resistente", "certificado", "norma X") hasta que esté validado.

## 3. Autopsia de la landing de Elite

**Stack:** HTML + CSS + JS vanilla con Vite, deploy en Cloudflare (`wrangler.jsonc`), Meta Pixel, CTA a WhatsApp (`wa.me`). Hecha por Axxen Systems (la agencia de Lazar; crédito en el footer).

**Estructura (en orden):** hero "Canchas de pádel llave en mano / Tu cancha, lista para jugar" + 4 contadores → marquesina de provincias → 3 modelos con specs → "El valor de elegir llave en mano" → 5 pasos (contacto, presupuesto 24 h, fabricación, entrega, instalación) → 4 testimonios → "¿Querés más que una cancha?" (vestuarios, buffet, obra civil) → "Fabricación propia. Compromiso real." → FAQ → CTA final → footer.

**Qué funcionaba y hay que conservar:**
- El mensaje **llave en mano / un solo responsable** ("olvidate de coordinar 5 proveedores: herreros, vidrieros, electricistas, colocadores").
- **"No somos revendedores. Somos fabricantes."** (Olimpo sí fabrica: vale igual).
- Proceso en pasos claros y **WhatsApp como acción principal** (el público decide por charla, no por formulario).
- **FAQ con intención de búsqueda**: "¿Cuánto cuesta una cancha de pádel en Argentina?", "¿Qué incluye el llave en mano?", "¿Cuánto tarda la instalación?". Buen SEO.
- Presupuesto con líneas separadas (modelo, logística, instalación).

**Qué la hacía débil (y dónde Olimpo gana):**
1. **Las fotos de "proyectos" son renders de IA**: una cancha frente a la Cordillera, otra en una terraza frente al Congreso, un cartel "Centro Deportivo Rosario". No hay **ni una foto real de una cancha terminada**. Un comprador que invierte USD 20.000+ lo nota.
2. **Testimonios sin verificar** ("Martín R., Córdoba") con estrellas de emoji.
3. Contadores que en el HTML dicen **"0 %"** hasta que corre el JS (lo que ven Google y los que tienen JS lento).
4. **Paleta de template** (azul Tailwind #2563EB + naranja #F97316), que ni siquiera coincide con el brand kit de Elite (navy/rojo).
5. **Specs de marketing vagas o infladas**: "templado ultra claro", "sistema autoportante", "LED TV antideslumbramiento", "calidad garantizada 100 %".
6. **Cero diferenciación técnica**: cualquier competidor puede copiar ese texto palabra por palabra.
7. "Instalamos en todas las provincias" con marquesina de 15 provincias: afirmación grande sin prueba.

## 4. Material visual disponible (`assets-fuente/`)

### 4.1 Real (lo más valioso que hay)

| Carpeta | Qué es | Notas |
|---|---|---|
| `reales/taller-frames-video/` (26 jpg, 2160×3840) | Fotogramas en 4K de los videos del taller: **soldadura con chispas** (IMG_4054, IMG_4061), **sensitiva cortando caño con chispas** (IMG_4056, IMG_4059), **amoladora sobre malla** (IMG_4057), medición y corte (IMG_4058), barras de caño (IMG_4049), **pila de paños terminados** (IMG_4050), **malla en primer plano** (IMG_4051) | Verticales. Material de sobra para hero, proceso o textura. Salen caras de operarios (IMG_4050, 4054, 4061) |
| `reales/taller-fotos/` (10 jpg, 4032×3024) | Paños de malla negros apilados, un poste con la **paleta de pádel calada en chapa** como adorno | El poste-paleta es un detalle con personalidad |
| `reales/galpon-techado-obra/` (9 jpg + 11 mp4) | **Obra de un techado de principio a fin**: terreno, reticulados, galpón cerrado con piso de hormigón | Encaja con "solo techadas" y con la oferta de techado |
| Videos originales (sin copiar, pesados) | `C:\Users\Lazar\Documents\ELITE PADEL\Imagenes\contenido crudo\IMG_4045…4061.MOV` (4K, hasta 111 MB) | Para loops de video en la web hay que recortar y comprimir |

✅ **Uso aprobado** (Lazar, 26-sep): el soldador de los videos es el mismo que fabrica para Olimpo y da el OK para publicar.

### 4.2 Renders de IA que usaba Elite (`renders-ia-elite/`)

`hero-court-new.png`, `hero-court.webp`, `factory.png`, `complejo.webp`, `project-1..4.webp`, `model-*.webp/png`.
- **No son obras reales** y muestran cosas que **no son el producto de Olimpo**: canchas al aire libre, marcos naranjas, postes, carteles de terceros, el Congreso.
- Usarlos solo como referencia de encuadre y luz, **nunca como "nuestros proyectos"**. `model-full-panoramica.webp` (cancha indoor en galpón) es el más cercano al producto real.
- Mejor: que impeccable **genere imágenes nuevas del producto real** (galpón, estructura negra, sin postes, vidrio sin agujeros, luz LED, césped azul o verde), rotuladas como render.

### 4.3 Otras referencias

- **Modelo 3D de la cancha** en React Three Fiber: `C:\Users\Lazar\Documents\github\planos-3D-elite-padel\src\components\` (`PadelCourt.jsx`, `GlassPanel.jsx`, `MeshPanel.jsx`, `LightFixture.jsx`, `Net.jsx`). Geometría de la cancha de Elite (con postes): hay que adaptarla a la OP-FPL sin postes.
- **Manual técnico** (planos, despiece, cotas): `../fabricacion/manual/manual-full-panoramica.html`. Es el "mundo" propio de Olimpo: una cancha documentada hasta el último bulón.
- Posts de Instagram de Elite (`ELITE PADEL\Imagenes\posts\`): llevan el logo de Elite, **no usar**.

## 5. Qué se puede decir y qué no

**Sí (verdad comprobable):** fabricación propia; llave en mano; un solo responsable; los datos de la cancha de §2; solo techadas; techado a pedido; 10 mm estándar y 12 mm opcional; presupuesto por WhatsApp en 24 h; entrega en 30–45 días hábiles; garantía 2 años (estructura, mano de obra, siliconado, iluminación) y 3 años (césped); "el equipo ya fabricó e instaló unas 15 canchas".

**No (falso o sin prueba):** años de experiencia de *Olimpo* como empresa; decir que *Olimpo* ya instaló canchas (lo que se puede decir es que las instaló *el equipo*); cifras más grandes que "unas 15"; provincias; testimonios; "certificado", "norma FIP"; el precio; fotos de canchas presentadas como obras propias; la dirección de Elite (Las Acacias 520, Luján); el nombre "Elite Padel".

**Pendiente para después (no bloquea la versión local):**
1. WhatsApp, Instagram, dominio y zona del taller → **placeholders** en un único archivo de configuración.
2. Pixel de Meta propio (el de Elite es `963438552709773`: **no reutilizar**). La versión local va sin pixel.

## 6. Cómo puede ser mil veces mejor que la de Elite (ideas, no mandatos de estilo)

1. **Prueba en vez de promesa.** Elite mostraba renders; Olimpo muestra **el taller real**: la chispa de la soldadura, el corte de la sensitiva, la pila de paños negros. Autenticidad que un render no da.
2. **La cancha como documento técnico abierto.** Nadie en la categoría publica el despiece: 18 vidrios de 1.995 × 2.995, 34 paños, 0 agujeros, 0 postes, 4 × 33.200 lm. Olimpo tiene un manual de 25 páginas: la web puede *enseñar* la ingeniería (cotas, planos, sección del anillo) como argumento de venta.
3. **Una interacción que sea el producto.** Ejemplo: la cancha en 3D que se **desarma al hacer scroll** en sus piezas reales (vidrios, paños, anillo, luces) con sus medidas, reutilizando el modelo R3F que ya existe. O un **"armá tu cancha"** (10/12 mm, color de césped, con o sin techado, con o sin platea) que termina en un mensaje de WhatsApp pre-armado con esa configuración.
4. **Posicionamiento nítido:** "la full panorámica para tu galpón". Solo techadas no es una limitación a esconder: es foco. El que tiene un galpón (o quiere uno) es el cliente, y el techado es el segundo producto.
5. **Transparencia de lo que incluye** (sin precio: Lazar decidió no mostrarlo): qué trae la cancha llave en mano y qué se cotiza aparte (platea, logística, techado), igual que las líneas del presupuesto.
6. **FAQ de verdad**: lo de Elite (SEO) + preguntas que un comprador realmente hace: ¿qué platea necesito? ¿Cuánto tarda en poder jugarse? (14 días de curado). ¿Por qué 10 mm y no 12? ¿Qué pasa si se rompe un vidrio?
7. **Rendimiento y SEO serios:** HTML que se lee sin JS (nada de "0 %"), imágenes AVIF/WebP, video corto y comprimido, metadatos y datos estructurados de negocio local.
