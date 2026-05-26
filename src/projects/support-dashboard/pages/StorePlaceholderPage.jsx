import styles from "./StorePlaceholderPage.module.css";

export function StorePlaceholderPage({ title, description }) {
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.lead}>{description}</p>
      <p className={styles.note}>
        This screen is ready to plug into the same APIs as your storefront — data tables, filters, and
        bulk actions can live here next.
      </p>
    </div>
  );
}
