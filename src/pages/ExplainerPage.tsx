"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { DOMAIN_DATA, SPECTRUM_STATES } from "../data/domainData";

export default function ExplainerPage() {
  const [panel, setPanel] = useState(0);
  const [activeDomain, setActiveDomain] = useState<string | null>(null);
  const [spectrumPos, setSpectrumPos] = useState(60);
  const [toggle, setToggle] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const spectrumState = SPECTRUM_STATES.reduce((best, state) => (Math.abs(state.pos - spectrumPos) < Math.abs(best.pos - spectrumPos) ? state : best), SPECTRUM_STATES[0]);

  const handleThumbMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragging.current = true;
    const move = (mouseEvent: MouseEvent) => {
      if (!dragging.current || !trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      setSpectrumPos(Math.max(2, Math.min(98, ((mouseEvent.clientX - rect.left) / rect.width) * 100)));
    };
    const up = () => {
      dragging.current = false;
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const panels = [
    {
      title: "The ground lease: a century of managed subordination",
      eyebrow: "Panel 1 of 4 — The analogy",
      content: (
        <div>
          <p style={{ fontSize: "15px", color: "var(--ink-mid)", lineHeight: 1.7, marginBottom: "28px" }}>In a ground lease, the fee owner leases land to a developer who builds and operates improvements. The fee owner retains the reversionary interest and termination rights. The leasehold mortgagee&apos;s entire collateral depends on the fee owner&apos;s continuing decision to maintain the lease — a textbook endogenous risk problem. The market&apos;s response was not to eliminate control. It was to develop tiered continuity rights.</p>
          <div className="stack-diagram" style={{ maxWidth: "520px", margin: "0 auto" }}>
            <div className="stack-layer stack-layer-navy" onClick={() => setToggle((value) => !value)}>
              <div><div className="stack-layer-label">Fee owner</div><div className="stack-layer-sub">Owns the land · Retains reversionary interest</div></div>
              <span style={{ fontFamily: "var(--t-badge)", fontSize: "11px", background: "rgba(255,255,255,0.15)", color: "white", padding: "3px 9px", borderRadius: "var(--radius-sm)" }}>Ground owner</span>
            </div>
            <div className="stack-layer stack-layer-mid stack-layer-middle">
              <div><div className="stack-layer-label">Leasehold estate</div><div className="stack-layer-sub">Improvements · Operations · Cash flow</div></div>
            </div>
            <div className="stack-layer stack-layer-light">
              <div><div className="stack-layer-label">Leasehold mortgagee</div><div className="stack-layer-sub">Finances improvements · Junior to fee owner</div></div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                {toggle ? ["Non-disturbance", "Cure rights", "New-lease right"].map((protection) => <span key={protection} className="tier-badge tier-3" style={{ fontSize: "10px" }}>{protection}</span>) : <span style={{ fontFamily: "var(--t-mono)", fontSize: "11px", color: "var(--ink-light)" }}>Click fee owner to see protections</span>}
              </div>
            </div>
          </div>
          {toggle && <div style={{ maxWidth: "520px", margin: "16px auto 0", padding: "16px", background: "var(--green-pale)", border: "1px solid #C0DD97", borderRadius: "var(--radius-md)", fontSize: "14px", color: "var(--ink-mid)", lineHeight: 1.6 }}><strong style={{ color: "var(--green)" }}>The protection package converts:</strong> discretionary termination risk → rule-bound enforcement risk. The fee owner retains full ownership and control. What changes is the <em>space of permissible discretionary action</em> that can destroy the junior interest.</div>}
        </div>
      ),
    },
    {
      title: "The token stack: the same architecture, none of the protections",
      eyebrow: "Panel 2 of 4 — The anomaly",
      content: (
        <div>
          <p style={{ fontSize: "15px", color: "var(--ink-mid)", lineHeight: 1.7, marginBottom: "28px" }}>The dual equity/token structure recreates ground lease subordination precisely — founding entity as fee owner, protocol as the land, token holders as unprotected leasehold mortgagees. The March 2026 Release makes the stakes explicit: tokens remain investment contracts until the issuer&apos;s essential managerial promises are fulfilled or publicly abandoned.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
            {[
              { label: "Ground lease", sub: "With protections", layers: [{ n: "Fee owner", s: "Land ownership · Reversionary interest", badge: "Ground owner", prot: true }, { n: "Leasehold estate", s: "Improvements · Operations", badge: "", prot: true }, { n: "Leasehold mortgagee", s: "Junior capital provider", badge: "Protected ✓", prot: true }] },
              { label: "Token structure", sub: "Without protections", layers: [{ n: "Founding entity", s: "IP · Governance · Revenue routing", badge: "Ground owner equivalent", prot: false }, { n: "Protocol", s: "Network · Codebase · Token utility", badge: "", prot: false }, { n: "Token holders", s: "Junior capital provider", badge: "Unprotected ✗", prot: false }] },
            ].map(({ label, sub, layers }) => (
              <div key={label}>
                <div style={{ fontFamily: "var(--t-mono)", fontSize: "11px", color: "var(--ink-light)", letterSpacing: "0.06em", marginBottom: "8px" }}>{label.toUpperCase()} — {sub}</div>
                <div className="stack-diagram">
                  {layers.map(({ n, s, badge, prot }, index) => (
                    <div key={n} className={`stack-layer ${index === 0 ? "stack-layer-navy" : index === 1 ? "stack-layer-mid stack-layer-middle" : "stack-layer-light"}`}>
                      <div><div className="stack-layer-label" style={{ fontSize: "14px" }}>{n}</div><div className="stack-layer-sub" style={{ fontSize: "12px" }}>{s}</div></div>
                      {index === 2 && badge && <span className={`tier-badge ${prot ? "tier-3" : "tier-0"}`} style={{ fontSize: "10px" }}>{badge}</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "var(--amber-pale)", border: "1px solid #FAC775", borderLeft: "3px solid var(--amber)", borderRadius: "var(--radius-md)", padding: "16px 18px", fontSize: "14px", color: "var(--ink-mid)", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--amber)" }}>The four structural features of value diversion:</strong> IP ownership · Revenue routing control · Centralized governance authority · Asymmetric optionality. The March 2026 Release adds a fifth concern: <strong>outstanding issuer promises</strong> that re-tether token value to founding entity conduct even in nominally decentralized structures.
          </div>
        </div>
      ),
    },
    {
      title: "The cross-market survey: unprotected subordination is the anomaly",
      eyebrow: "Panel 3 of 4 — The pattern",
      content: (
        <div>
          <p style={{ fontSize: "15px", color: "var(--ink-mid)", lineHeight: 1.7, marginBottom: "24px" }}>Across four mature markets, law developed the same solution: enforceable constraints on how senior party control can be exercised in ways that destroy junior party investments. The March 2026 Release adds a fifth domain — federal regulatory guidance — that now provides the same institutional permission to apply this principle to tokens.</p>
          <div className="domain-grid" style={{ marginBottom: "16px" }}>
            {DOMAIN_DATA.map((domain) => (
              <div key={domain.id} className={`domain-card ${activeDomain === domain.id ? "active" : ""}`} onClick={() => setActiveDomain(activeDomain === domain.id ? null : domain.id)}>
                <div className="domain-name">{domain.name}</div><div className="domain-sub">{domain.sub}</div><div className="domain-tag">{domain.tag}</div>
              </div>
            ))}
          </div>
          {activeDomain && (() => {
            const domain = DOMAIN_DATA.find((item) => item.id === activeDomain);
            if (!domain) return null;
            return (
              <div className="domain-detail">
                <h4 style={{ fontFamily: "var(--t-display)", fontSize: "18px", fontWeight: 600, marginBottom: "10px" }}>{domain.name}</h4>
                <p style={{ fontSize: "14px", color: "var(--ink-mid)", lineHeight: 1.65 }}>{domain.body}</p>
                <div className="domain-detail-grid">
                  {domain.cols.map((column) => (
                    <div key={column} className="domain-detail-col"><div className="domain-detail-col-head">Key protection</div><div style={{ fontSize: "13px", lineHeight: 1.5 }}>{column}</div></div>
                  ))}
                </div>
              </div>
            );
          })()}
          {!activeDomain && <div style={{ padding: "16px", background: "var(--paper-dark)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", fontSize: "14px", color: "var(--ink-light)", textAlign: "center" }}>Click any domain to expand the analysis</div>}
        </div>
      ),
    },
    {
      title: "The endogenous risk spectrum: where does your structure sit?",
      eyebrow: "Panel 4 of 4 — The framework",
      content: (
        <div style={{ paddingTop: "8px" }}>
          <p style={{ fontSize: "15px", color: "var(--ink-mid)", lineHeight: 1.7, marginBottom: "24px" }}>The March 2026 Release confirms the endogenous risk standard as the operative test: investment contract status attaches when an issuer offers a token with representations or promises to undertake essential managerial efforts from which purchasers would reasonably expect to derive profits. Structural constraint — or promise fulfillment/abandonment — is the path to separation. Drag the slider to see where each position maps to the Release&apos;s framework.</p>
          <div style={{ fontFamily: "var(--t-mono)", fontSize: "11px", color: "var(--ink-light)", letterSpacing: "0.04em", display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span>Fully discretionary</span><span>Partially constrained</span><span>Fully autonomous</span>
          </div>
          <div className="spectrum-track" ref={trackRef} onClick={(event) => {
            if (!trackRef.current) return;
            const rect = trackRef.current.getBoundingClientRect();
            setSpectrumPos(Math.max(2, Math.min(98, ((event.clientX - rect.left) / rect.width) * 100)));
          }}>
            <div className="spectrum-thumb" style={{ left: `${spectrumPos}%` }} onMouseDown={handleThumbMouseDown} />
            {SPECTRUM_STATES.slice(2, 5).map((state) => <div key={state.label} style={{ position: "absolute", top: "14px", left: `${state.pos}%`, transform: "translateX(-50%)", fontFamily: "var(--t-mono)", fontSize: "9px", color: "var(--navy)", letterSpacing: "0.06em", textAlign: "center", whiteSpace: "nowrap" }}>↑ {state.label}</div>)}
          </div>
          <div className="spectrum-output" style={{ borderLeft: `3px solid ${spectrumState.color}` }}>
            <div style={{ fontFamily: "var(--t-display)", fontSize: "18px", fontWeight: 600, color: spectrumState.color, marginBottom: "6px" }}>{spectrumState.tier ? `Tier ${spectrumState.tier}` : spectrumState.label}</div>
            <div style={{ fontFamily: "var(--t-mono)", fontSize: "12px", color: "var(--ink-light)", marginBottom: "10px", letterSpacing: "0.04em" }}>Release analysis: {spectrumState.howey}</div>
            <div style={{ fontSize: "14px", color: "var(--ink-mid)", lineHeight: 1.6 }}>{spectrumState.analysis}</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="page">
      <div className="container-narrow" style={{ padding: "48px 40px" }}>
        <div className="section-eyebrow">Explainer</div>
        <h1 style={{ fontFamily: "var(--t-display)", fontSize: "36px", fontWeight: 700, lineHeight: 1.2, marginBottom: "12px", letterSpacing: "-0.02em" }}>The mechanism</h1>
        <p style={{ fontSize: "16px", color: "var(--ink-mid)", lineHeight: 1.65, marginBottom: "40px" }}>How the dual equity/token structure recreates leasehold subordination — and what the March 2026 Release requires to fix it.</p>
        <div style={{ display: "flex", gap: "6px", marginBottom: "24px" }}>
          {panels.map((_, index) => <button key={index} onClick={() => setPanel(index)} style={{ fontFamily: "var(--t-mono)", fontSize: "11px", padding: "4px 10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", background: panel === index ? "var(--navy)" : "white", color: panel === index ? "white" : "var(--ink-light)", cursor: "pointer", transition: "all .15s", letterSpacing: "0.04em" }}>{index + 1}</button>)}
        </div>
        <div className="animate-fadeup" key={panel}>
          <div className="section-eyebrow">{panels[panel].eyebrow}</div>
          <h2 style={{ fontFamily: "var(--t-display)", fontSize: "24px", fontWeight: 600, lineHeight: 1.3, marginBottom: "24px" }}>{panels[panel].title}</h2>
          {panels[panel].content}
        </div>
        <div className="panel-nav">
          <button className="btn btn-secondary" onClick={() => setPanel((value) => Math.max(0, value - 1))} disabled={panel === 0} style={{ opacity: panel === 0 ? 0.4 : 1 }}>← Back</button>
          <div className="panel-dots">{panels.map((_, index) => <div key={index} className={`panel-dot ${panel === index ? "active" : ""}`} onClick={() => setPanel(index)} />)}</div>
          {panel < panels.length - 1 ? <button className="btn btn-primary" onClick={() => setPanel((value) => value + 1)}>Next →</button> : <Link className="btn btn-amber" to="/diagnostic">Run the diagnostic →</Link>}
        </div>
        <div className="footnote">
          <em>Token Continuity Framework</em>, David Kuhn (2026) — <a href="https://tcframework.com" style={{ color: "var(--navy)" }}>tcframework.com</a>. Citations: Joshua Stein, <em>A Practical Guide to Ground Leases</em> (ABA 2018); Dennis S. Corgill, <em>Securities as Investments at Risk</em>, 67 Tul. L. Rev. 861 (1992); 11 U.S.C. §365(n); SEC/CFTC Release Nos. 33-11412; 34-105020 (Mar. 17, 2026); David Kuhn, <em>From Disclosure to Design: Constraining Risk in Structurally Subordinate Tokens</em> (X, Dec. 22, 2025); Remarks of Chairman Paul S. Atkins, DC Blockchain Summit (Mar. 19, 2026); <em>Loper Bright Enterprises v. Raimondo</em>, 603 U.S. 369 (2024) (courts apply <em>Howey</em> independently of agency guidance).
        </div>
      </div>
    </div>
  );
}
