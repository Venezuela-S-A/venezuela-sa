# Venezuela S.A. — Catálogo de Sistemas Digitales

> Documento operativo para la creación de repositorios individuales.
> NO es parte de Docusaurus. Es el blueprint técnico para comenzar a construir.

**Fecha:** 2026-03-14
**Versión:** 2.0
**Total de sistemas identificados:** 29
**Inversión digital total estimada:** USD 1.5-3B (primeros 18 meses)

---

## Índice por Prioridad de Ejecución

| Tier | Sistemas | Timeline | Justificación |
|------|----------|----------|---------------|
| **T0 — Fundación** | **Censo Nacional Digital**, Identidad Digital, X-Road, Blockchain Pública | Semanas 1-12 (censo) / Meses 1-12 | Sin saber quién está, dónde y qué sabe hacer, no se planifica nada |
| **T1 — Impacto inmediato** | Dashboard Transparencia, Telemedicina App, Pagos Instantáneos | Semanas 2-24 | Resultados visibles en <100 días |
| **T2 — Motor financiero** | Neo-Banca, Remesas, Bonos Ciudadanos, Contratación Pública | Meses 3-12 | Habilita flujo de capital |
| **T3 — Servicios ciudadanos** | E-Gobierno Portal, Registro Propiedad, Sistema Fiscal, Seguros, Micro-Crédito | Meses 6-18 | Servicios del Estado digital |
| **T4 — Escalamiento** | e-Residencia, EdTech, AgTech, Data Center Ops, Hub Médico | Años 2-5 | Diversificación y escala |

---

## T0-00: Sistema Nacional de Censo Digital

**Repo sugerido:** `venezuela-sa/censo-nacional`

### Por qué es el sistema #0

Venezuela no tiene censo real desde 2011. El INE (Instituto Nacional de Estadística) es no funcional. Sin datos demográficos actualizados:
- No sabes cuántas personas hay realmente (estimaciones: 28-32M residentes)
- No sabes dónde están (migración interna masiva desde 2015)
- No sabes qué saben hacer (80%+ empleo informal, sin registros)
- No sabes qué necesitan (salud, educación, vivienda, empleo)
- No puedes planificar hospitales, escuelas, infraestructura, subsidios
- No puedes armar el equipo ejecutor sin mapear el talento disponible
- No puedes distribuir dividendos sin saber quiénes son los 40M accionistas
- No puedes actualizar las estadísticas que TODO el plan usa (ENCOVI es la única fuente y es encuesta, no censo)

**El censo es el primer acto de soberanía sobre los datos del país. Sin datos, no hay plan.**

### Descripción
Sistema integral de censo que combina: (1) registro digital de los ~30M residentes, (2) censo de la diáspora de 7.9M, (3) inventario de talento y habilidades, (4) mapeo de necesidades por territorio, (5) registro de activos y vivienda. Alimenta TODOS los demás sistemas.

### Qué construir

#### Módulo 1: Censo Residencial (30M personas)
- App móvil para censistas (captura de datos offline-first, sincroniza cuando hay red)
- Portal web de auto-registro ciudadano (para quienes tienen conectividad)
- Formulario digital: datos personales, ubicación GPS, núcleo familiar, vivienda, empleo, salud, educación, conectividad (smartphone, internet), necesidades prioritarias
- Captura biométrica ligera (foto + huella) — alimenta futuro sistema de identidad digital
- Dashboard de avance del censo en tiempo real (% por estado, municipio, parroquia)
- Motor de deduplicación (evitar doble conteo)
- API de exportación para otros sistemas (identidad, salud, educación, fiscal)

#### Módulo 2: Censo de Diáspora (7.9M personas)
- App/web de auto-registro para venezolanos en exterior
- Perfil: país de residencia, profesión, industria, skills, idiomas, años de experiencia
- Módulo de intención: ¿quiere invertir? ¿quiere retornar? ¿en qué condiciones?
- Matching talento-oportunidades (job board para posiciones en Venezuela)
- Pre-calificación para bonos ciudadanos (VIN)
- Integración con consulados y organizaciones de diáspora
- Programa de referidos (cada venezolano invita a 3 más)
- Mapa de calor interactivo: dónde están los venezolanos, qué hacen

#### Módulo 3: Inventario Nacional de Talento
- Clasificación de habilidades por taxonomía estandarizada (ISCO-08 / O*NET)
- Matching automatizado: perfiles disponibles vs. necesidades del plan
  - ¿Cuántos ingenieros petroleros hay? ¿Dónde están?
  - ¿Cuántos médicos emigraron? ¿Quiénes volverían?
  - ¿Cuántos developers hay? ¿Cuántos necesitamos formar?
  - ¿Cuántos electricistas, soldadores, técnicos de data center?
- Dashboard para equipo ejecutor: pipeline de talento por rol crítico
- Alertas de brechas de talento vs. demanda del plan
- Integración con plataformas EdTech (¿qué bootcamps necesitamos abrir?)

#### Módulo 4: Mapeo de Necesidades Territoriales
- Geo-referenciación de cada registro censal (municipio/parroquia/coordenada GPS)
- Capas temáticas:
  - **Salud:** ¿cuántas personas hay por hospital funcional? ¿dónde no hay cobertura?
  - **Educación:** ¿cuántos niños en edad escolar por escuela? ¿dónde hay deserción?
  - **Agua/Electricidad:** ¿quién tiene servicio? ¿quién no?
  - **Conectividad:** ¿quién tiene smartphone? ¿quién tiene internet?
  - **Vivienda:** ¿cuántas viviendas sin título? ¿en qué estado están?
  - **Seguridad alimentaria:** ¿quién necesita asistencia inmediata?
- Exportación a sistemas de planificación (infraestructura, salud, educación)
- API pública de estadísticas agregadas (datos anonimizados)

#### Módulo 5: Portal de Estadística Nacional (reemplazo de INE)
- Dashboard público con indicadores actualizados en tiempo real:
  - Población por estado, municipio, edad, género
  - Empleo formal vs. informal
  - Niveles educativos
  - Acceso a servicios básicos (agua, electricidad, internet, salud)
  - Vivienda (propia, alquilada, informal, con/sin título)
  - Migración interna y externa
- API REST para investigadores, periodistas, organismos internacionales
- Exportación en formatos estándar (CSV, JSON, SDMX)
- Integración con ENCOVI/UCAB para validación cruzada
- Actualización continua (no cada 10 años como censo tradicional)

### Mercado objetivo
- **Primario:** Estado + Venezuela S.A. (planificación)
- **Secundario:** 40M ciudadanos (residentes + diáspora) como registrantes
- **Terciario:** Organismos internacionales (ONU, BID, Banco Mundial, UNHCR), investigadores, inversores
- **Alimenta directamente:**
  - Sistema de Identidad Digital (T0-01) — base para enrolamiento biométrico
  - Bonos Ciudadanos (T2-03) — registro de los 40M accionistas
  - Equipo Ejecutor — pipeline de talento
  - Subsidios focalizados — saber quién necesita qué
  - Planificación de infraestructura — saber dónde construir

### Estándares a cumplir
| Estándar | Descripción |
|----------|-------------|
| UN Principles and Recommendations for Population and Housing Censuses (Rev. 3) | Marco metodológico de Naciones Unidas para censos |
| SDMX (Statistical Data and Metadata eXchange) | Estándar de intercambio de datos estadísticos |
| ISCO-08 (ILO) | Clasificación Internacional Uniforme de Ocupaciones |
| ISCED 2011 (UNESCO) | Clasificación Internacional Normalizada de la Educación |
| GDPR / protección de datos personales | Datos censales son sensibles |
| ISO 19115 | Metadata para información geográfica |
| Open Data Standards | Datos públicos en formatos abiertos |
| Principios Fundamentales de las Estadísticas Oficiales (ONU) | Independencia, imparcialidad, accesibilidad |

### KPIs
| Métrica | Meta Semana 4 | Meta Mes 3 | Meta Mes 6 | Meta Año 1 |
|---------|--------------|-----------|-----------|-----------|
| **Residentes registrados** | 1M (piloto 3 ciudades) | 5M | 15M | 28-30M (95%+) |
| **Diáspora registrada** | 200K | 1M | 2M | 4M (50%+) |
| **Perfiles de talento completos** | 100K | 500K | 2M | 10M |
| **Cobertura geográfica** | 3 estados | 10 estados | 20 estados | 24 estados (100%) |
| **Tasa de completitud de formulario** | 60% | 70% | 80% | 85% |
| **Brechas de talento identificadas** | Top 10 roles | Top 50 | Top 100 | Completo |
| **Datos disponibles en API** | Básicos | Intermedios | Completos | Tiempo real |
| **Uptime del sistema** | 95% | 99% | 99.5% | 99.9% |

### Operación del censo

| Componente | Detalle |
|------------|---------|
| **Censistas de campo** | 30,000-50,000 personas con tablets (similar a censo 2011: 45,000 censistas) |
| **Auto-registro digital** | Web + app para quienes tienen smartphone (~70% penetración) |
| **Centros de registro** | Escuelas, centros comunitarios, plazas con Starlink |
| **Verificación** | Muestreo aleatorio post-censo (5% de registros verificados en campo) |
| **Seguridad de datos** | Encriptación AES-256, anonimización para datos públicos, acceso por roles |
| **Conectividad** | Offline-first (tablets sincronizan cuando hay red) + Starlink en centros |

### Timeline de ejecución

```
Semana 1-2:   Desarrollo MVP app de censista + portal auto-registro
Semana 2-4:   Piloto en 3 ciudades (Caracas, Maracaibo, Valencia)
Semana 4-8:   Iteración + expansión a 10 estados
Mes 2-4:      Lanzamiento censo diáspora (web + app global)
Mes 3-6:      Cobertura nacional del censo residencial
Mes 6-9:      Portal de estadísticas públicas operativo
Mes 9-12:     Inventario de talento cruzado con necesidades del plan
Continuo:     Actualización permanente (registro abierto 365/24/7)
```

### Dependencias
- **Ninguna bloqueante** (es el primer sistema — todo lo demás depende de él)
- Starlink desplegado para centros de registro rurales (puede arrancar sin ello en zonas urbanas)
- Tablets/smartphones para censistas (puede usar dispositivos propios como puente)

### Lo que habilita (downstream)
| Sistema downstream | Qué recibe del censo |
|-------------------|---------------------|
| T0-01 Identidad Digital | Base de datos de ciudadanos para enrolamiento biométrico |
| T2-03 Bonos Ciudadanos | Registro de los 40M accionistas elegibles |
| T1-03 Telemedicina | Mapa de necesidades de salud por territorio |
| T3-01 E-Gobierno | Registro de ciudadanos para servicios digitales |
| T3-03 Fiscal | Base de contribuyentes potenciales |
| T3-06 Pensiones | Registro de jubilados y trabajadores activos |
| T4-02 EdTech | Mapeo de brechas educativas y de talento |
| Equipo Ejecutor | Pipeline de candidatos por rol crítico |
| Subsidios Focalizados | Identificación de beneficiarios por necesidad real |
| Infraestructura | Datos de dónde construir hospitales, escuelas, carreteras |

### Referencias internacionales
| País | Modelo | Lección |
|------|--------|---------|
| **India (Aadhaar + SECC)** | Socio-Economic Caste Census + Aadhaar linkage. 1.4B personas registradas con biométricos en 5 años | Escala masiva con biométricos. India empezó con censo para saber quién necesitaba subsidios, LUEGO hizo identidad digital |
| **Ruanda (post-genocidio)** | Censo de 2002 fue el primer acto de reconstrucción. Necesitaban saber quién sobrevivió, dónde estaban, qué necesitaban | Sin censo no pudieron planificar nada. El censo habilitó la asignación de ayuda humanitaria y luego la planificación del desarrollo |
| **Estonia (e-Census 2021)** | Censo 100% digital basado en registros administrativos. Cero censistas de campo. Datos cruzados de 20+ registros del gobierno | Venezuela no tiene los registros administrativos de Estonia, pero puede combinar campo + digital. A largo plazo, migrar a censo basado en registros |
| **Brasil (IBGE Censo 2022)** | 200M personas censadas. App de censista + auto-respuesta web. 190K censistas con tablets | Modelo de escala comparable. Brasil usó tablets con GPS, formularios offline-first, y auto-registro web como complemento |
| **Colombia (DANE Censo 2018)** | 48M personas. Tablets + GPS. Dashboard en tiempo real del avance. Identificó 7M venezolanos en su territorio | Modelo LATAM cercano. DANE puede ser partner técnico para el censo venezolano |

### Costo estimado
| Componente | Costo |
|------------|-------|
| Desarrollo de plataforma (app censista + portal + dashboard + APIs) | USD 3-8M |
| Tablets para 30-50K censistas (USD 150-200 c/u) | USD 5-10M |
| Logística de campo (transporte, coordinación, supervisión) | USD 10-20M |
| Starlink para centros de registro rurales | USD 2-5M |
| Campaña de comunicación (radio, TV, redes sociales, diáspora) | USD 3-5M |
| Personal de campo (salarios censistas 3-6 meses) | USD 15-30M |
| Operación continua (post-censo, mantenimiento, actualizaciones) | USD 3-5M/año |
| **TOTAL** | **USD 38-78M** |

### Por qué NO es simplemente "el módulo de registro" de identidad digital
El censo y la identidad digital son **sistemas complementarios pero distintos**:

| | Censo | Identidad Digital |
|--|-------|------------------|
| **Propósito** | Saber quién está, dónde, qué necesita, qué sabe hacer | Verificar que eres quien dices ser |
| **Datos** | Demográficos, empleo, vivienda, salud, educación, necesidades | Biométricos, firma digital, autenticación |
| **Cobertura** | 100% de la población (obligatorio) | Gradual (voluntario al principio) |
| **Actualización** | Continua (registro abierto) | On-demand (cuando necesitas verificarte) |
| **Salida** | Estadísticas, planificación, asignación de recursos | Token de identidad, KYC, firma electrónica |
| **Timeline** | Arranca semana 1 (es recoger datos) | Arranca mes 1-3 (requiere infraestructura biométrica) |
| **Relación** | El censo genera la **base de datos** que identidad digital **autentica** | Identidad digital **verifica** lo que el censo **registró** |

---

## T0-01: Identidad Digital (Cédula Digital)

**Repo sugerido:** `venezuela-sa/identity-platform`

### Descripción
Sistema de identidad digital biométrica (huella + facial) para 40M ciudadanos. Es el **sistema fundacional** — sin identidad digital no hay KYC, no hay fintech, no hay e-gobierno, no hay votación, no hay nada. Equivalente al Aadhaar de India o el eID de Estonia.

### Qué construir
- API de verificación de identidad (REST + GraphQL)
- SDK para integración de terceros (fintechs, gobierno, privados)
- App móvil de ciudadano (iOS/Android) con firma digital
- Portal de enrolamiento biométrico para puntos de registro
- Base de datos biométrica en cloud con encriptación end-to-end
- Sistema de firma electrónica legalmente vinculante
- Motor de deduplicación biométrica (evitar identidades duplicadas)

### Mercado objetivo
- **Primario:** 40M ciudadanos venezolanos (residentes + diáspora)
- **Secundario:** Fintechs, bancos, aseguradoras que necesitan KYC instantáneo
- **Terciario:** Gobierno (autenticación para trámites)

### Estándares a cumplir
| Estándar | Descripción |
|----------|-------------|
| ISO/IEC 19795 | Biometric performance testing |
| ISO/IEC 24745 | Biometric template protection |
| eIDAS (EU) | Marco de identidad digital (referencia) |
| NIST SP 800-63-3 | Digital Identity Guidelines (niveles AAL1-3) |
| GDPR / LGPD | Protección de datos personales |
| FIDO2/WebAuthn | Autenticación sin contraseña |
| W3C DID | Decentralized Identifiers (para interoperabilidad) |

### KPIs
| Métrica | Meta Año 1 | Meta Año 3 | Meta Año 7 |
|---------|-----------|-----------|-----------|
| Ciudadanos registrados | 10M | 30M | 40M (100%) |
| Tiempo de verificación KYC | <2 minutos | <30 segundos | <10 segundos |
| Uptime del servicio | 99.9% | 99.95% | 99.99% |
| Integraciones de terceros | 10 | 100 | 500+ |
| Transacciones de verificación/día | 100K | 1M | 5M |
| Tasa de deduplicación | >99.9% | >99.99% | >99.99% |
| Falsos positivos biométricos | <0.1% | <0.01% | <0.001% |

### Dependencias
- Ninguna (es la raíz del árbol de dependencias)

### Referencias
- India Aadhaar: 1.4B registros, UIDAI
- Estonia eID + e-Residency
- Proveedores: Thales, IDEMIA, Jumio, Onfido

### Costo estimado
- Setup: USD 50-100M
- Operación: USD 10-20M/año

---

## T0-02: X-Road Venezolano (Backbone de Interoperabilidad)

**Repo sugerido:** `venezuela-sa/xroad-platform`

### Descripción
Capa de interoperabilidad entre todos los sistemas del Estado y Venezuela S.A. Implementa el principio **once-only**: un dato se ingresa una vez y todos los sistemas autorizados lo consumen. Es la "fontanería" que conecta identidad, impuestos, salud, justicia, propiedad, finanzas.

### Qué construir
- Gateway central de intercambio de datos (protocolo X-Road adaptado)
- Service catalog con registro de APIs gubernamentales
- Sistema de control de acceso basado en roles (RBAC) + atributos (ABAC)
- Logs de auditoría inmutables (quién accedió a qué dato, cuándo)
- Portal de developers para integración de servicios
- SDK en múltiples lenguajes (Python, Node, Java, Go)
- Dashboard de monitoreo de servicios (health, latency, throughput)

### Mercado objetivo
- **Primario:** Ministerios y entidades de gobierno (15 ministerios fusionados)
- **Secundario:** Venezuela S.A. y sus subsidiarias
- **Terciario:** Empresas privadas que necesitan datos verificados del Estado

### Estándares a cumplir
| Estándar | Descripción |
|----------|-------------|
| X-Road v7 | Protocolo de interoperabilidad de Estonia (open source) |
| OAuth 2.0 / OpenID Connect | Autenticación y autorización |
| FHIR (HL7) | Para datos de salud |
| UBL 2.1 | Para documentos comerciales/fiscales |
| ISO 27001 | Gestión de seguridad de la información |
| OWASP API Security Top 10 | Seguridad de APIs |

### KPIs
| Métrica | Meta Año 1 | Meta Año 3 | Meta Año 7 |
|---------|-----------|-----------|-----------|
| Servicios conectados | 20 | 100 | 300+ |
| Transacciones/día | 500K | 5M | 50M |
| Latencia promedio | <500ms | <200ms | <100ms |
| Uptime | 99.9% | 99.95% | 99.99% |
| Entidades integradas | 10 | 50 | 100+ |
| Datos duplicados eliminados | 30% | 70% | 95% |

### Dependencias
- T0-01 (Identidad Digital) — para autenticación de servicios

### Costo estimado
- Setup: USD 20-50M
- Operación: USD 5-10M/año

---

## T0-03: Blockchain Pública (Transparencia Financiera del Estado)

**Repo sugerido:** `venezuela-sa/transparency-blockchain`

### Descripción
Blockchain permisionada donde se registra **cada transacción financiera del gobierno**: presupuesto, contratos, pagos, fondo soberano, nómina, activos. Cualquiera de los 40M ciudadanos puede auditar en tiempo real. Incluye capa de IA para detección de corrupción.

### Qué construir
- Nodo de blockchain permisionada (Hyperledger Besu o Polygon Edge)
- Smart contracts para:
  - Registro de transacciones presupuestarias
  - Milestone payments en contratos de infraestructura
  - Control de concentración en bonos ciudadanos (cap 0.1% por persona)
- Oráculos de precios (Chainlink) para benchmarking automático
- API pública de consulta (read-only para ciudadanos)
- Indexador de datos on-chain para queries rápidas
- 5 modelos de ML para detección de corrupción:
  1. Detección de anomalías (transacciones fuera de patrón)
  2. Graph Neural Networks (empresas de maletín, testaferros)
  3. Predicción de riesgo (contratos con alta probabilidad de fraude)
  4. NLP sobre contratos (cláusulas inusuales)
  5. Price matching (sobrecostos vs. mercado)

### Mercado objetivo
- **Primario:** 40M ciudadanos (auditoría pública)
- **Secundario:** Fiscalía, Contraloría, Fiscal del Fondo
- **Terciario:** Inversores internacionales (due diligence)

### Estándares a cumplir
| Estándar | Descripción |
|----------|-------------|
| Open Contracting Data Standard (OCDS) | Formato de datos de contratación pública |
| EITI (Extractive Industries Transparency Initiative) | Transparencia de industrias extractivas |
| Santiago Principles (IFSWF) | Gestión de fondos soberanos |
| Norway NBIM Transparency Model | Referencia de transparencia de fondo soberano |
| ISO 22739 | Blockchain terminology and concepts |
| FATF Travel Rule | Para transacciones financieras |

### KPIs
| Métrica | Meta Año 1 | Meta Año 3 | Meta Año 7 |
|---------|-----------|-----------|-----------|
| Transacciones registradas on-chain/día | 10K | 100K | 1M |
| Anomalías detectadas por IA/mes | Report mensual | <48h de detección | <24h tiempo real |
| Contratos públicos en blockchain | 50% | 90% | 100% |
| Ciudadanos que consultan/mes | 100K | 1M | 5M |
| Falsos positivos de IA | <20% | <10% | <5% |
| Ahorro por corrupción prevenida (USD/año) | $100M | $500M | $1-3B |
| Tiempo de block finality | <5 seg | <3 seg | <2 seg |

### Dependencias
- T0-01 (Identidad Digital) — para verificar ciudadanos que consultan
- T0-02 (X-Road) — para recibir datos de transacciones de ministerios

### Referencias
- ProZorro (Ucrania): redujo corrupción 40%, ahorró USD 6B en 3 años
- KONEPS (Corea del Sur): 50% reducción de corrupción
- Norway NBIM: transparencia total de fondo soberano

### Costo estimado
- Setup: USD 50-100M
- IA Anti-Corrupción: USD 5-10M/año (30-50 ingenieros)
- Operación total: USD 15-30M/año
- ROI estimado: 50-100x (prevención de USD 1-3B/año en corrupción)

---

## T1-01: Dashboard de Transparencia

**Repo:** `venezuela-sa/transparency-dashboard`

### Por qué es crítico

Venezuela ocupa el puesto **177 de 180** en el Índice de Percepción de Corrupción de [Transparency International (2024)](https://www.transparency.org/cpi2024). Durante los últimos 25 años, más de **USD 300-500B** fueron desviados, robados o mal administrados sin que ningún ciudadano pudiera verificar una sola transacción.

Sin este dashboard:
- Los 40M de ciudadanos-accionistas no pueden auditar a Venezuela S.A. ni al gobierno
- Los inversores internacionales no tienen due diligence verificable — no invierten
- El fondo soberano opera como caja negra
- Las anomalías detectadas por la blockchain/IA no llegan al ciudadano común
- La promesa de "transparencia total" queda en discurso, no en producto

**Este es el primer entregable tecnológico visible del plan.** Si en los primeros 21 días un venezolano puede abrir su teléfono y ver cuánto dinero entró, cuánto se gastó y en qué — la confianza empieza a construirse.

### Descripción

Portal web público, open source, responsive y mobile-first que visualiza en tiempo real: presupuesto del gobierno (asignado vs. ejecutado por entidad), avance de proyectos de infraestructura en mapa interactivo, balance y rendimiento del fondo soberano, estado de cada contrato público, ranking de proveedores, y alertas de anomalías detectadas por el sistema de IA anti-corrupción. Funciona como PWA con capacidad offline para zonas con conectividad intermitente. Arranca con datos mock en la semana 2 y conecta datos reales progresivamente.

### Qué construir

#### Módulo 1: Motor de Visualización Presupuestaria
- Dashboard principal con presupuesto nacional desglosado por: ministerio, programa, proyecto, partida
- Comparación asignado vs. ejecutado en tiempo real (barras, treemaps, sankeys)
- Drill-down desde nivel nacional hasta nivel de transacción individual
- Indicadores semáforo: verde (<90% ejecutado), amarillo (90-110%), rojo (>110% o <50%)
- Export de datos visibles a CSV/PDF para periodistas e investigadores

#### Módulo 2: Tracker de Proyectos de Infraestructura (mapa)
- Mapa interactivo (Mapbox/Leaflet) con cada proyecto georeferenciado
- Capas por tipo: carreteras, hospitales, escuelas, energía, agua, telecoms
- Ficha por proyecto: contratista, monto, plazo, avance %, hitos completados, fotos/video
- Alertas automáticas: proyecto con >30 días de retraso, sobrecosto >20%
- Integración futura con imágenes satelitales (Planet Labs)

#### Módulo 3: Dashboard del Fondo Soberano
- Balance total del fondo en tiempo real (USD)
- Composición del portafolio: renta fija, renta variable, alternativos, efectivo
- Rendimiento: diario, mensual, trimestral, anual, desde inception
- Benchmark: comparación con Norway GPFG, Abu Dhabi ADIA, Chile PRF
- Proyección: a este ritmo, cuánto habrá en 5, 10, 15 años

#### Módulo 4: Explorador de Contratos y Búsqueda
- Motor de búsqueda full-text sobre todos los contratos públicos
- Ficha de proveedor: historial de contratos, montos acumulados, desempeño, alertas
- Red de relaciones: quién más es socio/director de este proveedor (graph visualization)
- Formato OCDS (Open Contracting Data Standard) para interoperabilidad internacional

#### Módulo 5: Feed de Alertas de Anomalías
- Feed en tiempo real de anomalías detectadas por los 5 modelos de IA (T0-03)
- Clasificación por severidad: crítica, alta, media, informativa
- Link a la transacción/contrato en blockchain para verificación ciudadana

#### Módulo 6: API de Datos Abiertos
- API REST + GraphQL con documentación OpenAPI 3.0
- Formatos: JSON, CSV, SDMX
- Portal de developers con sandbox, API keys, ejemplos de código
- Webhook system: suscribirse a eventos (nuevo contrato, nueva anomalía, hito completado)

#### Módulo 7: Sistema de Notificaciones Push
- Notificaciones push (PWA + email) configurables por ciudadano
- Canal de Telegram/WhatsApp bot para ciudadanos sin app
- RSS feed para periodistas

### Mercado objetivo
- **Primario:** 40M ciudadanos venezolanos (residentes + diáspora) — auditores del gasto público
- **Secundario:** Periodistas investigativos, investigadores académicos, ONGs de transparencia (TI, Provea, CEPAZ)
- **Terciario:** Inversores internacionales (due diligence), organismos multilaterales (BID, Banco Mundial, FMI)

### Estándares a cumplir

| Estándar | Descripción | Por qué |
|----------|-------------|---------|
| WCAG 2.1 AA | Accesibilidad web | 40M usuarios incluyen personas con discapacidad |
| Open Data Charter | 6 principios de datos abiertos | Legitimidad internacional del portal |
| OCDS | Open Contracting Data Standard | Comparabilidad con ProZorro, KONEPS, ChileCompra |
| PWA Standards (W3C) | Progressive Web App | Funcionalidad offline para zonas con Starlink intermitente |
| OpenAPI 3.0 | Especificación de API REST | Documentación automática, interoperabilidad |
| EITI | Transparencia de industrias extractivas | Requisito para legitimidad del sector petrolero |
| Santiago Principles | Gobernanza de fondos soberanos | Dashboard del fondo debe cumplir lo que Norway NBIM cumple |

### KPIs

| Métrica | Meta Semana 3 | Meta Mes 3 | Meta Año 1 | Meta Año 3 |
|---------|--------------|-----------|-----------|-----------|
| **MVP en producción** | Desplegado con datos mock | Datos reales parciales | Datos reales completos | — |
| **Usuarios únicos/mes** | 10K | 100K | 500K | 2M+ |
| **Datasets publicados** | 5 | 20 | 50 | 200+ |
| **Tiempo de carga (P95)** | <3s | <2s | <1.5s | <1s |
| **Lighthouse score** | >80 | >85 | >90 | >95 |
| **Contratos visibles** | 0 (mock) | 20% | 80% | 100% |
| **Alertas de anomalía publicadas** | 0 | 50+ | 500+ | 2,000+/año |
| **API requests/día** | 1K | 10K | 100K | 500K+ |

### Operación del sistema

| Componente | Detalle |
|------------|---------|
| **Equipo de desarrollo** | 8-12 ingenieros: 3 frontend, 2 backend, 1 data engineer, 1 DevOps, 1 UX/UI, 1 PM, 1 QA |
| **Equipo de operación** | 4-6 personas: 2 SRE, 1 data analyst, 1 content/comms, 1 PM |
| **Infraestructura** | Cloud (AWS/GCP): CDN, serverless backend, PostgreSQL + Redis. USD 3-8K/mes al inicio, USD 10-30K/mes a escala |
| **Seguridad** | WAF, DDoS protection (Cloudflare), penetration testing trimestral, bug bounty |
| **Disponibilidad** | 99.9% uptime target. Multi-region deployment |

### Timeline de ejecución

```
Día 1-3:      Setup del repo, CI/CD, design system, wireframes
Día 4-7:      Módulo 1 MVP (presupuesto con datos mock) + Módulo 6 (API básica)
Día 8-12:     Módulo 2 (mapa de proyectos) + Módulo 3 (fondo soberano)
Día 13-16:    Módulo 4 (explorador de contratos) + Módulo 7 (notificaciones)
Día 17-19:    Módulo 5 (feed de anomalías — estructura sin datos reales)
Día 20-21:    QA, performance, accessibility audit, deploy a producción
              >>> LANZAMIENTO PÚBLICO — MVP con datos mock <<<
Semana 4-8:   Conexión progresiva a datos reales (X-Road, blockchain en staging)
Mes 3-6:      API completa, portal de developers, primeras integraciones
```

### Dependencias
- **T0-03 (Blockchain Pública)** — fuente primaria de datos transaccionales. **NO es bloqueante**: arranca con datos mock
- **T0-02 (X-Road)** — para recibir datos de entidades gubernamentales
- **Starlink** — para acceso en zonas rurales

### Lo que habilita (downstream)

| Sistema / Actor downstream | Qué recibe del dashboard |
|---------------------------|--------------------------|
| **40M ciudadanos** | Capacidad de auditar cada bolívar/dólar del gasto público desde su teléfono |
| **Periodistas** | Datos estructurados para investigaciones (API + datasets descargables) |
| **Inversores internacionales** | Due diligence verificable sobre gobernanza y transparencia |
| **BID / Banco Mundial / FMI** | Evidencia de reformas de gobernanza para desbloquear préstamos |
| **T2-03 Bonos Ciudadanos** | Los accionistas pueden ver el rendimiento del fondo y sus dividendos |
| **Rating agencies** | Transparencia fiscal verificable para mejorar calificación soberana |

### Referencias internacionales

| País / Sistema | Resultado | Fuente |
|---------------|-----------|--------|
| **Ucrania (ProZorro)** | Ahorro USD 6B en 3 años. Corrupción en compras -40%. Modelo exportado a 15 países | [prozorro.gov.ua](https://prozorro.gov.ua/en) |
| **UK (data.gov.uk)** | #1 en Open Data Barometer. 55,000+ datasets | [data.gov.uk](https://data.gov.uk/) |
| **EE.UU. (USASpending.gov)** | 500K+ usuarios/mes. Cada dólar del gobierno federal rastreable | [usaspending.gov](https://www.usaspending.gov/) |
| **Corea del Sur (KONEPS)** | Corrupción en compras -50%. USD 8B/año en ahorro | [pps.go.kr](https://www.pps.go.kr/) |
| **Georgia (2004-2012)** | De top 10 más corruptos a top 30 menos corruptos en 8 años | [Transparency International](https://www.transparency.org/) |
| **Noruega (NBIM)** | USD 1.7T gestionados con transparencia total | [nbim.no](https://www.nbim.no/) |

### Costo estimado

| Componente | Costo |
|------------|-------|
| Diseño UX/UI + prototipos | USD 30-50K |
| Desarrollo MVP 21 días (8-12 ingenieros) | USD 100-200K |
| Infraestructura cloud (primer año) | USD 40-100K |
| QA + accessibility + security audit | USD 20-40K |
| Portal de developers + API docs | USD 15-30K |
| Bug bounty program (primer año) | USD 10-20K |
| **TOTAL MVP** | **USD 235-490K** |
| Operación anual post-lanzamiento | **USD 50-100K/año** |

---

## ~~T1-02: Censo Digital de Diáspora~~ → Absorbido en T0-00

> **NOTA:** El censo de diáspora ya no es un sistema independiente. Es el **Módulo 2** del Sistema Nacional de Censo Digital (T0-00). Ver sección T0-00 arriba para la especificación completa del módulo de diáspora, incluyendo: auto-registro global, perfil profesional, intención de inversión/retorno, matching talento-oportunidades, mapa de calor interactivo, y programa de referidos.
>
> Los KPIs de diáspora se miden dentro del T0-00:
> - Meta mes 3: 1M registrados
> - Meta año 1: 4M registrados (50%+)
> - Meta año 3: 6M registrados (75%+)

---

## T1-03: Plataforma de Telemedicina

**Repo:** `venezuela-sa/telehealth-platform`

### Por qué es crítico

Venezuela tiene una emergencia humanitaria de salud activa. Mortalidad materna: **259 por 100,000** nacidos vivos (4x el promedio LATAM). Mortalidad infantil: **25.7 por 1,000** (casi el doble regional). Solo quedan **~8 médicos por 10,000 habitantes** (vs. 22 promedio LATAM) porque **30,000+ médicos emigraron**. El 80% de los hospitales están no-funcionales. El gasto en salud es **USD 25 per cápita/año** — un chileno tiene USD 1,300.

**Los hospitales toman 3-5 años en rehabilitar. La telemedicina cierra la brecha de atención primaria en 30 días.** Un médico venezolano en Madrid puede diagnosticar una infección urinaria por videollamada y prescribir antibióticos hoy mismo.

### Descripción

Plataforma integral de telemedicina que conecta a 25M+ venezolanos sin acceso adecuado a salud con 30,000+ médicos venezolanos en la diáspora, mediante videoconsulta, triage por IA, prescripción digital con código QR, e historia clínica electrónica interoperable (FHIR). El MVP arranca en 30 días usando wrappers sobre infraestructura existente (Zoom SDK / WhatsApp Business API). El triage por IA resuelve el 60-70% de consultas de atención primaria sin necesidad de médico. Costo por consulta: USD 3-10 (vs. USD 50-150 presencial en LATAM).

### Qué construir

#### Módulo 1: App de Paciente (Triage + Video)
- App móvil (React Native/Flutter) — iOS + Android, <30MB, funciona en Android 8+
- Onboarding: registro con cédula o teléfono, perfil de salud básico
- Chatbot de triage IA: recoge síntomas en lenguaje natural (español venezolano), clasifica urgencia:
  - **Verde:** auto-resolución (consejo + farmacia sin receta). ~40% de consultas
  - **Amarillo:** requiere médico (agenda videoconsulta). ~30%
  - **Naranja:** urgente (derivación a ambulatorio/hospital). ~20%
  - **Rojo:** emergencia (llame 911 / vaya a urgencias). ~10%
- Videoconsulta: sala de espera virtual, llamada con médico, compartir fotos
- Post-consulta: resumen, prescripción digital, recordatorios de medicación

#### Módulo 2: Portal de Médico (Agenda + Prescripciones + EHR)
- Dashboard web + app móvil para médicos de la diáspora
- Verificación de credenciales: integración con colegios médicos venezolanos
- Prescripción digital: formulario con autocompletar (ICD-11 + SNOMED CT), genera QR único
- Panel de ingresos: consultas realizadas, pagos recibidos
- Peer review: casos complejos compartidos (anonimizados) con colegas

#### Módulo 3: Motor de Triage IA
- LLM fine-tuned en medicina general en español (basado en modelos open source)
- Módulo de dermatología visual: clasificación de lesiones cutáneas por foto (CNN)
- Módulo de salud mental: screening PHQ-9 (depresión), GAD-7 (ansiedad)
- Safety net: si confianza <70%, escala a médico automáticamente
- Meta de precisión: >85% concordancia con diagnóstico de médico humano en año 1

#### Módulo 4: Sistema de Prescripción Digital (QR)
- Base de datos de medicamentos disponibles en Venezuela (actualizada semanalmente)
- QR único por prescripción: verificación en farmacia, evita reutilización
- Alertas automáticas: interacción medicamentosa, alergia conocida, dosis fuera de rango
- Exportación a formato HL7 FHIR para interoperabilidad

#### Módulo 5: Historia Clínica Electrónica (FHIR)
- EHR cloud-native basada en HL7 FHIR R4
- Acceso del paciente: puede ver toda su historia clínica desde la app
- Interoperabilidad: cualquier sistema compatible con FHIR puede consultar/escribir datos
- Encriptación AES-256 at rest, TLS 1.3 in transit
- Meta: ser el primer EHR nacional de Venezuela

#### Módulo 6: Gateway de Pagos
- Pago por consulta: USD 3-10 (variable por especialidad)
- Métodos: tarjeta, Pix-VE (T1-04), wallet digital, stablecoins (USDC)
- Comisión plataforma: 15-20% sobre el pago al médico
- Proyección: 5M consultas/año x USD 5 promedio = USD 25M revenue bruto

#### Módulo 7: Integración con Farmacias
- Geolocalización: paciente ve qué farmacia cercana tiene el medicamento en stock
- Dispensación digital: farmacia escanea QR, marca como dispensada
- Analytics: qué medicamentos se prescriben más, dónde hay desabastecimiento

#### Módulo 8: Modo Offline
- Captura de síntomas, fotos, y datos vitales sin conexión
- Modelo de IA ligero embebido en app (TensorFlow Lite / ONNX) para clasificación básica
- Sincronización cuando hay red (Starlink)

### Mercado objetivo
- **Primario:** 25M+ venezolanos sin acceso adecuado a atención primaria (80% de la población)
- **Secundario:** 30,000+ médicos venezolanos en la diáspora — proveedores con horarios flexibles y pago en USD
- **Terciario:** Farmacias locales (dispensación digital), gobierno (datos epidemiológicos agregados)
- **Cuaternario:** Exportable a otros países en crisis sanitaria

### Estándares a cumplir

| Estándar | Descripción | Por qué |
|----------|-------------|---------|
| HL7 FHIR R4 | Interoperabilidad de datos de salud | Sin FHIR, la historia clínica no sirve fuera de la plataforma |
| ICD-11 (OMS) | Clasificación internacional de enfermedades | Habilita epidemiología y estadísticas |
| SNOMED CT | Terminología clínica | Precisión en descripción de condiciones |
| HIPAA (referencia) | Privacidad de datos de salud | Benchmark de seguridad de datos de salud |
| ISO 13131:2021 | Servicios de telemedicina | Marco de calidad específico para telemedicina |
| FDA Digital Health | Software como dispositivo médico | El triage IA clasifica como SaMD |
| WCAG 2.1 AA | Accesibilidad | Pacientes con discapacidad deben poder usar el triage |

### KPIs

| Métrica | Meta Día 30 | Meta Mes 6 | Meta Año 1 | Meta Año 3 |
|---------|------------|-----------|-----------|-----------|
| **MVP en producción** | Desplegado (Zoom wrapper) | Plataforma propia v1 | Plataforma completa | Escala regional |
| **Consultas/mes** | 50K | 200K | 400K | 1.7M |
| **Médicos activos** | 500 | 2,000 | 5,000 | 15,000 |
| **Resolución por IA (sin médico)** | 40% | 50% | 60% | 70% |
| **Satisfacción paciente** | >3.5/5 | >3.8/5 | >4.0/5 | >4.3/5 |
| **Tiempo de espera promedio** | <60 min | <30 min | <15 min | <10 min |
| **Costo promedio/consulta** | USD 10 | USD 8 | USD 5 | USD 3 |
| **Precisión del triage IA** | 75% | 80% | 85% | 92% |
| **Farmacias integradas** | 50 | 500 | 2,000 | 5,000+ |

### Operación del sistema

| Componente | Detalle |
|------------|---------|
| **Equipo de desarrollo** | 15-20 personas: 4 mobile, 3 backend, 2 IA/ML, 2 data engineers, 1 DevOps, 1 UX/UI medical, 1 PM, 1 QA, 1 medical advisor |
| **Equipo de operación** | 25-40 personas: 3 SRE, 5 devs, 3 ML engineers, 5 medical quality, 3 ops farmacias, soporte |
| **Infraestructura** | Cloud HIPAA-eligible: video via WebRTC (Twilio/Vonage), EHR en FHIR server, ML inference GPUs |
| **Calidad médica** | Comité asesor (5 especialistas), auditoría de 10% de consultas |
| **Disponibilidad** | 99.5% año 1, 99.9% año 3. Fallback a WhatsApp/Zoom si plataforma falla |

### Timeline de ejecución

```
Día 1-3:      Selección de stack, setup repo, CI/CD, diseño UX
Día 4-7:      MVP v0: wrapper sobre Zoom SDK + formulario de triage básico
Día 8-14:     Piloto en 3 centros comunitarios con Starlink (Caracas, Maracaibo, Barquisimeto)
Día 15-21:    Iteración basada en feedback. Prescripción digital v1 (QR básico)
Día 22-30:    Escalamiento a 500 médicos, 20 centros comunitarios
              >>> LANZAMIENTO PÚBLICO — MVP funcional, 50K consultas/mes <<<
Mes 2-3:      Triage IA v1 + App propia v1 reemplaza Zoom wrapper
Mes 3-6:      EHR básico (FHIR) + integración con 50 farmacias + gateway de pagos
Mes 6-12:     Triage IA v2 (ML con datos reales) + modo offline v1
Año 1-2:      Escalamiento a 15,000 médicos. Módulo salud mental + materno-infantil
Año 2-3:      Exportación del modelo a otros países (licencia SaaS). 1.7M consultas/mes
```

### Dependencias
- **Starlink desplegado** en centros comunitarios — **NO bloqueante**: MVP arranca en zonas urbanas con internet existente
- **Smartphones** — ~70% penetración. Para el 30% restante: centros comunitarios con tablets compartidas
- **T0-01 (Identidad Digital)** — **NO bloqueante**: puede usar cédula + selfie como KYC básico
- **T1-04 (Pagos Instantáneos)** — **NO bloqueante**: puede usar pagos con tarjeta / Zelle / cripto
- **Marco legal de telemedicina** — puede operar como "consulta de orientación" hasta que exista ley formal

### Lo que habilita (downstream)

| Sistema / Actor downstream | Qué recibe de la plataforma |
|---------------------------|----------------------------|
| **25M+ pacientes** | Acceso a atención primaria por primera vez en años |
| **30,000 médicos diáspora** | Canal de contribución profesional + ingreso en USD sin retornar |
| **Datos epidemiológicos** | Primera base de datos de salud poblacional en tiempo real |
| **Hospitales PPP (futuro)** | Datos de demanda por zona determinan dónde construir/rehabilitar |
| **Industria farmacéutica local** | Datos de prescripción revelan qué medicamentos fabricar localmente |
| **Micro-seguros de salud** | Historial clínico digital habilita underwriting |
| **OMS / OPS** | Datos anonimizados para monitoring epidemiológico regional |

### Referencias internacionales

| País / Sistema | Resultado | Fuente |
|---------------|-----------|--------|
| **India (eSanjeevani)** | **150M+ consultas** acumuladas. 400,000+ consultas/día en pico. Opera en 36 estados | [esanjeevani.mohfw.gov.in](https://esanjeevani.mohfw.gov.in/) |
| **Colombia (1Doc3)** | 10M+ consultas. Modelo adaptado a LATAM (español, precios accesibles) | [1doc3.com](https://www.1doc3.com/) |
| **Rwanda (Babyl)** | 2M+ usuarios (20% de población). Opera con teléfono básico — sin internet | [babyl.rw](https://www.babyl.rw/) |
| **Estonia (Digilugu)** | 99% de prescripciones son digitales. Cualquier médico accede al historial con consentimiento | [digilugu.ee](https://www.digilugu.ee/) |
| **Brasil (Doctoralia/Conexa)** | 30M+ pacientes/mes en LATAM. 10x crecimiento tele post-COVID | [doctoralia.com.br](https://www.doctoralia.com.br/) |

### Costo estimado

| Componente | Costo |
|------------|-------|
| MVP (30 días): Zoom wrapper + triage básico + prescripción QR | USD 500K-1M |
| Plataforma propia v1 (meses 2-6) | USD 1-2M |
| EHR (FHIR) + integración farmacias (meses 3-9) | USD 500K-1M |
| Motor de triage IA v2 + modo offline (meses 6-12) | USD 500K-1M |
| Infraestructura cloud año 1 | USD 600K-1.5M |
| Equipo de calidad médica + comité asesor (año 1) | USD 300-500K |
| Soporte operativo año 1 | USD 500K-1M |
| **TOTAL MVP + AÑO 1** | **USD 4-8.5M** |
| **Revenue proyectado año 1** | **USD 5-10M** |
| **Revenue proyectado año 3** | **USD 20-40M** |

---

## T1-04: Sistema de Pagos Instantáneos (Pix-VE)

**Repo:** `venezuela-sa/instant-payments`

### Por qué es crítico

Venezuela es una economía **70-80% informal**. La mayoría de transacciones ocurren en efectivo (USD y bolívares en billetes), Zelle (producto de un banco estadounidense), y transferencias bancarias que tardan 24-48 horas. No existe infraestructura pública de pagos instantáneos.

Sin Pix-VE:
- **USD 1-3B/año en IVA se evaporan** porque transacciones en efectivo no dejan rastro fiscal
- No hay formalización de la economía (imposible cobrar IVA sobre transacciones que no existen digitalmente)
- No hay ecosistema fintech (sin rails de pagos, no hay fintechs)
- Las remesas de la diáspora (USD 3-5B/año) llegan por canales informales con comisiones del 7-15%

**Pix en Brasil formalizó USD 12B en transacciones que antes eran efectivo en sus primeros 2 años.** UPI en India llevó inclusión financiera a 300M de personas. Pix-VE puede hacer lo mismo para Venezuela.

### Descripción

Infraestructura pública de pagos instantáneos que permite transacciones en USD 24/7 entre cualquier cuenta bancaria, wallet digital o fintech. Gratis para P2P, micro-fee para comercios (0.1-0.5%). Interoperable por obligación regulatoria. Addressing por alias (teléfono, email o cédula). Motor de anti-fraude ML en tiempo real. Impacto fiscal: +USD 1-3B/año en IVA por formalización.

### Qué construir

#### Módulo 1: Core de Procesamiento (Clearing + Settlement)
- Motor de clearing en tiempo real: valida, autoriza y confirma en <2 segundos
- Settlement entre instituciones cada 15 minutos (no al cierre del día)
- Soporte multi-moneda: USD (primario), bolívares (secundario), stablecoins (futuro)
- Procesamiento de hasta 10,000 TPS año 1, escalable a 100,000 TPS
- Disaster recovery: RPO <1 min, RTO <5 min. Multi-datacenter activo-activo

#### Módulo 2: API Gateway (REST + ISO 20022)
- API REST para fintechs y neobancos + API ISO 20022 para bancos tradicionales
- Documentación OpenAPI 3.0 + portal de developers + sandbox
- Mutual TLS (mTLS) para comunicación entre instituciones y el core

#### Módulo 3: Sistema de Addressing (Alias)
- Un alias apunta a UNA cuenta (puede cambiarse)
- Resolución en <100ms
- Portabilidad: si el usuario cambia de banco, el alias lo sigue
- Privacidad: el pagador solo ve nombre parcial del beneficiario

#### Módulo 4: Generador/Lector de QR para Pagos
- QR estático (comercio fijo) + QR dinámico (por transacción con monto y referencia)
- Formato EMVCo: compatible con Pix, UPI, PromptPay
- QR imprimible: comercios informales pueden pegarlo en el mostrador

#### Módulo 5: Motor Anti-Fraude ML en Tiempo Real
- Análisis de cada transacción en <200ms
- Modelos: detección de anomalías, network analysis (lavado), account takeover, synthetic identity
- Scoring de riesgo 0-100. >80 = bloqueo automático + revisión manual
- Reportes SAR automáticos al regulador
- Meta: <0.01% tasa de fraude (benchmark: Pix Brasil 0.007%)

#### Módulo 6: Reporting para Banco Central
- Reportes regulatorios automatizados: volumen, liquidez, actividad sospechosa, disponibilidad
- Dashboard en tiempo real para el regulador

#### Módulo 7: SDK para Terceros
- SDK en JavaScript/TypeScript, Python, Java, Kotlin, Swift, Flutter/Dart
- Sandbox completo con datos de prueba
- Certificación obligatoria para cada app que integra el SDK

#### Módulo 8: Sistema de Disputas y Reversiones
- Flujo de disputa: pagador reclama → investigación → resolución en <7 días
- Reversion automática si procede. Solo transacciones <30 días

#### Módulo 9: Portal de Onboarding de Instituciones
- Registro de bancos, fintechs, cooperativas, wallets
- Proceso: aplicación → revisión regulatoria → sandbox → certificación → producción
- SLA por institución con penalidades por incumplimiento

### Mercado objetivo
- **Primario:** 40M ciudadanos venezolanos — pagos P2P gratuitos, reemplazo de efectivo y Zelle
- **Secundario:** 2-3M comercios — aceptar pagos digitales con comisión 10x menor que tarjetas
- **Terciario:** Gobierno — distribución de subsidios, recaudación fiscal automática
- **Cuaternario:** 7.9M diáspora — canal de remesas integrado (last mile vía Pix-VE)
- **TAM:** todas las transacciones monetarias de una economía de USD 82.8B

### Estándares a cumplir

| Estándar | Descripción | Por qué |
|----------|-------------|---------|
| ISO 20022 | Mensajería para transacciones financieras | Interoperabilidad con SWIFT gpi, SEPA, Fedwire |
| PCI DSS v4.0 | Seguridad de datos de pagos | Obligatorio para cualquier procesador |
| FATF AML/CFT | Anti-lavado y financiamiento del terrorismo | Sin compliance FATF → lista gris/negra |
| EMVCo QR | Estándar de pagos QR | Compatibilidad global (Pix, UPI, PromptPay) |
| SOC 2 Type II | Seguridad operativa | Auditoría de controles |
| BIS CPMI-IOSCO | Principios para infraestructuras financieras | El sistema de pagos es infraestructura crítica |
| OFAC Compliance | Sanciones de EE.UU. | Transacciones en USD requieren screening OFAC |

### KPIs

| Métrica | Meta Mes 3 | Meta Mes 6 | Meta Año 1 | Meta Año 3 |
|---------|-----------|-----------|-----------|-----------|
| **Instituciones conectadas** | 3 (piloto) | 5 | 20 | 50+ |
| **Usuarios registrados** | 500K | 2M | 10M | 25M |
| **Transacciones/mes** | 1M | 5M | 100M | 1B |
| **Valor transado/mes (USD)** | 50M | 500M | 5B | 30B |
| **Latencia (P99)** | <5s | <3s | <2s | <1s |
| **Uptime** | 99.5% | 99.9% | 99.95% | 99.99% |
| **Tasa de fraude** | <0.05% | <0.02% | <0.01% | <0.005% |
| **Comercios aceptando QR** | 10K | 50K | 500K | 2M+ |
| **Impacto fiscal (IVA adicional)** | — | — | +USD 500M | +USD 1-3B/año |
| **TPS capacidad** | 1,000 | 5,000 | 10,000 | 100,000 |

### Operación del sistema

| Componente | Detalle |
|------------|---------|
| **Equipo de desarrollo** | 30-50 personas: 8 backend (Go/Java/Rust), 4 frontend, 5 ML (anti-fraude), 3 data, 3 infra/SRE, 3 security, 2 QA, 2 PMs |
| **Equipo de operación** | 40-60 personas: 8 SRE (24/7 NOC), 5 compliance/AML, 5 onboarding instituciones, 3 disputas |
| **Infraestructura** | On-premise + cloud híbrido: 2 datacenters activo-activo, Kafka/Pulsar, PostgreSQL (Citus/CockroachDB), HSM. USD 500K-2M/mes |
| **NOC** | 24/7/365. Prometheus + Grafana + PagerDuty. Runbooks por tipo de incidente |
| **Seguridad** | SOC dedicado, pen testing trimestral, bug bounty, HSM para llaves, encriptación E2E |

### Timeline de ejecución

```
Mes 1:        Arquitectura, stack, equipo core. Sandbox operativo con 3 bancos piloto
Mes 2:        Core clearing v1 + API gateway v1 + addressing v1
Mes 3:        Anti-fraude v1 (reglas) + QR + portal de onboarding
              >>> PILOTO CONTROLADO — 3 bancos, 10,000 usuarios <<<
Mes 4-5:      Anti-fraude v2 (ML) + reporting regulatorio. 5 bancos
Mes 6:        >>> LANZAMIENTO PÚBLICO — P2P gratuito, QR en comercios <<<
Mes 7-9:      10+ instituciones. Disputas v1. Onboarding de fintechs
Mes 10-12:    20 instituciones. 100M tx/mes. Integración con T2-02 (remesas)
Año 2:        50+ instituciones. Cross-border piloto con Colombia
Año 3:        1B tx/mes. Interoperabilidad regional (CoDi México, Pix Brasil)
```

### Dependencias
- **Banco Central o autoridad regulatoria** — reglas de participación, obligatoriedad de conexión. **BLOQUEANTE** para producción
- **T0-01 (Identidad Digital)** — para addressing por cédula. **NO bloqueante**: puede usar teléfono como alias
- **OFAC / Tesoro de EE.UU.** — corredor especial o licencia general para transacciones en USD
- **Infraestructura de datacenters** — hardware dedicado para latencia ultra-baja
- **Marco legal** — ley que obligue a todos los bancos a conectarse (como hizo Brasil con Pix)

### Lo que habilita (downstream)

| Sistema / Actor downstream | Qué recibe de Pix-VE |
|---------------------------|----------------------|
| **40M ciudadanos** | Pagos instantáneos gratuitos. Fin de la dependencia de Zelle |
| **2-3M comercios** | Aceptar pagos digitales con comisión 10x menor que tarjetas |
| **Sistema fiscal (T3-03)** | Cada transacción digital es un dato fiscal. +USD 1-3B/año en IVA |
| **T2-01 Neo-Banca** | Rails de pagos instantáneos para transferencias interbancarias |
| **T2-02 Remesas** | Last-mile: remesa llega instantáneamente al beneficiario |
| **T1-03 Telemedicina** | Pagos de consultas en tiempo real |
| **T2-03 Bonos Ciudadanos** | Distribución de dividendos a 40M accionistas |
| **Ecosistema fintech** | SDK + API abiertas para que 100+ fintechs construyan sobre los rails |
| **Economía informal** | El buhonero, taxista, plomero pueden cobrar con QR impreso |

### Referencias internacionales

| País / Sistema | Resultado | Fuente |
|---------------|-----------|--------|
| **Brasil (Pix)** | **224M usuarios**. 4B tx/mes. Formalizó USD 12B+ en transacciones cash. Costo total: USD 500M | [bcb.gov.br/pix](https://www.bcb.gov.br/estabilidadefinanceira/pix) |
| **India (UPI)** | **16B tx/mes**. 350M+ usuarios. Inclusión financiera para 300M personas. Costo: USD 50M | [npci.org.in](https://www.npci.org.in/) |
| **México (CoDi → DiMo)** | CoDi FRACASÓ: solo 16M usuarios en 4 años por NO ser obligatorio y UX compleja | [banxico.org.mx](https://www.banxico.org.mx/) |
| **Tailandia (PromptPay)** | 24M+ usuarios activos. Formalizó economía informal significativamente | [bot.or.th](https://www.bot.or.th/) |
| **Nigeria (NIP/NIBSS)** | 5B+ tx/año. Base del boom fintech nigeriano (Paystack, Flutterwave) | [nibss-plc.com.ng](https://www.nibss-plc.com.ng/) |

### Costo estimado

| Componente | Costo |
|------------|-------|
| Core de procesamiento (clearing + settlement) | USD 8-15M |
| API gateway + portal developers + SDK | USD 3-5M |
| Addressing + QR | USD 2-3M |
| Motor anti-fraude ML (v1-v3) | USD 5-8M |
| Reporting regulatorio + compliance | USD 2-3M |
| Disputas + onboarding instituciones | USD 2-4M |
| Infraestructura (2 datacenters + cloud híbrido) | USD 5-10M |
| Seguridad (HSM, SOC, pen testing, certificaciones) | USD 3-5M |
| Equipo de desarrollo (50 personas x 12 meses) | USD 8-15M |
| QA + testing de integración con bancos | USD 2-3M |
| **TOTAL DESARROLLO (18 meses)** | **USD 44-80M** |
| Operación anual post-lanzamiento | **USD 15-25M/año** |
| **Impacto fiscal proyectado (año 3)** | **+USD 1-3B/año en IVA** |
| **ROI** | **20-60x** |

---

## T2-01: Plataforma Neo-Bancaria

**Repo:** `venezuela-sa/neobank-platform`

### Por qué es crítico

80% de los venezolanos no tiene acceso a banca moderna. Los bancos locales operan con core systems de los años 90, encaje legal del 73% que impide prestar, y están cortados de SWIFT por sanciones. El 65%+ de las transacciones ya son en USD físico — billetes que se deterioran, se roban y no generan datos fiscales.

**Venezuela es el mayor mercado desbancarizado de las Américas. Quien ponga la infraestructura, captura a 38M de clientes.**

### Descripción

Plataforma white-label de banca digital 100% en USD: cuenta, tarjeta virtual/física (Visa/Mastercard), transferencias, ahorro remunerado, scoring crediticio alternativo. Apertura de cuenta en 5 minutos. Cero sucursales. Diseñada para que fintechs internacionales (Nubank, Ualá, Mercado Pago, Revolut) operen sobre ella como operadores licenciados — Venezuela S.A. provee la infraestructura y cobra por transacción/cuenta, el sector privado opera y compite.

### Qué construir

#### Módulo 1: Cloud Banking Core
- Core bancario cloud-native sobre Mambu, Temenos Transact, o Thought Machine Vault
- Multi-tenancy: cada fintech operadora tiene su instancia aislada
- Motor de transacciones en tiempo real (<100ms)
- Reconciliación automática con reportes regulatorios

#### Módulo 2: Mobile App (Onboarding / Dashboard / Tarjeta)
- Onboarding en 5 minutos: selfie + foto de cédula → verificación biométrica contra T0-01
- Dashboard: saldo, movimientos, gráficos de gasto, metas de ahorro
- Gestión de tarjeta: activar/desactivar, límites, PIN, notificaciones push

#### Módulo 3: KYC Engine
- Niveles escalonados: Nivel 1 (selfie + cédula → USD 500/mes), Nivel 2 (biométrica → USD 5,000/mes), Nivel 3 (fuente de fondos → sin límite)
- Screening automático OFAC SDN, EU Sanctions, UN + PEP detection

#### Módulo 4: Card Issuance (Visa/Mastercard API)
- Tarjetas virtuales instantáneas (Apple Pay / Google Pay)
- Tarjetas físicas (partnership Marqeta/Galileo/GPS)
- Corredor OFAC específico negociado con Visa/Mastercard

#### Módulo 5: Savings & Remunerated Accounts
- Cuentas de ahorro en USD con rendimiento (2-4% anual, fondeado por treasuries)
- Micro-ahorro: redondeo automático de compras → cuenta de ahorro
- Integración con VIN (T2-03): canalizar ahorro a bonos ciudadanos

#### Módulo 6: Alternative Credit Scoring Engine
- Fuentes: historial de pagos de servicios, transacciones Pix-VE, recargas teléfono, e-commerce, ahorro en plataforma
- Score 300-850 (compatible con estándares internacionales)
- Explainability: el usuario ve POR QUÉ tiene su score y cómo mejorarlo
- Bias monitoring: auditoría trimestral de fairness

#### Módulo 7: Pix-VE Integration
- Registro de alias automático al abrir cuenta
- Pagos P2P instantáneos 24/7 sin costo
- Recepción de pagos de gobierno (subsidios, devoluciones)

#### Módulo 8: Compliance Panel (AML / Regulatory)
- Motor de AML en tiempo real: monitoreo con reglas + ML
- Reportes automáticos: STR, CTR
- OFAC screening cada 6 horas
- Case management con escalamiento automático

#### Módulo 9: Open Banking API
- API REST (OpenAPI 3.0) + OAuth 2.0 + OpenID Connect
- Developer portal con sandbox, SDKs
- Marketplace de integraciones: e-commerce, payroll, contabilidad

### Mercado objetivo
- **Primario:** 30M residentes sin banca moderna (80% sin cuenta funcional)
- **Secundario:** 7.9M diáspora (cuenta para remesas, inversión, VIN)
- **Operadores target:** Nubank, Ualá, Mercado Pago, Nequi, Revolut, Wise
- **Modelo:** Venezuela S.A. opera infraestructura. Fintechs operan marcas y relación con cliente. Estado regula

### Estándares a cumplir

| Estándar | Descripción |
|----------|-------------|
| PCI DSS v4.0 | Seguridad de datos de tarjetas de pago |
| FATF/GAFI Recommendations | Marco global anti-lavado |
| SOC 2 Type II | Controles de seguridad, disponibilidad, integridad |
| Basel III | Requisitos de capital y liquidez |
| OFAC Compliance | Corredor especial para operar Visa/MC desde Venezuela |
| ISO 27001 | Gestión de seguridad de la información |
| ISO 20022 | Mensajería para transacciones financieras |
| Open Banking (PSD2 ref.) | APIs abiertas, consentimiento del usuario |

### KPIs

| Métrica | Meta Mes 6 | Meta Año 1 | Meta Año 3 | Meta Año 5 |
|---------|-----------|-----------|-----------|-----------|
| **Cuentas abiertas** | 500K | 2M | 10M | 20M |
| **MAU** | 300K | 1.5M | 7M | 15M |
| **ARPU (USD/año)** | USD 50 | USD 100 | USD 150 | USD 200 |
| **Revenue total** | USD 15M | USD 200M | USD 600M | USD 1B |
| **Tiempo de onboarding** | <10 min | <7 min | <5 min | <3 min |
| **CAC** | USD 5 | USD 3 | USD 2 | USD 1.50 |
| **NPS** | >40 | >50 | >60 | >65 |
| **Credit scores generados** | 100K | 1M | 8M | 18M |
| **Uptime del core** | 99.9% | 99.95% | 99.99% | 99.99% |
| **Operadores fintech activos** | 2 | 5 | 10 | 15+ |

### Operación del sistema

| Componente | Detalle |
|------------|---------|
| **Equipo core** | 80-120 ingenieros + 20 compliance + 15 producto |
| **Core banking** | Mambu o Thought Machine — licencia SaaS |
| **Card processor** | Marqeta o Galileo + banco emisor licenciado (bin sponsor) |
| **Soporte L1** | Chatbot IA (70% resolución) + call center 24/7 |
| **Seguridad** | SOC 24/7, pen testing trimestral, bug bounty |
| **Regulatorio** | Equipo legal en Venezuela + US + EU para licencias y corredor OFAC |

### Timeline de ejecución

```
Mes 1-2:    Selección de core banking + card processor
Mes 2-4:    MVP: cuenta + onboarding + KYC Nivel 1 + transferencias P2P
Mes 3-5:    Negociación corredor OFAC para Visa/Mastercard
Mes 4-6:    Tarjeta virtual + integración Pix-VE
Mes 5-7:    Piloto con 1er operador fintech (50K usuarios)
Mes 6-9:    Tarjeta física + cuentas de ahorro + scoring alternativo v1
Mes 9-12:   Apertura a 2do y 3er operador + compliance panel completo
Año 1-2:    Open Banking API + marketplace + 5 operadores
Año 2-3:    Credit scoring maduro + productos de crédito vía operadores
Año 3-5:    15M MAU + corredor OFAC normalizado
```

### Dependencias
- **T0-01 (Identidad Digital)** — KYC biométrico. BLOQUEANTE para Nivel 2+
- **T1-04 (Pix-VE)** — transferencias P2P e interbancarias. BLOQUEANTE para Módulo 7
- **Corredor OFAC** — sin él no hay Visa/Mastercard ni SWIFT. BLOQUEANTE para Módulo 4
- **Regulación fintech** — sandbox o licencia de banco digital
- **Banco emisor licenciado (bin sponsor)** — para programa de tarjetas

### Lo que habilita (downstream)

| Sistema downstream | Qué recibe de Neo-Banca |
|-------------------|------------------------|
| T2-02 Remesas | Cuenta destino para recibir remesas |
| T2-03 Bonos Ciudadanos (VIN) | Canal de compra/venta y cuenta para dividendos |
| T2-04 e-Procurement | Pagos a proveedores vía cuenta digital |
| T3-03 Sistema Fiscal | Datos de transacciones para IVA |
| Fondo soberano | Canal de distribución de dividendos a 40M ciudadanos |
| Formalización económica | Cada transacción digital genera dato fiscal |

### Referencias internacionales

| País / Empresa | Resultado |
|----------------|-----------|
| **Nubank (Brasil)** | 100M+ clientes en 10 años. ARPU USD 200+. Valoración USD 45B+ |
| **Ualá (Argentina)** | 8M+ usuarios durante inflación de 200%. Creció DURANTE la crisis |
| **M-Pesa (Kenya)** | 50M+ usuarios. De 0% a 83% inclusión financiera en 15 años |
| **GCash (Filipinas)** | 94M usuarios (en país de 114M). Modelo para país con gran diáspora |
| **India UPI + Jan Dhan** | 430M cuentas abiertas en 3 años. Gobierno creó infraestructura, privados construyeron encima |

### Costo estimado

| Componente | Costo |
|------------|-------|
| Licencia core banking (setup + año 1) | USD 2-5M |
| Desarrollo de plataforma (app, APIs, KYC, scoring, compliance) | USD 8-15M |
| Integración card processor + Visa/MC | USD 2-4M |
| Corredor OFAC (legal + compliance) | USD 3-5M |
| Infraestructura cloud (año 1) | USD 2-4M |
| Equipo (año 1, 120 personas) | USD 12-18M |
| Marketing y adquisición de usuarios | USD 5-10M |
| **TOTAL setup + año 1** | **USD 47-84M** |
| **Operación año 2-3 (por año)** | **USD 30-50M** |

---

## T2-02: Plataforma de Remesas

**Repo:** `venezuela-sa/remittance-platform`

### Por qué es crítico

7.9M venezolanos en exterior envían **USD 3-5B/año** a sus familias. Pierden **7-15% en comisiones** — **USD 280-750M/año se queda en manos de intermediarios**. Las remesas llegan por canales informales sin trazabilidad ni dato fiscal. Reducir la comisión del 7-15% al 1-3% libera **USD 160-480M/año** directo a las familias.

### Descripción

Plataforma de transferencias internacionales para la diáspora. Múltiples rails de envío (ACH, SEPA, Pix, tarjeta, stablecoins) y de entrega (cuenta bancaria, wallet, retiro en agente, stablecoin). Licencias money transmitter en 5 países principales (EE.UU., España, Colombia, Chile, Perú). Comisión target: 1-3%. Cross-sell: cuenta neobank, VIN, seguros, crédito.

### Qué construir

#### Módulo 1: Sender App (País de Remitente)
- Enviar dinero en <3 minutos. KYC según regulación local
- Calculadora transparente: monto → comisión → monto que recibe beneficiario
- Métodos de fondeo: cuenta bancaria, tarjeta, Apple Pay, Google Pay
- Referral program: invita 3 amigos → primera transferencia gratis

#### Módulo 2: Beneficiary App/Portal (Venezuela)
- Notificación instantánea. Opciones: depósito a neobank, retiro en agente, wallet USDC, Pix-VE
- Módulo educación financiera: "¿qué hacer con tus remesas?"

#### Módulo 3: Real-time FX Engine
- Spread transparente (<0.5% sobre mid-market). Lock de tasa por 30 minutos
- Multi-moneda: USD, EUR, COP, CLP, PEN, BRL, GBP → USD

#### Módulo 4: Local Rails Integration
- EE.UU.: ACH + RTP. Europa: SEPA Instant. Colombia: PSE. Chile: TEF. Perú: CCE. Brasil: Pix
- Abstracción: API unificada selecciona rail óptimo por costo/velocidad

#### Módulo 5: Stablecoin Channel (USDC/USDT)
- Canal alternativo cuando rails bancarios son lentos o caros. Settlement en <5 min
- Integración con Circle (USDC). On-ramp/off-ramp automático

#### Módulo 6: Multi-jurisdiction Compliance
- Motor de reglas por jurisdicción. EE.UU.: SAR a FinCEN + state MSB. EU: AMLD6. Colombia: SAGRILAFT
- Transaction monitoring ML. Actualización automática de reglas

#### Módulo 7: Real-time Tracking
- Tracking estilo delivery. Estados: Iniciado → Fondeo → Procesando → Disponible → Cobrado
- Link compartible por WhatsApp con tracking en tiempo real

### Mercado objetivo
- **Primario:** 7.9M venezolanos en diáspora (remitentes)
- **Secundario:** ~5-8M hogares receptores en Venezuela
- **TAM:** USD 3-5B/año actual, creciendo a USD 8-10B/año con formalización
- **Concentración:** Colombia (2.9M), Perú (1.5M), EE.UU. (800K), Chile (600K), España (500K)

### Estándares a cumplir

| Estándar | Descripción | Por qué |
|----------|-------------|---------|
| FATF Rec. 16 (Travel Rule) | Info remitente/beneficiario | Obligatorio para transferencias |
| FinCEN MSB + State Licenses | Money transmitter en EE.UU. | BLOQUEANTE para corredor US |
| AMLD6 / PSD2 (EU) | Anti-lavado + servicios de pago UE | Obligatorio para Europa |
| MiCA (EU) | Regulación cripto-activos | Para canal de stablecoins |
| OFAC SDN Screening | Sanciones EE.UU. | Cada transacción |
| SAGRILAFT (Colombia) | AML Colombia | Para corredor colombiano |

### KPIs

| Métrica | Meta Mes 6 | Meta Año 1 | Meta Año 3 | Meta Año 5 |
|---------|-----------|-----------|-----------|-----------|
| **Volumen procesado/mes** | USD 50M | USD 200M | USD 500M | USD 800M |
| **Comisión promedio** | 3% | 2.5% | 1.5% | 1% |
| **Usuarios activos** | 100K | 500K | 2M | 4M |
| **Tiempo de entrega** | <24h | <4h | <30 min | <10 min |
| **Revenue anual** | USD 18M | USD 60M | USD 90M | USD 96M |
| **Cross-sell revenue** | USD 5M | USD 30M | USD 200M | USD 500M |
| **Ahorro acumulado para familias** | USD 15M | USD 80M | USD 400M | USD 1B |

### Operación del sistema

| Componente | Detalle |
|------------|---------|
| **Equipo core** | 50-80 ingenieros + 15 compliance + 10 producto + 10 ops |
| **Payment rails** | Partners por país: Plaid/Synapse (US), CurrencyCloud (EU), ACH Colombia |
| **Stablecoin infra** | Circle (USDC) + custodio cripto (Fireblocks o BitGo) |
| **Red de agentes** | Partnership con farmacias/bodegas en Venezuela para cash-out |
| **Soporte** | Chatbot multilingüe 24/7 + call center ES/EN/PT |
| **Compliance** | Equipo legal en cada jurisdicción clave (5-10 abogados + 10 analistas AML) |

### Timeline de ejecución

```
Mes 1-2:    Arquitectura + selección de rails partners + inicio trámite de licencias
Mes 2-4:    MVP: corredor EE.UU. → Venezuela (ACH + depósito a neobank)
Mes 4-6:    Canal stablecoins (USDC) + piloto 10K usuarios
Mes 6-8:    Lanzamiento público EE.UU. + apertura corredor Colombia
Mes 8-10:   Corredores España + Chile + Perú
Mes 10-12:  Red de agentes cash-out en Venezuela (500+ puntos)
Año 1-2:    Corredor Brasil (Pix) + UK + Italia
Año 2-3:    Cross-sell maduro (cuenta, VIN, seguros) + 2M usuarios
Año 3-5:    4M remitentes activos + comisión <1%
```

### Dependencias
- **T0-01 (Identidad Digital)** — KYC de beneficiarios. BLOQUEANTE
- **T2-01 (Neo-Banca)** — cuenta destino. Puede arrancar con wallet/agente
- **T1-04 (Pix-VE)** — rail de entrega instantánea
- **Licencias money transmitter** — en cada jurisdicción. BLOQUEANTE (3-12 meses trámite)
- **Corredor OFAC** — para rails bancarios hacia Venezuela

### Lo que habilita (downstream)

| Sistema downstream | Qué recibe de Remesas |
|-------------------|----------------------|
| T2-01 Neo-Banca | Flujo de depósitos (cada remesa → saldo en cuenta) |
| T2-03 Bonos Ciudadanos | Cross-sell: "invierte parte de tu remesa en VIN" |
| Sistema Fiscal | Datos de flujo para estadísticas macroeconómicas |
| Formalización | USD 3-5B/año pasan de informal a trazable |
| Retorno de diáspora | Producto financiero que mantiene el vínculo |

### Referencias internacionales

| País / Empresa | Resultado | Fuente |
|----------------|-----------|--------|
| **Wise (UK/Global)** | USD 12B+ volumen mensual. Comisión 0.7%. 170 países | [wise.com](https://wise.com/) |
| **Remitly (EE.UU.)** | Foco LATAM/Asia/África. 5M+ usuarios. Entrega en minutos | [remitly.com](https://www.remitly.com/) |
| **M-Pesa (Kenya)** | 96% de hogares. Red de agentes como cash-out | [safaricom.co.ke](https://www.safaricom.co.ke/) |
| **GCash (Filipinas)** | 94M usuarios. Remesas de 10M filipinos en exterior | [gcash.com](https://www.gcash.com/) |
| **Nala (Tanzania)** | Comisión 0% en algunos corredores. Mobile-first | [nala.com](https://www.nala.com/) |

### Costo estimado

| Componente | Costo |
|------------|-------|
| Desarrollo de plataforma | USD 5-10M |
| Licencias money transmitter (5 jurisdicciones) | USD 3-8M |
| Integración de rails de pago | USD 2-4M |
| Compliance engine + KYC multi-jurisdicción | USD 2-4M |
| Red de agentes en Venezuela | USD 3-5M |
| Equipo (año 1, 100 personas) | USD 10-15M |
| Float y capital de trabajo | USD 5-10M |
| **TOTAL setup + año 1** | **USD 42-79M** |
| **Operación año 2-3** | **USD 20-35M/año** |

---

## T2-03: Plataforma de Bonos Ciudadanos (VIN)

**Repo:** `venezuela-sa/citizen-bonds`

### Por qué es crítico

Venezuela S.A. es un holding de 40M accionistas. Pero "accionista" sin instrumento financiero es retórica. Los VIN (Venezuela Investment Notes) convierten a cada ciudadano en inversor real del fondo soberano. Sin esta plataforma: no hay mecanismo de distribución de dividendos a escala, no hay skin in the game para defender transparencia, y "40M de accionistas" es un slogan.

**Si Noruega distribuye vía pensiones y Alaska envía un cheque anual, Venezuela lo hace con una app donde cada ciudadano ve crecer su patrimonio en tiempo real.**

### Descripción

App fintech para que cualquier venezolano compre bonos del fondo soberano desde USD 10. Smart contracts controlan: emisión, lockup de 5 años con vesting gradual, cap 0.1% por persona, y distribución automática de dividendos. Custodia internacional (JPMorgan, HSBC o State Street). Futuro: IPO del fondo en NYSE/LSE años 8-12.

### Qué construir

#### Módulo 1: Citizen Mobile App
- Compra de VIN desde USD 10. Dashboard: VIN que poseo, valor actual, dividendos recibidos, proyección
- Compra recurrente: "Invierte USD 10 cada mes automáticamente"
- Venta post-lockup en mercado secundario dentro de la app
- Modo social: compartir "Soy accionista de Venezuela" (gamificación patriótica)

#### Módulo 2: Institutional Investor Portal
- Portal para fondos soberanos, pensiones, asset managers. Órdenes desde USD 1M
- Reporting GIPS compliant. Data room para due diligence. Preparación para IPO

#### Módulo 3: Smart Contract Suite
- Contrato de emisión (ERC-20 o equivalente permisionado)
- Contrato de lockup (5 años, vesting 20%/año desde año 2)
- Contrato de cap (0.1% máximo por persona, verificación on-chain)
- Contrato de dividendos (distribución automática trimestral proporcional)
- Contrato de mercado secundario (order book post-lockup)
- Contrato de gobernanza (votación on-chain)
- Auditoría por OpenZeppelin, Trail of Bits o Consensys Diligence

#### Módulo 4: Dividend Dashboard
- Producción petrolera actual vs meta. Precio petróleo vs base USD 60
- Ingresos del fondo. AUM del fondo soberano (meta USD 250-400B año 15)
- Comparador: "Nuestro fondo vs. Noruega vs. Alaska vs. Abu Dhabi"
- Notificación trimestral: "Tu dividendo fue USD X. El fondo creció Y%"

#### Módulo 5: Financial Literacy Module
- Curso integrado gamificado: ¿qué es un bono? ¿dividendo? ¿lockup? ¿diversificación?
- Requisito: completar módulos 1-3 antes de primera compra
- Contenido en español + inglés + lenguas indígenas. Videos cortos 2-3 min

#### Módulo 6: International Custody Integration
- Custodio de primer nivel: JPMorgan, HSBC, State Street, BNY Mellon
- Auditoría independiente trimestral (Big 4). NAV diario
- Estructura legal: trust o SPV en jurisdicción common law

### Mercado objetivo
- **Primario:** 40M ciudadanos venezolanos (desde USD 10 — inclusión total)
- **Secundario:** 7.9M diáspora ("mi pedazo de Venezuela")
- **Terciario:** Inversores institucionales post-IPO
- **Capital target año 5:** USD 20B. **Año 15:** USD 100-200B

### KPIs

| Métrica | Meta Año 1 | Meta Año 3 | Meta Año 5 | Meta Año 10 |
|---------|-----------|-----------|-----------|------------|
| **Inversores ciudadanos** | 1M | 5M | 15M | 30M |
| **Capital recaudado** | USD 500M | USD 5B | USD 20B | USD 100B |
| **Inversión promedio** | USD 50 | USD 100 | USD 200 | USD 500 |
| **Dividendos distribuidos/año** | — | USD 50M | USD 500M | USD 5B |
| **Retención inversores** | 80% | 85% | 90% | 95% |
| **Completion rate educación** | 60% | 70% | 80% | 85% |
| **IPO readiness** | — | — | Pre-filing | Listed |

### Timeline de ejecución

```
Mes 1-3:    Estructura legal (trust/SPV) + selección custodio + diseño smart contracts
Mes 3-5:    Desarrollo MVP app + smart contracts (emisión, lockup, cap)
Mes 4-6:    Auditoría de smart contracts + deploy en testnet
Mes 6-8:    Piloto con 50K ciudadanos (inversión real, máx USD 100/persona)
Mes 8-10:   Portal institucional v1 + dividend dashboard
Mes 10-12:  Lanzamiento público + campaña "Soy Accionista de Venezuela"
Año 1-2:    1M inversores + primera distribución de dividendos
Año 3-5:    15M inversores + USD 20B capital + preparación pre-IPO
Año 8-12:   IPO en NYSE/LSE — Venezuela S.A. como primera "country-as-a-company"
```

### Dependencias
- **T0-01 (Identidad Digital)** — KYC + verificación de ciudadanía + cap. BLOQUEANTE
- **T0-03 (Blockchain)** — infraestructura smart contracts. BLOQUEANTE
- **T1-04 (Pix-VE)** — canal de pago para compra y dividendos
- **Custodio internacional** — BLOQUEANTE (3-6 meses negociación)
- **Estructura legal** — trust/SPV en jurisdicción common law. BLOQUEANTE

### Lo que habilita (downstream)

| Sistema downstream | Qué recibe |
|-------------------|-----------|
| Fondo Soberano | Canal de captación de capital ciudadano (USD 20B+ año 5) |
| T2-01 Neo-Banca | Flujo de depósitos (dividendos trimestrales → saldo en cuenta) |
| IPO futura | Base de inversores + track record + estructura legal armada |
| Gobernanza ciudadana | Votación on-chain: accionistas votan sobre decisiones del fondo |
| Educación financiera | 30M+ personas completan curso de finanzas básicas |
| Mercado de capitales | Mercado secundario de VIN → primera bolsa funcional en décadas |

### Referencias internacionales

| País / Modelo | Resultado | Fuente |
|---------------|-----------|--------|
| **Alaska Permanent Fund** | Dividendo anual a cada residente. USD 1,600/persona (2023). Fondo: USD 78B | [apfc.org](https://www.apfc.org/) |
| **Norway NBIM** | USD 1.7T. 100% transparente. Rendimiento promedio 6%/año | [nbim.no](https://www.nbim.no/) |
| **Chile AFP** | 11M chilenos invierten en fondos de pensión. App para ver saldo | [spensiones.cl](https://www.spensiones.cl/) |
| **Saudi Aramco IPO** | 1.7% listado. Valoración USD 1.7T. Retail saudíes compraron masivamente | [saudiaramco.com](https://www.saudiaramco.com/) |
| **Rwanda Agaciro Fund** | Fondo soberano con contribuciones ciudadanas voluntarias. "Dignidad" | [minecofin.gov.rw](https://www.minecofin.gov.rw/) |

### Costo estimado

| Componente | Costo |
|------------|-------|
| Estructura legal (trust/SPV, opiniones legales) | USD 3-5M |
| Desarrollo plataforma (app, portal, dashboard, APIs) | USD 5-10M |
| Smart contract suite (desarrollo + auditoría) | USD 2-4M |
| Integración con custodio internacional | USD 2-3M |
| Módulo de educación financiera | USD 1-2M |
| Equipo (año 1, 80 personas) | USD 10-15M |
| Marketing: campaña "Soy Accionista" | USD 5-8M |
| **TOTAL setup + año 1** | **USD 40-69M** |
| **Preparación IPO (años 5-8)** | **USD 50-100M** |

---

## T2-04: Plataforma de Contratación Pública (e-Procurement)

**Repo:** `venezuela-sa/e-procurement`

### Por qué es crítico

Venezuela va a gastar **USD 550-750B en 15 años** reconstruyendo el país. Históricamente, la contratación pública venezolana = sobrecostos de 30-70%, adjudicación directa a empresas conectadas y cero rendición de cuentas. Sin e-procurement: el 20-40% del presupuesto de reconstrucción se pierde en corrupción (**USD 110-300B**).

**Ucrania implementó ProZorro durante una guerra y ahorró USD 6B en 3 años.**

### Descripción

Sistema 100% online para TODOS los contratos del gobierno y Venezuela S.A. Cada contrato se publica, licita, adjudica y ejecuta en la plataforma. Incluye: benchmarking de precios vs referencias internacionales, smart contracts para pagos por hitos, IA para detección de colusión (5 modelos), verificación satelital/drones de obras, registro de beneficial ownership, whistleblower con recompensa, y debarment list.

### Qué construir

#### Módulo 1: Portal de Licitaciones
- Publicación, bases, plazos, Q&A público, ofertas encriptadas (sealed bid)
- Tipos: abierta (>USD 1M), restringida (USD 100K-1M), compra directa (<USD 100K), subasta inversa
- Evaluación con criterios ponderados + scoring automatizado

#### Módulo 2: Pre-calificación de Proveedores
- 5+ años operación, USD 100M+ activos, certificaciones ISO, seguros, garantías
- Scoring de desempeño por contrato. Re-calificación anual. API verificación vía X-Road

#### Módulo 3: Price Benchmarking Engine
- Base de precios internacional: costo/km carretera, costo/MW planta, costo/cama hospital
- Fuentes: Banco Mundial, BID, FIDIC, Engineering News-Record
- Alerta si oferta >15% sobre benchmark. ML detección de inflación artificial

#### Módulo 4: Smart Contract Milestone Payments
- Fondos en escrow → liberación automática al verificar hito → reversión si no cumple
- Verificación: IoT + satélite + inspector independiente + feedback comunitario
- Retención 10% hasta entrega final + garantía 12-24 meses

#### Módulo 5: AI Collusion Detection (5 modelos)
- Bid pattern analysis (bid rigging, rotación de ganadores)
- Price anomaly detection vs benchmarks
- Network analysis (Graph Neural Networks) — empresas de maletín
- Temporal pattern detection (siempre gana el mismo proveedor)
- Text analysis (NLP) — bases restrictivas diseñadas para favorecer a uno
- Scoring de riesgo 0-100. Dashboard de redes sospechosas

#### Módulo 6: Satellite/Drone Verification
- Planet Labs + flota de 500+ drones. Comparación BIM vs as-built
- Reportes visuales públicos: ciudadanos ven fotos satelitales del progreso

#### Módulo 7: Beneficial Ownership Registry
- Beneficiarios finales >5% obligatorio. Cross-check registros internacionales + OFAC + PEPs
- Graph visualization: quién es dueño de quién

#### Módulo 8: Whistleblower Channel
- Canal anónimo por contrato. Comunicación encriptada E2E
- Recompensa 10-30% del ahorro identificado (escrow en smart contract)

#### Módulo 9: Debarment List
- Lista pública de proveedores sancionados. Sanción 1-10 años
- Verificación automática en cada licitación. Cross-reference listas internacionales

### Mercado objetivo
- **Primario:** Gobierno (15 ministerios) + Venezuela S.A. (compradores)
- **Secundario:** Proveedores nacionales e internacionales
- **Terciario:** 40M ciudadanos (veedores y whistleblowers)
- **Volumen:** USD 37-50B/año promedio en contratos
- **Ahorro estimado:** 15-25% por competencia = **USD 82-188B ahorrados en 15 años**

### KPIs

| Métrica | Meta Año 1 | Meta Año 3 | Meta Año 5 | Meta Año 10 |
|---------|-----------|-----------|-----------|------------|
| **Contratos en plataforma** | 50% | 90% | 100% | 100% |
| **Ahorro por competencia** | 10% | 20% | 25% | 30% |
| **Ahorro acumulado (USD)** | USD 500M | USD 5B | USD 15B | USD 60B |
| **Proveedores registrados** | 1K | 10K | 50K | 100K+ |
| **Sobrecostos detectados por IA** | USD 50M | USD 500M | USD 1B | USD 2B |
| **Whistleblower reports/año** | 100 | 500 | 1K | 2K+ |
| **Milestone payments (smart contracts)** | 20% | 60% | 90% | 100% |
| **Verificaciones satelitales/mes** | 10 | 100 | 500 | 1K |

### Operación del sistema

| Componente | Detalle |
|------------|---------|
| **Equipo core** | 60-100 ingenieros + 20 procurement specialists + 15 compliance |
| **IA/ML** | Cluster GPU (SageMaker/Vertex). 10-15 ML engineers |
| **Satelital/Drones** | Planet Labs (comercial) + flota de drones con partner local |
| **Compliance** | Equipo de investigación de whistleblower reports + liaison fiscalía |

### Timeline de ejecución

```
Mes 1-3:    Marco legal + arquitectura
Mes 3-5:    MVP: portal de licitaciones + registro de proveedores
Mes 5-7:    Price benchmarking v1 + smart contract milestone payments (piloto 5 contratos)
Mes 6-8:    AI collusion detection v1 (2 modelos) + whistleblower channel
Mes 8-10:   Dashboard público + satellite verification (piloto) + beneficial ownership
Mes 10-12:  Debarment list + integración blockchain
Año 1-2:    50% contratos + AI v2 (5 modelos) + drone fleet
Año 2-3:    90% contratos + smart contracts en 60% + modelo exportable
Año 3-5:    100% contratos + USD 15B ahorrado acumulado
```

### Dependencias
- **T0-03 (Blockchain)** — registro inmutable + smart contracts. BLOQUEANTE para Módulos 4 y 9
- **T0-02 (X-Road)** — datos verificados de proveedores. BLOQUEANTE para Módulo 2
- **Marco legal de contratación** — ley que obligue TODO contrato público a pasar por plataforma. BLOQUEANTE

### Lo que habilita (downstream)

| Sistema downstream | Qué recibe |
|-------------------|-----------|
| T1-01 Dashboard Transparencia | Feed de contratos para auditoría ciudadana |
| T3-03 Sistema Fiscal | Datos de proveedores para verificación tributaria |
| Infraestructura nacional | USD 550-750B ejecutados con transparencia |
| Inversores internacionales | Confianza de que su dinero no se pierde → más inversión |
| Rating agencies | S&P, Moody's, Fitch valoran transparencia en contratación |

### Referencias internacionales

| País / Sistema | Resultado | Fuente |
|---------------|-----------|--------|
| **ProZorro (Ucrania)** | Ahorro USD 6B en 3 años. 40,000+ entidades. Open source | [prozorro.gov.ua](https://prozorro.gov.ua/en) |
| **KONEPS (Corea)** | 100% online desde 2002. Corrupción -50%. 480,000+ proveedores | [pps.go.kr](https://www.pps.go.kr/) |
| **Chile Mercado Público** | 900+ entidades. USD 15B/año. Subasta inversa | [mercadopublico.cl](https://www.mercadopublico.cl/) |
| **Georgia e-Procurement** | Post-revolución: de corrupción endémica a top 10 facilidad de negocio en <5 años | [procurement.gov.ge](https://procurement.gov.ge/) |
| **India GeM** | 300,000+ vendedores. USD 50B+ transados. IA para detección de fraude | [gem.gov.in](https://gem.gov.in/) |

### Costo estimado

| Componente | Costo |
|------------|-------|
| Desarrollo plataforma (9 módulos) | USD 8-15M |
| Smart contract suite | USD 2-4M |
| AI/ML (5 modelos + GPU) | USD 3-5M |
| Integración satelital (Planet Labs año 1) | USD 2-4M |
| Flota drones + operación | USD 1-3M |
| Beneficial ownership + whistleblower | USD 2-4M |
| Equipo (año 1, 120 personas) | USD 12-18M |
| **TOTAL setup + año 1** | **USD 42-76M** |
| **Operación año 2-3** | **USD 20-35M/año** |
| **ROI año 1-5** | **USD 15B ahorrado vs USD 200M invertido = 75x** |

---

## T3-01: Portal de E-Gobierno (Trámites Ciudadanos)

**Repo:** `venezuela-sa/egov-portal`

### Por qué es crítico

En Venezuela hacer un trámite gubernamental (registrar empresa, obtener certificado, pagar impuestos) toma **días a semanas**, requiere visitas presenciales y es vulnerable a corrupción de ventanilla. Estonia demostró que digitalizar el 99% de servicios públicos ahorra **~2% del PIB/año** en costos operativos y elimina la discrecionalidad del funcionario. Para una economía de USD 82.8B, eso equivale a **USD 1.7B/año**.

### Descripción

Portal único donde el ciudadano hace TODOS los trámites: impuestos, registros, permisos, certificados, citas médicas, denuncias, consultas. Meta: 95% de trámites online, 0 filas, 0 papel. Modelo Estonia (3 minutos para declarar impuestos). Principio once-only: un dato se ingresa una vez y todos los ministerios lo comparten vía X-Road.

### Qué construir

#### Módulo 1: Catálogo de Servicios + Workflow Engine
- 500+ servicios con workflow configurable. Tracking en tiempo real
- Rating/feedback por trámite (accountability)

#### Módulo 2: Impuestos (integrado con T3-03)
- Declaración pre-llenada con IA (15% flat + 12% IVA). Pago integrado con Pix-VE

#### Módulo 3: Registro de Empresas
- Constitución en 20 minutos online. Generación automática de RIF y NIT

#### Módulo 4: Registro Civil
- Nacimiento, defunción, matrimonio 100% digital con firma electrónica

#### Módulo 5: Permisos y Licencias
- Construcción, comercio, salud, ambiente — solicitud + aprobación digital

#### Módulo 6: Certificados Digitales
- Antecedentes penales, solvencias, constancias — generación instantánea con QR verificable

#### Módulo 7: Chatbot IA Ciudadano
- Orientación en lenguaje natural. Escalamiento a humano si necesario

### Mercado objetivo
- **Primario:** 40M ciudadanos (todos los trámites de vida)
- **Secundario:** 2-3M empresas (trámites comerciales, registro, licencias)
- **Terciario:** 7.9M diáspora (trámites consulares digitales)

### KPIs

| Métrica | Meta Año 1 | Meta Año 3 | Meta Año 7 |
|---------|-----------|-----------|-----------|
| **Trámites online** | 30% | 60% | 95% |
| **Transacciones/mes** | 500K | 5M | 20M |
| **Tiempo promedio** | 30 min | 10 min | 3 min |
| **CSAT** | >3.5 | >4.0 | >4.5 |
| **Adopción digital** | 20% | 50% | 80% |
| **Ahorro anual al Estado** | USD 100M | USD 500M | USD 2B |

### Timeline de ejecución

```
Mes 1-6:    Impuestos + registro de empresas + certificados (MVP)
Mes 6-12:   Registro civil + permisos + chatbot IA
Año 1-2:    30% de trámites. 500K transacciones/mes
Año 2-4:    60% de trámites. Integración con todas las entidades vía X-Road
Año 4-7:    95% de trámites. 20M transacciones/mes. Ahorro USD 2B/año
```

### Dependencias
- **T0-01 (Identidad Digital)** — autenticación y firma digital. BLOQUEANTE
- **T0-02 (X-Road)** — datos entre ministerios. BLOQUEANTE
- **T1-04 (Pagos)** — cobro de tasas y impuestos

### Referencias internacionales

| País | Resultado | Fuente |
|------|-----------|--------|
| **Estonia (e-Estonia)** | 99% de servicios online. 3 min para impuestos. Ahorro 2% PIB | [e-estonia.com](https://e-estonia.com/) |
| **UK (GOV.UK)** | Portal unificado. GDS Design Principles. 3.5B visitas/año | [gov.uk](https://www.gov.uk/) |
| **India (Umang)** | 1,200+ servicios en una app. 100M+ descargas | [umang.gov.in](https://www.umang.gov.in/) |

### Costo estimado

| Componente | Costo |
|------------|-------|
| Desarrollo (7 años, 500+ servicios) | USD 200-500M |
| Operación anual | USD 30-50M/año |
| **ROI** | **~2% PIB/año = USD 1.7B en ahorros** |

---

## T3-02: Registro de Propiedad en Blockchain (Catastro Digital)

**Repo:** `venezuela-sa/property-registry`

### Por qué es crítico

El 70%+ de barrios en Venezuela carece de título legal de propiedad. Según el framework De Soto, esto representa **USD 50-100B en activos informales** que no pueden usarse como colateral para crédito hipotecario. Sin título formal: no hay hipoteca, no hay herencia segura, no hay inversión en mejora de vivienda, no hay mercado inmobiliario funcional.

### Descripción

Registro inmutable de títulos en blockchain + catastro digital con integración satelital. Meta: formalizar **3-5M propiedades**. Desbloquea USD 50-100B en activos como colateral. App de campo para topógrafos, motor de valuación automatizada, transferencias con firma digital, API para bancos.

### Qué construir

#### Módulo 1: Blockchain de Registro de Títulos
- Cada título es un NFT único en blockchain permisionada. Hash inmutable
- Transferencias y herencias con firma digital

#### Módulo 2: Catastro Digital Satelital
- Planet Labs/Maxar para delimitación de parcelas
- App de campo: topógrafos capturan GPS + fotos + datos catastrales offline-first

#### Módulo 3: Motor de Valuación Automatizada
- Comparable sales + datos satelitales + machine learning
- Actualización trimestral de valuaciones para impuesto predial

#### Módulo 4: Portal de Consulta y Verificación
- Cualquiera puede verificar un título con QR o número de registro
- API para bancos: verificación instantánea de propiedad para hipotecas

### KPIs

| Métrica | Meta Año 1 | Meta Año 3 | Meta Año 5 |
|---------|-----------|-----------|-----------|
| **Títulos formalizados** | 500K | 2M | 3-5M |
| **Activos desbloqueados** | USD 5B | USD 25B | USD 50-100B |
| **Tiempo de transferencia** | 7 días | 2 días | <24h |
| **Hipotecas habilitadas** | 10K | 50K | 200K |

### Dependencias
- **T0-01 (Identidad Digital)** — verificación de propietario. BLOQUEANTE
- **T0-03 (Blockchain)** — infraestructura base. BLOQUEANTE

### Referencias: Georgia (blockchain land titles desde 2016), Perú/De Soto (1.2M tituladas en 5 años)

### Costo estimado
- Desarrollo + despliegue: **USD 20-50M**. Operación: **USD 5-10M/año**

---

## T3-03: Sistema Fiscal Automatizado

**Repo:** `venezuela-sa/tax-system`

### Por qué es crítico

La recaudación fiscal actual de Venezuela es prácticamente inexistente como % del PIB. El modelo del plan requiere **15% flat tax + 12% IVA** como base del ingreso del Estado (separado del petróleo que va 100% al fondo soberano). Sin un sistema fiscal digital: no hay Estado funcional, no hay servicios públicos, el modelo colapsa. Estonia recauda eficientemente con declaración de impuestos en **3 minutos** — Venezuela necesita lo mismo. Meta: **USD 10-41B/año** en recaudación progresiva.

### Descripción

Sistema 100% digital: declaración pre-llenada con IA, facturación electrónica obligatoria, detección de evasión con ML, cobro automático vía Pix-VE. Dashboard de recaudación público en tiempo real.

### Qué construir

#### Módulo 1: Portal de Declaración y Pago
- Web + app. Pre-llenado automático (cruza empleo, comercio, propiedad vía X-Road)
- Pago integrado con Pix-VE. Devoluciones automáticas

#### Módulo 2: Facturación Electrónica Obligatoria
- Emisión + validación + almacenamiento. API para POS (IVA automático)
- Formato UBL 2.1 / Peppol para interoperabilidad

#### Módulo 3: Motor de Detección de Evasión (ML)
- Patrones de facturación anómalos, sub-declaración, empresas fantasma
- Cross-check con datos de transacciones Pix-VE

#### Módulo 4: Dashboard de Recaudación (público)
- Dato en tiempo real: cuánto se recauda, de quién, en qué se gasta
- Transparencia total para ciudadanos

### KPIs

| Métrica | Meta Año 1 | Meta Año 3 | Meta Año 7 |
|---------|-----------|-----------|-----------|
| **Contribuyentes registrados** | 5M | 15M | 25M |
| **Declaraciones online** | 60% | 85% | 99% |
| **Tiempo de declaración** | 15 min | 5 min | 3 min |
| **Recaudación total/año** | USD 10B | USD 20B | USD 41B |
| **Evasión detectada/año** | USD 500M | USD 1B | USD 2B |
| **Facturas electrónicas/mes** | 10M | 50M | 200M |

### Dependencias
- **T0-01 (Identidad Digital)** — autenticación. BLOQUEANTE
- **T0-02 (X-Road)** — datos cruzados. BLOQUEANTE
- **T1-04 (Pagos)** — cobro automático

### Referencias: Estonia (3 min declaración), Chile SII (factura electrónica obligatoria, +30% recaudación), India GST Network (12B facturas/mes)

### Costo estimado
- Desarrollo: **USD 30-80M**. Operación: **USD 10-20M/año**. Meta recaudación: **USD 41B/año**

---

## T3-04: Plataforma de Micro-Crédito

**Repo:** `venezuela-sa/microlending`

### Por qué es crítico

**80% de venezolanos** no tiene acceso a crédito formal. Sin historial crediticio (porque no había banca funcional), nadie les presta. Pero 24M de personas necesitan USD 50-5,000 para emprender, comprar inventario, reparar su casa, o cubrir una emergencia médica. El micro-crédito con scoring alternativo (basado en datos de Pix-VE, pagos de servicios, actividad comercial) puede llenar este vacío. Referencia: M-Shwari en Kenya otorgó 30M préstamos en 5 años sobre data de M-Pesa.

### Descripción

Plataforma de préstamos USD 50-5,000 con scoring alternativo ML. Solicitud, aprobación instantánea, desembolso y cobro vía Pix-VE. Foco: micro-emprendedores, vendedores informales, agricultores.

### Qué construir

#### Módulo 1: App Móvil (Solicitud → Aprobación → Desembolso)
- Solicitud en <5 min. Aprobación instantánea basada en scoring alternativo
- Desembolso directo a cuenta neobank o wallet

#### Módulo 2: Scoring Crediticio Alternativo (ML)
- Fuentes: historial Pix-VE, pagos de servicios, recargas teléfono, actividad e-commerce
- Datos de smartphone (con consentimiento): apps, patrones de uso
- Score 300-850. Explainability: usuario ve cómo mejorar su score
- Bias monitoring: auditoría trimestral de fairness

#### Módulo 3: Underwriting y Cobro Automatizado
- Modelos de riesgo por segmento (emprendedor, agricultor, empleado)
- Débito automático vía Pix-VE en cuotas semanales/quincenales/mensuales

### KPIs

| Métrica | Meta Año 1 | Meta Año 3 | Meta Año 5 |
|---------|-----------|-----------|-----------|
| **Préstamos/mes** | 20K | 100K | 400K |
| **Tasa de default** | <10% | <8% | <6% |
| **Revenue** | USD 50M | USD 400M | USD 875M |
| **Ticket promedio** | USD 300 | USD 500 | USD 800 |
| **Tiempo de aprobación** | <2h | <30 min | <5 min |

### Dependencias
- **T0-01 (Identidad Digital)** — KYC. BLOQUEANTE
- **T1-04 (Pix-VE)** — datos de scoring + desembolso/cobro. BLOQUEANTE
- **T2-01 (Neo-Banca)** — cuenta destino + scoring alternativo compartido

### Referencias: M-Pesa/M-Shwari (Kenya, 30M préstamos en 5 años), Mercado Crédito (LATAM, USD 4B+ cartera), Tala (Kenya/India, 9M+ clientes, préstamos desde USD 10)

### Costo estimado
- Desarrollo: **USD 3-8M**. Capital revolving: **USD 50-200M**. Operación: **USD 5-10M/año**

---

## T3-05: Plataforma de Seguros Digitales (InsurTech)

**Repo:** `venezuela-sa/insurtech`

### Por qué es crítico

Penetración de seguros en Venezuela: **<2% del PIB** (vs. 3-4% promedio LATAM, 7% global). 40M de personas sin cobertura ante enfermedades, desastres naturales, accidentes o pérdida de cosecha. Los seguros paramétricos (pago automático basado en datos de sensores, no en peritaje) son particularmente transformadores para los 500K+ agricultores. Distribución vía apps fintech como cross-sell reduce CAC a casi cero.

### Descripción

Micro-seguros digitales: salud (USD 5-15/mes), vida, agrícola paramétrico, vehicular. SDK integrable en neo-bancos. Motor de pricing ML. Claims 100% digital. Oráculos para paramétricos (datos climáticos + satelitales). TAM año 5: **USD 200-500M/año** en primas.

### Qué construir

#### Módulo 1: SDK para Neo-Bancos
- Módulo integrable en T2-01 y otras fintechs. Cross-sell contextual

#### Módulo 2: Motor de Pricing y Underwriting (ML)
- Datos: perfil de salud (T1-03), historial de pagos (Pix-VE), propiedad (T3-02), ubicación

#### Módulo 3: Productos
- Micro-seguro de salud (emergencias, consultas, medicamentos)
- Seguro agrícola paramétrico (trigger: lluvia <X mm → pago automático)
- Seguro de vida básico. Seguro vehicular digital

#### Módulo 4: Claims 100% Digital
- Reclamación desde app. Pago en <72h (paramétrico: instantáneo)
- Detección de fraude ML

### KPIs

| Métrica | Meta Año 1 | Meta Año 3 | Meta Año 5 |
|---------|-----------|-----------|-----------|
| **Pólizas activas** | 100K | 1M | 5M |
| **Primas/año** | USD 10M | USD 100M | USD 400M |
| **Claims ratio** | <70% | <65% | <60% |
| **Pago de claim** | <72h | <24h | <4h |

### Dependencias
- **T0-01 (Identidad Digital)** — KYC
- **T1-04 (Pagos)** — cobro de primas y pago de claims
- **T1-03 (Telemedicina)** — datos de salud para underwriting
- **T4-03 (AgTech)** — datos IoT/satélite para seguros paramétricos

### Referencias: BIMA (Global, 35M asegurados mobile-first), Lemonade (EE.UU., claims en 3 seg con IA), APA Insurance (Kenya, micro-seguros vía M-Pesa)

### Costo estimado
- Desarrollo: **USD 3-8M**. Capital de reservas: **USD 20-50M**. Operación: **USD 5-10M/año**

---

## T3-06: Sistema de Pensiones Digital (FCV)

**Repo:** `venezuela-sa/pension-platform`

### Por qué es crítico

Venezuela no tiene sistema de pensiones funcional. Los pensionados actuales reciben **USD 3-5/mes** — insuficiente para un día de comida. El plan establece el **Fondo Ciudadano Venezuela (FCV)** tipo Singapur CPF: cuenta personal unificada con 5 subcuentas (Retiro 8% + Salud 7% + Vivienda 4% + Educación 2% + Cesantía 2% = 23%). Venezuela S.A. contribuye **USD 150/mes por niño** desde el nacimiento. Múltiples administradoras compiten por menor comisión (techo 0.5% AUM).

### Descripción

Plataforma de cuentas de ahorro individual para el FCV. Portal del afiliado: balance por subcuenta, contribuciones, rendimiento, proyecciones. Integración con nómina para descuento automático del 23%. Verificación biométrica trimestral (proof of life para pensionados). Pilar 1: pensión universal (USD 50-200/mes) + Pilar 2: ahorro individual (FCV).

### Qué construir

#### Módulo 1: Portal/App del Afiliado
- Balance de las 5 subcuentas. Contribuciones. Rendimiento. Proyección de pensión
- Selección de fondo: conservador, moderado, agresivo. Comparador de administradoras

#### Módulo 2: Motor de Contribuciones Automáticas
- Integración con nómina (23% = 8+7+4+2+2). Contribución voluntaria adicional
- VSA contribuye USD 150/mes por cada niño registrado (desde nacimiento)

#### Módulo 3: Verificación Biométrica (Proof of Life)
- Trimestral para pensionados. Facial + liveness detection vía app
- Elimina fraude de pensionados fallecidos no reportados

#### Módulo 4: API para Administradoras Privadas
- Plataforma abierta: 5+ administradoras compiten por rendimiento y baja comisión
- Dashboard público: ranking de administradoras por rendimiento y comisión

### KPIs

| Métrica | Meta Año 1 | Meta Año 3 | Meta Año 5 |
|---------|-----------|-----------|-----------|
| **Afiliados activos** | 5M | 10M | 15M |
| **Contribuciones/mes** | USD 100M | USD 500M | USD 1B |
| **Comisión promedio** | 0.5% | 0.4% | 0.3% |
| **Rendimiento real** | 3% | 4% | 5% |
| **Proof of life digital** | 50% | 80% | 95% |

### Dependencias
- **T0-01 (Identidad Digital)** — verificación de afiliados + proof of life. BLOQUEANTE
- **T1-04 (Pagos)** — contribuciones y desembolsos
- **T3-03 (Fiscal)** — integración con nómina

### Referencias: Chile AFP (11M afiliados, 5 fondos A-E), Singapore CPF (4M miembros, 3 subcuentas), Australia Super (AUD 3.5T, obligatorio)

### Costo estimado
- Desarrollo: **USD 10-20M**. Operación: **USD 5-10M/año**

---

## T3-07: Portal de Whistleblower y Denuncias

**Repo:** `venezuela-sa/whistleblower-portal`

### Por qué es crítico

La mejor IA anti-corrupción del mundo no detecta todo. Los seres humanos que trabajan dentro de las instituciones ven cosas que ningún algoritmo puede ver. El programa de whistleblower de la SEC de EE.UU. ha pagado **USD 2B+ en recompensas** y recuperado **USD 6B+** desde 2011. Venezuela necesita un canal seguro, anónimo y con incentivos económicos para que empleados públicos, contratistas y ciudadanos denuncien corrupción sin miedo a represalias.

### Descripción

Plataforma de denuncias anónimas con recompensas (10-30% del monto recuperado). 5 canales: web encriptada (Tor-compatible), app con E2E encryption, hotline internacional, oficinas físicas, embajadas. Tracking de cada denuncia hasta resolución. Integración con IA Anti-Corrupción (T0-03) para correlacionar denuncias con anomalías detectadas.

### Qué construir

#### Módulo 1: Portal Web Anónimo
- Tor-compatible. Comunicación encriptada E2E (modelo SecureDrop)
- No requiere registro. El denunciante recibe un código para seguimiento

#### Módulo 2: App Móvil Encriptada
- Comunicación E2E. Captura de fotos/documentos como evidencia
- Anonimización de metadata (EXIF strip)

#### Módulo 3: Case Management para Fiscales
- Sistema de tickets con priorización por monto/gravedad
- Workflow: denuncia → revisión 48h → investigación 30 días → acción → resolución
- Correlación con alertas de IA Anti-Corrupción

#### Módulo 4: Sistema de Recompensas
- Cálculo automático: 10-30% del ahorro/recuperación identificado
- Pago vía escrow (smart contract). Recompensa solo si procede la denuncia

#### Módulo 5: Dashboard Público (Anonimizado)
- Denuncias recibidas, investigaciones activas, fondos recuperados
- Transparencia del sistema anti-corrupción

### KPIs

| Métrica | Meta Año 1 | Meta Año 3 | Meta Año 5 |
|---------|-----------|-----------|-----------|
| **Denuncias recibidas** | 1K | 5K | 10K |
| **Investigación iniciada <48h** | 50% | 80% | 95% |
| **Fondos recuperados/año** | USD 50M | USD 200M | USD 500M |
| **Recompensas pagadas/año** | USD 5M | USD 20M | USD 50M |
| **Tiempo de resolución** | 6 meses | 3 meses | 2 meses |

### Dependencias
- **T0-03 (Blockchain)** — correlación con transacciones sospechosas
- **T2-04 (e-Procurement)** — denuncias sobre contratos públicos
- **Marco legal de protección al denunciante** — BLOQUEANTE (ley que proteja y remunere)

### Referencias: SEC Whistleblower Program (USD 2B+ pagados, USD 6B+ recuperados), EU Directive 2019/1937, UK FCA Whistleblowing, ISO 37002

### Costo estimado
- Desarrollo: **USD 1-3M**. Operación: **USD 1-2M/año**. **ROI: USD 500M/año en fondos recuperados**

---

## T4-01: Plataforma de e-Residencia

**Repo:** `venezuela-sa/e-residency`

### Por qué es crítico

Venezuela necesita atraer capital intelectual y empresarial sin exigir presencia física. Estonia generó **EUR 322M en impuestos directos** y **EUR 1.8B en actividad económica** con apenas 113,000 e-residentes de 176 países ([e-Residency Dashboard, 2025](https://dashboard.e-residency.gov.ee/)). Venezuela tiene ventajas que Estonia no tuvo: **0% impuesto tech por 10 años** en ZEETs, energía hidroeléctrica a **USD 0.02/kWh**, y un mercado doméstico de 40M como base de lanzamiento para toda LATAM.

### Descripción

Portal web y móvil que permite a cualquier persona del mundo registrar una empresa venezolana en **20 minutos**, obtener firma digital, abrir cuenta bancaria remota y operar legalmente desde cualquier país. Integra verificación de identidad internacional, generación automática de documentos legales, cumplimiento tributario y marketplace de servicios profesionales.

### Qué construir

#### Módulo 1: Application & Onboarding Portal
- Registro en 4 pasos: datos personales, propósito de negocio, selección de ZEET, pago de tasa (USD 100-300)
- UX en 6 idiomas (ES, EN, ZH, AR, PT, FR)

#### Módulo 2: International Identity Verification
- Lectura NFC del chip biométrico del pasaporte (ICAO 9303), liveness detection
- Screening OFAC/UE/ONU + PEP detection
- Integración con Onfido, Jumio o Sumsub. SLA: verificación en <4 horas

#### Módulo 3: Company Formation Engine
- Generación automática de acta constitutiva, estatutos, registro mercantil digital, NIT
- Templates para 5 tipos: SRL, SA, Sucursal, Cooperativa Tech, Startup ZEET
- Inscripción instantánea en Registro Mercantil Digital

#### Módulo 4: E-Resident Digital Signature
- Certificado X.509 emitido por PKI Nacional (T0-01)
- Compatible con eIDAS para reconocimiento en UE
- App móvil para firma desde cualquier dispositivo

#### Módulo 5: Banking Access Integration
- API que conecta e-residentes con bancos digitales para apertura remota
- KYC compartido (sin repetir verificación). Cuentas en USD

#### Módulo 6: Compliance Portal
- Declaración trimestral simplificada, cálculo automático de impuestos
- Registro de beneficiario final (UBO), reporte FATCA/CRS automático

#### Módulo 7: Service Marketplace
- Directorio verificado: contadores (USD 50/mes), abogados, payroll, aduanas
- Rating por e-residentes. Pagos con escrow. Comisión: 10-15%

#### Módulo 8: E-Resident Dashboard
- Panel unificado: empresa, documentos, obligaciones fiscales, facturación, cuenta bancaria
- API abierta para que e-residentes conecten sus propias herramientas

### Mercado objetivo

| Segmento | Tamaño estimado | Propuesta de valor |
|----------|----------------|--------------------|
| Nómadas digitales LATAM | 2-3M personas | Empresa en 20 min, 0% tax, cuenta USD |
| Startups globales | 50K+ empresas/año | Gateway a mercado de 650M personas |
| Freelancers internacionales | 5-10M potenciales | Facturación legal, bajo costo operativo |
| Diáspora venezolana | 7.9M personas | Reconexión económica sin retorno físico |
| Cripto-empresas | 2-5K empresas | Marco regulatorio claro + energía barata |

### Estándares a cumplir

| Estándar | Descripción | Por qué |
|----------|-------------|---------|
| eIDAS | Identificación electrónica UE | Reconocimiento mutuo de firma digital |
| ICAO 9303 | Documentos de viaje electrónicos | Lectura de pasaportes |
| FATF Rec. 10-22 | Debida diligencia del cliente | Compliance anti-lavado |
| FATCA/CRS | Reporte automático de cuentas | Transparencia fiscal internacional |
| OFAC SDN | Lista de sanciones EE.UU. | Screening obligatorio |
| X.509 v3 | Certificados digitales | Firma electrónica |

### KPIs

| KPI | Año 1 | Año 3 | Año 5 | Año 7 |
|-----|-------|-------|-------|-------|
| E-residentes registrados | 2,000 | 15,000 | 40,000 | 80,000 |
| Empresas constituidas | 1,500 | 12,000 | 35,000 | 70,000 |
| Tiempo medio de registro | <30 min | <20 min | <15 min | <10 min |
| Actividad económica generada | USD 20M | USD 200M | USD 800M | USD 2B |
| Ingresos (tasas + marketplace) | USD 1M | USD 15M | USD 50M | USD 120M |
| Empleos creados en Venezuela | 500 | 5,000 | 20,000 | 50,000 |

### Operación del sistema

| Aspecto | Detalle |
|---------|---------|
| Hosting | Data center Guayana (T4-04) + CDN global |
| Disponibilidad | 99.95% SLA |
| Equipo operativo | 15 personas (año 1) → 80 personas (año 5) |
| Soporte | Chat 24/7 en ES/EN, email <4h respuesta |

### Timeline de ejecución

```
Año 1 Q1: Diseño UX + arquitectura + marco legal e-Residencia
Año 1 Q2: MVP módulos 1-3 (aplicación, identidad, formación)
Año 1 Q3: Beta cerrada con 200 e-residentes (diáspora)
Año 1 Q4: Lanzamiento público módulos 1-4 + firma digital
Año 2 Q1-Q2: Integración bancaria + compliance portal
Año 2 Q3-Q4: Service marketplace + dashboard completo + API pública
Año 3: Reconocimiento eIDAS (negociación UE). Meta 15,000 e-residentes
Año 5: Integración completa con visa fast-track. 40,000 e-residentes
```

### Dependencias
- **T0-01 (Identidad Digital)** — PKI para certificados de firma
- **T2-01 (Neo-Banca)** — apertura de cuenta remota. BLOQUEANTE
- **T3-01 (E-Gobierno)** — registro mercantil digital
- **Marco legal** — ley de e-Residencia para constitución 100% digital por no-residentes. BLOQUEANTE
- **Acuerdos bancarios** — mínimo 2 bancos digitales con apertura remota

### Lo que habilita (downstream)

| Sistema/Resultado | Cómo lo habilita |
|-------------------|-----------------|
| ZEETs | Canal principal de captación de empresas tech |
| Nearshoring revenue | E-residentes contratan talento venezolano |
| Recaudación tributaria | 15% flat tax post-incentivo genera USD 200-500M/año |
| Ecosistema startup | Base de empresas internacionales crea deal flow para VCs |
| Data centers (T4-04) | E-residentes consumen hosting local |
| Diáspora reconectada | 7.9M pueden operar empresas sin retornar |

### Referencias internacionales

| País/Sistema | Resultado | Fuente |
|-------------|-----------|--------|
| **Estonia e-Residency** | 113K e-residentes, 30K empresas, EUR 1.8B actividad | [e-residency.gov.ee](https://dashboard.e-residency.gov.ee/) |
| **Dubai IFZA** | 30K+ empresas free zone, setup 24h | [ifza.com](https://www.ifza.com/) |
| **Singapore GoBusiness** | Registro empresa en 15 min, 100% digital | [gobusiness.gov.sg](https://www.gobusiness.gov.sg/) |
| **Delaware (EE.UU.)** | 1.8M empresas registradas, USD 1.6B/año en tasas | [corp.delaware.gov](https://corp.delaware.gov/) |

### Costo estimado

| Componente | Costo |
|-----------|-------|
| Desarrollo plataforma (8 módulos, 18 meses) | USD 3-5M |
| Integración identity verification | USD 200-400K |
| Infraestructura cloud (año 1) | USD 300-500K |
| Equipo operativo año 1 (15 personas) | USD 600K-900K |
| Marketing internacional (año 1) | USD 500K-1M |
| Asesoría legal internacional | USD 300-500K |
| **Total año 1** | **USD 6-10M** |
| **Operación anual (año 2+)** | **USD 2-4M** |
| **ROI** | **Breakeven año 2-3** |

---

## T4-02: Plataformas EdTech

**Repo:** `venezuela-sa/edtech-platform`

### Por qué es crítico

Venezuela produce **5,000 ingenieros/año** pero necesita **50,000** para ejecutar la transición tech. Deserción escolar del **50%** en secundaria. Maestros ganan **<USD 50/mes**. El 70% de escuelas rurales sin conectividad estable ([UNICEF Venezuela, 2024](https://www.unicef.org/venezuela/)). Sin EdTech masivo, no hay capital humano para nearshoring (meta: **USD 6-9B/año** en servicios tech para año 10). Cada año sin esta plataforma son 200,000 jóvenes que abandonan el sistema sin habilidades empleables.

### Descripción

Ecosistema de 7 plataformas educativas: K-12 hasta formación vocacional y universitaria. Offline-first (descarga en tablets, sincroniza con red). Modelo pedagógico híbrido: contenido asincrónico tipo Khan Academy + sesiones síncronas con tutores. Financiamiento de bootcamps vía ISA: estudiante paga 15% de salario durante 24 meses solo si consigue empleo >USD 500/mes.

### Qué construir

#### Módulo 1: LMS Nacional K-12 (Offline-First)
- Plataforma para 7M estudiantes. Contenido curricular adaptado a 3 niveles de dificultad por IA
- Modo offline: contenido pre-descargado en tablets, sincronización delta con WiFi
- Video lecciones 8-12 min + ejercicios interactivos + evaluación adaptativa
- Integración con Khan Academy (licencia CC) y Platzi (acuerdo comercial)
- Gamificación: puntos, rachas, badges, rankings por escuela

#### Módulo 2: Bootcamp Portal
- Catálogo de 50+ bootcamps (programación, data science, UX, ciberseguridad, DevOps)
- ISA integrado: contrato digital, tracking de empleo post-graduación, cobro automático
- Job placement engine: matching automático con empresas de ZEETs y e-residentes
- Meta: 20,000 graduados/año para año 5

#### Módulo 3: English Learning App
- Gamificada tipo Duolingo, adaptada al contexto venezolano
- 5 niveles (A1→C1) con foco en inglés de negocios y tech
- Speech recognition para pronunciación + sesiones de conversación (IA + humanos)
- Meta: 2M venezolanos a nivel B2 en 5 años

#### Módulo 4: Vocational Training Platform
- Certificaciones en 12 áreas: electricidad, soldadura, mecánica, enfermería, agricultura de precisión, instalación solar, fibra óptica, cocina profesional, turismo, contabilidad digital
- Partnership con empresas para pasantías garantizadas

#### Módulo 5: University Satellite Portal
- Sistema unificado de admisiones para 50+ universidades
- Expediente académico digital verificable (blockchain)
- Catálogo de carreras con datos de empleabilidad y salario promedio

#### Módulo 6: Teacher Dashboard
- Herramientas para 300,000 docentes: planificación asistida por IA, banco de evaluaciones
- Programa de incentivos: bonos por resultados medibles de estudiantes
- Alertas tempranas de deserción (predicción por IA con 85%+ accuracy)

#### Módulo 7: Skills Assessment Engine
- Tests adaptativos (CAT). Portafolio digital de habilidades verificadas
- Certificaciones interoperables (CompTIA, AWS, Google, Microsoft)

### Mercado objetivo

| Segmento | Tamaño | Necesidad |
|----------|--------|-----------|
| Estudiantes K-12 | 7M | Contenido digital, reducir deserción |
| Jóvenes 18-30 sin empleo formal | 3-4M | Bootcamps, certificaciones, primer empleo |
| Docentes activos | 300,000 | Herramientas, capacitación, incentivos |
| Profesionales en reconversión | 1-2M | Reskilling hacia tech |
| Empresas (nearshoring) | 5,000+ | Pipeline de talento certificado |

### Estándares a cumplir

| Estándar | Descripción | Por qué |
|----------|-------------|---------|
| SCORM 2004 / xAPI | Interoperabilidad de contenido educativo | Portabilidad entre plataformas |
| WCAG 2.1 AA | Accesibilidad web | Inclusión de personas con discapacidad |
| ISO 21001 | Gestión de organizaciones educativas | Marco de calidad |
| W3C Verifiable Credentials | Credenciales académicas verificables | Títulos a prueba de fraude |
| COPPA | Protección de datos de menores | Requisito legal para K-12 |

### KPIs

| KPI | Año 1 | Año 3 | Año 5 | Año 10 |
|-----|-------|-------|-------|--------|
| Estudiantes K-12 activos en LMS | 500K | 2M | 5M | 7M |
| Graduados de bootcamps (acumulado) | 5,000 | 30,000 | 100,000 | 300,000 |
| Tasa de deserción escolar | 48% | 40% | 30% | 20% |
| Placement rate bootcamps (<6 meses) | 60% | 70% | 80% | 85% |
| Docentes usando plataforma | 30,000 | 120,000 | 250,000 | 300,000 |
| Nivel B2+ inglés (población 18-35) | 5% | 10% | 20% | 35% |
| Revenue nearshoring habilitado | USD 100M | USD 1B | USD 3B | USD 8B |

### Operación del sistema

| Aspecto | Detalle |
|---------|---------|
| Hosting | Híbrido: data center Guayana + edge servers en 500 escuelas + CDN |
| Modo offline | Tablets con 32GB contenido pre-cargado, sync WiFi/4G |
| Distribución tablets | 1.5M tablets año 1-3 |
| Contenido | 80% licenciado (Khan, Platzi, Coursera), 20% producción propia |
| Equipo operativo | 50 personas (año 1) → 300 personas (año 5) |

### Timeline de ejecución

```
Año 1 Q1: Diseño curricular digital K-12 + licitación tablets
Año 1 Q2: MVP K-12 LMS (offline) + piloto 100 escuelas
Año 1 Q3: Bootcamp portal MVP + 10 bootcamps certificados
Año 1 Q4: English app beta + distribución 200K tablets
Año 2 Q1-Q2: Escalar LMS a 1,000 escuelas + vocational platform
Año 2 Q3-Q4: Teacher dashboard + university portal + 500K tablets más
Año 3: ISA tracking en producción. 30,000 graduados bootcamp acumulados
Año 5: LMS en 100% escuelas. 100,000 graduados bootcamp. 1.5M tablets
```

### Dependencias
- **T0-01 (Identidad Digital)** — credenciales verificables para estudiantes y docentes
- **Conectividad** — fibra óptica a 5,000 escuelas. **NO bloqueante**: offline-first mitiga
- **Hardware** — licitación y distribución de 1.5M tablets (USD 300-450M)
- **Marco regulatorio** — reconocimiento legal de certificaciones digitales y modelo ISA

### Lo que habilita (downstream)

| Sistema/Resultado | Cómo lo habilita |
|-------------------|-----------------|
| Nearshoring (USD 6-9B) | Pipeline de 50K ingenieros/año certificados |
| ZEETs | Talento local para empresas tech |
| E-Residency (T4-01) | Freelancers venezolanos sirven a empresas e-residentes |
| Reducción de pobreza | Empleo formal vía bootcamps con ISA (sin barrera de entrada) |
| AgTech (T4-03) | Técnicos agrícolas capacitados en agricultura de precisión |
| Turismo (T4-05) | Personal bilingüe certificado para hospitalidad |

### Referencias internacionales

| País/Sistema | Resultado | Fuente |
|-------------|-----------|--------|
| **Khan Academy** | 150M usuarios, 8,000 videos, 100% gratuito | [khanacademy.org](https://www.khanacademy.org/) |
| **Platzi (Colombia)** | 5M estudiantes, 1,000 cursos, foco LATAM | [platzi.com](https://platzi.com/) |
| **India DIKSHA** | 300M+ sesiones de aprendizaje, offline-first | [diksha.gov.in](https://diksha.gov.in/) |
| **Estonia e-School** | 100% escuelas digitalizadas, 85% docentes activos | [e-estonia.com](https://e-estonia.com/) |
| **Singapore SkillsFuture** | USD 500 crédito/ciudadano, 600K+ cursos/año | [skillsfuture.gov.sg](https://www.skillsfuture.gov.sg/) |

### Costo estimado

| Componente | Costo |
|-----------|-------|
| Desarrollo 7 plataformas (24 meses) | USD 8-15M |
| Contenido licenciado (año 1-3) | USD 5-10M |
| Producción contenido propio (año 1-3) | USD 3-5M |
| Tablets (1.5M × USD 200-300) | USD 300-450M |
| Infraestructura edge servers (500 escuelas) | USD 2-4M |
| Programa de incentivos docentes (año 1) | USD 5-10M |
| **Total año 1-3 (con hardware)** | **USD 376-577M** |
| **Operación anual (año 4+, sin hardware)** | **USD 40-65M** |
| **ROI** | **USD 3-9B/año nearshoring revenue por año 10** |

---

## T4-03: Plataforma AgTech

**Repo:** `venezuela-sa/agtech-platform`

### Por qué es crítico

Venezuela tiene **30M de hectáreas** aptas para agricultura pero solo cultiva el **20%**. Pérdidas post-cosecha: **30-40%** por falta de cadena de frío y logística. Importa el **70% de los alimentos** que consume ([FAO Venezuela, 2024](https://www.fao.org/venezuela/)). Cada punto de reducción en pérdidas equivale a **USD 200-400M/año** en alimentos salvados. Además, la agricultura de precisión es prerequisito para exportar a mercados exigentes (UE, EE.UU.) que demandan trazabilidad certificada.

### Descripción

Suite integrada: monitoreo satelital, sensores IoT, drones agrícolas, marketplace de productos, cadena de frío con blockchain y seguros paramétricos. Arquitectura progresiva: funciona con SMS para productores sin smartphone, app básica para 3G, dashboard completo para agroindustrias.

### Qué construir

#### Módulo 1: Satellite Monitoring Dashboard
- Integración con Planet Labs (3m resolución, diaria) y Sentinel-2 (ESA, gratuito, 10m)
- Índices automáticos: NDVI (salud vegetal), NDWI (estrés hídrico), SAVI (suelo)
- Alertas de anomalía: detección temprana de plagas, sequía, inundación
- Cobertura: 6M hectáreas cultivadas + 24M potenciales

#### Módulo 2: IoT Sensor Network
- 50,000 sensores en 3 fases: humedad, pH, temperatura, precipitación, viento
- LoRaWAN para cobertura rural (15km radio). Gateways solares cada 10km
- Meta: 1 sensor/10 hectáreas en zonas prioritarias. Costo: USD 50-150/sensor

#### Módulo 3: Drone Fleet Management
- 500+ drones: mapeo multiespectral, fumigación de precisión, siembra aérea
- Drone-as-a-Service (no venta). Cooperativas de pilotos certificados por estado
- Reducción de agroquímicos: 30-50%

#### Módulo 4: Agricultural Marketplace
- Comercio directo productor→comprador (elimina 3-5 intermediarios)
- Precios en tiempo real. Logística integrada: matching con transportistas
- Pagos con escrow. Comisión: 3-5%

#### Módulo 5: Cold Chain IoT System
- 20 hubs de frío (5 rehabilitados + 15 nuevos). 500,000 toneladas/año
- Sensores en cada punto de la cadena. Blockchain para certificación de trazabilidad
- Reduce pérdidas del 30-40% al <10%

#### Módulo 6: Parametric Agriculture Insurance
- Triggers automáticos: lluvia <X mm en 30 días → pago automático
- Datos IoT + satélite como fuente de verdad. Pago en <72 horas
- Meta: cubrir 1M hectáreas en 5 años

#### Módulo 7: Supply Chain Blockchain
- Trazabilidad farm-to-table. QR code en producto final
- Requisito para exportación a UE (Regulación 2023/1115 de deforestación)
- Integración con certificaciones orgánicas, fair trade, rainforest alliance

### Mercado objetivo

| Segmento | Tamaño | Necesidad |
|----------|--------|-----------|
| Pequeños productores (<10 ha) | 400,000+ | Datos básicos, acceso a mercado |
| Medianos productores (10-500 ha) | 80,000+ | Agricultura de precisión |
| Agroindustrias (>500 ha) | 5,000+ | Dashboard completo, exportación |
| Exportadores | 500+ | Trazabilidad, certificaciones |

### KPIs

| KPI | Año 1 | Año 3 | Año 5 | Año 10 |
|-----|-------|-------|-------|--------|
| Hectáreas monitoreadas (satélite) | 500K | 3M | 6M | 15M |
| Sensores IoT desplegados | 5,000 | 20,000 | 50,000 | 100,000 |
| Productores activos | 20,000 | 100,000 | 250,000 | 500,000 |
| Pérdidas post-cosecha | 35% | 25% | 15% | <10% |
| Volumen transado en marketplace | USD 50M | USD 500M | USD 2B | USD 5B |
| Exportaciones con trazabilidad blockchain | USD 10M | USD 200M | USD 1B | USD 3B |

### Operación del sistema

| Aspecto | Detalle |
|---------|---------|
| Conectividad rural | LoRaWAN (sensores) + 4G/Starlink (dashboards) |
| Mantenimiento sensores | Contratos con cooperativas locales (2 técnicos/estado) |
| Drones | Flota inicial: 100 unidades, escalando a 500 |
| Soporte | WhatsApp + SMS + radio para zonas sin datos |

### Timeline de ejecución

```
Año 1 Q1: Acuerdos Planet Labs + Sentinel-2, diseño red IoT
Año 1 Q2: Piloto satélite en 500K ha (llanos occidentales)
Año 1 Q3: Despliegue 5,000 sensores IoT en 3 estados piloto
Año 1 Q4: Marketplace MVP + 20,000 productores registrados
Año 2: Drone fleet (100 unidades) + 5 hubs de frío rehabilitados + seguros paramétricos piloto
Año 3: 20,000 sensores + 10 hubs nuevos + marketplace USD 500M + GlobalG.A.P. integrado
Año 5: 50,000 sensores, 6M ha, 20 hubs, exportaciones trazables USD 1B
```

### Dependencias
- **T0-01 (Identidad Digital)** — registro de productores y trazabilidad
- **Conectividad rural** — LoRaWAN + 4G/Starlink. **NO bloqueante**: LoRaWAN es independiente
- **Infraestructura vial** — carreteras mínimas para cadena de frío
- **Energía solar** — gateways y hubs requieren energía autónoma

### Lo que habilita (downstream)

| Sistema/Resultado | Cómo lo habilita |
|-------------------|-----------------|
| Seguridad alimentaria | Reduce importaciones del 70% al 40-50% |
| Exportaciones agrícolas | Trazabilidad blockchain abre mercados UE/EE.UU. |
| Empleo rural | 500K productores conectados = formalización + crédito |
| Turismo gastronómico (T4-05) | Cacao, café, ron con trazabilidad premium |

### Referencias internacionales

| País/Sistema | Resultado | Fuente |
|-------------|-----------|--------|
| **India eNAM** | 1,000+ mandis conectados, USD 85B transado | [enam.gov.in](https://enam.gov.in/) |
| **Brasil AgroSmart** | 2M+ ha monitoreadas, IoT + satélite | [agrosmart.com.br](https://www.agrosmart.com.br/) |
| **Kenya M-Farm** | 1M+ productores, precios por SMS | [mfarm.co.ke](https://www.mfarm.co.ke/) |
| **Rwanda Smart Nkunganire** | Subsidios agrícolas digitales + marketplace | [minagri.gov.rw](https://www.minagri.gov.rw/) |

### Costo estimado

| Componente | Costo |
|-----------|-------|
| Desarrollo plataforma (7 módulos, 24 meses) | USD 5-8M |
| Sensores IoT (50K × USD 100) | USD 5-7.5M |
| Gateways LoRaWAN (500 × USD 2,000) | USD 1-1.5M |
| Licencias satelitales (5 años) | USD 2-4M |
| Flota de drones (500 × USD 15,000) | USD 7.5-10M |
| Hubs de frío (15 nuevos × USD 2M) | USD 30-45M |
| **Total año 1-3** | **USD 69-105M** |
| **Operación anual (año 4+)** | **USD 8-15M** |

---

## T4-04: Dashboard de Operaciones de Data Centers

**Repo:** `venezuela-sa/datacenter-ops`

### Por qué es crítico

Venezuela tiene **18 GW de capacidad hidroeléctrica** en el Caroní (Guri, Macagua, Caruachi, Tocoma) que produce energía a **USD 0.02/kWh** — contra USD 0.05-0.12/kWh en LATAM y USD 0.06-0.15/kWh en EE.UU. ([CORPOELEC/Mongabay, 2023](https://news.mongabay.com/)). Con solo el **40% de Guri operativo**, hay capacidad ociosa para data centers sin competir con consumo residencial. Los hyperscalers buscan desesperadamente ubicaciones con energía verde y barata para IA — Venezuela puede ser la respuesta. Sin un dashboard de operaciones con SLA 99.99% y credenciales de carbono verificables, ningún hyperscaler firma contrato.

### Descripción

Plataforma de gestión operacional para el Corredor Digital de Guayana: data centers adyacentes a Guri. Monitorea en tiempo real generación hidroeléctrica, transmisión, consumo, capacidad disponible, condiciones ambientales y SLA por cliente. Integra SCADA de la represa con facility management (DCIM), portales de clientes y tracking de créditos de carbono.

### Qué construir

#### Módulo 1: Energy Dashboard (Guri Integration)
- Monitoreo en tiempo real: generación por turbina, transmisión, consumo por rack, capacidad disponible
- Predicción de generación basada en nivel de embalse + precipitación
- Alertas <5 segundos para anomalías

#### Módulo 2: Capacity Management
- Inventario en tiempo real: racks, potencia/rack (5-50 kW), cooling, espacio, puertos de red
- Simulación de carga. Reserva con contratos forward

#### Módulo 3: Client Portal
- Dashboard por hyperscaler: SLA tracking (uptime real vs contratado), latencia, tickets
- API para integración con AWS CloudWatch, GCP Monitoring
- Reportes mensuales automáticos con métricas de sostenibilidad

#### Módulo 4: Environmental Monitoring
- Sensores cada 2 racks: temperatura (18-27°C), humedad (40-60% RH), partículas, vibración
- PUE en tiempo real por zona y global. Meta: PUE <1.2 (best-in-class)

#### Módulo 5: Carbon Credit Tracking
- Cálculo automático de emisiones evitadas: kWh × factor de emisión red vs hidroeléctrica
- Certificación Verified Carbon Standard (Verra) o Gold Standard
- Revenue adicional: USD 5-15/tonelada CO2 evitada

#### Módulo 6: Hyperscaler API Integration
- APIs estandarizadas (DMTF Redfish, BGP, MPLS, iSCSI, NVMe-oF)
- Certificaciones: SOC 2 Type II, ISO 27001, Uptime Tier III+

#### Módulo 7: Dynamic Pricing Engine
- Base rate + variable por consumo + descuento por compromiso largo plazo
- Comparación automática con precios en Virginia, São Paulo, Santiago

#### Módulo 8: SCADA Integration (Guri Dam)
- OPC-UA para lectura de datos operacionales (no control)
- Air-gapped: red de monitoreo separada de red de control. Cumplimiento NERC CIP

### Mercado objetivo

| Segmento | Demanda estimada | Propuesta de valor |
|----------|-----------------|-------------------|
| Hyperscalers (AWS, Google, MSFT, Meta) | 200-500 MW | Energía 60-80% más barata, 100% verde |
| AI training companies | 50-200 MW | Costo energético define rentabilidad |
| Crypto mining (regulado) | 20-50 MW | Energía más barata del hemisferio |
| Empresas LATAM (hosting) | 10-30 MW | Latencia competitiva + costo |

### KPIs

| KPI | Piloto (Año 2) | Fase 1 (Año 4) | Fase 2 (Año 7) | Escala (Año 10) |
|-----|----------------|----------------|----------------|-----------------|
| Capacidad instalada | 50 MW | 200 MW | 500 MW | 1 GW |
| Uptime | 99.95% | 99.98% | 99.99% | 99.995% |
| PUE | 1.4 | 1.25 | 1.15 | 1.10 |
| Clientes hyperscaler | 1 | 2-3 | 4-5 | 6+ |
| Revenue anual | USD 50M | USD 300M | USD 1B | USD 2.5B |
| Créditos de carbono (tCO2e/año) | 100K | 500K | 1.5M | 3M |
| Empleos directos | 200 | 800 | 2,000 | 4,000 |

### Operación del sistema

| Aspecto | Detalle |
|---------|---------|
| Hosting | On-premise en el propio data center |
| NOC | 24/7/365, mínimo 10 operadores/turno. 50,000+ sensores, polling cada 5s |
| Redundancia | Guri (primario) + diesel 72h backup + baterías 15 min UPS |
| Conectividad | 2+ cables submarinos + terrestres redundantes |
| Seguridad física | Biometría, CCTV, perímetro con sensores, guardias 24/7 |

### Timeline de ejecución

```
Año 1 Q1-Q2: Estudio factibilidad energética + diseño planta piloto 50 MW
Año 1 Q3-Q4: Desarrollo dashboard (módulos 1-4) + SCADA integration
Año 2 Q1-Q2: Construcción planta piloto 50 MW
Año 2 Q3: Piloto operativo con primer cliente anchor
Año 2 Q4: Certificación Uptime Tier III + SOC 2
Año 3: Carbon credits + dynamic pricing + expansión a 100 MW
Año 4-5: 200 MW, 3+ hyperscalers
Año 7: 500 MW, PUE < 1.15, USD 1B revenue
Año 10: 1 GW, posición top-5 LATAM
```

### Dependencias
- **CORPOELEC/Guri** — rehabilitación de turbinas (40% → 70%+ operativo). BLOQUEANTE
- **Línea de transmisión dedicada** Guri → Corredor DC (<5% pérdidas)
- **Conectividad internacional** — mínimo 2 cables submarinos con <30ms a Miami. BLOQUEANTE
- **Marco regulatorio** — ley de data centers, exención fiscal ZEET
- **Agua de enfriamiento** — acceso al río Caroní

### Lo que habilita (downstream)

| Sistema/Resultado | Cómo lo habilita |
|-------------------|-----------------|
| Revenue USD 1.5-3B/año | Data centers como exportación de energía procesada |
| Créditos de carbono | USD 15-45M/año en mercados voluntarios |
| E-Residency (T4-01) | Hosting local para empresas e-residentes |
| AI hub LATAM | Costo energético atrae labs de AI training |
| Soberanía de datos | Gobierno y Venezuela S.A. hosteados localmente |

### Referencias internacionales

| País/Sistema | Resultado | Fuente |
|-------------|-----------|--------|
| **Iceland (Verne Global)** | 100% geothermal/hydro, PUE 1.03, AI training hub | [verneglobal.com](https://www.verneglobal.com/) |
| **Norway (Green Mountain)** | 100% hydro, ex-NATO bunker, PUE 1.15 | [greenmountain.no](https://www.greenmountain.no/) |
| **Quebec (QScale)** | Hydro-Québec USD 0.03/kWh. Competidor directo | [qscale.com](https://www.qscale.com/) |
| **Paraguay (Bitfarms)** | Itaipú hydro, crypto mining, USD 0.02/kWh | [bitfarms.com](https://www.bitfarms.com/) |
| **Virginia (Data Center Alley)** | 70% del tráfico global, 2GW+ | benchmark de escala máxima |

### Costo estimado

| Componente | Costo |
|-----------|-------|
| Desarrollo plataforma (8 módulos, 18 meses) | USD 4-7M |
| Construcción piloto 50 MW | USD 150-250M |
| Línea de transmisión dedicada | USD 30-50M |
| Conectividad internacional (cable submarino share) | USD 20-40M |
| Certificaciones (Uptime, SOC 2, ISO) | USD 500K-1M |
| Diesel generators + UPS + baterías | USD 18-27M |
| **Total piloto 50 MW (año 1-2)** | **USD 265-446M** |
| **Expansión a 200 MW (año 3-4)** | **USD 400-600M** |
| **ROI** | **Breakeven año 3-4, USD 2.5B/año revenue a escala** |

---

## T4-05: Plataforma de Turismo Digital

**Repo:** `venezuela-sa/tourism-platform`

### Por qué es crítico

Venezuela tiene activos turísticos de clase mundial — **Salto Ángel** (cascada más alta del mundo, 979m), **Los Roques** (archipiélago coralino), **Canaima** (30,000 km² de tepuyes), **Mérida** (teleférico más alto del mundo) — pero recibe menos de **200,000 turistas/año** contra 4.5M de Colombia y 45M de México ([OMT, 2024](https://www.unwto.org/)). La meta de **5-10M turistas/año** para año 10 (USD 5B revenue) requiere una OTA nacional que compita con Booking.com en UX pero con información de seguridad y experiencias que plataformas globales no ofrecen.

### Descripción

OTA + marketplace de experiencias con módulo de seguridad sin precedentes: GPS tracking opt-in, alertas zonales, seguro integrado y asistencia 24/7 multilingüe. Diseñada para convertir a Venezuela de "destino prohibido" a "aventura segura". Comisión 10-15%.

### Qué construir

#### Módulo 1: Booking Engine
- Motor de reservas: hoteles (500+ año 1 → 5,000 año 5), posadas, lodges, vuelos domésticos, transfers, tours
- Disponibilidad en tiempo real. Precios en USD/EUR. Confirmación instantánea con QR
- UX mobile-first: decisión de compra en <3 minutos

#### Módulo 2: Experience Marketplace
- 1,000+ experiencias curadas: trekking Salto Ángel, buceo Los Roques, fauna Delta del Orinoco, ruta del cacao, parapente Mérida
- Fotos/video profesional, reviews verificados, guía certificado

#### Módulo 3: Dynamic Pricing Engine
- Precios basados en temporada, demanda, eventos, capacidad. Yield management para hoteles
- Benchmark contra Cartagena, Cancún, Costa Rica

#### Módulo 4: Safety Module (diferenciador clave)
- GPS tracking opt-in (compartir ubicación con contacto de emergencia)
- Mapa de seguridad por zona: verde/amarillo/rojo (actualización cada 6 horas)
- Botón de emergencia: conecta con central 24/7 + autoridades + consulado
- Seguro integrado (USD 5/día): médica, evacuación, robo, cancelación

#### Módulo 5: Reviews & Ratings
- Solo viajeros que reservaron pueden reseñar. Rating multi-dimensión
- Algoritmo anti-fraude (detección de reseñas falsas)

#### Módulo 6: International Payment Integration
- Multi-moneda: USD, EUR, GBP, BRL, COP + 10 cripto. Escrow hasta 24h post-experiencia

#### Módulo 7: Tour Operator Portal
- Dashboard para 500+ operadores: inventario, calendario, pricing, comunicación
- Herramientas de marketing: listado optimizado, fotos profesionales (servicio incluido año 1)

#### Módulo 8: Multilingual Chatbot
- IA en 8 idiomas. Recomendación de itinerarios, FAQ, soporte durante viaje
- Escalamiento a humano 24/7. Integrado en web, app, WhatsApp, Telegram

### Mercado objetivo

| Segmento | Tamaño potencial | Motivación |
|----------|-----------------|-----------|
| Turistas de aventura | 50-100M/año global | Salto Ángel, tepuyes, selva |
| Turismo de playa/caribe | 30-50M/año global | Los Roques, Margarita, Morrocoy |
| Ecoturismo / birding | 10-20M/año global | Delta Orinoco, Canaima, Andes |
| Diáspora venezolana | 7.9M | Visita a familia + turismo doméstico |
| Turistas LATAM | 5-10M potenciales | Proximidad, precio competitivo |

### KPIs

| KPI | Año 1 | Año 3 | Año 5 | Año 10 |
|-----|-------|-------|-------|--------|
| Turistas internacionales (total país) | 300K | 1M | 3M | 8M |
| Reservas vía plataforma | 20K | 200K | 1M | 4M |
| Operadores registrados | 500 | 2,000 | 5,000 | 10,000 |
| GMV | USD 10M | USD 150M | USD 800M | USD 3B |
| Revenue (comisiones) | USD 1.2M | USD 20M | USD 100M | USD 400M |
| Rating promedio | 4.2/5 | 4.4/5 | 4.6/5 | 4.7/5 |
| NPS viajeros | >30 | >45 | >55 | >65 |

### Operación del sistema

| Aspecto | Detalle |
|---------|---------|
| Safety center | Central de emergencias 24/7, 8 idiomas, 5 operadores/turno |
| Contenido | Equipo de 10 fotógrafos/videógrafos año 1 para catálogo inicial |
| Channel sync | Bidireccional con Booking.com, Airbnb, Expedia |
| Marketing | USD 2-5M/año en digital internacional |

### Timeline de ejecución

```
Año 1 Q1: Research UX + fotografía de 100 destinos clave
Año 1 Q2: MVP booking engine + 200 propiedades
Año 1 Q3: Experience marketplace + 500 experiencias
Año 1 Q4: Safety module + seguro integrado + lanzamiento
Año 2 Q1-Q2: Dynamic pricing + reviews + tour operator portal
Año 2 Q3-Q4: Chatbot multilingüe + campañas marketing internacional
Año 3: Channel sync Booking/Airbnb. 1M turistas
Año 5: 5,000 operadores, 15,000 experiencias. 3M turistas
Año 10: Meta 8M turistas, USD 3B GMV
```

### Dependencias
- **Infraestructura aeroportuaria** — expansión de Maiquetía + 4 aeropuertos regionales. BLOQUEANTE parcial
- **Visa policy** — e-visa o visa-on-arrival para 50+ países
- **Seguridad física** — reducción verificable de criminalidad en zonas turísticas
- **Conectividad** — WiFi/4G en destinos principales
- **T4-02 EdTech** — personal bilingüe certificado

### Lo que habilita (downstream)

| Sistema/Resultado | Cómo lo habilita |
|-------------------|-----------------|
| Revenue USD 5B/año turismo | Centraliza y digitaliza la industria |
| Marca país | De "failed state" a "adventure destination" |
| Empleo | 500,000+ empleos en hospitalidad |
| AgTech (T4-03) | Turismo gastronómico: cacao, café, ron con trazabilidad |
| E-Residency (T4-01) | Nómadas digitales visitan → se convierten en e-residentes |
| Comunidades indígenas | Eco-turismo genera ingreso directo, preserva cultura |

### Referencias internacionales

| País/Sistema | Resultado | Fuente |
|-------------|-----------|--------|
| **Costa Rica ICT** | 3M turistas/año, 8% PIB, marca eco-turismo | [visitcostarica.com](https://www.visitcostarica.com/) |
| **Rwanda (Visit Rwanda)** | De genocidio a destino premium en 20 años | [visitrwanda.com](https://www.visitrwanda.com/) |
| **Colombia (ProColombia)** | 4.5M turistas, crecimiento 300% en 10 años | [colombia.travel](https://www.colombia.travel/) |
| **Georgia** | 9M turistas en país de 3.7M, visa electrónica | [georgia.travel](https://www.georgia.travel/) |

### Costo estimado

| Componente | Costo |
|-----------|-------|
| Desarrollo plataforma (8 módulos, 18 meses) | USD 3-5M |
| Contenido inicial (fotografía, video, 100 destinos) | USD 500K-1M |
| Safety center setup (24/7) | USD 300-500K |
| Marketing internacional (año 1) | USD 2-5M |
| Equipo operativo año 1 (25 personas) | USD 800K-1.2M |
| **Total año 1** | **USD 9-17M** |
| **Operación anual (año 2+)** | **USD 5-10M** |
| **ROI** | **Breakeven año 2, USD 400M revenue año 10 (comisiones)** |

---

## Sistemas Complementarios

### C-01: App de Educación Financiera

**Repo:** `venezuela-sa/financial-literacy-app`

40M de venezolanos se convertirán en ciudadanos-accionistas. La mayoría nunca ha tenido cuenta de inversión ni entiende qué es un dividendo. App gamificada (Android-first, <30MB): tutoriales sobre Venezuela S.A., dividendos, VIN, ahorro vs inversión, presupuesto personal, impuestos, anti-estafas. Simulador de inversión con datos reales del fondo soberano. Requisito: completar módulos básicos antes de primera compra de VIN. Referencia: Moniepoint (Nigeria, 10M+ usuarios), Greenlight (EE.UU., 6M familias).

| KPI | Año 1 | Año 3 | Año 5 |
|-----|-------|-------|-------|
| Descargas | 2M | 8M | 15M |
| Certificados emitidos | 100K | 1M | 5M |

**Costo:** USD 500K-1M desarrollo + USD 50-100K/año operación

---

### C-02: Fleet Management IoT

**Repo:** `venezuela-sa/fleet-management`

GPS + OBD-II para **50,000+ vehículos** (ambulancias, buses, patrullas, camiones). Robo de combustible estimado en 30-40% del gasto. Módulos: tracking en tiempo real con geofencing, monitoreo de combustible (detección de sifón >5% discrepancia), mantenimiento predictivo (km, horas motor, datos OBD-II), optimización de rutas (-10-20% km recorridos). Referencia: Geotab (4M+ vehículos global), Fleetio (500K+ vehículos).

| KPI | Año 1 | Año 3 |
|-----|-------|-------|
| Vehículos monitoreados | 10,000 | 50,000 |
| Reducción costo combustible | 15% | 25% |
| Reducción uso no autorizado | 50% | 80% |

**Costo:** USD 5-8M (plataforma + 50K dispositivos GPS/OBD + sensores combustible + instalación)

---

### C-03: Smart Grid / Medidores Inteligentes

**Repo:** `venezuela-sa/smart-grid`

Pérdidas eléctricas: **30-40%** (promedio LATAM: 15%, global: 8%). De cada 10 kWh generados en Guri, solo 6-7 llegan al usuario. **5M de medidores AMI** bidireccionales: lectura cada 15 min, detección de tampering/conexión ilegal, prepago opcional. Head-End System (HES), MDMS (480M data points/día), Outage Management System (detección automática vía last gasp), IA para predicción de fallas en transformadores y detección de fraude. Portal del cliente: consumo en tiempo real, comparación con vecindario. Referencia: Italia Enel (32M medidores), India Tata Power (redujo pérdidas de 53% a 8%).

| KPI | Año 1 | Año 3 | Año 5 |
|-----|-------|-------|-------|
| Medidores instalados | 500K | 2M | 5M |
| Pérdidas eléctricas | 35% | 25% | <15% |
| Revenue recuperado/año | USD 100M | USD 500M | USD 1.5B |

**Costo:** USD 482-664M total despliegue (medidores USD 300-400M + comunicación USD 30-50M + software USD 10-20M + instalación USD 75-100M). **ROI: USD 1.5B/año en revenue recuperado.**

---

### C-04: Sistema de Trazabilidad Minera

**Repo:** `venezuela-sa/mining-traceability`

Venezuela exporta **USD 2-4B/año en oro** por canales opacos ([Reuters/Global Witness, 2024](https://www.reuters.com/)). Sin trazabilidad, oro venezolano = "conflicto mineral" con descuento 10-20% sobre LBMA. Blockchain para tracking desde mina hasta exportación: coordenadas GPS, peso, pureza, cadena de custodia. Verificación satelital (Planet Labs) de minería ilegal. Auditorías aleatorias presenciales con app geotaggeada. Certificado digital compatible con LBMA Responsible Gold Guidance y EU Conflict Minerals Regulation 2017/821. Referencia: Everledger (2M+ diamantes trazados), ITSCI (Congo/Rwanda).

| KPI | Año 1 | Año 3 | Año 5 |
|-----|-------|-------|-------|
| Operaciones mineras registradas | 1,000 | 3,000 | 5,000 |
| Oro exportado con certificación | 20% | 50% | 80% |
| Prima de precio vs no certificado | 5% | 10% | 15% |

**Costo:** USD 3.7-7.3M (plataforma + satélite + auditoría + equipo operativo)

---

### C-05: Ventanilla Única de Comercio Exterior

**Repo:** `venezuela-sa/customs-single-window`

Importar/exportar en Venezuela toma **15-30 días**, 7+ instituciones no conectadas, costo burocrático **8-12% del valor** ([Banco Mundial B-READY, 2024](https://www.worldbank.org/)). Plataforma 100% digital: un formulario, un login, un pago. Integra SENIAT, aduana, SENCAMER, INSAI, MPPS, SUNDDE, banca. Clasificación arancelaria asistida por IA. Gestión de riesgo: verde (despacho inmediato, 70%), amarillo (revisión documental, 20%), rojo (inspección física, 10%). Blockchain receipts para anti-corrupción. Referencia: Singapore TradeNet (despacho en 10 min), Colombia VUCE, ASYCUDA World (100+ países).

| KPI | Año 1 | Año 3 | Año 5 |
|-----|-------|-------|-------|
| Operaciones digitales | 30% | 70% | 100% |
| Tiempo promedio despacho | 10 días | 3 días | <24h |
| Recaudación aduanera (eficiencia) | +15% | +30% | +50% |

**Costo:** USD 11.5-23M (plataforma ASYCUDA custom + integración 7 instituciones + blockchain + hardware puertos)

---

### C-06: Sistema de Subsidios Focalizados

**Repo:** `venezuela-sa/targeted-subsidies`

Venezuela gasta **USD 5-10B/año en subsidios** que benefician desproporcionadamente a los más ricos. Solo gasolina cuesta **USD 3-5B/año** y el 80% lo capturan estratos medios/altos. Motor de elegibilidad que cruza 8+ bases de datos (identidad, ingresos, propiedad, vehículos, composición familiar, empleo, salud, educación). Score de vulnerabilidad 0-100. Transferencia directa a wallet digital. 10+ programas: bono alimentario, subsidio eléctrico, bono escolar, transporte, adulto mayor, discapacidad, maternidad. Referencia: India DBT (USD 350B+ transferidos, eliminó 100M registros fantasma), Brasil Bolsa Família (21M familias).

| KPI | Año 1 | Año 3 | Año 5 |
|-----|-------|-------|-------|
| Beneficiarios registrados | 3M | 8M | 12M |
| Subsidios digitales | 40% | 80% | 98% |
| Ahorro fiscal vs universal | USD 1B | USD 3B | USD 5B |

**Costo:** USD 5.5-9.8M. **ROI: USD 3-7B/año en ahorro fiscal.**

---

### C-07: Plataforma de Votación Digital

**Repo:** `venezuela-sa/e-voting`

40M ciudadanos-accionistas deben votar en asambleas de Venezuela S.A. sobre presupuesto del fondo, directores, decisiones estratégicas. Verificación biométrica + cifrado homomórfico + blockchain audit trail. Anti-coerción: puede re-votar (solo último cuenta, modelo estonio). Kioscos públicos en 5,000+ ubicaciones. API abierta para observadores internacionales. **Fase 1 (año 3-4):** asambleas de Venezuela S.A. **Fase 2 (año 7+):** consultas populares y elecciones municipales solo cuando confianza pública >70%. Referencia: Estonia i-Voting (20 años, 51% vota online, 0 incidentes), Smartmatic (30+ países).

| KPI | Año 3 (piloto) | Año 5 | Año 7 |
|-----|----------------|-------|-------|
| Participación asambleas digitales | 20% | 35% | 50% |
| Costo por votante | USD 2 | USD 1 | USD 0.50 |
| Confianza pública | 40% | 55% | 70% |

**Costo:** USD 31-55M (plataforma criptográfica + 5,000 kioscos + auditorías de seguridad + campaña de confianza)

---

### C-08: Monitoreo de Agua e IoT Hídrico

**Repo:** `venezuela-sa/water-monitoring`

**70% de la población** sufre interrupciones regulares de agua. HIDROVEN reporta **pérdidas en red del 60-70%** ([BID/UNICEF, 2024](https://www.iadb.org/)). 1,000+ sensores IoT: calidad (cloro, turbidez, pH) en plantas y red, presión/caudal en tuberías para detección de fugas, nivel de tanques. IA para detección predictiva de fugas (ubicación dentro de 50m). Optimización de bombeo (scheduling óptimo = ahorro energético 15-25%). Portal público: calidad del agua por zona en tiempo real. Referencia: Israel TaKaDu (50+ utilities, reducción 20-30% pérdidas), Francia Aquadvanced/Suez (80M personas monitoreadas).

| KPI | Año 1 | Año 3 | Año 5 |
|-----|-------|-------|-------|
| Sensores desplegados | 200 | 600 | 1,000+ |
| Reducción pérdidas en red | 5% | 15% | 25% |
| Ahorro energético (bombeo) | 10% | 18% | 25% |
| Disponibilidad agua (horas/día) | 14h | 18h | 22h |

**Costo:** USD 10-20M (sensores + gateways + plataforma + IA + instalación)

---

## Diagrama de Dependencias

```
T0-00 CENSO NACIONAL ════════════════════════════════════════════════════╗
  (El primer sistema. Alimenta TODO.)                                    ║
  │                                                                      ║
  ├──► T0-01 Identidad Digital (el censo genera la base,                 ║
  │         identidad la autentica)                                      ║
  │         │                                                            ║
  │         ├──► T0-02 X-Road ──► T0-03 Blockchain ──► T1-01 Dashboard  ║
  │         │         │                  │                                ║
  │         │         ▼                  ▼                                ║
  │         │    T3-01 E-Gobierno   T2-04 e-Procurement                  ║
  │         │    T3-03 Fiscal       T3-07 Whistleblower                  ║
  │         │                       T3-02 Propiedad                      ║
  │         │                                                            ║
  │         ├──► T1-04 Pagos Instantáneos ──► T2-01 Neo-Banca           ║
  │         │         │                            │                     ║
  │         │         ▼                            ▼                     ║
  │         │    T2-02 Remesas              T3-04 Micro-Crédito         ║
  │         │    T2-03 Bonos ◄══════════════╝ (censo = lista de         ║
  │         │    T3-06 Pensiones              40M accionistas)          ║
  │         │                                                            ║
  │         └──► T4-01 e-Residencia                                     ║
  │                                                                      ║
  ├──► T3-06 Pensiones (censo identifica jubilados y trabajadores)      ║
  ├──► T4-02 EdTech (censo mapea brechas educativas y de talento)       ║
  ├──► Equipo Ejecutor (censo mapea talento para roles críticos)        ║
  └──► Subsidios Focalizados (censo identifica beneficiarios)           ║
                                                                         ║
  T1-03 Telemedicina (independiente — arranca con MVP semana 1)          ║
       └──► El censo le dice DÓNDE poner los centros de Starlink        ║
  T4-03 AgTech (independiente — arranca con satélite día 1)             ║
  T4-04 Data Center Ops (depende de infraestructura física)             ║
  T4-05 Turismo (depende de seguridad + aeropuertos)                    ║
═════════════════════════════════════════════════════════════════════════╝
```

### Secuencia de arranque (primeras 12 semanas)

```
Semana 1:  T0-00 Censo (MVP app censista) ← ARRANCA AQUÍ
Semana 1:  T1-03 Telemedicina (MVP Zoom/WhatsApp)
Semana 2:  T1-01 Dashboard Transparencia (MVP React)
Semana 2:  T0-00 Censo piloto (3 ciudades)
Semana 4:  T0-00 Censo diáspora (web global)
Semana 4:  T0-01 Identidad Digital (arquitectura + PoC, usa datos del censo)
Semana 8:  T0-00 Censo → 10 estados cubiertos
Semana 8:  T0-02 X-Road (diseño de protocolo)
Semana 12: T1-04 Pagos Instantáneos (diseño de protocolo)
Semana 12: T0-03 Blockchain (PoC)
```

---

## Stack Tecnológico Recomendado (Transversal)

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| **Frontend web** | React/Next.js | Ecosistema maduro, SSR, PWA-ready |
| **Frontend móvil** | React Native o Flutter | Cross-platform, reducción de costo |
| **Backend APIs** | Node.js (NestJS) o Go | Performance + ecosistema |
| **Base de datos** | PostgreSQL + Redis | Battle-tested, extensible |
| **Blockchain** | Hyperledger Besu o Polygon Edge | Permissioned, EVM-compatible |
| **ML/AI** | Python (PyTorch/scikit-learn) | Estándar de industria |
| **Cloud** | Multi-cloud (AWS/GCP) + on-prem soberano | Redundancia + soberanía de datos |
| **CI/CD** | GitHub Actions | Integrado con repos |
| **Monitoring** | Grafana + Prometheus + OpenTelemetry | Open source, estándar |
| **Auth** | Keycloak (open source IAM) | SSO, OIDC, SAML |
| **Mensajería** | Kafka/NATS | Event-driven architecture |
| **Búsqueda** | Elasticsearch/Meilisearch | Full-text search |
| **CDN** | Cloudflare | Performance + security |

---

## Resumen de Inversión por Sistema

| Sistema | Desarrollo | Operación/Año | Revenue/Año (meta Y5) |
|---------|-----------|--------------|----------------------|
| **T0-00 Censo Nacional Digital** | **USD 38-78M** | **USD 3-5M** | **Habilitante (prerequisito de TODO)** |
| T0-01 Identidad Digital | USD 50-100M | USD 10-20M | Habilitante |
| T0-02 X-Road | USD 20-50M | USD 5-10M | Habilitante |
| T0-03 Blockchain + IA | USD 50-100M | USD 15-30M | USD 1-3B (ahorro corrupción) |
| T1-01 Dashboard | USD 200-500K | USD 50-100K | Habilitante |
| T1-02 Censo Diáspora | USD 500K-1M | USD 200-500K | Habilitante |
| T1-03 Telemedicina | USD 2-5M | USD 10-20M | USD 200M (consultas) |
| T1-04 Pagos Instantáneos | USD 30-50M | USD 10-20M | USD 1-3B (IVA adicional) |
| T2-01 Neo-Banca | USD 5-15M | USD 10-30M | USD 1B |
| T2-02 Remesas | USD 3-8M | USD 5-10M | USD 350M |
| T2-03 Bonos Ciudadanos | USD 3-8M | USD 5-10M | USD 500M (comisiones) |
| T2-04 e-Procurement | USD 5-10M | USD 3-5M | USD 1B (ahorro) |
| T3-01 E-Gobierno | USD 200-500M | USD 30-50M | USD 2B (ahorro ~2% PIB) |
| T3-02 Propiedad | USD 20-50M | USD 5-10M | Habilitante |
| T3-03 Fiscal | USD 30-80M | USD 10-20M | USD 41B (recaudación total) |
| T3-04 Micro-Crédito | USD 3-8M | USD 5-10M | USD 875M |
| T3-05 InsurTech | USD 3-8M | USD 5-10M | USD 400M |
| T3-06 Pensiones | USD 10-20M | USD 5-10M | Habilitante |
| T3-07 Whistleblower | USD 1-3M | USD 1-2M | USD 500M (recuperado) |
| T4-01 e-Residencia | USD 10-20M | USD 5-10M | USD 500M-2B |
| T4-02 EdTech | USD 20-50M | USD 40-65M | USD 2.3B (nearshoring) |
| T4-03 AgTech | USD 20-50M | USD 5-10M | Habilitante |
| T4-04 DC Ops | USD 5-15M | USD 3-5M | USD 600M-1B |
| T4-05 Turismo | USD 3-8M | USD 3-5M | USD 2B |
| Complementarios (8) | USD 100-250M | USD 20-40M | Varios |
| **TOTAL** | **USD 600M-1.4B** | **USD 210-430M/año** | **USD 10-15B/año** |

---

## Próximos Pasos

1. **Semana 1-2:** Crear repos para T1-01 (Dashboard) y T1-02 (Censo Diáspora) — MVPs en 2-4 semanas
2. **Semana 2-4:** Crear repo para T1-03 (Telemedicina) — MVP con Zoom/WhatsApp wrappers
3. **Mes 1-3:** Iniciar T0-01 (Identidad Digital) — arquitectura y PoC
4. **Mes 1-3:** Iniciar T1-04 (Pagos Instantáneos) — diseño de protocolo
5. **Mes 3-6:** Iniciar T0-02 (X-Road), T0-03 (Blockchain), T2-01 (Neo-Banca)
6. **Mes 6-12:** T2-02 a T2-04, T3-01 a T3-07
7. **Año 2+:** T4-01 a T4-05 + Complementarios

---

> Este documento es un blueprint vivo. Cada repo creado debe referenciar este documento para su contexto dentro del ecosistema Venezuela S.A.
