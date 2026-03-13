# Data Standards — Venezuela S.A. Plan

## Source Tier System

### Tier 1 (Preferred — always use if available)
- **Energy:** OPEP ASB, Rystad Energy, IEA, EIA (U.S.), BP Statistical Review
- **Economy:** FMI, World Bank, BID (Inter-American Development Bank)
- **Governance:** Santiago Principles (IFSWF), EITI, Carnegie Endowment, IMF Working Papers
- **Migration:** UNHCR, R4V Platform, IOM
- **Tech markets:** ResearchAndMarkets, Mordor Intelligence, Gartner, IDC
- **Employment/AI:** WEF Future of Jobs Report, McKinsey Global Institute, OECD
- **Norway fund:** NBIM (official), Norges Bank
- **Chile/CORFO:** CORFO.cl, Start-Up Chile official, IEA, WIPO

### Tier 2 (Acceptable — use when Tier 1 unavailable)
- Reuters, CNBC, Bloomberg, Financial Times, Al Jazeera, CNN
- Academic papers (peer-reviewed)
- Think tanks: RAND, Brookings, Columbia CGEP, CGDev, Peterson Institute

### Tier 3 (Use with caution — always cross-reference)
- Wikipedia (OK for background facts, not for projections)
- News aggregators, opinion pieces
- Government self-reported data (especially Venezuela's — always note it's self-reported)

### Never Use
- Social media posts as primary source
- Unattributed "analysts say" or "experts believe"
- Data older than 2020 for economic projections (unless historical context)
- Venezuelan government data without noting it's self-reported and unaudited

## Verification Protocol

Before including ANY number:

1. **Can you name the org?** "Rystad Energy" not "analysts"
2. **Can you provide a date?** "January 2026" not "recently"
3. **Can you link it?** URL preferred. Publication name + date if no URL
4. **Is it the most recent?** Search for updates before using cached data
5. **Does it contradict established data?** If Rystad says 15 years and another source says 5, note the discrepancy and explain why you chose one over the other

## Calculation Standards

### Oil Revenue Calculations
```
Gross Revenue = Production (bpd) × 365 × Price (USD/barrel)
Net Revenue = Gross Revenue - (Production × 365 × Cost per barrel)
Cost per barrel (heavy crude) = USD 35-40 (extraction + dilution + transport + processing)
At USD 60 base: Net margin ≈ USD 20-25 per barrel
```

### Fund Growth Projections
```
Annual contribution = % of net oil revenue allocated to fund
Fund return = 4-7% annually (CONSERVATIVE — Norway did 15.1% in 2025)
Fund value = Σ(annual contributions × compound return)
Never use >7% as base return
```

### Citizen Dividend Calculations
```
Dividend pool = % of fund income allocated to dividends (plan uses 5-10%)
Per capita = Dividend pool ÷ total Venezuelans (use 40M = 32M internal + 8M diaspora)
Always show the calculation, not just the result
```

### Forward Contract Valuations
```
Contract value = Barrels committed × guaranteed price
Advance (prepago) = 20-25% of contract value
Disbursement is STAGED, not lump sum — tied to production milestones
First tranche realistically: USD 30-50B based on Rystad's timeline
```

## Data Freshness Requirements

| Data Type | Maximum Age | Refresh Trigger |
|-----------|------------|-----------------|
| Oil prices | Same day (search before using) | Any price reference |
| Production data | 3 months | Any production claim |
| GDP/debt | 6 months | Any economic comparison |
| Diaspora numbers | 6 months | Any migration claim |
| Fund values (Norway) | 3 months | Any fund comparison |
| Tech market data | 12 months | Any market size claim |
| Geopolitical status | Search every time | Any political claim |

## Handling Uncertainty

When data is uncertain, use this format:

**Known with high confidence:** State directly. "Venezuela has 303B barrels (OPEP ASB 2025)."

**Known with caveats:** State + caveat. "Venezuela has 303B barrels (OPEP 2025, self-reported; Monaldi estimates 100-110B as more realistic)."

**Estimated:** Use ranges. "Investment needed: USD 150-183B depending on scope (Rystad base: USD 183B for 3M bpd)."

**Unknown:** Say so explicitly. "No reliable data exists for X. This section will be updated when data becomes available."

**Never:** Present estimates as facts, or facts without sources.
