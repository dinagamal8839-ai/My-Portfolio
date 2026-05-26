import { RevenuePieChart } from "../components/charts/RevenuePieChart.jsx";
import { TrafficChart } from "../components/charts/TrafficChart.jsx";
import { GoalsPanel } from "../components/dashboard/GoalsPanel.jsx";
import { RecentOrders } from "../components/dashboard/RecentOrders.jsx";
import { TopProducts } from "../components/dashboard/TopProducts.jsx";
import { StatCard } from "../components/ui/StatCard.jsx";
import { sampleStats } from "../data/sampleStats.js";
import styles from "./DashboardHome.module.css";

export function DashboardHome() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div>
          <h2 className={styles.heroTitle}>Store overview</h2>
          <p className={styles.heroLead}>
            Orders, catalog, customers, and revenue in one admin view. Figures below are static demos
            from <code className={styles.code}>src/data</code> — connect your storefront API when you
            wire the backend.
          </p>
        </div>
      </header>

      <section className={styles.stats} aria-label="Store metrics">
        {sampleStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </section>

      <TopProducts />

      <section className={styles.chartsRow} aria-label="Charts">
        <article className={styles.chartCard}>
          <div className={styles.chartHead}>
            <div>
              <h3 className={styles.chartTitle}>Sales overview</h3>
              <p className={styles.chartSub}>Revenue share by category · demo YTD · USD</p>
            </div>
          </div>
          <RevenuePieChart />
        </article>
        <article className={styles.chartCard}>
          <div className={styles.chartHead}>
            <div>
              <h3 className={styles.chartTitle}>Visits by channel</h3>
              <p className={styles.chartSub}>Attributed sessions · marketing mix</p>
            </div>
          </div>
          <TrafficChart />
        </article>
      </section>

      <section className={styles.bottomRow} aria-label="Orders and store health">
        <div className={styles.activityWrap}>
          <RecentOrders />
        </div>
        <GoalsPanel />
      </section>
    </div>
  );
}
