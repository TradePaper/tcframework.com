"use client";

import { Link, useLocation } from "react-router-dom";
import { capturePaperCtaClicked } from "../lib/analytics";

const navLinks = [
  { href: "/explainer", label: "Explainer" },
  { href: "/diagnostic", label: "Diagnostic" },
  { href: "/framework", label: "Framework" },
];

export function Nav() {
  const { pathname } = useLocation();

  return (
    <nav className="nav">
      <Link className="nav-brand" to="/">
        TCF<span> — Token Continuity Framework</span>
      </Link>
      <div className="nav-links">
        {navLinks.map((link) => (
          <Link key={link.href} to={link.href} className={`nav-link${pathname === link.href ? " active" : ""}`}>
            {link.label}
          </Link>
        ))}
        <Link to="/release" className={`nav-link release-link${pathname === "/release" ? " active" : ""}`}>
          Release Navigator ★
        </Link>
      </div>
      <Link
        className="nav-cta"
        to="/paper"
        onClick={() => capturePaperCtaClicked({ destination_url: "/paper", cta_label: "Read the paper", cta_location: "nav" })}
      >
        <span className="nav-cta-desktop">Read the paper →</span>
        <span className="nav-cta-mobile">Paper</span>
      </Link>
    </nav>
  );
}
