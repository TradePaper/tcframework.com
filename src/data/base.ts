export type TierValue = 0 | 1 | 2 | 3;
export type ImpactLevel = "high" | "med" | "low";
export type ClusterId = "notice" | "buyburn" | "mod" | "ip" | "capital" | "gov";
export type PromiseStatus = "fulfilled" | "abandoned" | "active" | "none";

export interface QuestionOption {
  label: string;
  text: string;
  tier: TierValue;
}

export interface Question {
  id: string;
  cluster: ClusterId;
  impact: ImpactLevel;
  title: string;
  question: string;
  why: string;
  critical: boolean;
  options: [QuestionOption, QuestionOption, QuestionOption, QuestionOption];
  paperRef: string;
}

export interface Cluster {
  id: ClusterId;
  label: string;
  questions: number[];
}

export interface DomainData {
  id: string;
  name: string;
  short: string;
  sub: string;
  tag: string;
  body: string;
  cols: [string, string, string, string];
}

export interface SpectrumState {
  pos: number;
  label: string;
  tier: string | null;
  howey: string;
  analysis: string;
  color: string;
}

export interface TheaterCheck {
  text: string;
  critical: boolean;
}

export interface TheaterPattern {
  title: string;
  desc: string;
  checks: TheaterCheck[];
}

export interface ReleaseCategory {
  id: string;
  name: string;
  icon: string;
  desc: string;
  tcf: string;
}

export interface SeparationStage {
  id: string;
  label: string;
  desc: string;
  color: string;
  tcf: string;
  complete: boolean;
}

export interface PromiseType {
  id: string;
  title: string;
  desc: string;
  risk: "high" | "med" | "low";
  implications: Record<PromiseStatus, string>;
}

export const TIER_LABELS: string[] = ["Not implemented", "Tier 1 — anti-abandonment", "Tier 2 — governance & migration", "Tier 3 — continuity & replacement"];
export const TIER_SHORT: string[] = ["Not implemented", "Tier 1", "Tier 2", "Tier 3"];

export const CLUSTERS: Cluster[] = [
  { id: "notice", label: "Notice & Cure", questions: [0, 1, 2] },
  { id: "buyburn", label: "Revenue Routing / Buy-Burn", questions: [3] },
  { id: "mod", label: "Modification Control", questions: [4, 5] },
  { id: "ip", label: "IP & Continuity", questions: [6, 7, 8] },
  { id: "capital", label: "Capital Structure", questions: [9] },
  { id: "gov", label: "Governance & Survivability", questions: [10, 11, 12, 13, 14, 15, 16, 17] },
];

export const QUESTIONS: Question[] = [
  {
    id: "4.1", cluster: "notice", impact: "high",
    title: "Notice before economic modification",
    question: "Before the founding entity can implement a change to token economics — supply, fees, treasury allocation, or governance parameters — what notice are token holders given?",
    why: "The founding entity's ability to act without warning is the core feature that makes token risk endogenous. Notice converts surprise into process — but only if it applies to all material changes and is long enough to allow a response.",
    critical: false,
    options: [
      { label: "A", text: "No advance notice is required. Changes can be implemented immediately.", tier: 0 },
      { label: "B", text: "Changes are published on-chain or in governance forums before implementation, but there is no defined minimum notice period.", tier: 1 },
      { label: "C", text: "A defined notice period of at least 7 days applies to all material changes to token economics, governance parameters, and protocol upgrades, with publication in a standardized format accessible to all token holders.", tier: 2 },
      { label: "D", text: "A defined notice period applies to all material changes, and any modification attempted without proper notice is automatically void — the smart contract or governance system rejects it without additional action by token holders.", tier: 3 },
    ],
    paperRef: "Section V.B — Issue 4.1"
  },
  {
    id: "4.2", cluster: "notice", impact: "high",
    title: "Token holder intervention rights",
    question: "Once a proposed change to token economics is announced, can token holders actually stop it from taking effect?",
    why: "Notice without intervention rights is disclosure, not protection. The question is whether token holders can do something about a proposed change — not just learn about it.",
    critical: true,
    options: [
      { label: "A", text: "No. Token holders can comment or signal displeasure, but the founding entity can implement changes regardless.", tier: 0 },
      { label: "B", text: "Token holders can vote to block purely economic modifications, but the founding entity retains unilateral authority over protocol upgrades and governance parameter changes.", tier: 1 },
      { label: "C", text: "Token holders can vote to block both economic modifications and protocol changes above defined thresholds, with the founding entity's votes excluded from quorum on self-interested proposals.", tier: 2 },
      { label: "D", text: "Token holders have a full suite of intervention rights covering all material modifications, with founding entity vote exclusion and the ability to trigger migration if governance is deadlocked.", tier: 3 },
    ],
    paperRef: "Section V.B — Issue 4.2"
  },
  {
    id: "4.4", cluster: "notice", impact: "high",
    title: "Standstill during governance challenge",
    question: "If token holders file a governance challenge to a proposed modification, does the modification get automatically paused while the challenge is pending?",
    why: "Standstill converts notice from a formality into a real constraint. Without it, the founding entity can implement the change while token holders are still mobilizing to challenge it.",
    critical: false,
    options: [
      { label: "A", text: "No. The founding entity can implement changes at any time, including after a challenge has been filed.", tier: 0 },
      { label: "B", text: "There is an informal norm against implementing challenged changes, but no automatic mechanism prevents implementation.", tier: 1 },
      { label: "C", text: "A governance challenge automatically suspends implementation until the vote concludes. The suspension is enforced on-chain or through a binding governance agreement.", tier: 2 },
      { label: "D", text: "The standstill is integrated with intervention, migration, and replacement mechanics — the founding entity cannot race ahead through any pathway, including admin contract upgrades.", tier: 3 },
    ],
    paperRef: "Section V.B — Issue 4.4"
  },
  {
    id: "4.3", cluster: "buyburn", impact: "high",
    title: "Revenue routing and buy/burn mechanisms",
    question: "If the protocol has a buy/burn program or similar mechanism that routes protocol fee revenue to token purchases or burns — how is it governed?",
    why: "Under the March 2026 Release's issuer-promise standard, a buy/burn program that is (a) promised to purchasers, (b) operated at founding entity discretion, and (c) designed to generate price appreciation creates investment contract status that cannot be separated without completing or unambiguously abandoning the promise. Even a mechanically automated burn is contaminated if funded from a treasury subject to founding entity discretionary control.",
    critical: true,
    options: [
      { label: "A", text: "No buy/burn program exists, OR one exists but is operated at founding entity discretion — the founding entity decides when to execute purchases, how much to spend, and which tokens to buy.", tier: 0 },
      { label: "B", text: "The burn trigger is defined in smart contract code, but the founding entity retains discretionary authority over the treasury or fee pool that funds the program.", tier: 1 },
      { label: "C", text: "Buy/burn parameters (trigger conditions, maximum spend, funding source, burn address) are encoded on-chain and can be modified only by a governance vote subject to the founding entity vote-weight cap. Any representations made to token purchasers about the program are publicly documented as either fulfilled or superseded.", tier: 2 },
      { label: "D", text: "All revenue routing — including buy/burn funding, treasury allocations, and protocol fee distributions — is governed by on-chain rules with no founding entity discretionary override. A publicly filed representation schedule maps each prior promise to its current fulfillment or separation status.", tier: 3 },
    ],
    paperRef: "Section V.B — Issue 4.3 (new — March 2026 Release)"
  },
  {
    id: "4.5", cluster: "mod", impact: "med",
    title: "Token financing and transfer rights",
    question: "Can token holders freely transfer, pledge, or use their tokens as collateral without the founding entity's approval?",
    why: "Discretionary transfer restrictions are a control mechanism. If the founding entity can block secondary market activity, token value depends on its ongoing goodwill — textbook endogenous risk.",
    critical: false,
    options: [
      { label: "A", text: "The founding entity has discretionary approval rights over token transfers or has imposed transfer restrictions that it can modify unilaterally.", tier: 0 },
      { label: "B", text: "Tokens are freely transferable, but there are no formal provisions addressing token pledges or use as collateral.", tier: 1 },
      { label: "C", text: "Tokens are freely transferable and pledgeable, with any transfer restrictions objective, non-discretionary, and publicly specified in advance.", tier: 2 },
      { label: "D", text: "Full transfer flexibility. The founding entity is explicitly barred from imposing new restrictions without a supermajority governance vote excluding its own votes.", tier: 3 },
    ],
    paperRef: "Section V.B — Issue 4.5"
  },
  {
    id: "4.6", cluster: "mod", impact: "high",
    title: "Anti-modification constraints",
    question: "How constrained is the founding entity's ability to modify core token economics — supply caps, fee structures, treasury allocation rules, and token burn mechanisms?",
    why: "Anti-modification constraints are the primary mechanism for converting endogenous risk into rule-bound risk. Without them, all other protections can be undone by economic rewrites.",
    critical: true,
    options: [
      { label: "A", text: "The founding entity can modify token economics unilaterally, including supply, fees, and treasury rules, with no governance requirement.", tier: 0 },
      { label: "B", text: "Core parameters are hard-coded at the smart contract level, but upgrades require governance approval where the founding entity controls a majority position.", tier: 1 },
      { label: "C", text: "Economic modifications above defined thresholds require a supermajority vote with the founding entity's votes capped at a minority and excluded from quorum on self-interested proposals.", tier: 2 },
      { label: "D", text: "Any modification affecting token value, utility, or transferability requires token holder consent. Founding entity vote exclusion is enforced at the beneficial ownership level, not just the wallet address level.", tier: 3 },
    ],
    paperRef: "Section V.B — Issue 4.6"
  },
  {
    id: "4.7", cluster: "ip", impact: "high",
    title: "Fork rights and replacement mechanism",
    question: "If the founding entity stopped operating tomorrow — voluntarily, through insolvency, or acquisition — could token holders continue the protocol with full access to its IP and operational infrastructure?",
    why: "This is the single most important protection in the framework. It converts founding entity exit from total value destruction into a remediable event — the token equivalent of the ground lease's replacement-lease right, and the clearest path to satisfying the Release's separation doctrine.",
    critical: true,
    options: [
      { label: "A", text: "No. The IP and operational infrastructure are controlled by the founding entity, and no mechanism exists for token holders to continue without founding entity participation.", tier: 0 },
      { label: "B", text: "A technical fork is possible via open source, but the founding entity retains proprietary improvements that could challenge community continuation. No governance-controlled migration path exists.", tier: 1 },
      { label: "C", text: "A governance-controlled migration path exists with defined trigger conditions. Proprietary improvements are subject to an automatic IP license to governance-designated successors upon insolvency, voluntary exit, or governance vote. Legal opinion confirms enforceability.", tier: 2 },
      { label: "D", text: "Full continuity-and-replacement package: governance-controlled migration, broad designee rights, automatic IP licensing on identical terms, and founding entity barred from using IP claims to impede a governance-approved successor.", tier: 3 },
    ],
    paperRef: "Section V.B — Issue 4.7"
  },
  {
    id: "4.11", cluster: "ip", impact: "med",
    title: "Protocol assets and improvements",
    question: "When the founding entity makes improvements to the protocol, do those improvements become part of the token's utility package, or could they be withdrawn on exit?",
    why: "A founding entity that retains ownership of protocol improvements can exit while stripping the token of the features that drove its value — leaving token holders with a degraded protocol.",
    critical: false,
    options: [
      { label: "A", text: "Protocol improvements are owned by the founding entity and could be withdrawn on exit. The token's utility package is not defined in terms that bind the founding entity.", tier: 0 },
      { label: "B", text: "Core functionality is documented and open-sourced, but proprietary improvements are not subject to any obligation to make them available to token holders on exit.", tier: 1 },
      { label: "C", text: "Improvements made during the founding entity's involvement are part of the token's defined utility package and subject to the same IP encumbrance as the base protocol.", tier: 2 },
      { label: "D", text: "The token utility package is explicitly defined in a binding instrument. Any improvements automatically accrue to that package on the same terms. Exit cannot reduce the defined utility package.", tier: 3 },
    ],
    paperRef: "Section V.B — Issue 4.11"
  },
  {
    id: "4.16", cluster: "ip", impact: "med",
    title: "Project-level continuity",
    question: "If the founding entity exits, do the protocol's key operational relationships — integrations, oracle relationships, data feeds, and service contracts — survive the transition?",
    why: "Token value often depends on specific integrations the founding entity controls. A founding entity can strand value by terminating these on exit without touching the protocol code directly.",
    critical: false,
    options: [
      { label: "A", text: "The founding entity controls all key operational relationships and could terminate them on exit with no obligation to transfer them.", tier: 0 },
      { label: "B", text: "Core functions are documented and open-sourced, but key operational contracts are not assignable without founding entity consent.", tier: 1 },
      { label: "C", text: "Key contracts are assignable to a governance-designated successor on defined trigger events. The founding entity is barred from terminating integrations to impair token value on exit.", tier: 2 },
      { label: "D", text: "The entire operational platform is subject to the continuity framework. Token holders have a defined continuity interest in the full package, not just the base protocol.", tier: 3 },
    ],
    paperRef: "Section V.B — Issue 4.16"
  },
  {
    id: "4.12", cluster: "capital", impact: "high",
    title: "Founding entity financing and insolvency",
    question: "Has the founding entity's equity financing created security interests against protocol IP that could impair token holders in a founding entity insolvency or acquisition?",
    why: "The most underappreciated threat vector. The founding entity's debt financing, venture rounds, and M&A activity can all impair token value without any direct action against tokens — operating entirely outside the governance framework.",
    critical: true,
    options: [
      { label: "A", text: "Equity investors or lenders hold security interests in protocol IP, and token holders have no nondisturbance agreement against those interests being enforced.", tier: 0 },
      { label: "B", text: "Token utility rights survive financing events as a matter of contract, but lenders are not bound by any nondisturbance agreement and could foreclose on protocol IP without assuming token utility obligations.", tier: 1 },
      { label: "C", text: "Founding entity lenders and acquirers are bound by a nondisturbance agreement requiring them to assume token utility obligations. Change of control triggers token holder notice. Legal opinion confirms §365(n) survivability.", tier: 2 },
      { label: "D", text: "Full intercreditor-style protection: any financing secured by protocol assets requires a token holder nondisturbance agreement as a condition. M&A involving protocol IP requires token holder consent for fundamental changes.", tier: 3 },
    ],
    paperRef: "Section V.B — Issue 4.12"
  },
  {
    id: "4.9", cluster: "gov", impact: "low",
    title: "Transfer restriction controls",
    question: "Does the founding entity retain any discretionary ability to impose new token transfer restrictions or modify existing ones without token holder consent?",
    why: "Even if current restrictions are acceptable, the ability to impose new ones unilaterally is itself endogenous risk.",
    critical: false,
    options: [
      { label: "A", text: "The founding entity can impose new transfer restrictions or modify existing ones at its discretion, with notice but without token holder consent.", tier: 0 },
      { label: "B", text: "Current restrictions are defined and published, but the founding entity can modify them through a governance process in which it holds a majority.", tier: 1 },
      { label: "C", text: "Restrictions are locked at the protocol level and can only be modified through a supermajority governance vote with the founding entity excluded from quorum.", tier: 2 },
      { label: "D", text: "Transfer restrictions are fully non-discretionary and protocol-level. The founding entity retains no personal right to impose, modify, or waive any restriction.", tier: 3 },
    ],
    paperRef: "Section V.B — Issue 4.9"
  },
  {
    id: "4.10", cluster: "gov", impact: "med",
    title: "Anti-concentration / anti-merger",
    question: "If the founding entity accumulated tokens through secondary market purchases, would that increase its governance control beyond its defined vote weight cap?",
    why: "A cap that applies only to the original allocation can be circumvented over time. Anti-concentration ensures decentralization is durable, not a snapshot that erodes.",
    critical: false,
    options: [
      { label: "A", text: "There is no vote weight cap, or the existing cap applies only to initial allocation and does not account for secondary market accumulation.", tier: 0 },
      { label: "B", text: "A vote weight cap exists and applies to total holdings, but it is implemented at the wallet address level — fragmentation across wallets could circumvent it.", tier: 1 },
      { label: "C", text: "The cap applies at the beneficial ownership level, aggregating the voting power of the founding entity, its affiliates, investors who received token grants, and team members subject to founding entity influence. Independent verification required.", tier: 2 },
      { label: "D", text: "Full anti-concentration package: beneficial ownership aggregation, independent verification, and an automatic cap adjustment mechanism if effective governance position exceeds the defined threshold.", tier: 3 },
    ],
    paperRef: "Section V.B — Issue 4.10"
  },
  {
    id: "4.17", cluster: "gov", impact: "low",
    title: "Information rights and monitoring",
    question: "What information do token holders receive about the founding entity's activities — treasury movements, equity financing events, governance proposals, and material operational changes?",
    why: "Information rights are the enabling layer for all other protections. Notice rights, cure rights, and governance intervention rights are useless without adequate information flow.",
    critical: false,
    options: [
      { label: "A", text: "No formal information rights exist. Token holders receive information on a best-efforts basis through informal channels.", tier: 0 },
      { label: "B", text: "Basic on-chain transparency: governance proposals are published before implementation and treasury balances are visible. No obligation to disclose equity financing events.", tier: 1 },
      { label: "C", text: "Standardized reporting with defined delivery timelines. Equity financing events that could affect token economics trigger mandatory disclosure.", tier: 2 },
      { label: "D", text: "Full information architecture: real-time treasury visibility, advance notice of all founding entity corporate actions, mandatory disclosure of any event affecting the §365(n) survivability analysis.", tier: 3 },
    ],
    paperRef: "Section V.B — Issue 4.17"
  },
  {
    id: "4.13", cluster: "gov", impact: "low",
    title: "Technical failure recovery",
    question: "If the protocol experiences a significant technical failure — an exploit, hack, or critical bug — is there a defined recovery process that preserves token holder value?",
    why: "The absence of a recovery regime means technical failure produces the same result as founding entity abandonment: total value destruction without recourse.",
    critical: false,
    options: [
      { label: "A", text: "No defined recovery process exists. A significant technical failure could result in permanent impairment with no governance process for remediation.", tier: 0 },
      { label: "B", text: "An incident response process exists, but it is controlled by the founding entity with no formal token holder participation.", tier: 1 },
      { label: "C", text: "A governance-controlled recovery process exists. Token holders participate in decisions about remediation approach, migration timing, and use of any insurance or reserve funds.", tier: 2 },
      { label: "D", text: "Token holders have full control over recovery decisions including use of insurance proceeds, remediation approach, migration timing, and the decision whether to continue, migrate, or wind down.", tier: 3 },
    ],
    paperRef: "Section V.B — Issue 4.13"
  },
  {
    id: "4.14", cluster: "gov", impact: "low",
    title: "Regulatory action survivability",
    question: "If the founding entity faces a regulatory action — an SEC enforcement proceeding or consent decree — can it negotiate away token holders' rights as part of a settlement without token holder consent?",
    why: "Without this protection, the founding entity can use token holders as settlement currency — resolving its own regulatory exposure by surrendering token functionality without any token holder voice.",
    critical: false,
    options: [
      { label: "A", text: "The founding entity can resolve regulatory actions through settlements that affect token functionality without token holder consent.", tier: 0 },
      { label: "B", text: "Token holder rights survive regulatory actions affecting the founding entity, but there is no mechanism for token holders to be parties to any resolution.", tier: 1 },
      { label: "C", text: "Any regulatory-compelled migration preserves token holder economic position. The founding entity is barred from entering any settlement that impairs token functionality without prior governance approval.", tier: 2 },
      { label: "D", text: "Token holders are effective parties to any regulatory resolution affecting token economics, either directly or through a designated representative. The founding entity cannot settle at token holder expense.", tier: 3 },
    ],
    paperRef: "Section V.B — Issue 4.14"
  },
  {
    id: "4.15", cluster: "gov", impact: "low",
    title: "Token holder liability insulation",
    question: "Does holding tokens create any operational, regulatory, or contractual liability for the network's operations?",
    why: "Unlimited liability exposure chills participation and creates regulatory concern about whether token holders constitute a de facto partnership or unregistered investment company.",
    critical: false,
    options: [
      { label: "A", text: "No documentation exists addressing token holder liability. The legal structure is ambiguous about whether governance participation creates operational obligations.", tier: 0 },
      { label: "B", text: "Documentation clarifies that token holding alone creates no operational liability, but governance participation rights are not clearly addressed.", tier: 1 },
      { label: "C", text: "Clear documentation confirms token holders bear no personal liability for protocol operations, and governance participation does not create assumption of operational obligations.", tier: 2 },
      { label: "D", text: "Comprehensive exculpation: token holders are fully insulated from all operational, regulatory, and contractual obligations, with explicit carve-outs only for obligations specifically assumed.", tier: 3 },
    ],
    paperRef: "Section V.B — Issue 4.15"
  },
  {
    id: "4.3b", cluster: "gov", impact: "high",
    title: "Founding entity compensation structure",
    question: "How is the founding entity compensated for its ongoing contributions to the protocol, and is that compensation tied to protocol growth?",
    why: "Profit-participating founding entity compensation is the precise mechanism by which value flows to equity rather than tokens. Compensation that is nominally fixed but effectively variable — through percentage-based allocations or uncapped escalators — is the most common theatrical structuring pattern.",
    critical: true,
    options: [
      { label: "A", text: "The founding entity receives compensation directly tied to protocol growth — percentage of treasury, equity participation in revenues, or token grants without defined caps.", tier: 0 },
      { label: "B", text: "The founding entity receives token grants at defined intervals, but the grant size is defined as a percentage of treasury inflows or total token supply — effectively indexing compensation to protocol growth.", tier: 1 },
      { label: "C", text: "Fixed or cost-plus compensation: a defined absolute token grant amount, or a cost-plus service fee covering defined costs plus a fixed margin. Publicly documented and modifiable only by supermajority governance vote excluding founding entity votes.", tier: 2 },
      { label: "D", text: "Founding entity compensation is fully separated from protocol value: fixed in absolute terms, capped as a defined percentage of treasury outflows, publicly verified by an independent party, and subject to a governance-controlled clawback mechanism.", tier: 3 },
    ],
    paperRef: "Section V.B — Issue 4.3 (Compensation sub-issue)"
  },
  {
    id: "sep", cluster: "gov", impact: "high",
    title: "Separation doctrine compliance",
    question: "Under the March 2026 SEC/CFTC Release's separation doctrine, has the founding entity fulfilled or publicly abandoned its essential managerial promises such that the token can exit investment contract status?",
    why: "The Release establishes that investment contract status is not permanent: once an issuer has fulfilled its essential managerial promises — or publicly and unambiguously abandoned them — the non-security crypto asset separates from the investment contract and subsequent transactions are outside the securities laws. TCF Tier 2 protections directly facilitate this separation by demonstrating that token value no longer depends on issuer conduct.",
    critical: true,
    options: [
      { label: "A", text: "The founding entity has made material promises to token purchasers (development roadmaps, buy/burn programs, ecosystem funds, governance transition timelines) and none have been fulfilled or publicly abandoned.", tier: 0 },
      { label: "B", text: "Some promises have been fulfilled, but others remain outstanding and actively operated at founding entity discretion. The founding entity has not made any public statement about separation status.", tier: 1 },
      { label: "C", text: "All material promises have been either fulfilled as described or publicly and unambiguously abandoned. The founding entity has issued a public separation statement. TCF Tier 2 structural protections are in place such that token value no longer depends primarily on founding entity conduct.", tier: 2 },
      { label: "D", text: "Full separation achieved: all promises fulfilled or abandoned, TCF Tier 3 protections in place, independent legal opinion confirming separation, and a publicly filed representation schedule confirming the status of each prior promise.", tier: 3 },
    ],
    paperRef: "Section IV.B — March 2026 Release, separation doctrine"
  },
];

export const DOMAIN_DATA: DomainData[] = [
  { id: "real-estate", name: "Real estate finance", short: "Ground leases", sub: "Leasehold mortgagee vs. fee owner", tag: "Canonical example", body: "The ground lease is the canonical example because its protections are the most fully developed. The leasehold mortgagee's entire collateral depends on the fee owner's continuing decision to maintain the lease — textbook endogenous risk. The market responded by developing tiered continuity rights that convert discretionary termination risk into rule-bound enforcement risk without eliminating fee owner control.", cols: ["Non-disturbance","Cure rights","Replacement-lease right","Anti-merger"] },
  { id: "structured-finance", name: "Structured finance", short: "ABS / CDO tranches", sub: "Subordinated tranche vs. servicer", tag: "Closest economic analogy", body: "Subordinated ABS tranche holders bear first-loss risk on pools managed by servicers they didn't select. Yet subordinated tranches escape investment contract treatment because the PSA constrains servicer discretion through defined servicing standards and servicer replacement rights. The replacement right converts servicer abandonment from total value destruction into a remediable event — the direct structural analogue of Issue 4.7 (Fork Rights).", cols: ["Payment waterfall","Servicing standards","Servicer replacement","Advancing obligations"] },
  { id: "ip-licensing", name: "IP licensing", short: "Technology licenses", sub: "Licensee vs. licensor", tag: "§365(n) source", body: "Before 11 U.S.C. §365(n), a licensor's bankruptcy trustee could reject an IP license, destroying the licensee's entire business. Congress solved this by giving licensees an election to retain license rights through licensor insolvency. The token equivalent — protocol utility rights that survive founding entity insolvency as protected IP licenses — is essentially absent from current token design practice.", cols: ["§365(n) survivability","Anti-revocation doctrine","Sublicense rights","Continuation remedies"] },
  { id: "franchise", name: "Franchise law", short: "Franchise agreements", sub: "Franchisee vs. franchisor", tag: "Most accessible analogy", body: "Franchisees invest substantial capital in businesses viable only with the franchisor's ongoing consent. Yet franchise arrangements escape securities regulation because state relationship laws require cause for termination, good-faith renewal, and territorial protections. Disclosure of retained powers does not substitute for structural constraints on how those powers can be exercised.", cols: ["Territorial exclusivity","Good-faith obligation","Termination for cause","Renewal rights"] },
];

export const SPECTRUM_STATES: SpectrumState[] = [
  { pos: 5, label: "Fully discretionary", tier: null, howey: "Investment contract — efforts of others prong clearly satisfied", analysis: "Founding entity retains full discretionary control. Token value depends entirely on ongoing founding entity conduct. This is the current default for most dual equity/token structures.", color: "#A32D2D" },
  { pos: 22, label: "No implementation", tier: "0", howey: "Investment contract — no structural constraints present", analysis: "No structural protections have been implemented. The founding entity can modify token economics, sunset the token, or migrate value to a new system without token holder consent.", color: "#C9820A" },
  { pos: 40, label: "Tier 1", tier: "1", howey: "Investment contract likely — insufficient constraint", analysis: "Minimum anti-abandonment protections are in place. The founding entity retains practical ability to act unilaterally. Endogenous risk remains material. Does not satisfy the Release's separation doctrine.", color: "#BA7517" },
  { pos: 60, label: "Tier 2", tier: "2", howey: "Investment contract uncertain — credible separation argument", analysis: "The governance-and-migration package constrains founding entity discretion across the most important dimensions. A Tier 2 structure, combined with fulfillment or public abandonment of all issuer promises, can satisfy the Release's separation doctrine. This is the appropriate target for a no-action letter request or exemption pathway under current doctrine.", color: "#185FA5" },
  { pos: 80, label: "Tier 3", tier: "3", howey: "Investment contract unlikely — strong separation argument", analysis: "Full continuity-and-replacement package. Token utility survives founding entity exit through all failure modes. Closest approximation to the Release's digital commodity / digital collectible categories for application-layer tokens.", color: "#27500A" },
  { pos: 95, label: "Fully autonomous", tier: null, howey: "Not an investment contract — no identifiable controlling party", analysis: "No identifiable party retains discretionary control. The protocol runs itself. Qualifies as a digital commodity under the Release if it also lacks stablecoin characteristics. Rare in practice.", color: "#1F3864" },
];

export const THEATER_PATTERNS: TheaterPattern[] = [
  { title: "1. The governance token concentration problem", desc: "A vote weight cap exists but the founding entity controls enough combined allocations — its own, investors', and affiliated foundation's — to determine outcomes without formally exceeding the cap.", checks: [
    { text: "Does the vote weight cap aggregate founding entity affiliate vote weight — including investors who received token grants, foundation entities controlled by founding entity personnel, and team members subject to founding entity influence?", critical: true },
    { text: "Is the cap implemented at the beneficial ownership level rather than the wallet address level, preventing circumvention through wallet fragmentation?", critical: true },
    { text: "Is the beneficial ownership determination independently verified by a party with no financial relationship with the founding entity?", critical: false },
  ]},
  { title: "2. The upgradeable contract problem", desc: "On-chain governance implements timelocks and vote weight caps, but the underlying smart contracts are upgradeable through an admin key held by founding entity personnel that bypasses governance entirely.", checks: [
    { text: "Has the admin key been burned, or transferred to a governance-controlled multisig subject to the same vote weight constraints and timelock requirements as any other governance action?", critical: true },
    { text: "Does every pathway to protocol modification — including administrative pathways — pass through the same governance constraints?", critical: true },
    { text: "Has an independent technical auditor verified that no admin bypass mechanism exists?", critical: false },
  ]},
  { title: "3. The foundation capture problem", desc: "IP has been transferred to a nominally independent foundation, but the founding entity controls the foundation through board composition, supermajority requirements, or financial dependency.", checks: [
    { text: "Does a majority of foundation board seats consist of individuals with no financial relationship with the founding entity, selected through a process token holders control or can influence?", critical: true },
    { text: "Is the foundation funded from a diversified source base rather than exclusively from founding entity grants?", critical: false },
    { text: "Does the foundation's governance give the founding entity no blocking position on IP licensing, development priorities, or leadership decisions?", critical: true },
  ]},
  { title: "4. The nominal timelock problem", desc: "A timelock period is nominally present but too short for meaningful token holder coordination, or it applies only to selected categories of changes.", checks: [
    { text: "Is the timelock period calibrated to actual coordination requirements — at least 14 days for major economic modifications in a large, geographically distributed token holder community?", critical: false },
    { text: "Does the timelock apply to all material modifications to token economics, not just selected categories?", critical: true },
    { text: "Is the timelock enforced on-chain or by a mechanism that the founding entity cannot override?", critical: true },
  ]},
  { title: "5. The equity compensation disguise problem", desc: "The compensation structure is nominally fixed but includes features that effectively link founding entity returns to protocol growth — percentage-based allocations, below-market options, or uncapped escalators.", checks: [
    { text: "Is founding entity compensation defined in absolute terms rather than as a percentage of treasury inflows, total supply, or protocol revenues?", critical: true },
    { text: "Are there no below-market token options or warrants exercisable at founding entity discretion that index compensation to protocol growth?", critical: true },
    { text: "Is the compensation structure publicly documented and independently verifiable, with modification requiring supermajority governance approval excluding founding entity votes?", critical: false },
  ]},
  { title: "6. The buy/burn separation trap (new — March 2026 Release)", desc: "A team selectively de-emphasizes or modifies a previously promised buy/burn program in an attempt to claim separation while continuing to operate it in modified form. The modification itself re-tethers the token.", checks: [
    { text: "Has the founding entity either (a) completed the buy/burn program exactly as promised to purchasers, or (b) publicly and unambiguously announced its abandonment through official channels?", critical: true },
    { text: "If the buy/burn program continues in modified form, is the modification documented as a supersession of the prior promise — not a de-emphasis — with the current parameters disclosed on-chain?", critical: true },
    { text: "Is the buy/burn pool funded exclusively from protocol fee revenue routed automatically by the protocol, with no founding entity discretionary authority over the selection of tokens to purchase or the timing of purchases?", critical: true },
  ]},
  { title: "7. The premature separation claim", desc: "A sophisticated issuer claims separation before essential managerial promises have been genuinely fulfilled — publishing a milestone announcement that overstates development, claiming open-source release of partially-functional code constitutes fulfillment, or issuing a 'decentralization declaration' while retaining admin keys, controlling treasury allocations, and dominating governance votes.", checks: [
    { text: "Are the completed efforts objectively verifiable on-chain or through public registration — not solely through the issuer's own disclosure?", critical: true },
    { text: "Can an independent observer confirm that the specific promises made — as the issuer defined them when the investment contract was created, not as the market subsequently construes them — have in fact been completed?", critical: true },
    { text: "Do the completed promises represent the specific essential managerial efforts that were the basis for purchasers' profit expectations, rather than peripheral activities that leave core discretionary control intact?", critical: true },
  ]},
];

export const RELEASE_CATEGORIES: ReleaseCategory[] = [
  { id: "dc", name: "Digital commodity", icon: "◈", desc: "Crypto asset with primary utility in a functional system; value derives from system functionality, not issuer promises. Regulated by CFTC as commodity.", tcf: "Tier 2–3 achievable. Key requirement: all issuer promises fulfilled or abandoned. Token utility must derive from protocol functionality, not ongoing issuer conduct." },
  { id: "dcoll", name: "Digital collectible", icon: "◇", desc: "Unique or limited-edition crypto asset with non-fungible characteristics. Primary value from collectibility, not issuer promises. Outside securities laws if no investment contract formed.", tcf: "Tier 1 often sufficient. Key requirement: no representations about future development, ecosystem growth, or price appreciation from issuer efforts." },
  { id: "dt", name: "Digital tool", icon: "⬡", desc: "Crypto asset with a specific functional purpose within a system (gas tokens, governance tokens, access tokens). Value tied to functional use, not investment return.", tcf: "Tier 2 recommended. Key requirement: governance rights must be structural (protocol-level) not equity-like. Buy/burn programs, if any, must be fully programmatic." },
  { id: "stable", name: "Stablecoin", icon: "◉", desc: "Crypto asset designed to maintain a stable value relative to a reference asset. Governed by separate stablecoin framework. Generally not an investment contract.", tcf: "TCF does not directly apply to stabilization mechanisms, but founding entity discretion over collateral management remains relevant." },
  { id: "ds", name: "Digital security", icon: "◎", desc: "Crypto asset that constitutes a security — typically because the issuer has made promises about future efforts that purchasers rely on for profit. Remains subject to full securities law treatment until separation occurs.", tcf: "All 18 TCF issues apply. Tier 2 structural protections are prerequisite to any credible argument for registration exemption relief. See the Pathways to Regulatory Clarity section for the three routes to obtaining structure-specific guidance or exemption relief." },
];

export const SEP_STAGES: SeparationStage[] = [
  { id: "none", label: "No promises made", desc: "Crypto asset issued without representations about future issuer efforts. If utility is functional at launch, may qualify directly as digital commodity or collectible. No investment contract formed.", color: "var(--green)", tcf: "TCF structural protections still recommended for durability, but no investment contract analysis needed.", complete: true },
  { id: "active", label: "Active promises", desc: "Issuer has made representations about future efforts (development, buy/burn, governance transition, ecosystem growth) that purchasers rely on for profit. Investment contract status has attached.", color: "var(--amber)", tcf: "All 18 TCF issues apply. Tier 2 protections should be implemented immediately to constrain founding entity discretion while promises are being fulfilled.", complete: false },
  { id: "partial", label: "Partial fulfillment", desc: "Some promises have been fulfilled; others remain outstanding. Investment contract status persists for the remaining active promises. Selective de-emphasis does not constitute abandonment.", color: "#BA7517", tcf: "Each outstanding promise must be either completed as described or publicly and unambiguously abandoned. A modified program re-tethers the token for the modification period.", complete: false },
  { id: "separated", label: "Separation achieved", desc: "All material promises fulfilled or publicly abandoned. The non-security crypto asset has separated from the investment contract. Subsequent transactions are outside the securities laws.", color: "var(--navy)", tcf: "TCF Tier 2 protections must remain in place to preserve separation status. Any new promise by the issuer restarts the analysis.", complete: true },
];

export const PROMISE_TYPES: PromiseType[] = [
  { id: "buyburn", title: "Buy/burn program", desc: "Representations to token purchasers about a program to purchase or burn tokens using protocol revenues.", risk: "high", implications: {
    fulfilled: "Program completed as described. Separation possible if no other active promises. Document completion through official channels.",
    abandoned: "Public, unambiguous announcement of abandonment required. Cannot simply de-emphasize or modify — full cessation must be declared.",
    active: "Investment contract status persists. The founding entity's discretionary authority over the program (funding source, timing, amount) is the primary endogenous risk. Issue 4.3 Tier 2 or 3 required.",
    none: "No representation made. No investment contract analysis needed for this issue.",
  }},
  { id: "roadmap", title: "Development roadmap", desc: "Representations about future protocol development, feature launches, or technical milestones that would increase token utility or value.", risk: "high", implications: {
    fulfilled: "All committed features launched as described. Document completion with dated release notes. Separation possible if no other active promises.",
    abandoned: "Public statement required specifying which roadmap items will not be completed and why. Token holders must have advance notice.",
    active: "Investment contract status persists for each unfulfilled milestone. Founding entity development discretion is the endogenous risk. Issues 4.1–4.4 and 4.6 most relevant.",
    none: "No roadmap representations made to purchasers. No investment contract analysis needed for this issue.",
  }},
  { id: "ecosystem", title: "Ecosystem fund / grants", desc: "Representations about use of foundation or ecosystem funds to grow the protocol, attract developers, or expand token utility.", risk: "med", implications: {
    fulfilled: "Funds deployed as described. Separation possible. Document deployment through public reporting.",
    abandoned: "Public announcement required. Remaining funds should be transitioned to governance-controlled deployment or returned to protocol treasury under token holder governance.",
    active: "Founding entity discretion over fund deployment is endogenous risk. Issue 4.3 (revenue routing) and founding entity compensation structure (Issue 4.3b) most relevant.",
    none: "No ecosystem fund representations made. No investment contract analysis needed for this issue.",
  }},
  { id: "governance", title: "Governance transition", desc: "Representations about a planned transition to decentralized governance, including token holder voting rights, foundation handoff, or reduction of founding entity control.", risk: "high", implications: {
    fulfilled: "Governance transition completed as described and verifiably implemented on-chain. This is the clearest path to satisfying the Release's separation doctrine.",
    abandoned: "Public announcement required. Founding entity must explain why the transition will not occur and what alternative governance structure will apply.",
    active: "Investment contract status persists until transition is completed. All 18 TCF issues apply. A credible transition timeline is the most important factor in the Release's separation analysis.",
    none: "No governance transition representations made. TCF structural protections still needed, but no specific separation timeline obligation.",
  }},
];
