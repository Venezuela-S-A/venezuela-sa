# Style Guide — Venezuela S.A. Plan

## Voice and Persona

The plan speaks as a **startup founder pitching to investors and citizens simultaneously**. It is:

- **Confident but honest.** "This is achievable" but also "this is the hardest thing Venezuela has ever attempted."
- **Numbers-first.** Every claim is backed by a specific number from a named source.
- **Anti-bureaucratic.** No government-speak. No "se procederá a implementar mecanismos de articulación interinstitucional." Instead: "Se crea una agencia. Tiene 7 personas. Reporta al parlamento."
- **Caribeño pero serio.** The plan can reference Venezuela's culture, energy, and spirit without being frivolous. The humor is in the audacity of the vision, not in jokes.

## Language Rules

### Spanish (Primary Language)
- Formal but accessible. A high school graduate should understand every sentence.
- Technical terms in English are OK when they are industry standard: forward contract, BigTech, data center, IPO, MVP, angel investor, seed round, due diligence.
- Numbers use Latin American format: punto for thousands (1.000), coma for decimals (3,5%). Exception: USD amounts use Anglo format for international readability (USD 183,000 M or USD 183.000 M — be consistent within a section).
- Abbreviations defined on first use: bpd (barriles por día), PIB (Producto Interno Bruto), M (millones), B (billions in English context), T (trillions).

### Prohibited Phrases
- "En el marco de" → say what you mean directly
- "Se espera que" → "Rystad proyecta que" (name the source)
- "Aproximadamente" without a number → always give the range
- "Podría ser" without conditions → "Si el precio se mantiene en X, entonces Y"
- "Es importante mencionar que" → just mention it
- "Cabe destacar" → just state the fact
- Any form of "Venezuela tiene un gran potencial" without specific data

### Required Phrases / Patterns
- Always attribute: "Según Rystad Energy (enero 2026)..." not "Según analistas..."
- Always date sources: "(UNHCR, diciembre 2025)" not just "(UNHCR)"
- Always link in markdown: `[Rystad Energy](https://www.rigzone.com/...)`
- For projections: "A USD 60/barril base, el ingreso sería X. Si el precio sube a USD 80, sería Y."
- For risks: "Riesgo: [descripción]. Severidad: [CRÍTICO/ALTO/MEDIO]. Mitigación: [acción concreta]."

## Structure Rules

### Section Hierarchy
1. **Heading 1** = Major section (numbered: "1. DIAGNÓSTICO")
2. **Heading 2** = Subsection (numbered: "1.1 Reservas de Petróleo")
3. **Heading 3** = Topic within subsection (named, not numbered)
4. **Bold paragraph lead** = Key concept (pattern: `**Concepto:** Explicación`)

### Data Presentation
- **Comparison data** → Table (always)
- **Timeline/phases** → Table with columns: Phase, Action, Investment, Timeframe
- **Lists of items** → Table if >5 items, bullets if ≤5
- **Processes** → Mermaid diagram in MD, prose in DOCX
- **Sources** → Inline link in MD, italic gray line below content in DOCX

### Cross-References
In Markdown: `Ver [Sección de Gobernanza](/docs/04-gobernanza/sistema-antifragil)`
In DOCX: "Ver Sección 7: Gobernanza"

## Emotional Arc

The document follows a deliberate emotional arc:

1. **Intro/Tesis** → Excitement and vision (startup energy)
2. **Diagnóstico** → Stark reality (cold data)
3. **Fase 0** → Urgency and empathy (humanitarian)
4. **Motor Financiero** → Confidence through mechanics (here's how the money works)
5. **Ciudadanos/Diáspora** → Inclusion and belonging (you are part of this)
6. **Gobernanza** → Seriousness and rigor (we won't repeat mistakes)
7. **Transformación** → Aspiration and possibility (what we're building)
8. **Geopolítica** → Pragmatism (we live in the real world)
9. **Proyecciones** → Grounded optimism (the numbers work at $60)
10. **Riesgos** → Brutal honesty (this could fail if...)
11. **Conclusión** → Call to action (the offer is on the table)
