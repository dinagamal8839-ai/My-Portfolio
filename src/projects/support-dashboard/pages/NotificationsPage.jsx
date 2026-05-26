import {
  LineChart,
  Package,
  ShoppingCart,
  Tag,
  UserPlus,
} from "lucide-react";
import { useNotifications } from "../context/NotificationsContext.jsx";
import styles from "./NotificationsPage.module.css";

const icons = {
  order: ShoppingCart,
  customer: UserPlus,
  inventory: Package,
  revenue: LineChart,
  promotion: Tag,
};

export function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications();

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div>
          <h2 className={styles.title}>Notifications</h2>
          <p className={styles.lead}>
            Orders, customers, inventory, revenue, and promotions — mock feed from static seed data.
          </p>
        </div>
        <div className={styles.heroActions}>
          {unreadCount > 0 ? (
            <span className={styles.unreadPill} aria-live="polite">
              {unreadCount} unread
            </span>
          ) : (
            <span className={styles.caughtUp}>You&apos;re all caught up</span>
          )}
          {unreadCount > 0 ? (
            <button type="button" className={styles.markAll} onClick={markAllRead}>
              Mark all read
            </button>
          ) : null}
        </div>
      </header>

      <ul className={styles.list}>
        {notifications.map((n) => {
          const Icon = icons[n.type] ?? ShoppingCart;
          return (
            <li key={n.id}>
              <article
                className={`${styles.card} ${n.read ? styles.cardRead : styles.cardUnread}`}
              >
                <div className={styles.cardIcon} data-type={n.type}>
                  <Icon size={20} strokeWidth={1.65} aria-hidden />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <h3 className={styles.cardTitle}>{n.title}</h3>
                    <time className={styles.time}>{n.time}</time>
                  </div>
                  <p className={styles.cardText}>{n.body}</p>
                  <div className={styles.cardFoot}>
                    {!n.read ? (
                      <button type="button" className={styles.markOne} onClick={() => markAsRead(n.id)}>
                        Mark as read
                      </button>
                    ) : (
                      <span className={styles.readLabel}>Read</span>
                    )}
                  </div>
                </div>
                {!n.read ? <span className={styles.dot} aria-hidden /> : null}
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
