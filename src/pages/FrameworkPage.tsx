"use client";

import { Fragment, useState } from "react";
import { QUESTIONS } from "../data/questions";
import { THEATER_PATTERNS } from "../data/theaterPatterns";

type FrameworkTab = "table" | "theater" | "checklist";
type TheaterAnswer = "yes" | "no" | null;

const checklistItems = [
  { num: "01", title: "IP separation or encumbrance", desc: "The founding entity must have either (a) transferred protocol IP to a foundation or similar entity with governance-controlled disposition rights, or (b) encumbered the IP with a binding license that automatically extends to token holders and any successor operator upon defined trigger events.", note: "A bare promise to license in the future is insufficient. The encumbrance must be in place, documented, and verifiable before the request is filed.", ref: "Section VIII.B — Prerequisite 1" },
  { num: "02", title: "Governance implementation", desc: "The governance mechanisms described in the request must be implemented at the protocol level, not merely described in a whitepaper. On-chain governance verifiable by any observer is far stronger than off-chain systems requiring trust in founding entity representations.", note: "Where on-chain implementation is not feasible, contractual governance commitments with third-party enforcement mechanisms are the minimum acceptable substitute.", ref: "Section VIII.B — Prerequisite 2" },
  { num: "03", title: "Treasury separation", desc: "Founding entity treasury funds must be separated from protocol treasury funds, with defined and limited mechanisms for founding entity compensation from protocol revenues. The compensation structure must be fixed or formulaic rather than profit-participating.", note: "A founding entity that retains discretionary access to protocol treasury funds has not meaningfully constrained its revenue routing control regardless of what governance documents say.", ref: "Section VIII.B — Prerequisite 3" },
  { num: "04", title: "Survivability documentation", desc: "The §365(n)-equivalent legal analysis must be prepared and documented before filing, addressing: (a) whether token utility rights constitute IP licenses protected by §365(n); (b) whether the open-source license provides an independent survivability basis; and (c) what governance mechanisms activate upon founding entity insolvency.", note: "The SEC staff are not bankruptcy lawyers, but they will want to know that this question has been seriously analyzed by independent counsel.", ref: "Section VIII.B — Prerequisite 4" },
  { num: "05", title: "Independent verification", desc: "At least one element of the structure — ideally governance implementation and the IP encumbrance — must be verifiable by an independent third party without relying on founding entity representations.", note: "For on-chain governance, this is inherent: the blockchain provides independent verification. For off-chain elements, a legal opinion from independent counsel or public registration of legal instruments serves this function.", ref: "Section VIII.B — Prerequisite 5" },
];

export default function FrameworkPage() {
  const [tab, setTab] = useState<FrameworkTab>("table");
  const [filterImpact, setFilterImpact] = useState<"all" | "high" | "med" | "low">("all");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [expandedTheater, setExpandedTheater] = useState<number | null>(null);
  const [theaterAnswers, setTheaterAnswers] = useState<Record<string, TheaterAnswer>>({});

  const tableData = QUESTIONS.map((question) => ({ num: question.id, name: question.title, impact: question.impact, t1: question.options[1].text, t2: question.options[2].text, t3: question.options[3].text, sec: question.why, isNew: question.id === "4.3" || question.id === "sep" }));
  const filtered = tableData.filter((row) => filterImpact === "all" || row.impact === filterImpact);

  return (
    <div className="page">
      <div className="container" style={{ padding: "48px 40px" }}>
        <div className="section-eyebrow">Framework reference</div>
        <h1 style={{ fontFamily: "var(--t-display)", fontSize: "36px", fontWeight: 700, lineHeight: 1.2, marginBottom: "12px", letterSpacing: "-0.02em" }}>The Token Continuity Framework</h1>
        <p style={{ fontSize: "16px", color: "var(--ink-mid)", lineHeight: 1.65, marginBottom: "16px", maxWidth: "700px" }}>The complete 18-issue translation table, theater identification protocol, and no-action letter prerequisites — anchored in the March 2026 Release.</p>
        <div className="release-banner" style={{ marginBottom: "28px", maxWidth: "700px" }}>
          Issues 4.3 (Revenue Routing / Buy-Burn) and Sep (Separation Doctrine) are new additions anchored directly in the March 17, 2026 SEC/CFTC joint interpretive release.
        </div>
        <div style={{ display: "flex", gap: "4px", marginBottom: "32px", borderBottom: "2px solid var(--border)", paddingBottom: "0" }}>
          {[["table", "18-issue table"], ["theater", "Theater protocol"], ["checklist", "No-action checklist"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id as FrameworkTab)} style={{ fontFamily: "var(--t-body)", fontSize: "14px", padding: "10px 18px", border: "none", background: "none", cursor: "pointer", transition: "all .15s", color: tab === id ? "var(--navy)" : "var(--ink-mid)", borderBottom: tab === id ? "2px solid var(--navy)" : "2px solid transparent", marginBottom: "-2px", fontWeight: tab === id ? 500 : 400 }}>{label}</button>
          ))}
        </div>

        {tab === "table" && (
          <div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--t-mono)", fontSize: "11px", color: "var(--ink-light)", letterSpacing: "0.06em", alignSelf: "center" }}>FILTER:</span>
              {[["all", "All 18 issues"], ["high", "High impact"], ["med", "Medium"], ["low", "Structural"]].map(([value, label]) => (
                <button key={value} onClick={() => setFilterImpact(value as "all" | "high" | "med" | "low")} style={{ fontFamily: "var(--t-mono)", fontSize: "11px", padding: "4px 10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: filterImpact === value ? "var(--navy)" : "white", color: filterImpact === value ? "white" : "var(--ink-mid)", cursor: "pointer", letterSpacing: "0.04em", transition: "all .15s" }}>{label}</button>
              ))}
            </div>
            <table className="framework-table">
              <thead><tr><th style={{ width: "52px" }}>#</th><th style={{ width: "200px" }}>Issue</th><th>Token equivalent (Tier 2)</th><th style={{ width: "90px" }}>Impact</th></tr></thead>
              <tbody>
                {filtered.map((row, rowIndex) => (
                  <Fragment key={row.num}>
                    <tr className={expandedRow === rowIndex ? "expanded" : ""} onClick={() => setExpandedRow(expandedRow === rowIndex ? null : rowIndex)} style={{ cursor: "pointer" }}>
                      <td><span style={{ fontFamily: "var(--t-mono)", fontSize: "12px", color: "var(--ink-light)" }}>{row.num}</span></td>
                      <td>
                        <strong style={{ fontFamily: "var(--t-body)", fontSize: "14px" }}>{row.name}</strong>
                        {row.isNew && <span style={{ fontFamily: "var(--t-mono)", fontSize: "10px", color: "var(--teal)", background: "var(--teal-pale)", border: "1px solid #9FE1CB", padding: "1px 6px", borderRadius: "2px", marginLeft: "8px", letterSpacing: "0.04em" }}>NEW</span>}
                      </td>
                      <td style={{ fontSize: "13px", color: "var(--ink-mid)" }}>{row.t2}</td>
                      <td>{row.impact === "high" ? <span className="impact-high">HIGH</span> : row.impact === "med" ? <span className="impact-med">MED</span> : <span className="impact-low">STRUCT</span>}</td>
                    </tr>
                    {expandedRow === rowIndex && (
                      <tr><td colSpan={4} className="expand-content"><div className="expand-inner">
                        <div style={{ fontSize: "13px", color: "var(--ink-mid)", marginBottom: "14px", padding: "10px 14px", background: "var(--amber-pale)", border: "1px solid #FAC775", borderRadius: "var(--radius-sm)" }}><strong>Securities significance:</strong> {row.sec}</div>
                        <div className="tier-grid">
                          <div className="tier-card tier-card-1"><div className="tier-card-label" style={{ color: "var(--amber)" }}>Tier 1 — Anti-abandonment</div><div style={{ fontSize: "13px", lineHeight: 1.5 }}>{row.t1}</div></div>
                          <div className="tier-card tier-card-2"><div className="tier-card-label" style={{ color: "var(--navy)" }}>Tier 2 — Governance & migration</div><div style={{ fontSize: "13px", lineHeight: 1.5 }}>{row.t2}</div></div>
                          <div className="tier-card tier-card-3"><div className="tier-card-label" style={{ color: "var(--green)" }}>Tier 3 — Continuity & replacement</div><div style={{ fontSize: "13px", lineHeight: 1.5 }}>{row.t3}</div></div>
                        </div>
                      </div></td></tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "theater" && (
          <div>
            <p style={{ fontSize: "15px", color: "var(--ink-mid)", lineHeight: 1.65, marginBottom: "24px", maxWidth: "700px" }}>Seven patterns that produce the vocabulary of protection without its substance. Patterns 6 and 7 address the Release&apos;s separation-trap analysis and the risk of premature separation claims.</p>
            <div style={{ marginBottom: "20px", padding: "14px 18px", background: "var(--navy-pale)", border: "1px solid #B5D4F4", borderRadius: "var(--radius-md)", fontSize: "14px", color: "var(--navy)", lineHeight: 1.6 }}><strong>The three-feature test:</strong> A structural protection is real only if it is (1) <em>enforceable</em> — backed by remedies that operate independently of founding entity cooperation; (2) <em>legible ex ante</em> — verifiable by an observer without relying on founding entity representations; and (3) <em>calibrated</em> — addressing the specific discretionary risks of the relationship.</div>
            {THEATER_PATTERNS.map((pattern, patternIndex) => {
              const isOpen = expandedTheater === patternIndex;
              const answers = pattern.checks.map((_, checkIndex) => theaterAnswers[`${patternIndex}-${checkIndex}`]);
              const hasFailure = answers.some((answer, checkIndex) => answer === "no" && pattern.checks[checkIndex].critical);
              const complete = answers.every((answer) => answer !== null && answer !== undefined);
              const isNew = patternIndex >= 5;
              return (
                <div key={patternIndex} className="theater-pattern" style={{ borderColor: isNew ? "var(--teal)" : undefined }}>
                  <div className="theater-header" onClick={() => setExpandedTheater(isOpen ? null : patternIndex)}>
                    <div>
                      <div style={{ fontFamily: "var(--t-display)", fontSize: "16px", fontWeight: 600, marginBottom: "3px" }}>
                        {pattern.title}
                        {isNew && <span style={{ fontFamily: "var(--t-mono)", fontSize: "10px", color: "var(--teal)", background: "var(--teal-pale)", border: "1px solid #9FE1CB", padding: "1px 6px", borderRadius: "2px", marginLeft: "8px", letterSpacing: "0.04em" }}>NEW</span>}
                      </div>
                      <div style={{ fontSize: "13px", color: "var(--ink-light)" }}>{pattern.desc.substring(0, 80)}...</div>
                    </div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0, marginLeft: "16px" }}>
                      {complete && (hasFailure ? <span className="impact-high">THEATRICAL</span> : <span className="impact-low" style={{ background: "var(--green-pale)", color: "var(--green)", border: "1px solid #C0DD97" }}>PASSES</span>)}
                      <span style={{ fontFamily: "var(--t-mono)", fontSize: "14px", color: "var(--ink-light)" }}>{isOpen ? "↑" : "↓"}</span>
                    </div>
                  </div>
                  <div className={`theater-body ${isOpen ? "open" : ""}`}>
                    <p style={{ fontSize: "14px", color: "var(--ink-mid)", lineHeight: 1.6, marginBottom: "16px" }}>{pattern.desc}</p>
                    {pattern.checks.map((check, checkIndex) => {
                      const key = `${patternIndex}-${checkIndex}`;
                      const answer = theaterAnswers[key];
                      return (
                        <div key={checkIndex} className="theater-check">
                          <div className={`check-input ${answer === "yes" ? "yes" : answer === "no" ? "no" : ""}`} onClick={() => setTheaterAnswers((prev) => {
                            const current = prev[key];
                            return { ...prev, [key]: current === undefined || current === null ? "yes" : current === "yes" ? "no" : null };
                          })} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: "14px", lineHeight: 1.55 }}>
                              {check.critical && <span style={{ fontFamily: "var(--t-mono)", fontSize: "10px", color: "var(--amber)", marginRight: "6px" }}>CRITICAL</span>}
                              {check.text}
                            </div>
                            {answer === "no" && check.critical && <div className="check-warning">This element fails the enforceability or calibration criterion. A &quot;no&quot; answer indicates a theatrical structure regardless of other protections. See Section VI.C of the paper.</div>}
                          </div>
                        </div>
                      );
                    })}
                    <div style={{ marginTop: "14px", fontSize: "12px", color: "var(--ink-light)", fontFamily: "var(--t-mono)", letterSpacing: "0.03em" }}>Click each check: unmarked → yes → no → unmarked</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "checklist" && (
          <div style={{ maxWidth: "720px" }}>
            <p style={{ fontSize: "15px", color: "var(--ink-mid)", lineHeight: 1.65, marginBottom: "24px" }}>Five structural prerequisites that must be satisfied before filing a Tier 2 no-action request. These are conditions of credibility — not items to complete after a favorable response.</p>
            <div className="disclaimer" style={{ marginBottom: "28px" }}>A no-action letter request is a representation to the SEC staff about a specific existing or proposed structure. Consult qualified securities counsel before filing any no-action request.</div>
            {checklistItems.map((item, index) => (
              <div key={index} style={{ display: "flex", gap: "20px", padding: "24px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontFamily: "var(--t-mono)", fontSize: "28px", fontWeight: 500, color: "var(--border-mid)", flexShrink: 0, lineHeight: 1 }}>{item.num}</div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontFamily: "var(--t-display)", fontSize: "17px", fontWeight: 600, marginBottom: "8px" }}>{item.title}</h4>
                  <p style={{ fontSize: "14px", color: "var(--ink-mid)", lineHeight: 1.65, marginBottom: "10px" }}>{item.desc}</p>
                  <p style={{ fontSize: "13px", color: "var(--ink-light)", lineHeight: 1.55, padding: "10px 14px", background: "var(--paper-dark)", borderRadius: "var(--radius-sm)", borderLeft: "2px solid var(--border-mid)" }}>{item.note}</p>
                  <div style={{ fontFamily: "var(--t-mono)", fontSize: "11px", color: "var(--navy)", marginTop: "10px", letterSpacing: "0.04em" }}>→ {item.ref}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
