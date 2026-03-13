---
sidebar_position: 4
title: ESG y Ejecución
---

# Sostenibilidad ESG y Gobernanza de Ejecución

## Framework ESG

| Componente | Acción | Beneficio |
|-----------|--------|----------|
| Huella carbono | Compensación + créditos carbono + upgraders limpios | Atrae inversión ESG |
| Arco Minero | Moratorio minería ilegal + formalización | Protege Amazonía |
| Energía | 74% renovable → 85%+ con solar/eólica | Líder renovable LATAM |
| Derechos laborales | Estándares OIT en todo | Evita sanciones |

## Organigrama de Ejecución (PMO)

```mermaid
flowchart TD
    P["<b>Parlamento + Ciudadanos</b><br/>Supervisión soberana"] --> CF
    P --> FN

    CF["<b>Consejo del Fondo</b><br/>7 miembros<br/>Política de inversión + reglas"] --> ADM["<b>Administrador (CEO técnico)</b><br/>Gestión diaria del fondo"]
    CF --> PDC["<b>Plataforma Digital Ciudadana</b><br/>Censo, inversión, transparencia<br/><i>Operada por privados</i>"]

    ADM --> AP["<b>Agencia Petrolera</b><br/>JVs + upstream"]
    ADM --> AHT["<b>Agencia Hubs Tech</b><br/>(tipo CORFO)<br/>Aceleradoras, VC, zonas"]

    FN["<b>Fiscal Nacional</b><br/>Anticorrupción<br/><i>Nunca reporta al ejecutivo</i>"] -.->|"Audita"| ADM
    FN -.->|"Audita"| AP
    FN -.->|"Audita"| AHT

    GOB["<b>Gobierno de Transición</b>"] --> AP
    GOB --> AHT

    style P fill:#1B3A5C,stroke:#C49A2A,color:#fff
    style CF fill:#1B3A5C,stroke:#C49A2A,color:#fff
    style FN fill:#8B0000,stroke:#C49A2A,color:#fff
    style ADM fill:#2E5A3C,stroke:#C49A2A,color:#fff
    style AP fill:#2E5A3C,stroke:#C49A2A,color:#fff
    style AHT fill:#2E5A3C,stroke:#C49A2A,color:#fff
    style PDC fill:#C49A2A,stroke:#1B3A5C,color:#fff
    style GOB fill:#4A4A4A,stroke:#C49A2A,color:#fff
```

| Entidad | Responsabilidad | Reporta a |
|---------|----------------|-----------|
| Consejo del Fondo (7 miembros) | Política de inversión + reglas | Parlamento + ciudadanos |
| Administrador (CEO técnico) | Gestión diaria | Consejo |
| Fiscal Nacional | Anticorrupción | Parlamento (nunca ejecutivo) |
| Agencia Petrolera | JVs + upstream | Gobierno + Consejo |
| Agencia Hubs Tech (tipo CORFO) | Aceleradoras, VC, zonas | Gobierno + privados |
| Plataforma Digital Ciudadana | Censo, inversión, transparencia | Consejo (operada por privados) |

**Principio:** KPIs públicos trimestrales. 2 trimestres sin cumplir = revisión automática de liderazgo.
