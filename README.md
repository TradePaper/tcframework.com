# Token Continuity Framework (TCF)

**Structural continuity rights for token holders — enforced by design, not by a governance vote.**

Applying ground lease doctrine — and the broader law of structural subordination — to token holder protections under U.S. securities law.

[tcframework.com](https://tcframework.com) | [White Paper (PDF)](https://tcframework.com/token-continuity-framework-paper.pdf)

---

## Overview

The Token Continuity Framework argues that the dominant dual equity-token architecture in crypto is economically analogous to a ground lease — and to other structurally subordinate arrangements (franchises, ABS tranches, technology licenses, concessions) where a senior party retains control — predictably subordinating token holders to equity sponsors. The cure is structural: enforceable, legible, calibrated constraints on founding-entity discretion across 18 issues — protections that operate by design rather than depending on token-holder votes. That structural work is pathway-agnostic. It maps onto the **March 2026 SEC/CFTC Joint Interpretive Release** (Release Nos. 33-11412; 34-105020) and its separation doctrine, and onto the statutory decentralization pathway proposed by the **Digital Asset Market Clarity (CLARITY) Act** (pending; advanced out of the Senate Banking Committee in May 2026 — not enacted). The framework does not depend on the durability of any single regime: the Release is interpretive guidance, not binding rulemaking.

The companion web application provides interactive tools for practitioners, regulators, and protocol designers to assess token structures, navigate the regulatory release, and apply the framework.

## Research Series

| Part | Date | Title | Focus |
|------|------|-------|-------|
| **I** | Dec 2025 | *Tokens Are Leases: Structural Subordination in Crypto's Dual Equity-Token Architecture* | Demonstrates that dual equity/token structures mirror ground leases; proposes policy framework from ground-lease doctrine |
| **II** | Dec 2025 | *From Disclosure to Design: Constraining Endogenous Risk in Structurally Subordinate Tokens* | Extends the analogy to securities law's core concern; proposes tiered token recognition using leasehold mortgagee protections |
| **III** | Mar 2026 | *Token Continuity Framework (White Paper)* | Practitioner framework applying the full doctrine to token holder protections under the March 2026 SEC/CFTC joint release |

## Interactive Tools

### Structural Diagnostic (`/diagnostic`)
An 18-question assessment tool that evaluates any token's structural position across governance, economic, and continuity dimensions. Produces a tier classification with radar chart visualization.

### Release Navigator (`/release`)
Four-tab explorer for the March 2026 SEC/CFTC Joint Interpretive Release:
- **Five-category classifier** — Select your token's category (digital commodities, collectibles, tools, stablecoins, or securities) to see its regulatory treatment and required TCF tier
- **Pathways to clarity** — The routes to non-registration: exemptive (anticipated rulemaking), statutory (pending CLARITY Act), and a no-action letter as a costly fallback — all served by the same structural work
- **Separation timeline** — Where a token sits on the separation path and the TCF actions required at each stage
- **Issuer promise audit** — Cross-reference tool for tracking issuer promises against fulfillment/abandonment

### Explainer (`/explainer`)
Four-panel interactive walkthrough of the ground lease analogy:
- Domain spectrum slider showing token structural positioning
- Stack diagrams illustrating equity-token layering
- Core argument presentation with visual aids

### Framework Reference (`/framework`)
Comprehensive reference with three views:
- **18-Issue Table** — Full structural assessment matrix
- **Theater Protocol** — Pattern recognition for common token arrangements
- **Structural-Readiness Checklist** — Practical continuity and pathway-readiness tool

## Tech Stack

- **Framework:** Vite + React 18 (TypeScript, strict mode)
- **Routing:** React Router v6
- **Visualization:** Custom radar charts, interactive sliders
- **Analytics:** PostHog
- **Deployment:** Vercel

## Project Structure

```
src/
  pages/
    HomePage.tsx              # Hero + framework overview
    ExplainerPage.tsx         # Ground lease analogy explainer
    DiagnosticPage.tsx        # 18-question structural assessment
    FrameworkPage.tsx         # Reference tables + checklists
    ReleaseNavigatorPage.tsx  # SEC/CFTC Release explorer
    PaperPage.tsx             # PDF viewer with download
  components/
    Nav.tsx                   # Navigation
    RadarChart.tsx            # Diagnostic output visualization
    TierBadge.tsx             # Tier classification display
    ImpactBadge.tsx           # High/med/low impact badge
    PostHogProvider.tsx       # Analytics + pageview tracking
  data/
    base.ts                   # Core data module (questions, clusters, tiers, release categories, domains, theater patterns)
    questions.ts              # Re-exports diagnostic questions from base.ts
    clusters.ts               # Re-exports issue clusters from base.ts
    domainData.ts             # Re-exports domain spectrum data from base.ts
    releaseData.ts            # Re-exports March 2026 Release data from base.ts
    theaterPatterns.ts        # Re-exports theater protocol patterns from base.ts
  lib/
    analytics.ts              # PostHog event tracking
  utils/
    calcTier.ts               # Tier calculation engine
public/
  token-continuity-framework-paper.pdf   # White paper
```

## Author

**David T. Kuhn**
General Counsel | Blockchain, Digital Assets & Finance

- [kvladvisory.com](https://kvladvisory.com)
- [LinkedIn](https://www.linkedin.com/in/david-t-kuhn/)
- [EventRisk.ai](https://eventrisk.ai) — Prediction markets and derivatives law research (companion project)

## License

All rights reserved. Research papers and written content are published for educational and analytical purposes. Code is provided for reference. Please contact the author for licensing inquiries.
