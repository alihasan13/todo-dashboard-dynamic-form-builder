import styles from './TodoSearch.module.css';


function TodoSearch({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor="todo-search" className={styles.label}>
        Search Todos
      </label>
      <div className={styles.inputWrap}>
        <span className={styles.searchIcon} aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </span>
        <input
          id="todo-search"
          type="search"
          className={styles.input}
          placeholder="Search by title…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Search todos by title"
          autoComplete="off"
          spellCheck="false"
        />
        {value && (
          <button
            className={styles.clearBtn}
            onClick={() => onChange('')}
            aria-label="Clear search"
            type="button"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoSearch;
