import styles from "./StatCard.module.css";

export function StatCard({ label, value, hint, trend, Icon }) {
  const trendClass =
    trend?.direction === "up"
      ? styles.trendUp
      : trend?.direction === "down"
        ? styles.trendDown
        : styles.trendNeutral;

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        {Icon ? (
          <span className={styles.iconWrap} aria-hidden="true">
            <Icon size={20} strokeWidth={1.65} />
          </span>
        ) : (
          <span />
        )}
        {trend ? (
          <span className={`${styles.trend} ${trendClass}`}>{trend.text}</span>
        ) : null}
      </div>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
      {hint ? <p className={styles.hint}>{hint}</p> : null}
    </article>
  );
}
