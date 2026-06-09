// Analytics shim for the tcframework.com mirror.
//
// The mirror intentionally ships without PostHog (no posthog-js dependency and
// no provider wiring). Components synced from the analytics-enabled repo import
// these capture helpers, so this module provides no-op implementations with the
// same signatures to keep those imports resolvable and the build clean.
// If/when the mirror adopts analytics, replace this file with the real module.

export const EventNames = {} as const;
export type EventName = string;

export function initPostHog(): void {}
export function capturePageview(_path: string): void {}
export function captureEvent(_name: EventName, _props?: Record<string, unknown>): void {}
export function capturePaperCtaClicked(_props: Record<string, unknown>): void {}
export function capturePaperPdfOpened(_props: Record<string, unknown>): void {}
export function captureExternalLinkClicked(_props: Record<string, unknown>): void {}
export function captureContactCtaClicked(_props: Record<string, unknown>): void {}
export function captureFrameworkSectionViewed(_props: Record<string, unknown>): void {}
export function captureExternalProfileClicked(_props: Record<string, unknown>): void {}
