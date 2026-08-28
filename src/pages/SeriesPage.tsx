"use client";

import { Link } from "react-router-dom";
import { SeriesIndex } from "../components/SeriesIndex";

export default function SeriesPage() {
  return (
    <div className="page">
      <div className="container" style={{ padding: "48px 40px 64px" }}>
        <div className="section-eyebrow">Series</div>
        <h1
          style={{
            fontFamily: "var(--t-display)",
            fontSize: "36px",
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: "12px",
            letterSpacing: "-0.02em",
          }}
        >
          The Token Continuity Framework Series
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "var(--ink-mid)",
            lineHeight: 1.65,
            maxWidth: "680px",
            marginBottom: "8px",
          }}
        >
          Three installments. Parts I and II build the argument — that the dual equity/token
          structure is a ground lease without the protections that make ground leases work.
          Part III turns it into the practitioner framework this site is built around.
        </p>
        <SeriesIndex style={{ padding: "24px 0 8px" }} hideLede />

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "28px", marginTop: "8px" }}>
          <p style={{ fontSize: "15px", color: "var(--ink-mid)", lineHeight: 1.65, maxWidth: "620px", marginBottom: "16px" }}>
            The framework itself is built out on this site — an explainer, an 18-issue
            diagnostic, and a navigator for the March 2026 SEC/CFTC release.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link className="btn btn-primary" to="/explainer">
              Understand the mechanism →
            </Link>
            <Link className="btn btn-secondary" to="/diagnostic">
              Diagnose your structure
            </Link>
            <Link className="btn btn-secondary" to="/overview">
              Site overview
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
