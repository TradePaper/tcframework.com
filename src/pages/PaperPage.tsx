"use client";

import { Link } from "react-router-dom";

export default function PaperPage() {
  return (
    <div className="page">
      <div className="container-narrow" style={{ padding: "48px 40px" }}>
        <div className="section-eyebrow">Paper</div>
        <h1 style={{ fontFamily: "var(--t-display)", fontSize: "36px", fontWeight: 700, lineHeight: 1.2, marginBottom: "12px", letterSpacing: "-0.02em" }}>
          Paper placeholder
        </h1>
        <p style={{ fontSize: "16px", color: "var(--ink-mid)", lineHeight: 1.65, marginBottom: "24px" }}>
          This route is reserved for the article PDF or external paper delivery flow.
        </p>
        <div className="card">
          <p style={{ fontSize: "14px", color: "var(--ink-mid)", lineHeight: 1.65, marginBottom: "18px" }}>
            The Vite route is in place so internal paper links can point to <em>/paper</em> now and be upgraded to a PDF delivery flow later without changing navigation.
          </p>
          <Link className="btn btn-secondary" to="/">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
