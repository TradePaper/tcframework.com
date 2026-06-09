# Token Continuity Framework (TCF)

**Applying Ground Lease Doctrine to Token Holder Structural Protections Under U.S. Securities Law**

[tcframework.com](https://tcframework.com) | [White Paper (PDF)](https://tcframework.com/token-continuity-framework-paper.pdf)

---

## Overview

The Token Continuity Framework argues that the dominant dual equity-token architecture in crypto is economically analogous to a ground lease — predictably subordinating token holders to equity sponsors — and that the cure is structural: enforceable, legible, calibrated constraints on founding-entity discretion across 18 issues. That structural work is pathway-agnostic. It maps onto the **March 2026 SEC/CFTC Joint Interpretive Release** (Release Nos. 33-11412; 34-105020) and its separation doctrine, and onto the statutory decentralization pathway proposed by the **Digital Asset Market Clarity (CLARITY) Act** (pending; advanced out of the Senate Banking Committee in May 2026 — not enacted). The framework does not depend on the durability of any single regime: the Release is interpretive guidance, not binding rulemaking.

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
- **Release Categories** — Organized taxonomy of regulatory provisions
- **Compliance Pathways** — Structural, statutory, exemptive, and legacy guidance routes
- **Separation Timeline** — Key dates and implementation phases
- **Issuer Promise Audit** — Cross-reference tool for disclosure obligations

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
  data/
    base.ts                   # Core data (promise types, release categories)
    questions.ts              # 18 diagnostic questions + tier mappings
    releaseData.ts            # March 2026 Release data
    theaterPatterns.ts        # Theater protocol patterns
  lib/
    calcTier.ts               # Tier calculation engine
    analytics.ts              # PostHog event tracking
public/
  token-continuity-framework-paper.pdf   # White paper
```

## Author

**David T. Kuhn**
General Counsel | Blockchain, Digital Assets & Finance

- [kvladvisory.com](https://kvladvisory.com)
- [LinkedIn](https://linkedin.com/in/davidtkuhn)
- [EventRisk.ai](https://eventrisk.ai) — Prediction markets and derivatives law research (companion project)

## License

All rights reserved. Research papers and written content are published for educational and analytical purposes. Code is provided for reference. Please contact the author for licensing inquiries.
