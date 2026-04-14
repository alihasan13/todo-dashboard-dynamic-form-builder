import styles from './Skeleton.module.css';


function Skeleton({ width = '100%', height = '1rem', borderRadius, className = '' }) {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{ width, height, borderRadius }}
      aria-hidden="true"
      role="presentation"
    />
  );
}

/** Pre-composed todo card skeleton */
export function TodoCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={styles.cardHeader}>
        <Skeleton width="60px" height="22px" borderRadius="var(--radius-full)" />
        <Skeleton width="90px" height="14px" />
      </div>
      <Skeleton width="100%" height="16px" />
      <Skeleton width="75%" height="16px" />
      <Skeleton width="50%" height="14px" />
    </div>
  );
}

export default Skeleton;
