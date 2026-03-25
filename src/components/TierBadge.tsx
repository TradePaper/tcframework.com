import type { CSSProperties, PropsWithChildren } from "react";

interface TierBadgeProps extends PropsWithChildren {
  tier: 0 | 1 | 2 | 3;
  className?: string;
  style?: CSSProperties;
}

export function TierBadge({ tier, className = "", style, children }: TierBadgeProps) {
  return (
    <span className={`tier-badge tier-${tier}${className ? ` ${className}` : ""}`} style={style}>
      {children}
    </span>
  );
}
