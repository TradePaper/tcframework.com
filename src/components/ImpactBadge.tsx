interface ImpactBadgeProps {
  impact: "high" | "med" | "low";
}

export function ImpactBadge({ impact }: ImpactBadgeProps) {
  if (impact === "high") return <span className="impact-high">HIGH</span>;
  if (impact === "med") return <span className="impact-med">MED</span>;
  return <span className="impact-low">STRUCT</span>;
}
