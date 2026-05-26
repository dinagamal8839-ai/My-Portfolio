import { Check, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./SwitchAccountModal.module.css";

export function SwitchAccountModal({ open, onClose }) {
  const { user, accounts, switchUser } = useAuth();

  if (!open) return null;

  function select(id) {
    switchUser(id);
    onClose();
  }

  return (
    <div className={styles.overlay} role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="switch-account-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.head}>
          <h2 id="switch-account-title" className={styles.title}>
            Switch account
          </h2>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>
        <p className={styles.lead}>Choose a merchant profile. Mock data only.</p>
        <ul className={styles.list}>
          {accounts.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                className={`${styles.row} ${user?.id === a.id ? styles.rowActive : ""}`}
                onClick={() => select(a.id)}
              >
                <span className={styles.avatar}>{a.initials}</span>
                <span className={styles.meta}>
                  <span className={styles.name}>{a.name}</span>
                  <span className={styles.email}>{a.email}</span>
                  <span className={styles.role}>{a.role}</span>
                </span>
                {user?.id === a.id ? (
                  <Check className={styles.check} size={18} strokeWidth={1.75} aria-hidden />
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
