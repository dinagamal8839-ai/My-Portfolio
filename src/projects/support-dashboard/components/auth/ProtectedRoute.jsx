import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./ProtectedRoute.module.css";

export function ProtectedRoute() {
  const { user, ready } = useAuth();
  const location = useLocation();

  if (!ready) {
    return (
      <div className={styles.boot} aria-busy="true">
        <span className={styles.spinner} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
