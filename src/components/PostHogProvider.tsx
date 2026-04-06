import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { initPostHog, capturePageview } from "../lib/analytics";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const initialized = useRef(false);
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    if (!initialized.current) {
      initPostHog();
      initialized.current = true;
    }
  }, []);

  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      capturePageview(location.pathname);
      prevPath.current = location.pathname;
    }
  }, [location.pathname]);

  return <>{children}</>;
}
