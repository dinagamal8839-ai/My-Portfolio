import { useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { revenueBySegment } from "../../data/revenueBySegment.js";
import styles from "./RevenuePieChart.module.css";

const SLICE_COLORS = ["#10b981", "#14b8a6", "#6366f1", "#f59e0b", "#94a3b8"];

const total = revenueBySegment.reduce((s, d) => s + d.value, 0);

function formatPct(value, percentProp) {
  if (percentProp != null && Number.isFinite(percentProp)) {
    return (percentProp * 100).toFixed(1);
  }
  if (!total) return "0.0";
  return ((Number(value) / total) * 100).toFixed(1);
}

function SliceLabelView({ name, value, x, y, textAnchor, index, percent, hoveredIndex, setHovered }) {
  const active = hoveredIndex === index;
  const pct = formatPct(value, percent);
  const meta = `$${Number(value).toLocaleString()} • ${pct}%`;

  return (
    <g
      className={`${styles.labelGroup} ${active ? styles.labelGroupActive : ""}`}
      onMouseEnter={() => setHovered(index)}
    >
      <title>{`${name} — ${meta}`}</title>
      <text x={x} y={y} textAnchor={textAnchor} className={styles.labelText}>
        <tspan x={x} dy="-0.5em" className={styles.labelName}>
          {name}
        </tspan>
        <tspan x={x} dy="1.2em" className={`${styles.labelMeta} ${active ? styles.labelMetaOn : ""}`}>
          {meta}
        </tspan>
      </text>
    </g>
  );
}

export function RevenuePieChart() {
  const [hoveredIndex, setHovered] = useState(null);

  const renderSliceLabel = useMemo(() => {
    function RenderSliceLabel(props) {
      return (
        <SliceLabelView
          {...props}
          hoveredIndex={hoveredIndex}
          setHovered={setHovered}
        />
      );
    }
    RenderSliceLabel.offsetRadius = 56;
    return RenderSliceLabel;
  }, [hoveredIndex]);

  return (
    <div
      className={styles.wrap}
      onMouseLeave={() => setHovered(null)}
      aria-label="Sales overview by category"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart
          margin={{ top: 56, right: 48, bottom: 56, left: 48 }}
          className={styles.pieChart}
        >
          <Pie
            data={revenueBySegment}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="44%"
            outerRadius="56%"
            paddingAngle={2.5}
            stroke="rgba(42, 54, 72, 0.9)"
            strokeWidth={1}
            isAnimationActive
            animationBegin={0}
            animationDuration={680}
            animationEasing="ease-out"
            activeIndex={hoveredIndex ?? undefined}
            activeShape={false}
            inactiveShape={{ opacity: 0.44 }}
            label={renderSliceLabel}
            labelLine={{
              stroke: "rgba(148, 163, 184, 0.2)",
              strokeWidth: 0.65,
              className: styles.labelLine,
            }}
            onMouseEnter={(_, index) => setHovered(index)}
          >
            {revenueBySegment.map((d, i) => (
              <Cell key={d.name} fill={SLICE_COLORS[i % SLICE_COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
