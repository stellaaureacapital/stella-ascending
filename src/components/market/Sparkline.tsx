import { memo } from "react";

type Props = {
  points: number[];
  positive?: boolean;
  width?: number;
  height?: number;
  className?: string;
};

const Sparkline = memo(({ points, positive = true, width = 96, height = 28, className }: Props) => {
  if (!points || points.length < 2) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const stepX = width / (points.length - 1);
  const path = points
    .map((p, i) => {
      const x = i * stepX;
      const y = height - ((p - min) / range) * height;
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
  const areaPath = `${path} L${width},${height} L0,${height} Z`;
  const stroke = positive ? "hsl(160 84% 39%)" : "hsl(0 84% 60%)";
  const fill = positive ? "hsl(160 84% 39% / 0.12)" : "hsl(0 84% 60% / 0.12)";
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden="true">
      <path d={areaPath} fill={fill} />
      <path d={path} fill="none" stroke={stroke} strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
});
Sparkline.displayName = "Sparkline";

export default Sparkline;