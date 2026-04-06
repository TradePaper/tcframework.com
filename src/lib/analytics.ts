import posthog from "posthog-js";

const SITE_NAME = "tcframework" as const;

// --- Event name constants ---

export const EventNames = {
  PAPER_CTA_CLICKED: "paper_cta_clicked",
  PAPER_PDF_OPENED: "paper_pdf_opened",
  EXTERNAL_LINK_CLICKED: "external_link_clicked",
  CONTACT_CTA_CLICKED: "contact_cta_clicked",
  FRAMEWORK_SECTION_VIEWED: "framework_section_viewed",
  EXTERNAL_PROFILE_CLICKED: "external_profile_clicked",
} as const;

type EventName = (typeof EventNames)[keyof typeof EventNames];

// --- Page type resolution ---

const PAGE_TYPE_MAP: Record<string, string> = {
  "/": "home",
  "/paper": "paper",
  "/explainer": "explainer",
  "/diagnostic": "diagnostic",
  "/framework": "framework",
  "/release": "release",
};

function getPageType(path?: string): string {
  const p = path ?? window.location.pathname;
  return PAGE_TYPE_MAP[p] || "other";
}

// --- UTM helpers ---

function getUtmParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign"] as const) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  return utm;
}

// --- Global property enrichment ---

function globalProps(extra?: Record<string, unknown>): Record<string, unknown> {
  return {
    site_name: SITE_NAME,
    page_type: getPageType(),
    current_path: window.location.pathname,
    current_url: window.location.href,
    referrer: document.referrer || undefined,
    ...getUtmParams(),
    ...extra,
  };
}

// --- Init ---

let initialized = false;

export function initPostHog() {
  const key = import.meta.env.VITE_POSTHOG_KEY;
  const host = import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com";
  if (!key || initialized) return;

  posthog.init(key, {
    api_host: host,
    capture_pageview: false, // we handle pageviews manually for SPA
    capture_pageleave: true,
    persistence: "localStorage+cookie",
  });
  initialized = true;
}

// --- Pageview (call on route change) ---

export function capturePageview(path: string) {
  if (!initialized) return;
  posthog.capture("$pageview", globalProps({ $current_url: window.location.href }));
}

// --- Generic custom event ---

export function captureEvent(name: EventName, props?: Record<string, unknown>) {
  if (!initialized) return;
  posthog.capture(name, globalProps(props));
}

// --- Typed helpers ---

export function capturePaperCtaClicked(props: {
  destination_url: string;
  cta_label: string;
  cta_location: string;
}) {
  captureEvent(EventNames.PAPER_CTA_CLICKED, props);
}

export function capturePaperPdfOpened(props: {
  pdf_url: string;
  trigger_location: string;
}) {
  captureEvent(EventNames.PAPER_PDF_OPENED, props);
}

export function captureExternalLinkClicked(props: {
  destination_url: string;
  link_label: string;
  link_location: string;
}) {
  captureEvent(EventNames.EXTERNAL_LINK_CLICKED, props);
}

export function captureContactCtaClicked(props: {
  destination_url: string;
  cta_label: string;
  cta_location: string;
}) {
  captureEvent(EventNames.CONTACT_CTA_CLICKED, props);
}

export function captureFrameworkSectionViewed(props: {
  section_id: string;
  section_title: string;
}) {
  captureEvent(EventNames.FRAMEWORK_SECTION_VIEWED, props);
}

export function captureExternalProfileClicked(props: {
  destination_url: string;
  profile_type: string;
  link_location: string;
}) {
  captureEvent(EventNames.EXTERNAL_PROFILE_CLICKED, props);
}
