---
name: venezuela-sa-plan
description: "Quality control skill for writing, editing, and expanding the Venezuela S.A. national reconstruction plan. Use this skill whenever the user asks to write new sections, edit existing content, review quality, add data, update projections, or expand any part of the 'Venezuela S.A.' plan, 'Plan Venezuela 2035', or any document related to Venezuelan reconstruction, sovereign fund, diaspora investment, or startup nation strategy. Also trigger when the user mentions 'the plan', 'el plan', 'the document', updating sections, adding references, or writing in the established style. This skill ensures every output maintains data integrity, source verification, consistent tone, and structural completeness across all 23 sections and 70+ sources."
---

# Venezuela S.A. Plan — Quality & Style Guide

## Overview

This skill enforces quality standards for the Venezuela S.A. national reconstruction plan. Every piece of content must meet the standards below before being delivered. The plan exists in two formats:
- **DOCX** (formal document, v1.0, 1,422 paragraphs, 23 sections)
- **Markdown/Docusaurus** (modular site, 29 files, 7 categories)

Read `references/style-guide.md` for tone and formatting rules.
Read `references/data-standards.md` for sourcing and verification rules.
Read `references/section-map.md` for the full document structure and what belongs where.

---

## Core Principles (NEVER violate these)

### 1. Zero Invented Data
Every number, percentage, projection, and comparison MUST have a real, verifiable source. If a source cannot be found via web search, the claim is NOT included. Instead, write: *"[Dato no verificado — requiere investigación adicional]"*.

**Before writing any number, ask yourself:**
- Can I name the organization that produced this data?
- Can I provide a URL or publication name?
- Is the data from 2024-2026 (or is it the most recent available)?

### 2. Price Base: USD $60/barrel
ALL petroleum projections use USD 60/barrel as the conservative base. This was established because:
- [EIA STEO (March 2026)](https://www.eia.gov/outlooks/steo/) projects Brent at ~$64 average for 2027
- Pre-Ormuz crisis, Brent traded at $67-69
- BMI/Fitch projected $67 for 2026

Any price above $60 is described as **upside that goes to the sovereign fund**. Never use $70, $80, or $100 as the base — those are sensitivity scenarios only.

### 3. Production Timeline: Rystad Energy (January 2026)
ALL petroleum production milestones follow [Rystad Energy's analysis](https://www.rigzone.com/news/could_venezuela_production_get_back_to_3mm_barrels_per_day-08-jan-2026-182716-article/):
- 1.1M bpd → hold flat: USD 53B over 15 years
- +300K bpd (brownfield): 2-3 years
- 2M bpd: early 2030s, USD 41B additional
- 3M bpd: ~2040, USD 183B total
- Capital needed upfront: USD 30-35B in first 2-3 years

Never claim Venezuela can reach 3M bpd in 10 years. Rystad says 15.

### 4. Pragmatic Geopolitical Stance
The plan operates within the CURRENT reality:
- U.S. controls Venezuelan oil sales "indefinitely" ([Wright, Jan 2026](https://abcnews.go.com/US/energy-secretary-wright-details-plans-us-control-venezuelan/story?id=128979604))
- Revenue deposited in U.S.-controlled accounts
- Delcy Rodríguez as interim president
- No formally recognized government
- Elections expected during Trump's term ([Wright, Feb 2026](https://www.cnbc.com/2026/02/13/venezuela-oil-sales-qatar-chris-wright-trump.html))
- Pre-Seed round of diaspora does NOT depend on any of the above

Never write as if Venezuela has full sovereignty over oil. Write within the transition framework.

### 5. Oil is Fuel, Tech is Destination
The plan's thesis: petroleum is NOT the business. It's the **fuel** for the business. The business is transforming Venezuela into a tech-powered economy via cheap hydroelectric energy. Every section must reinforce this hierarchy:
1. Rebuild energy (oil revenue + hydro)
2. Cheap energy attracts BigTech
3. BigTech generates ecosystem
4. Ecosystem diversifies economy
5. Oil drops from 95% to <40% of exports

---

## Writing Standards

### Tone
- **Direct and honest.** No diplomatic hedging. Say "this is critical" not "this could potentially be important."
- **Data-first.** Lead with the number, then explain. Not the reverse.
- **Pragmatic, not idealistic.** Acknowledge obstacles explicitly. The "Riesgos" section exists for a reason.
- **Startup energy.** This is a pitch deck for a nation, not a government white paper.
- **Bilingual awareness.** The plan is in Spanish. Use formal but accessible Spanish. Avoid bureaucratic jargon. Technical terms in English are OK when they are industry standard (forward contract, BigTech, data center, IPO).

### Formatting (Markdown)
- **Tables over prose** for data comparisons. Always.
- **Bold for key numbers** within prose.
- **Links on every source reference.** Format: `[Source Name](URL)` inline.
- **Docusaurus admonitions** for critical information:
  - `:::danger` for risks and warnings
  - `:::info` for context and references
  - `:::tip` for upside scenarios
  - `:::caution` for price/projection caveats
- **Mermaid diagrams** for flows and processes when they add clarity.
- **No bullet point walls.** If a list exceeds 5 items, consider a table instead.

### Formatting (DOCX)
- Font: Arial throughout
- Headings: Blue (#1B3A5C), bold
- Sub-headings: Gold (#C49A2A) for H3
- Tables: Blue header with white text, alternating light blue rows
- Sources: Italic, gray, smaller font below relevant content
- Page breaks before each major section

---

## Quality Checklist (Run Before Delivering ANY Content)

Before delivering new or edited content, verify ALL of the following:

```
□ Every number has a named source with date
□ Every source has a URL (or publication name if no URL exists)
□ No source is older than 2023 unless it's historical data
□ Price base is USD 60/barrel (not 70, 75, 80, or 100)
□ Production timeline matches Rystad (15 years to 3M bpd)
□ Geopolitical framing is pragmatic (U.S. controls oil currently)
□ Oil is positioned as fuel, tech as destination
□ New content fits within existing section structure (see section-map.md)
□ Cross-references to other sections are correct
□ Tables are used for data comparisons
□ Admonitions are used for warnings/info/tips
□ Tone is direct, data-first, and honest about risks
□ No invented data, no unverified claims
□ References section is updated with any new sources
□ Sovereign fund projections use 4-7% return (not 15% like Norway's actual)
□ Diaspora data uses UNHCR December 2025 (7.9M)
□ Fund governance references Santiago Principles + EITI + Carnegie
□ Anti-corruption mechanisms reference Estonia + Georgia + Singapore CPIB
□ Education data references WEF Future of Jobs 2025 (170M/92M)
□ Data center market references ResearchAndMarkets (USD 7.16B→14.3B)
```

---

## How to Handle Common Tasks

### Adding a New Section
1. Check `references/section-map.md` — does it fit an existing section?
2. If new section needed: assign number, create MD file in correct category
3. Write content following all standards above
4. Add to `sidebars.js` in correct position
5. Update references.md with any new sources
6. Cross-reference from related sections

### Updating Projections
1. Search for the latest data (web search required)
2. Verify source credibility (prefer: Rystad, EIA, IEA, OPEP, FMI, WEF, UNHCR)
3. Recalculate ALL dependent numbers (income → fund → dividends → per-capita)
4. Update tables in BOTH formats (DOCX + MD)
5. Note the date of the update in the source citation

### Reviewing Existing Content
1. Run the Quality Checklist above
2. Flag any claim without a source
3. Flag any source without a URL
4. Flag any number that contradicts Rystad/EIA/FMI
5. Flag any section that positions oil as the primary business (should be fuel)
6. Verify all internal cross-references still work

### Translating to English
- Maintain ALL data, sources, and URLs
- Adapt cultural references (explain "CORFO" etc.)
- Keep technical terms that are standard in English
- Maintain the same direct, data-first tone

---

## Key Reference Data (Quick Access)

| Parameter | Value | Source |
|-----------|-------|--------|
| Oil reserves (official) | 303B barrels | OPEP ASB 2025 |
| Oil reserves (conservative) | 100-110B barrels | Monaldi, Rice U. |
| Current production | 0.9-1.1M bpd | OPEP/IEA 2025 |
| Investment for 3M bpd | USD 183B / 15 years | Rystad Energy Jan 2026 |
| GDP 2025 | USD 82.8B | IMF |
| External debt | USD 150-170B | Reuters/CNBC Dec 2025 |
| Diaspora | 7.9M people | UNHCR Dec 2025 |
| Population in Venezuela | ~28-32M | INE/UN |
| Guri capacity | 10,200 MW | Power Technology |
| Caroní cascade potential | 18,000 MW | Mongabay 2023 |
| Norway fund value | USD 2.2T (end 2025) | NBIM |
| Norway fund return 2025 | 15.1% / USD 247B | CNBC Jan 2026 |
| Alaska PFD 2025 | USD 1,000/person | Alaska DOR |
| LATAM DC market 2024 | USD 7.16B | ResearchAndMarkets |
| LATAM DC market 2030 | USD 14.3B (CAGR 12.22%) | ResearchAndMarkets |
| WEF jobs created by 2030 | 170M | WEF Future of Jobs 2025 |
| WEF jobs displaced by 2030 | 92M | WEF Future of Jobs 2025 |
| Price base | **USD 60/barrel** | EIA STEO Mar 2026 |
| Start-Up Chile alumni | 5,000+ from 85 countries | startupchile.org |
| CORFO VC investment | USD 1.061B in 72 funds | CORFO/Entnerd 2025 |
| Estonia e-gov savings | 2% GDP/year | Centre for Public Impact |
| China loans to Venezuela | USD 60B+ (17 contracts) | AidData/Columbia CGEP |
| U.S. oil sales revenue | >USD 1B (as of Feb 2026) | CNBC Feb 2026 |

---

## Document Version History

| Version | Date | Key Changes |
|---------|------|-------------|
| v1.0 | Mar 2026 | Primera versión pública: 30 secciones, 85+ fuentes, 30+ gráficos |
