"use client";

import { Link } from "react-router-dom";

const PAPER_URL = "/token-continuity-framework-paper.pdf";
const SUPPLEMENT_URL = "/clarity-supplement.pdf";

export default function PaperPage() {
  return (
    <div className="page">
      <div className="container" style={{ padding: "48px 40px 64px" }}>
        <div className="section-eyebrow">Paper</div>
        <h1 style={{ fontFamily: "var(--t-display)", fontSize: "36px", fontWeight: 700, lineHeight: 1.2, marginBottom: "12px", letterSpacing: "-0.02em" }}>
          Token Continuity Framework
        </h1>
        <p style={{ fontSize: "16px", color: "var(--ink-mid)", lineHeight: 1.65, marginBottom: "24px" }}>
          Read the final paper inline below, or open the PDF in a new tab for browser-native viewing and download controls.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
          <a className="btn btn-primary" href={PAPER_URL} target="_blank" rel="noreferrer">
            Open PDF in new tab →
          </a>
          <a className="btn btn-secondary" href={PAPER_URL} download>
            Download PDF
          </a>
          <Link className="btn btn-secondary" to="/">
            Back to home
          </Link>
        </div>
        <div className="release-banner" style={{ marginBottom: "20px", maxWidth: "760px" }}>
          <strong>CLARITY Act Supplement (June 2026):</strong> a short addendum on how the framework maps onto the Digital Asset Market Clarity Act as advanced by the Senate Banking Committee (May 14, 2026) — pending, not enacted.{" "}
          <a
            href={SUPPLEMENT_URL}
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--teal)", fontFamily: "var(--t-mono)", fontSize: "12px", letterSpacing: "0.04em", textDecoration: "none" }}
          >
            Open supplement PDF →
          </a>
        </div>
        <div className="card" style={{ padding: "12px", overflow: "hidden" }}>
          <iframe
            title="Token Continuity Framework paper"
            src={PAPER_URL}
            style={{ width: "100%", minHeight: "calc(100vh - 220px)", border: "none", background: "white", borderRadius: "var(--radius-md)" }}
          />
        </div>
      </div>
    </div>
  );
}
