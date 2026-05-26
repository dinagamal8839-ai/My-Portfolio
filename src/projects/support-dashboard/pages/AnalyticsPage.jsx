import { SalesChart } from "../components/charts/SalesChart.jsx";
import styles from "./AnalyticsPage.module.css";

export function AnalyticsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.intro}>
        <h2 className={styles.heading}>Store analytics</h2>
        <p className={styles.text}>
          Net sales trend for the last twelve months. Replace the static series in{" "}
          <code className={styles.code}>src/data/salesSeries.js</code> with data from your
          e-commerce backend.
        </p>
      </div>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Net sales</h3>
        <SalesChart />
      </div>
    </div>
  );
}
