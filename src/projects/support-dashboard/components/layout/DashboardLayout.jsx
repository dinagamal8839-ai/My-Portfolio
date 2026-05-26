import { ArrowLeft, BarChart3, LayoutDashboard, Package, Settings2, ShoppingBag, Users } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Header } from "./Header.jsx";
import { Sidebar } from "./Sidebar.jsx";
import styles from "./DashboardLayout.module.css";

const nav = [
  { to: "", label: "Overview", end: true, Icon: LayoutDashboard },
  { to: "orders", label: "Orders", Icon: ShoppingBag },
  { to: "products", label: "Products", Icon: Package },
  { to: "customers", label: "Customers", Icon: Users },
  { to: "analytics", label: "Analytics", Icon: BarChart3 },
  { to: "settings", label: "Settings", Icon: Settings2 },
];

export function DashboardLayout() {
  return (
    <div className={styles.shell}>
      <Sidebar>
        <nav className={styles.nav} aria-label="Store admin">
          {nav.map(({ Icon, to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
              }
            >
              <Icon className={styles.navIcon} size={18} strokeWidth={1.75} />
              <span>{label}</span>
            </NavLink>
          ))}
          <Link
            to="/"
            className="portfolioReturnBtn portfolioReturnBtn--sidebar"
            aria-label="Return to portfolio"
          >
            <ArrowLeft size={18} strokeWidth={1.75} aria-hidden />
            <span>Return to Portfolio</span>
          </Link>
        </nav>
      </Sidebar>
      <div className={styles.main}>
        <Header />
        <main className={styles.content}>
          <div className={styles.contentInner}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
