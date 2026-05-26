import { overviewGoals } from "../../data/overviewGoals.js";
import styles from "./GoalsPanel.module.css";

export function GoalsPanel() {
  return (
    <section className={styles.panel} aria-labelledby="store-health-heading">
      <div className={styles.head}>
        <h2 id="store-health-heading" className={styles.title}>
          Store health
        </h2>
        <p className={styles.sub}>
          Demo KPIs from <code className={styles.code}>overviewGoals.js</code>
        </p>
      </div>
      <ul className={styles.list}>
        {overviewGoals.map((g) => (
          <li key={g.id} className={styles.row}>
            <div className={styles.rowTop}>
              <span className={styles.label}>{g.label}</span>
              <span className={styles.pct}>{g.percent}%</span>
            </div>
            <div className={styles.track} role="presentation">
              <div
                className={styles.fill}
                style={{ width: `${Math.min(100, g.percent)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
