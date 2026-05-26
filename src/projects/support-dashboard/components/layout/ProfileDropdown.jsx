import { ChevronRight, KeyRound, LogOut, Settings, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { SwitchAccountModal } from "../auth/SwitchAccountModal.jsx";
import styles from "./ProfileDropdown.module.css";

export function ProfileDropdown() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [switchOpen, setSwitchOpen] = useState(false);
  const wrapRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    function onDocMouseDown(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [open]);

  function handleLogout() {
    setOpen(false);
    logout();
    navigate("login", { replace: true });
  }

  if (!user) return null;

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className={styles.triggerAvatar} aria-hidden>
          {user.initials}
        </span>
        <span className={styles.triggerMeta}>
          <span className={styles.triggerName}>{user.name}</span>
          <span className={styles.triggerEmail}>{user.email}</span>
        </span>
        <ChevronRight className={styles.chevron} size={16} strokeWidth={1.75} aria-hidden />
      </button>

      <div className={`${styles.panel} ${open ? styles.panelOpen : ""}`} role="menu">
        <div className={styles.panelHeader}>
          <div className={styles.bigAvatar} aria-hidden>
            {user.initials}
          </div>
          <div>
            <p className={styles.panelName}>{user.name}</p>
            <p className={styles.panelEmail}>{user.email}</p>
            <p className={styles.panelRole}>{user.role}</p>
          </div>
        </div>

        <div className={styles.divider} />

        <Link to="settings" className={styles.menuItem} role="menuitem" onClick={() => setOpen(false)}>
          <Settings size={17} strokeWidth={1.65} className={styles.menuIcon} />
          <span className={styles.menuText}>Account &amp; store settings</span>
        </Link>
        <button type="button" className={styles.menuItem} role="menuitem" onClick={() => setOpen(false)}>
          <KeyRound size={17} strokeWidth={1.65} className={styles.menuIcon} />
          <span className={styles.menuStack}>
            <span className={styles.menuText}>Login &amp; security</span>
            <span className={styles.menuHint}>Credentials · 2FA (mock)</span>
          </span>
        </button>
        <button
          type="button"
          className={styles.menuItem}
          role="menuitem"
          onClick={() => {
            setOpen(false);
            setSwitchOpen(true);
          }}
        >
          <Users size={17} strokeWidth={1.65} className={styles.menuIcon} />
          <span className={styles.menuText}>Switch account</span>
          <ChevronRight className={`${styles.menuChevron} ${styles.pushEnd}`} size={16} strokeWidth={1.75} />
        </button>

        <div className={styles.divider} />

        <button type="button" className={styles.logout} role="menuitem" onClick={handleLogout}>
          <LogOut size={17} strokeWidth={1.65} />
          <span>Log out</span>
        </button>
      </div>

      <SwitchAccountModal open={switchOpen} onClose={() => setSwitchOpen(false)} />
    </div>
  );
}
