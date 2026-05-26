import { useId } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { salesByMonth } from "../../data/salesSeries.js";
import styles from "./SalesChart.module.css";

const axis = { stroke: "var(--muted)", fontSize: 11 };
const tickFormatter = (v) =>
  v >= 1000 ? `$${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k` : `$${v}`;

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const value = payload[0].value;
  return (
    <div className={styles.tooltip}>
      <strong>{label}</strong>
      <span>{typeof value === "number" ? `$${value.toLocaleString()}` : value}</span>
    </div>
  );
}

export function SalesChart() {
  const gradId = useId().replace(/:/g, "");

  return (
    <div className={styles.wrap}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={salesByMonth} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis dataKey="month" tick={axis} tickLine={false} axisLine={{ stroke: "var(--border)" }} />
          <YAxis
            tick={axis}
            tickLine={false}
            axisLine={false}
            tickFormatter={tickFormatter}
            width={44}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--border)" }} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="var(--accent)"
            strokeWidth={2}
            fill={`url(#${gradId})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
