import { PAGE_SIZE } from '../../utils/constants';
import { TodoCardSkeleton } from '../common/Skeleton/Skeleton';
import EmptyState from '../common/EmptyState/EmptyState';
import Pagination from '../common/Pagination/Pagination';
import TodoCard from './TodoCard';
import styles from './TodoList.module.css';

const SKELETON_COUNT = PAGE_SIZE;


function TodoList({
  todos,
  userMap,
  isLoading,
  isFetching,
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  hasFilters,
  onResetFilters,
}) {
  if (isLoading) {
    return (
      <section aria-label="Loading todos" aria-busy="true">
        <div className={styles.grid}>
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <TodoCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (todos.length === 0) {
    return (
      <EmptyState
        icon={hasFilters ? '🔍' : '📋'}
        title={hasFilters ? 'No todos match your filters' : 'No todos found'}
        description={
          hasFilters
            ? 'Try adjusting your search term or changing the filters.'
            : 'There are no todos to display right now.'
        }
        action={
          hasFilters && (
            <button className={styles.resetBtn} onClick={onResetFilters} type="button">
              Clear all filters
            </button>
          )
        }
      />
    );
  }

  return (
    <section aria-label={`Todo list — ${totalCount} results`}>
      {isFetching && !isLoading && (
        <div className={styles.fetchingBar} aria-label="Updating…" role="status" />
      )}

      <div className={styles.grid}>
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            userName={userMap.get(todo.userId)}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={PAGE_SIZE}
        onPageChange={onPageChange}
      />
    </section>
  );
}

export default TodoList;
