import { Bell, Search } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { stripDashboardBase } from "../../paths.js";
import { useNotifications } from "../../context/NotificationsContext.jsx";
import { ProfileDropdown } from "./ProfileDropdown.jsx";
import styles from "./Navbar.module.css";

const RANGES = ["30d", "90d", "12m"];

export function Navbar() {
  const { pathname } = useLocation();
  const { unreadCount } = useNotifications();
  const [range, setRange] = useState(RANGES[0]);

  const notifActive = stripDashboardBase(pathname) === "/notifications";

  return (
    <nav className={styles.nav} aria-label="Top actions">
      <div className={styles.searchBlock}>
        <label className={styles.search}>
          <span className={styles.srOnly}>Search store</span>
          <Search className={styles.searchIcon} size={18} strokeWidth={1.75} aria-hidden />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search orders, SKUs, customers…"
            autoComplete="off"
          />
        </label>
      </div>

      <div className={styles.actions}>
        <div className={styles.period} role="group" aria-label="Date range">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              className={`${styles.periodBtn} ${range === r ? styles.periodBtnActive : ""}`}
              onClick={() => setRange(r)}
            >
              {r}
            </button>
          ))}
        </div>

        <Link
          to="notifications"
          className={`${styles.iconLink} ${notifActive ? styles.iconLinkActive : ""}`}
          aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
        >
          <Bell size={18} strokeWidth={1.75} />
          {unreadCount > 0 ? (
            <span className={styles.badge} aria-hidden="true">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          ) : null}
        </Link>

        <ProfileDropdown />
      </div>
    </nav>
  );
}
