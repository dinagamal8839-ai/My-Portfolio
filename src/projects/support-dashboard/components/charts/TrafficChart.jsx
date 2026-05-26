import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { trafficBySource } from "../../data/trafficBySource.js";
import styles from "./TrafficChart.module.css";

const tick = { fill: "var(--muted)", fontSize: 11 };

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;
  return (
    <div className={styles.tooltip}>
      <strong>{row.source}</strong>
      <span>{row.sessions.toLocaleString()} visits</span>
    </div>
  );
}

export function TrafficChart() {
  return (
    <div className={styles.wrap}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={trafficBySource}
          layout="vertical"
          margin={{ top: 4, right: 12, left: 4, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal vertical={false} />
          <XAxis type="number" tick={tick} tickLine={false} axisLine={{ stroke: "var(--border)" }} />
          <YAxis
            type="category"
            dataKey="source"
            width={128}
            tick={tick}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(16, 185, 129, 0.07)" }} />
          <Bar dataKey="sessions" fill="var(--accent-muted)" radius={[0, 6, 6, 0]} maxBarSize={22} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
