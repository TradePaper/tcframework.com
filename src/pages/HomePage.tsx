"use client";

import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="page">
      <div className="container">
        <div style={{ padding: "80px 0 64px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontFamily: "var(--t-mono)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--navy)", marginBottom: "20px" }}>Token Continuity Framework · tcframework.com</div>
          <h1 style={{ fontFamily: "var(--t-display)", fontSize: "clamp(36px,5vw,58px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "20px" }}>
            Can token holders act
            <br />
            <em style={{ fontStyle: "italic", color: "var(--navy)" }}>before value is destroyed?</em>
          </h1>
          <p style={{ fontFamily: "var(--t-body)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", lineHeight: 1.5, maxWidth: "580px", marginBottom: "16px" }}>
            Token holders need continuity rights.
          </p>
          <p style={{ fontFamily: "var(--t-body)", fontSize: "17px", fontWeight: 300, color: "var(--ink-mid)", lineHeight: 1.65, maxWidth: "720px", marginBottom: "20px" }}>
            The Token Continuity Framework provides the design criteria to build them — drawn from a century of property and finance law that has solved this problem everywhere except crypto. The March 2026 SEC/CFTC Release provides the regulatory foundation to demand them. For advisors facing the registration decision — whether to register a token offering as a security or pursue an alternative path — the TCF makes the analysis concrete: mapping a structure against all 18 issues shows exactly what structural investment is required for each non-registration pathway, enabling an honest cost-benefit comparison against the compliance burden of registered status. As the path to token registration is liberalized, this analysis becomes more valuable, not less.
          </p>
          <div className="release-banner" style={{ maxWidth: "600px", marginBottom: "32px" }}>
            <strong>New:</strong> The March 17, 2026 joint SEC/CFTC interpretive release (Release Nos. 33-11412; 34-105020) establishes a five-category asset taxonomy, an issuer-promise-centric <em>Howey</em> framework, and a separation doctrine that directly anchors the TCF&apos;s design criteria.{" "}
            <Link to="/release" style={{ background: "none", border: "none", color: "var(--teal)", fontFamily: "var(--t-mono)", fontSize: "12px", cursor: "pointer", padding: 0, letterSpacing: "0.04em", textDecoration: "none" }}>
              Explore the Release Navigator →
            </Link>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link className="btn btn-primary btn-lg" to="/explainer">
              Understand the mechanism →
            </Link>
            <Link className="btn btn-secondary btn-lg" to="/diagnostic">
              Diagnose your structure
            </Link>
            <Link className="btn btn-teal btn-lg" to="/release">
              Release Navigator
            </Link>
          </div>
          <div style={{ fontFamily: "var(--t-mono)", fontSize: "12px", color: "var(--ink-light)", letterSpacing: "0.04em", marginTop: "20px" }}>
            By David Kuhn · Token Continuity Framework · tcframework.com · 2026
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "14px", padding: "48px 0 32px" }}>
          {[
            { icon: "○", title: "The mechanism", desc: "Why founding entities capture value while token holders bear risk — and what continuity rights would change.", href: "/explainer", cta: "Read the explainer" },
            { icon: "◎", title: "The diagnostic", desc: "18-question structural assessment mapping your token against the TCF translation table.", href: "/diagnostic", cta: "Run the diagnostic" },
            { icon: "◻", title: "The framework", desc: "The complete 18-issue translation table, theater protocol, and no-action checklist.", href: "/framework", cta: "Explore the framework" },
            { icon: "★", title: "Release Navigator", desc: "Make the March 2026 SEC/CFTC release legible — five categories, separation doctrine, issuer promise audit.", href: "/release", cta: "Open the Navigator", teal: true },
            { icon: "⊡", title: "LLM analysis", desc: "Upload the TCF paper and your token's governance documents to any major LLM for an issue-by-issue analysis in minutes. Or use this site's interactive tools directly. Both pathways produce the same structured output.", href: "/explainer", cta: "How it works" },
          ].map(({ icon, title, desc, href, cta, teal }) => (
            <Link key={title} className="card" to={href} style={{ cursor: "pointer", borderColor: teal ? "var(--teal)" : undefined, textDecoration: "none" }}>
              <div style={{ fontFamily: "var(--t-mono)", fontSize: "20px", color: teal ? "var(--teal)" : "var(--navy)", marginBottom: "12px" }}>{icon}</div>
              <h3 style={{ fontFamily: "var(--t-display)", fontSize: "17px", fontWeight: 600, marginBottom: "8px" }}>{title}</h3>
              <p style={{ fontSize: "13px", color: "var(--ink-mid)", lineHeight: 1.6, marginBottom: "16px" }}>{desc}</p>
              <span style={{ fontFamily: "var(--t-mono)", fontSize: "12px", color: teal ? "var(--teal)" : "var(--navy)", letterSpacing: "0.04em" }}>{cta} →</span>
            </Link>
          ))}
        </div>

        <div style={{ background: "var(--navy)", borderRadius: "var(--radius-lg)", padding: "40px", color: "white", marginBottom: "64px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "var(--t-mono)", fontSize: "11px", letterSpacing: "0.12em", color: "rgba(255,255,255,0.5)", marginBottom: "12px", textTransform: "uppercase" }}>The core argument</div>
              <h2 style={{ fontFamily: "var(--t-display)", fontSize: "26px", fontWeight: 600, color: "white", lineHeight: 1.25, marginBottom: "16px" }}>Structural subordination is not the problem. Unprotected subordination is.</h2>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.75)", lineHeight: 1.65 }}>Franchisees, ABS tranche holders, technology licensees, and concessionaires all operate in structurally subordinate positions where senior party control persists. In each market, law developed enforceable constraints on how that control can be exercised. Token holders receive none of these protections. The March 2026 Release now provides the regulatory framework to demand them.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Real estate finance → non-disturbance, cure rights, replacement-lease","Structured finance → payment waterfalls, servicer replacement rights","IP licensing → §365(n) survivability, anti-revocation doctrine","Franchise law → territorial protections, good-faith obligations","March 2026 Release → five-category taxonomy, separation doctrine"].map((item, index) => (
                <div key={index} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "var(--t-mono)", fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "3px", flexShrink: 0 }}>{String(index + 1).padStart(2, "0")}</span>
                  <span style={{ fontSize: "14px", color: index === 4 ? "rgba(152,225,203,0.9)" : "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="disclaimer" style={{ marginBottom: "48px" }}>
          <strong>Important notice:</strong> This website provides structural analysis of token design features for educational purposes. Nothing on this site constitutes legal advice or an opinion on whether any token is a security under applicable law. Consult qualified securities counsel before making any regulatory determinations.
        </div>
      </div>
    </div>
  );
}
