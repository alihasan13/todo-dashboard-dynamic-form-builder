import { STATUS_OPTIONS } from '../../utils/constants';
import styles from './TodoFilters.module.css';


function TodoFilters({ users, filters, onUserChange, onStatusChange, onReset }) {
  const hasActiveFilters = filters.userId || filters.status;

  return (
    <div className={styles.wrapper} role="group" aria-label="Filter controls">
      {/* User filter */}
      <div className={styles.filterGroup}>
        <label htmlFor="filter-user" className={styles.label}>
          Filter by User
        </label>
        <div className={styles.selectWrap}>
          <select
            id="filter-user"
            className={styles.select}
            value={filters.userId}
            onChange={(e) => onUserChange(e.target.value)}
            aria-label="Filter todos by user"
          >
            <option value="">All Users</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <span className={styles.chevron} aria-hidden="true">▾</span>
        </div>
      </div>

      {/* Status filter */}
      <div className={styles.filterGroup}>
        <label htmlFor="filter-status" className={styles.label}>
          Filter by Status
        </label>
        <div className={styles.selectWrap}>
          <select
            id="filter-status"
            className={styles.select}
            value={filters.status}
            onChange={(e) => onStatusChange(e.target.value)}
            aria-label="Filter todos by status"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className={styles.chevron} aria-hidden="true">▾</span>
        </div>
      </div>

      {/* Reset */}
      {hasActiveFilters && (
        <div className={styles.filterGroup}>
          <span className={styles.label} aria-hidden="true">&nbsp;</span>
          <button
            className={styles.resetBtn}
            onClick={onReset}
            type="button"
            aria-label="Reset all filters"
          >
            ✕ Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default TodoFilters;
