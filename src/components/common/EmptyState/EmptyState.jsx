import styles from './EmptyState.module.css';


function EmptyState({
  icon = '🔍',
  title = 'Nothing found',
  description = 'Try adjusting your search or filters.',
  action,
}) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.iconWrap} aria-hidden="true">
        <span className={styles.icon}>{icon}</span>
        <div className={styles.iconGlow} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      {description && (
        <p className={styles.description}>{description}</p>
      )}
      {action && (
        <div className={styles.action}>{action}</div>
      )}
    </div>
  );
}

export default EmptyState;
