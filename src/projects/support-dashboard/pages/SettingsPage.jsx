import { useState } from "react";
import styles from "./SettingsPage.module.css";

const initial = {
  lowStockEmail: true,
  abandonedCartPush: false,
  weeklySalesDigest: true,
};

export function SettingsPage() {
  const [prefs, setPrefs] = useState(initial);

  function toggle(key) {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.heading}>Store settings</h2>
      <p className={styles.lead}>
        Preferences below are local demo state. Mirror the same fields your e-commerce site exposes to
        merchants, then persist through your shared API.
      </p>

      <section className={styles.section} aria-labelledby="notif-heading">
        <h3 id="notif-heading" className={styles.sectionTitle}>
          Notifications
        </h3>
        <ul className={styles.list}>
          <li className={styles.row}>
            <div>
              <p className={styles.rowTitle}>Low-stock alerts</p>
              <p className={styles.rowHint}>Email when SKU quantity crosses your threshold</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={prefs.lowStockEmail}
              className={`${styles.switch} ${prefs.lowStockEmail ? styles.switchOn : ""}`}
              onClick={() => toggle("lowStockEmail")}
            >
              <span className={styles.knob} />
            </button>
          </li>
          <li className={styles.row}>
            <div>
              <p className={styles.rowTitle}>Abandoned cart reminders</p>
              <p className={styles.rowHint}>Push nudges for recoverable checkouts</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={prefs.abandonedCartPush}
              className={`${styles.switch} ${prefs.abandonedCartPush ? styles.switchOn : ""}`}
              onClick={() => toggle("abandonedCartPush")}
            >
              <span className={styles.knob} />
            </button>
          </li>
          <li className={styles.row}>
            <div>
              <p className={styles.rowTitle}>Weekly sales digest</p>
              <p className={styles.rowHint}>Roll-up of orders, refunds, and top SKUs</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={prefs.weeklySalesDigest}
              className={`${styles.switch} ${prefs.weeklySalesDigest ? styles.switchOn : ""}`}
              onClick={() => toggle("weeklySalesDigest")}
            >
              <span className={styles.knob} />
            </button>
          </li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="account-heading">
        <h3 id="account-heading" className={styles.sectionTitle}>
          Merchant profile
        </h3>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="display-name">
            Display name
          </label>
          <input
            id="display-name"
            className={styles.input}
            type="text"
            defaultValue="Northwind merchant"
            autoComplete="organization"
          />
        </div>
        <p className={styles.note}>Save actions can call the same auth service as your storefront admin.</p>
      </section>
    </div>
  );
}
