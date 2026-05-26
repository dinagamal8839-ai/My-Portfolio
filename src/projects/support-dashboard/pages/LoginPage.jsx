import { Eye, EyeOff, Store } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { BRAND } from "../config/brand.js";
import { dashboardPaths } from "../paths.js";
import { useAuth } from "../context/AuthContext.jsx";
import styles from "./LoginPage.module.css";

export function LoginPage() {
  const { user, ready, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    location.state?.from && location.state.from !== dashboardPaths.login
      ? location.state.from
      : dashboardPaths.home;

  const [email, setEmail] = useState("jordan@northwind.example");
  const [password, setPassword] = useState("demo");
  const [remember, setRemember] = useState(true);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = `Sign in · ${BRAND.storeName}`;
    return () => {
      document.title = "Merchant admin";
    };
  }, []);

  if (!ready) {
    return (
      <div className={styles.boot}>
        <span className={styles.spinner} />
      </div>
    );
  }

  if (user) {
    return <Navigate to={from} replace />;
  }

  function onSubmit(e) {
    e.preventDefault();
    setError("");
    const res = login(email, password, remember);
    if (!res.ok) {
      setError(res.error ?? "Could not sign in.");
      return;
    }
    navigate(from, { replace: true });
  }

  return (
    <div className={styles.page}>
      <Link
        to="/"
        className="portfolioReturnBtn portfolioReturnBtn--login"
        aria-label="Return to portfolio"
      >
        Return to Portfolio
      </Link>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.logo}>
            <Store size={22} strokeWidth={1.75} aria-hidden />
          </span>
          <div>
            <p className={styles.storeName}>{BRAND.storeName}</p>
            <p className={styles.tagline}>{BRAND.adminTagline}</p>
          </div>
        </div>

        <h1 className={styles.heading}>Sign in</h1>
        <p className={styles.lead}>Mock auth — use any account email below with a non-empty password.</p>

        <form className={styles.form} onSubmit={onSubmit}>
          {error ? (
            <p className={styles.error} role="alert">
              {error}
            </p>
          ) : null}

          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <input
              className={styles.input}
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Password</span>
            <div className={styles.passwordWrap}>
              <input
                className={styles.input}
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.togglePw}
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <label className={styles.remember}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>Remember me on this device</span>
          </label>

          <button type="submit" className={styles.submit}>
            Continue to dashboard
          </button>
        </form>

        <p className={styles.demo}>
          Demo accounts: <code>jordan@northwind.example</code>, <code>sam@northwind.example</code>
        </p>

        <p className={styles.footer}>
          <span className={styles.link}>Forgot password?</span>{" "}
          <span className={styles.muted}>(mock)</span>
        </p>
      </div>
    </div>
  );
}
