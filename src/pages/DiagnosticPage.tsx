"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { RadarChart } from "../components/RadarChart";
import { CLUSTERS } from "../data/clusters";
import { QUESTIONS, TIER_LABELS, TIER_SHORT, type TierValue } from "../data/questions";
import { calcTier, type AnswerMap, type TierResult } from "../utils/calcTier";

type Phase = "intro" | "question" | "output";

export default function DiagnosticPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [result, setResult] = useState<TierResult | null>(null);

  const next = () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent((value) => value + 1);
    } else {
      setResult(calcTier(answers));
      setPhase("output");
    }
  };

  const back = () => {
    if (current > 0) setCurrent((value) => value - 1);
    else setPhase("intro");
  };

  const reset = () => {
    setPhase("intro");
    setCurrent(0);
    setAnswers({});
    setResult(null);
  };

  const progress = Object.keys(answers).length / QUESTIONS.length;
  const q = QUESTIONS[current];

  if (phase === "intro") {
    return (
      <div className="page">
        <div className="container-narrow" style={{ padding: "48px 40px" }}>
          <div className="section-eyebrow">Diagnostic tool</div>
          <h1 style={{ fontFamily: "var(--t-display)", fontSize: "36px", fontWeight: 700, lineHeight: 1.2, marginBottom: "12px", letterSpacing: "-0.02em" }}>Structural assessment</h1>
          <p style={{ fontSize: "16px", color: "var(--ink-mid)", lineHeight: 1.65, marginBottom: "14px" }}>18 questions. 25–35 minutes. A tier designation with gap analysis mapped to the TCF&apos;s translation table, including the March 2026 Release&apos;s separation doctrine.</p>
          <p style={{ fontSize: "16px", color: "var(--ink-mid)", lineHeight: 1.65, marginBottom: "24px" }}>The diagnostic is also useful for the registration decision itself. If your structure reaches Tier 2 on all 18 issues, you have a credible basis for a no-action request or an exemption under Regulation Crypto Assets. If significant gaps remain, the diagnostic quantifies what structural investment would be required — which you can weigh against the compliance burden of registered securities status.</p>
          <div className="release-banner" style={{ marginBottom: "24px" }}>
            This assessment now includes Issue 4.3 (Revenue Routing / Buy-Burn) and Question 18 (Separation Doctrine Compliance), both anchored in the March 17, 2026 SEC/CFTC Release.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "32px" }}>
            {CLUSTERS.map((cluster) => (
              <div key={cluster.id} className="card card-pale" style={{ padding: "14px 18px" }}>
                <div style={{ fontFamily: "var(--t-mono)", fontSize: "10px", color: "var(--navy)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>{cluster.questions.length} question{cluster.questions.length > 1 ? "s" : ""}</div>
                <div style={{ fontFamily: "var(--t-display)", fontSize: "14px", fontWeight: 600 }}>{cluster.label}</div>
              </div>
            ))}
          </div>
          <div className="disclaimer" style={{ marginBottom: "28px" }}>This tool provides structural analysis only. It does not constitute legal advice or an opinion on whether any token is a security under applicable law. Consult qualified securities counsel before making any regulatory determinations.</div>
          <button className="btn btn-primary btn-lg" onClick={() => setPhase("question")}>Begin assessment →</button>
        </div>
      </div>
    );
  }

  if (phase === "output" && result) {
    const tierColors = ["var(--red)", "var(--amber)", "var(--navy)", "var(--green)"];
    const tierNames = ["No tier designation", "Tier 1 — Anti-abandonment", "Tier 2 — Governance & migration", "Tier 3 — Continuity & replacement"];
    return (
      <div className="page">
        <div className="container" style={{ padding: "48px 40px" }}>
          <div className="section-eyebrow">Assessment complete</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }}>
            <div>
              <div style={{ textAlign: "center", padding: "48px 0 32px", borderBottom: "1px solid var(--border)", marginBottom: "32px" }}>
                <div style={{ fontFamily: "var(--t-mono)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--ink-light)", marginBottom: "8px", textTransform: "uppercase" }}>Overall designation</div>
                <div className="output-tier-number" style={{ color: tierColors[result.overall] }}>{result.overall === 0 ? "—" : result.overall}</div>
                <div className="output-tier-label">{tierNames[result.overall]}</div>
                {result.criticalGaps.length > 0 && <div style={{ marginTop: "16px", padding: "12px 16px", background: "var(--red-pale)", border: "1px solid #F09595", borderRadius: "var(--radius-md)", fontSize: "13px", color: "var(--red)", lineHeight: 1.5 }}><strong>Critical gaps:</strong> Issues {result.criticalGaps.join(", ")} require immediate attention. A critical gap cannot be cured by improving other issues.</div>}
                <div style={{ fontSize: "14px", color: "var(--ink-mid)", lineHeight: 1.6, marginTop: "12px" }}>Tier calculated using the weakest-link rule across all 18 issues.</div>
              </div>
              <div style={{ marginBottom: "32px" }}>
                <h3 style={{ fontFamily: "var(--t-display)", fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>Cluster scores</h3>
                {CLUSTERS.map((cluster, index) => (
                  <div key={cluster.id} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                    <div style={{ fontFamily: "var(--t-mono)", fontSize: "11px", color: "var(--ink-light)", width: "180px", flexShrink: 0, letterSpacing: "0.02em" }}>{cluster.label}</div>
                    <div style={{ flex: 1, height: "6px", background: "var(--border)", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(result.clusterScores[index] / 3) * 100}%`, background: tierColors[result.clusterScores[index]], borderRadius: "3px", transition: "width 0.6s ease" }} />
                    </div>
                    <span className={`tier-badge tier-${result.clusterScores[index]}`} style={{ fontSize: "10px", minWidth: "60px", justifyContent: "center" }}>{TIER_SHORT[result.clusterScores[index]]}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: "24px" }}>
                <h3 style={{ fontFamily: "var(--t-display)", fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>Priority gaps to address</h3>
                {result.gaps.map(({ q: gapQuestion, i: questionIndex }, rank) => (
                  <div key={questionIndex} className="gap-item">
                    <div className="gap-rank">{String(rank + 1).padStart(2, "0")}</div>
                    <div style={{ flex: 1 }}>
                      <div className="gap-issue">Issue {gapQuestion.id}</div>
                      <div className="gap-title">{gapQuestion.title}</div>
                      <div className="gap-desc">{gapQuestion.why}</div>
                      <span style={{ fontFamily: "var(--t-mono)", fontSize: "12px", color: "var(--navy)", marginTop: "6px", display: "inline-block" }}>→ {gapQuestion.paperRef}</span>
                    </div>
                    <span className={`tier-badge tier-${answers[questionIndex]}`} style={{ alignSelf: "flex-start", flexShrink: 0 }}>{TIER_SHORT[answers[questionIndex] as TierValue]}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button className="btn btn-secondary" onClick={reset}>Start over</button>
                <Link className="btn btn-primary" to="/paper">Read the paper →</Link>
              </div>
            </div>
            <div style={{ position: "sticky", top: "80px" }}>
              <h3 style={{ fontFamily: "var(--t-display)", fontSize: "18px", fontWeight: 600, marginBottom: "16px", textAlign: "center" }}>Structural profile</h3>
              <div style={{ display: "flex", justifyContent: "center" }}><RadarChart scores={result.clusterScores} size={280} /></div>
              <div style={{ textAlign: "center", marginTop: "12px" }}>
                <div style={{ display: "flex", gap: "16px", justifyContent: "center", fontSize: "12px", color: "var(--ink-light)", fontFamily: "var(--t-mono)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><svg width="20" height="8"><line x1="0" y1="4" x2="20" y2="4" stroke="rgba(31,56,100,0.3)" strokeWidth="1.5" strokeDasharray="4,3" /></svg>Tier 2 target</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><svg width="20" height="8"><line x1="0" y1="4" x2="20" y2="4" stroke="#1F3864" strokeWidth="2" /></svg>Your structure</span>
                </div>
              </div>
              <div className="disclaimer" style={{ marginTop: "20px", fontSize: "12px" }}>This structural analysis does not constitute legal advice. The tier designation reflects the weakest-link calculation across all 18 issues in the Token Continuity Framework.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div style={{ background: "var(--paper-dark)", borderBottom: "1px solid var(--border)", padding: "12px 40px", position: "sticky", top: "var(--nav-offset)", zIndex: 50 }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontFamily: "var(--t-mono)", fontSize: "11px", color: "var(--ink-light)", letterSpacing: "0.06em", flexShrink: 0 }}>{current + 1} / {QUESTIONS.length}</span>
          <div className="progress-bar" style={{ flex: 1 }}><div className="progress-fill" style={{ width: `${progress * 100}%` }} /></div>
          <span style={{ fontFamily: "var(--t-mono)", fontSize: "10px", color: "var(--ink-light)", padding: "2px 8px", background: "var(--paper)", border: "1px solid var(--border)", borderRadius: "2px" }}>{CLUSTERS.find((cluster) => cluster.questions.includes(current))?.label}</span>
          {q.id === "4.3" && <span style={{ fontFamily: "var(--t-mono)", fontSize: "10px", color: "var(--teal)", padding: "2px 8px", background: "var(--teal-pale)", border: "1px solid #9FE1CB", borderRadius: "2px" }}>New — Mar 2026 Release</span>}
          {q.id === "sep" && <span style={{ fontFamily: "var(--t-mono)", fontSize: "10px", color: "var(--teal)", padding: "2px 8px", background: "var(--teal-pale)", border: "1px solid #9FE1CB", borderRadius: "2px" }}>Separation doctrine</span>}
        </div>
      </div>
      <div className="container-narrow" style={{ padding: "48px 40px" }}>
        <div key={current} className="animate-fadeup">
          <div className="q-number">Issue {q.id} — {q.impact === "high" ? <span className="impact-high">HIGH IMPACT</span> : q.impact === "med" ? <span className="impact-med">MEDIUM IMPACT</span> : <span className="impact-low">STRUCTURAL</span>}</div>
          <div className="q-text">{q.question}</div>
          <div className="q-why">{q.why}</div>
          <div style={{ marginBottom: "32px" }}>
            {q.options.map((option, optionIndex) => {
              const selected = answers[current] === option.tier;
              const isCritical = q.critical && option.tier === 0;
              return (
                <div key={optionIndex} className={`answer-option ${selected ? (isCritical && answers[current] === 0 ? "selected-critical" : "selected") : ""}`} onClick={() => setAnswers((value) => ({ ...value, [current]: option.tier }))}>
                  <div className="answer-letter">{option.label}</div>
                  <div style={{ flex: 1 }}>
                    <div className="answer-text">{option.text}</div>
                    <div className="answer-tier">{TIER_LABELS[option.tier]}</div>
                  </div>
                  {q.critical && option.tier === 0 && <span style={{ fontFamily: "var(--t-mono)", fontSize: "10px", color: "var(--amber)", background: "var(--amber-pale)", border: "1px solid #FAC775", padding: "2px 7px", borderRadius: "2px", flexShrink: 0, alignSelf: "flex-start" }}>CRITICAL GAP</span>}
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button className="btn btn-secondary" onClick={back}>← Back</button>
            <button className="btn btn-primary" onClick={next} disabled={answers[current] === undefined} style={{ opacity: answers[current] === undefined ? 0.4 : 1 }}>{current < QUESTIONS.length - 1 ? "Next →" : "View results →"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
