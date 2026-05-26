import { topProducts } from "../../data/topProducts.js";
import styles from "./TopProducts.module.css";

export function TopProducts() {
  return (
    <section className={styles.section} aria-labelledby="top-products-heading">
      <div className={styles.head}>
        <h2 id="top-products-heading" className={styles.title}>
          Top products
        </h2>
        <p className={styles.sub}>Best sellers · last 30 days · demo data</p>
      </div>
      <ul className={styles.grid}>
        {topProducts.map((p) => (
          <li key={p.id} className={styles.card}>
            <div className={styles.swatch} style={{ background: p.swatch }} aria-hidden />
            <div className={styles.body}>
              <p className={styles.name}>{p.name}</p>
              <p className={styles.sku}>{p.sku}</p>
              <div className={styles.stats}>
                <span>
                  <span className={styles.statLabel}>Units</span>
                  <span className={styles.statValue}>{p.sold.toLocaleString()}</span>
                </span>
                <span>
                  <span className={styles.statLabel}>Revenue</span>
                  <span className={styles.statValue}>${p.revenue.toLocaleString()}</span>
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
