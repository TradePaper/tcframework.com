"use client";

import { Link } from "react-router-dom";

type Part = {
  part: string;
  date: string;
  title: string;
  desc: string;
  href: string;
  external: boolean;
};

const PARTS: Part[] = [
  {
    part: "Part I",
    date: "Dec. 2025",
    title: "Tokens Are Leases: Structural Subordination in Crypto's Dual Equity–Token Architecture",
    desc: "Argues that the dominant dual equity/token structure is economically equivalent to a ground lease, predictably subordinating token holders, and proposes a policy framework borrowed from ground-lease doctrine.",
    href: "https://www.kvladvisory.com/tcf_part1_final.pdf",
    external: true,
  },
  {
    part: "Part II",
    date: "Dec. 2025",
    title: "From Disclosure to Design: Constraining Endogenous Risk in Structurally Subordinate Tokens",
    desc: "Extends the ground lease analogy to securities law's core concern and proposes a tiered token recognition framework drawing on leasehold mortgagee protection doctrine.",
    href: "https://www.kvladvisory.com/tcf_part2_final.pdf",
    external: true,
  },
  {
    part: "Part III",
    date: "Mar. 2026 (rev. Jun. 2026)",
    title: "Token Continuity Framework: Designing Structural Protections for Token Holders Under Existing U.S. Securities Law",
    desc: "Practitioner framework applying ground lease doctrine to token-holder structural protections under U.S. securities law — pathway-agnostic across the March 2026 SEC/CFTC release and the pending CLARITY Act.",
    href: "/paper",
    external: false,
  },
];

export function SeriesIndex({ style }: { style?: React.CSSProperties }) {
  return (
    <section style={{ padding: "8px 0 56px", ...style }}>
      <div className="section-eyebrow">The Series</div>
      <p
        style={{
          fontSize: "15px",
          color: "var(--ink-mid)",
          lineHeight: 1.65,
          maxWidth: "680px",
          marginBottom: "24px",
        }}
      >
        The Token Continuity Framework is developed across three installments. Parts I and II
        set out the argument; Part III is the practitioner framework hosted on this site.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {PARTS.map(({ part, date, title, desc, href, external }) => {
          const inner = (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--t-mono)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--navy)",
                  }}
                >
                  {part}
                </span>
                <span
                  style={{
                    fontFamily: "var(--t-mono)",
                    fontSize: "11px",
                    color: "var(--ink-light)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {date}
                </span>
                {!external && (
                  <span
                    style={{
                      fontFamily: "var(--t-mono)",
                      fontSize: "10px",
                      color: "var(--teal)",
                      background: "var(--teal-pale)",
                      padding: "2px 7px",
                      borderRadius: "2px",
                      letterSpacing: "0.06em",
                    }}
                  >
                    ON THIS SITE
                  </span>
                )}
              </div>
              <h3
                style={{
                  fontFamily: "var(--t-display)",
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: 1.3,
                  marginBottom: "8px",
                  color: "var(--ink)",
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--ink-mid)",
                  lineHeight: 1.6,
                  marginBottom: "12px",
                }}
              >
                {desc}
              </p>
              <span
                style={{
                  fontFamily: "var(--t-mono)",
                  fontSize: "12px",
                  color: "var(--navy)",
                  letterSpacing: "0.04em",
                }}
              >
                {external ? "Read the PDF ↗" : "Read Part III →"}
              </span>
            </>
          );

          const cardStyle: React.CSSProperties = {
            textDecoration: "none",
            display: "block",
            padding: "20px 24px",
          };

          return external ? (
            <a
              key={part}
              className="card"
              href={href}
              target="_blank"
              rel="noreferrer"
              style={cardStyle}
            >
              {inner}
            </a>
          ) : (
            <Link key={part} className="card" to={href} style={cardStyle}>
              {inner}
            </Link>
          );
        })}
      </div>

      <div
        style={{
          fontFamily: "var(--t-mono)",
          fontSize: "11px",
          color: "var(--ink-light)",
          letterSpacing: "0.04em",
          marginTop: "16px",
        }}
      >
        All three parts by David T. Kuhn · KVL Advisory
      </div>
    </section>
  );
}
