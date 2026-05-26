import { BRAND } from "../../config/brand.js";
import styles from "./Sidebar.module.css";

export function Sidebar({ children }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.brandName}>{BRAND.storeName}</span>
        <span className={styles.brandTag}>{BRAND.adminTagline}</span>
      </div>
      {children}
    </aside>
  );
}
