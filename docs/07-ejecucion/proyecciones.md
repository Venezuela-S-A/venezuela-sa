---
sidebar_position: 2
title: Proyecciones
---

# Proyecciones Consolidadas (Base USD 60/barril)

| Indicador | Hoy | Año 5 | Año 10 | Año 15 |
|-----------|-----|--------|---------|---------|
| Producción | ~1 M bpd | 1,5–2 M | 2–2,5 M | 2,5–3 M |
| PIB | USD 83.000 M | 120–160.000 M | 200–300.000 M | 350–500.000 M |
| Fondo Soberano | USD 0 | 20–40.000 M | 80–150.000 M | 250–400.000 M |
| Dividendo/persona | USD 0 | 15–25 | 38–63 | 125–200+ |
| Rendimiento fondo (4%) | USD 0 | 800–1.600 M | 3.200–6.000 M | 10–16.000 M |

Si el fondo alcanza USD 350.000 M al año 15 y retira 4%: **USD 14.000 M/año** en rendimientos. La mitad en dividendos = **USD 175/persona/año**. Familia de 4: **USD 700/año** + servicios públicos financiados.

:::tip Si Brent promedia USD 80 en vez de USD 60
El fondo crecería a USD 500.000+ M y los dividendos se duplicarían. A USD 60 el plan funciona. Cualquier cosa por encima es bono.
:::

---

## Análisis de Sensibilidad: Stress Test por Precio del Petróleo

El plan usa USD 60/barril como base conservadora ([EIA STEO, mar. 2026](https://www.eia.gov/outlooks/steo/)). Pero el precio es la variable más volátil. Esta tabla muestra el impacto en cada escenario.

### Supuestos del modelo

```
Producción Año 5:   1,75 M bpd (promedio del rango 1,5–2 M)
Producción Año 10:  2,25 M bpd (promedio del rango 2–2,5 M)
Producción Año 15:  2,75 M bpd (promedio del rango 2,5–3 M)
Costo por barril:   USD 37,50 (promedio USD 35–40, crudo pesado)
Aporte al fondo:    30% de ingresos netos petroleros
Retorno del fondo:  5,5% anual (promedio conservador del rango 4–7%)
Dividendo:          10% de ingresos netos del fondo a 40 M de personas
```

Fuente de costos y retornos: [data-standards.md](/referencias) — costo barril USD 35–40 (extracción + dilución + transporte + procesamiento); retorno fondo 4–7% anual (conservador vs. [Norway 15,1% en 2025](https://www.cnbc.com/2026/01/29/norway-sovereign-wealth-fund-2025-return-nbim-trillion-oil-stocks-tech-ai-banks-silver.html)).

### Cálculo explícito (ejemplo escenario Base, Año 5)

```
Ingreso bruto   = 1.750.000 bpd × 365 días × USD 60  = USD 38.325 M
Costo operativo = 1.750.000 bpd × 365 días × USD 37,50 = USD 23.953 M
Ingreso neto    = USD 38.325 M − USD 23.953 M = USD 14.372 M
Aporte al fondo = 30% × USD 14.372 M = USD 4.312 M/año
```

| Escenario | Precio | Margen/barril | Ingreso Neto Año 5 | Ingreso Neto Año 10 | Fondo Acumulado Año 15 | Dividendo/persona/año |
|-----------|--------|---------------|---------------------|----------------------|------------------------|-----------------------|
| **Crisis** | USD 40 | USD 2,50 | USD 1.597 M | USD 2.054 M | USD 15.000–20.000 M | USD 2–5 |
| **Bajo** | USD 50 | USD 12,50 | USD 7.984 M | USD 10.269 M | USD 80.000–110.000 M | USD 11–15 |
| **Base** | **USD 60** | **USD 22,50** | **USD 14.372 M** | **USD 18.484 M** | **USD 160.000–220.000 M** | **USD 22–30** |
| **Favorable** | USD 70 | USD 32,50 | USD 20.759 M | USD 26.699 M | USD 250.000–340.000 M | USD 34–47 |
| **Boom** | USD 80 | USD 42,50 | USD 27.147 M | USD 34.914 M | USD 350.000–470.000 M | USD 48–65 |

:::danger Escenarios < USD 50: Zona de Riesgo
A **USD 40/barril**, el margen neto colapsa a USD 2,50/barril — apenas cubre costos operativos. El fondo soberano crece mínimamente y los dividendos ciudadanos son simbólicos. A este precio:
- No hay capital para inversión en infraestructura tech
- La reestructuración de deuda se vuelve insostenible
- Se requiere fondo de estabilización + floor de precio en contratos forward

**Mitigación:** Los contratos forward incluyen precio mínimo garantizado (floor) de USD 55. Si Brent cae bajo USD 50 por más de 2 trimestres, se activa el fondo de estabilización.
:::

:::tip Escenarios > USD 70: Aceleración
A **USD 70+**, cada dólar adicional genera ~USD 639 M/año extra en ingresos netos (a 1,75 M bpd). A **USD 80**, el fondo alcanza niveles que permiten:
- Dividendos ciudadanos de USD 48–65/persona/año (familia de 4: USD 192–260)
- Financiar 100% de la infraestructura tech sin deuda adicional
- Alcanzar el nivel del [fondo noruego ajustado por población](https://www.nbim.no/en/investments/the-funds-value/) en ~20 años en vez de 30

**Cada USD 1 por encima de USD 60 es upside directo al fondo soberano.**
:::

### Nota metodológica

El fondo acumulado al Año 15 incluye: (1) aportes anuales del 30% de ingresos netos petroleros durante 15 años, con producción creciente según [Rystad Energy](https://www.rigzone.com/news/could_venezuela_production_get_back_to_3mm_barrels_per_day-08-jan-2026-182716-article/); (2) rendimiento compuesto al 5,5% anual; (3) NO incluye ingresos de diversificación (tech, turismo, agro) que se suman aparte. Los rangos reflejan variaciones en el ritmo de ramp-up de producción.
