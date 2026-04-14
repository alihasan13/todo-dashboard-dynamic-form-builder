import ErrorBoundary from '../components/common/ErrorBoundary/ErrorBoundary';
import TodoSearch from '../components/todos/TodoSearch';
import TodoFilters from '../components/todos/TodoFilters';
import TodoList from '../components/todos/TodoList';
import { useTodos } from '../hooks/useTodos';
import { useUsers } from '../hooks/useUsers';
import styles from './TodosPage.module.css';

/**
 * Todos Page — composes all todo-specific components.
 * Data fetching and filter state are owned by the hooks.
 */
function TodosPageInner() {
  const {
    paginatedTodos,
    
    isLoading,
    isFetching,
    isError,
    error,
    filters,
    currentPage,
    totalPages,
    totalCount,
    setSearch,
    setUser,
    setStatus,
    setPage,
    resetFilters,
  } = useTodos();

  const { users, userMap,isLoading: usersLoading } = useUsers();

  const hasFilters = !!(filters.search || filters.userId || filters.status);

  if (isError) {
    throw error; // Bubble to ErrorBoundary
  }

  return (
    <div className={styles.page}>
      {/* Page title */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Todo <span className={styles.heroAccent}>Dashboard</span>
        </h1>
        <p className={styles.heroSub}>
          Browse, search, and filter tasks from JSONPlaceholder API.
        </p>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <TodoSearch value={filters.search} onChange={setSearch} />
        <TodoFilters
          users={usersLoading ? [] : users}
          filters={filters}
          onUserChange={setUser}
          onStatusChange={setStatus}
          onReset={resetFilters}
        />
      </div>

      {/* Stats bar */}
      {!isLoading && (
        <div className={styles.statsBar} aria-live="polite">
          <span className={styles.statBadge}>
            {totalCount} result{totalCount !== 1 ? 's' : ''}
          </span>
          {hasFilters && (
            <span className={styles.filterActive}>Filters active</span>
          )}
        </div>
      )}

      {/* Todo grid */}
      <TodoList
        todos={paginatedTodos}
        userMap={userMap}
        isLoading={isLoading}
        isFetching={isFetching}
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        onPageChange={setPage}
        hasFilters={hasFilters}
        onResetFilters={resetFilters}
      />
    </div>
  );
}

function TodosPage() {
  return (
    <ErrorBoundary>
      <TodosPageInner />
    </ErrorBoundary>
  );
}

export default TodosPage;
