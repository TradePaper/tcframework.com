import { CLUSTERS } from "../data/clusters";
import type { TierValue } from "../data/questions";

interface RadarChartProps {
  scores: TierValue[];
  size?: number;
}

export function RadarChart({ scores, size = 260 }: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.34;
  const n = CLUSTERS.length;
  const pts = (vals: number[]) =>
    vals.map((v, i) => {
      const a = (i * 2 * Math.PI) / n - Math.PI / 2;
      const rv = (v / 3) * r;
      return [cx + rv * Math.cos(a), cy + rv * Math.sin(a)];
    });

  const labelPts = Array.from({ length: n }, (_, i) => {
    const a = (i * 2 * Math.PI) / n - Math.PI / 2;
    return [cx + (r + 28) * Math.cos(a), cy + (r + 28) * Math.sin(a)];
  });

  const actual = pts(scores);
  const target = pts([2, 2, 2, 2, 2, 2]);

  return (
    <svg width={size} height={size} style={{ overflow: "visible" }}>
      {[1, 2, 3].map((level) => (
        <polygon
          key={level}
          points={Array.from({ length: n }, (_, i) => {
            const a = (i * 2 * Math.PI) / n - Math.PI / 2;
            const rv = (level / 3) * r;
            return `${cx + rv * Math.cos(a)},${cy + rv * Math.sin(a)}`;
          }).join(" ")}
          fill="none"
          stroke="#D8D5CC"
          strokeWidth="0.8"
        />
      ))}
      {Array.from({ length: n }, (_, i) => {
        const a = (i * 2 * Math.PI) / n - Math.PI / 2;
        return <line key={i} x1={cx} y1={cy} x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)} stroke="#D8D5CC" strokeWidth="0.8" />;
      })}
      <polygon points={target.map((point) => point.join(",")).join(" ")} fill="rgba(31,56,100,0.06)" stroke="rgba(31,56,100,0.2)" strokeWidth="1" strokeDasharray="4,3" />
      <polygon points={actual.map((point) => point.join(",")).join(" ")} fill="rgba(31,56,100,0.16)" stroke="#1F3864" strokeWidth="2" />
      {actual.map((point, index) => <circle key={index} cx={point[0]} cy={point[1]} r="4" fill="#1F3864" />)}
      {labelPts.map((point, index) => (
        <text key={index} x={point[0]} y={point[1]} textAnchor="middle" dominantBaseline="middle" style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: "8.5px", fill: "#4A4A46", letterSpacing: "0.03em" }}>
          {CLUSTERS[index].label.split(" & ").map((label, lineIndex) => (
            <tspan key={lineIndex} x={point[0]} dy={lineIndex === 0 ? 0 : 10}>
              {label}
            </tspan>
          ))}
        </text>
      ))}
    </svg>
  );
}
