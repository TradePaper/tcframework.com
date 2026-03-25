"use client";

import { Fragment, useState } from "react";
import { PROMISE_TYPES, RELEASE_CATEGORIES, SEP_STAGES, type PromiseStatus } from "../data/releaseData";

type ReleaseTab = "categories" | "pathways" | "separation" | "audit";

export default function ReleaseNavigatorPage() {
  const [tab, setTab] = useState<ReleaseTab>("categories");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sepStage, setSepStage] = useState<string | null>(null);
  const [promiseStatuses, setPromiseStatuses] = useState<Partial<Record<string, PromiseStatus | null>>>({});

  const setPromise = (id: string, status: PromiseStatus) => setPromiseStatuses((value) => ({ ...value, [id]: value[id] === status ? null : status }));

  const overallRisk = () => {
    const statuses = Object.values(promiseStatuses);
    if (statuses.includes("active")) return "high";
    if (statuses.includes("none") || statuses.length === 0) return "med";
    return "low";
  };

  return (
    <div className="page">
      <div className="container" style={{ padding: "48px 40px" }}>
        <div className="section-eyebrow teal">Release Navigator</div>
        <h1 style={{ fontFamily: "var(--t-display)", fontSize: "36px", fontWeight: 700, lineHeight: 1.2, marginBottom: "12px", letterSpacing: "-0.02em" }}>
          March 2026 SEC/CFTC Release
        </h1>
        <p style={{ fontSize: "16px", color: "var(--ink-mid)", lineHeight: 1.65, marginBottom: "16px", maxWidth: "700px" }}>
          Release Nos. 33-11412; 34-105020 (Mar. 17, 2026) — the most comprehensive official guidance on federal securities laws and crypto assets since the DAO Report of 2017. Four tools for making it actionable.
        </p>
        <div className="release-banner" style={{ marginBottom: "28px", maxWidth: "700px" }}>
          <strong>What the Release does:</strong> Establishes a five-category asset taxonomy (digital commodities, digital collectibles, digital tools, stablecoins, digital securities); confirms an issuer-promise-centric <em>Howey</em> framework; establishes a separation doctrine enabling tokens to exit investment contract status; and supersedes the 2019 Digital Assets Framework in its entirety.
        </div>

        <div style={{ display: "flex", gap: "4px", marginBottom: "32px", borderBottom: "2px solid var(--border)" }}>
          {[["categories", "Five-category classifier"], ["pathways", "Pathways to clarity"], ["separation", "Separation timeline"], ["audit", "Issuer promise audit"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id as ReleaseTab)} style={{ fontFamily: "var(--t-body)", fontSize: "14px", padding: "10px 18px", border: "none", background: "none", cursor: "pointer", transition: "all .15s", color: tab === id ? "var(--teal)" : "var(--ink-mid)", borderBottom: tab === id ? "2px solid var(--teal)" : "2px solid transparent", marginBottom: "-2px", fontWeight: tab === id ? 500 : 400 }}>{label}</button>
          ))}
        </div>

        {tab === "categories" && (
          <div>
            <p style={{ fontSize: "15px", color: "var(--ink-mid)", lineHeight: 1.65, marginBottom: "24px", maxWidth: "700px" }}>
              The Release establishes five mutually exclusive categories of crypto assets. The category determines the regulatory treatment and the TCF tier required. Select the category that most closely describes your token.
            </p>
            <div className="release-cat-grid">
              {RELEASE_CATEGORIES.map((category) => (
                <div key={category.id} className={`release-cat ${category.id} ${activeCategory === category.id ? "active" : ""}`} onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}>
                  <div className="release-cat-icon">{category.icon}</div>
                  <div className="release-cat-name">{category.name}</div>
                </div>
              ))}
            </div>
            {activeCategory && (() => {
              const category = RELEASE_CATEGORIES.find((item) => item.id === activeCategory);
              if (!category) return null;
              return (
                <div key={category.id} className="animate-fadein" style={{ background: "white", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "28px", marginTop: "16px", boxShadow: "var(--shadow-sm)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                    <span style={{ fontSize: "32px" }}>{category.icon}</span>
                    <div>
                      <h3 style={{ fontFamily: "var(--t-display)", fontSize: "20px", fontWeight: 600, marginBottom: "4px" }}>{category.name}</h3>
                      <div style={{ fontFamily: "var(--t-mono)", fontSize: "11px", color: "var(--ink-light)", letterSpacing: "0.04em" }}>Release category</div>
                    </div>
                  </div>
                  <p style={{ fontSize: "14px", color: "var(--ink-mid)", lineHeight: 1.65, marginBottom: "20px" }}>{category.desc}</p>
                  <div style={{ padding: "16px 20px", background: "var(--teal-pale)", border: "1px solid #9FE1CB", borderLeft: "3px solid var(--teal)", borderRadius: "var(--radius-md)" }}>
                    <div style={{ fontFamily: "var(--t-mono)", fontSize: "11px", color: "var(--teal)", letterSpacing: "0.08em", marginBottom: "6px", fontWeight: 500 }}>TCF IMPLICATIONS</div>
                    <div style={{ fontSize: "14px", color: "var(--ink-mid)", lineHeight: 1.6 }}>{category.tcf}</div>
                  </div>
                  {category.id === "ds" && (
                    <div style={{ marginTop: "16px", padding: "14px 18px", background: "var(--amber-pale)", border: "1px solid #FAC775", borderLeft: "3px solid var(--amber)", borderRadius: "var(--radius-md)", fontSize: "14px", color: "var(--ink-mid)", lineHeight: 1.6 }}>
                      <strong style={{ color: "var(--amber)" }}>Path to exit:</strong> A digital security can transition to digital commodity or digital collectible status when the issuer fulfills or publicly abandons its essential managerial promises. Use the Separation Timeline tab to map your token&apos;s current position on this path.
                    </div>
                  )}
                </div>
              );
            })()}
            {!activeCategory && (
              <div style={{ padding: "20px", background: "var(--paper-dark)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", textAlign: "center", fontSize: "14px", color: "var(--ink-light)" }}>
                Select a category to see its definition and TCF implications
              </div>
            )}
            <div style={{ marginTop: "32px", padding: "20px 24px", background: "var(--paper-dark)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontFamily: "var(--t-mono)", fontSize: "11px", color: "var(--ink-light)", letterSpacing: "0.06em", marginBottom: "12px" }}>KEY RELEASE PROVISIONS</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { title: "Issuer-promise standard", desc: "Investment contract status attaches when an issuer offers a token with representations or promises to undertake essential managerial efforts from which purchasers would reasonably expect to derive profits. The test focuses on the issuer's promises, not the token's technical features." },
                  { title: "Separation doctrine", desc: "Investment contract status is not permanent. Once an issuer has fulfilled its essential managerial promises — or publicly and unambiguously abandoned them — the non-security crypto asset separates from the investment contract. Subsequent transactions are outside the securities laws." },
                  { title: "Supersession of 2019 Framework", desc: "The Release supersedes the SEC staff's 2019 Framework for 'Investment Contract' Analysis of Digital Assets in its entirety. The holistic assessment approach of the 2019 Framework is replaced by the issuer-promise-centric standard." },
                  { title: "Protocol mining, staking, wrapping", desc: "The Release addresses protocol mining, staking, wrapping, and airdrops — confirming that these activities do not in themselves create investment contract status if the underlying token is a non-security crypto asset." },
                ].map(({ title, desc }) => (
                  <div key={title} style={{ borderLeft: "2px solid var(--border-mid)", paddingLeft: "14px" }}>
                    <div style={{ fontFamily: "var(--t-display)", fontSize: "14px", fontWeight: 600, marginBottom: "6px" }}>{title}</div>
                    <div style={{ fontSize: "13px", color: "var(--ink-mid)", lineHeight: 1.55 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "pathways" && (
          <div>
            <p style={{ fontSize: "15px", color: "var(--ink-mid)", lineHeight: 1.65, marginBottom: "16px", maxWidth: "760px" }}>
              Regulatory clarity is available through three pathways, not only through the no-action process. A Tier 2 TCF structure makes each of them more legible by documenting how founding entity discretion has actually been reduced.
            </p>
            <div className="release-banner" style={{ marginBottom: "24px", maxWidth: "760px" }}>
              <strong>Important caveat:</strong> The March 2026 Release is an interpretive rule, not a notice-and-comment rulemaking. Under <em>Loper Bright Enterprises v. Raimondo</em>, 603 U.S. 369 (2024), courts apply <em>Howey</em> and its progeny independently without deference to the Release. The TCF&apos;s doctrinal foundations are latent in existing investment contract doctrine and do not depend on the Release&apos;s regulatory durability.
            </div>
            <div style={{ display: "grid", gap: "16px" }}>
              {[
                {
                  title: "Pathway 1 — No-Action Letters",
                  body: "The no-action letter process is the primary mechanism for obtaining structure-specific SEC staff guidance. A Tier 2 TCF structure presents the Staff with a legible, verifiable structure and a concrete account of how founding entity discretion has been reduced — anchored in the Release's five-category taxonomy — rather than a holistic decentralization claim. Timing matters: a pre-distribution request carries substantially more weight than a retroactive request.",
                  fit: "Best positioned for: Protocols with documented Tier 2 structures, pre-distribution.",
                },
                {
                  title: "Pathway 2 — Regulation Crypto Assets Exemptions (Chair Atkins, March 19, 2026)",
                  body: "Three proposed pathways under anticipated rulemaking: Startup Exemption: Raises up to $5M over 4 years. Disclosure obligations. EDGAR notice filings. Non-exclusive alongside Reg D. Fundraising Exemption: Larger capital raises with more substantive financial disclosure. Investment Contract Safe Harbor: Issuers satisfy defined structural milestones to achieve clean separation — extinguishing investment contract status for all subsequent transactions. Not yet codified. Final form depends on exemptive rulemaking and potentially on market structure legislation. A project that builds a Tier 2 structure now is positioned to step into any of these pathways without remediation.",
                  fit: "Best positioned for: All projects. TCF structural work is the prerequisite for any exemption pathway.",
                },
                {
                  title: "Pathway 3 — Legislation and Coordinated Commercial Practice",
                  body: "The Digital Asset Market Clarity Act, if enacted, provides a statutory framework that could supersede the Release's investment-contract analysis. As of March 2026, the Senate Banking Committee is targeting a markup in the second half of April 2026 on the stablecoin provisions, with broader market structure provisions as a further sequential step. Regulatory clarity may also emerge over time through coordinated commercial practice — but only if industry advisors follow a common analytical framework. The collective action problem this requires is among the reasons the TCF advocates for adoption as that common structure.",
                  fit: "Best positioned for: Protocols in jurisdictions anticipating legislative clarity; advisors building common practice.",
                },
              ].map((pathway) => (
                <div key={pathway.title} className="card">
                  <h3 style={{ fontFamily: "var(--t-display)", fontSize: "21px", fontWeight: 600, marginBottom: "10px" }}>{pathway.title}</h3>
                  <p style={{ fontSize: "14px", color: "var(--ink-mid)", lineHeight: 1.7, marginBottom: "14px" }}>{pathway.body}</p>
                  <div style={{ fontFamily: "var(--t-mono)", fontSize: "11px", color: "var(--teal)", letterSpacing: "0.05em" }}>{pathway.fit}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "separation" && (
          <div>
            <p style={{ fontSize: "15px", color: "var(--ink-mid)", lineHeight: 1.65, marginBottom: "28px", maxWidth: "700px" }}>
              The Release&apos;s separation doctrine maps investment contract status to a timeline anchored in issuer conduct. Use this tool to identify where your token sits on the separation path and what TCF actions are required at each stage.
            </p>
            <div className="release-banner" style={{ marginBottom: "24px", maxWidth: "760px" }}>
              <strong>The attachment doctrine:</strong> Once an issuer has made representations or promises about essential managerial efforts, the associated investment contract attaches to the crypto asset itself — rendering all secondary market transactions in that asset securities transactions until separation is achieved. This is not limited to the original purchasers. Secondary market traders, market makers, and institutional investors all transact in investment contracts until the issuer achieves clean separation.
            </div>
            <div className="sep-timeline">
              {SEP_STAGES.map((stage, index) => (
                <Fragment key={stage.id}>
                  <div className="sep-node">
                    <div className={`sep-node-circle ${sepStage === stage.id ? "active" : stage.complete ? "complete" : ""}`} onClick={() => setSepStage(sepStage === stage.id ? null : stage.id)} style={{ color: sepStage === stage.id ? "white" : stage.complete ? "var(--green)" : "var(--ink-light)" }}>
                      {index + 1}
                    </div>
                    <div className="sep-node-label">{stage.label}</div>
                  </div>
                  {index < SEP_STAGES.length - 1 && <div className={`sep-connector ${stage.complete && sepStage !== stage.id ? "complete" : ""}`} />}
                </Fragment>
              ))}
            </div>
            {sepStage && (() => {
              const stage = SEP_STAGES.find((item) => item.id === sepStage);
              if (!stage) return null;
              return (
                <div key={stage.id} className="animate-fadein" style={{ background: "white", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "28px", boxShadow: "var(--shadow-sm)" }}>
                  <h3 style={{ fontFamily: "var(--t-display)", fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>{stage.label}</h3>
                  <p style={{ fontSize: "14px", color: "var(--ink-mid)", lineHeight: 1.65, marginBottom: "20px" }}>{stage.desc}</p>
                  <div style={{ padding: "16px 20px", background: stage.complete ? "var(--green-pale)" : "var(--amber-pale)", border: `1px solid ${stage.complete ? "#C0DD97" : "#FAC775"}`, borderLeft: `3px solid ${stage.complete ? "var(--green)" : "var(--amber)"}`, borderRadius: "var(--radius-md)" }}>
                    <div style={{ fontFamily: "var(--t-mono)", fontSize: "11px", color: stage.complete ? "var(--green)" : "var(--amber)", letterSpacing: "0.08em", marginBottom: "6px", fontWeight: 500 }}>TCF ACTIONS REQUIRED</div>
                    <div style={{ fontSize: "14px", color: "var(--ink-mid)", lineHeight: 1.6 }}>{stage.tcf}</div>
                  </div>
                  {stage.id === "active" && (
                    <div style={{ marginTop: "16px", padding: "14px 18px", background: "var(--red-pale)", border: "1px solid #F09595", borderLeft: "3px solid var(--red)", borderRadius: "var(--radius-md)", fontSize: "14px", color: "var(--ink-mid)", lineHeight: 1.6 }}>
                      <strong style={{ color: "var(--red)" }}>Selective de-emphasis is not abandonment.</strong> A team cannot de-emphasize a buy/burn promise, a development milestone, or a governance transition timeline to claim separation while continuing to operate the program in modified form. The modification itself re-tethers the token. Use the Issuer Promise Audit tab to document the status of each outstanding promise.
                    </div>
                  )}
                </div>
              );
            })()}
            {!sepStage && <div style={{ padding: "20px", background: "var(--paper-dark)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", textAlign: "center", fontSize: "14px", color: "var(--ink-light)" }}>Select a stage to see its description and required TCF actions</div>}
          </div>
        )}

        {tab === "audit" && (
          <div>
            <p style={{ fontSize: "15px", color: "var(--ink-mid)", lineHeight: 1.65, marginBottom: "16px", maxWidth: "700px" }}>
              The Release&apos;s issuer-promise-centric standard makes the diagnostic question: what has the issuer promised, to whom, through what channels, and has it fulfilled or publicly abandoned those promises? Use this audit to map each promise type to its current status and TCF implications.
            </p>
            <p style={{ fontSize: "14px", color: "var(--ink-mid)", lineHeight: 1.65, marginBottom: "16px", maxWidth: "700px" }}>
              This output also supports the registration decision itself. A fully Tier 2 structure with resolved promises supports a no-action request or future exemption pathway; unresolved gaps quantify the structural work required if a project wants to avoid registered-status compliance.
            </p>
            <div className="release-banner" style={{ marginBottom: "24px", maxWidth: "700px" }}>
              <strong>The separation trap:</strong> A team cannot selectively de-emphasize a prior promise to claim separation while continuing to operate the program in modified form. Each modification re-tethers the token. The only paths to separation are complete fulfillment (as originally described) or public, unambiguous abandonment.
            </div>
            <div style={{ marginBottom: "20px" }}>
              {PROMISE_TYPES.map((promiseType) => {
                const status = promiseStatuses[promiseType.id];
                const implication = status ? promiseType.implications[status] : null;
                return (
                  <div key={promiseType.id} className={`promise-audit-item risk-${promiseType.risk}`}>
                    <div className="promise-title">{promiseType.title}</div>
                    <div className="promise-desc">{promiseType.desc}</div>
                    <div className="promise-status-row">
                      <span style={{ fontFamily: "var(--t-mono)", fontSize: "11px", color: "var(--ink-light)", alignSelf: "center", marginRight: "4px" }}>Status:</span>
                      {[
                        { key: "fulfilled", label: "Fulfilled as promised" },
                        { key: "abandoned", label: "Publicly abandoned" },
                        { key: "active", label: "Active / outstanding" },
                        { key: "none", label: "Never promised" },
                      ].map(({ key, label }) => (
                        <button key={key} onClick={() => setPromise(promiseType.id, key as PromiseStatus)} className={`promise-status-btn ${status === key ? `selected-${key}` : ""}`}>{label}</button>
                      ))}
                    </div>
                    {implication && (
                      <div className={`promise-implication ${status === "fulfilled" || status === "none" ? "" : ""}`} style={{ background: status === "fulfilled" ? "var(--green-pale)" : status === "abandoned" ? "var(--paper-dark)" : status === "active" ? "var(--amber-pale)" : "var(--paper-dark)", border: `1px solid ${status === "fulfilled" ? "#C0DD97" : status === "active" ? "#FAC775" : "var(--border)"}`, borderLeft: `3px solid ${status === "fulfilled" ? "var(--green)" : status === "active" ? "var(--amber)" : status === "abandoned" ? "var(--border-mid)" : "var(--border)"}`, color: "var(--ink-mid)", fontSize: "13px", lineHeight: 1.55 }}>
                        <strong style={{ color: status === "fulfilled" ? "var(--green)" : status === "active" ? "var(--amber)" : "var(--ink-mid)" }}>{status === "fulfilled" ? "Separation possible:" : status === "abandoned" ? "Abandonment requirements:" : status === "active" ? "Investment contract status — action required:" : "No promise made:"}</strong>{" "}{implication}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {Object.keys(promiseStatuses).length > 0 && (
              <div style={{ padding: "20px 24px", background: overallRisk() === "high" ? "var(--amber-pale)" : overallRisk() === "low" ? "var(--green-pale)" : "var(--navy-pale)", border: `1px solid ${overallRisk() === "high" ? "#FAC775" : overallRisk() === "low" ? "#C0DD97" : "#B5D4F4"}`, borderRadius: "var(--radius-lg)", marginTop: "8px" }}>
                <div style={{ fontFamily: "var(--t-mono)", fontSize: "11px", letterSpacing: "0.08em", fontWeight: 500, color: overallRisk() === "high" ? "var(--amber)" : overallRisk() === "low" ? "var(--green)" : "var(--navy)", marginBottom: "8px" }}>OVERALL SEPARATION STATUS</div>
                <div style={{ fontSize: "14px", color: "var(--ink-mid)", lineHeight: 1.6 }}>
                  {overallRisk() === "high" && "One or more promises remain active and outstanding. Investment contract status persists. Implement TCF Tier 2 protections to constrain founding entity discretion while fulfillment is ongoing. Do not attempt to de-emphasize or modify active promises — document them, fulfill them, or publicly abandon them."}
                  {overallRisk() === "low" && "All documented promises have been fulfilled as described or publicly abandoned. Separation is achievable if TCF Tier 2 structural protections are in place. Consult qualified securities counsel before making any public statements about separation status."}
                  {overallRisk() === "med" && "Some promise types are not yet documented. Complete the audit for all four promise types before assessing separation status."}
                </div>
              </div>
            )}
            <div className="disclaimer" style={{ marginTop: "24px" }}>
              This audit is a structural analysis tool only. Separation status is a legal determination that depends on the specific facts of each token&apos;s offering, the channels through which promises were made, and applicable law. Consult qualified securities counsel before making any public statements about separation status or investment contract treatment.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
