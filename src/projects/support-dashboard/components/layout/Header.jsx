import { useLocation, useNavigate } from "react-router-dom";
import { dashboardPaths, stripDashboardBase } from "../../paths.js";
import styles from "./Header.module.css";
import { Navbar } from "./Navbar.jsx";

const titles = {
  "/": "Overview",
  "/orders": "Orders",
  "/products": "Products",
  "/customers": "Customers",
  "/analytics": "Analytics",
  "/settings": "Settings",
  "/notifications": "Notifications",
};

export function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const title = titles[stripDashboardBase(pathname)] ?? "Store admin";

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button type="button" className={styles.titleBtn} onClick={() => navigate(dashboardPaths.home)}>
          <h1 className={styles.title}>{title}</h1>
        </button>
        <span className={styles.badge} aria-hidden="true">
          Live catalog
        </span>
      </div>
      <Navbar />
    </header>
  );
}
