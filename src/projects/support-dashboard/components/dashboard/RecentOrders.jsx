import { recentOrders } from "../../data/recentOrders.js";
import styles from "./RecentOrders.module.css";

const statusClass = {
  ok: styles.statusOk,
  warn: styles.statusWarn,
  neutral: styles.statusNeutral,
};

const statusLabel = {
  ok: "Paid",
  warn: "Review",
  neutral: "Pending",
};

export function RecentOrders() {
  return (
    <section className={styles.panel} aria-labelledby="orders-heading">
      <div className={styles.head}>
        <h2 id="orders-heading" className={styles.title}>
          Recent orders
        </h2>
        <p className={styles.meta}>Demo rows from <code className={styles.code}>recentOrders.js</code></p>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Order</th>
              <th scope="col">Customer</th>
              <th scope="col">Items</th>
              <th scope="col">Total</th>
              <th scope="col">When</th>
              <th scope="col">Payment</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((row) => (
              <tr key={row.id}>
                <td className={styles.orderId}>{row.orderId}</td>
                <td>{row.customer}</td>
                <td className={styles.summary}>{row.summary}</td>
                <td className={styles.total}>{row.total}</td>
                <td className={styles.muted}>{row.time}</td>
                <td>
                  <span className={`${styles.badge} ${statusClass[row.status]}`}>
                    {statusLabel[row.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
