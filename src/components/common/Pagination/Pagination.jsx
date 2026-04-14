import { useCallback } from 'react';
import styles from './Pagination.module.css';

const SIBLING_COUNT = 1;
const DOTS = '…';

function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function buildPages(current, total) {
  // Always show all pages if total <= 7
  if (total <= 7) return range(1, total);

  const leftSibling  = Math.max(current - SIBLING_COUNT, 1);
  const rightSibling = Math.min(current + SIBLING_COUNT, total);
  const showLeftDots  = leftSibling > 2;
  const showRightDots = rightSibling < total - 1;

  if (!showLeftDots && showRightDots) {
    return [...range(1, 4), DOTS, total];
  }
  if (showLeftDots && !showRightDots) {
    return [1, DOTS, ...range(total - 3, total)];
  }
  return [1, DOTS, ...range(leftSibling, rightSibling), DOTS, total];
}

/**
 * Accessible pagination component.
 */
function Pagination({ currentPage, totalPages, onPageChange, totalCount, pageSize }) {
  const pages = buildPages(currentPage, totalPages);

  const goTo = useCallback(
    (page) => {
      if (page < 1 || page > totalPages || page === currentPage) return;
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [currentPage, totalPages, onPageChange]
  );

  if (totalPages <= 1) return null;

  const from = (currentPage - 1) * pageSize + 1;
  const to   = Math.min(currentPage * pageSize, totalCount);

  return (
    <nav
      className={styles.wrapper}
      aria-label="Pagination navigation"
      role="navigation"
    >
      <p className={styles.info} aria-live="polite">
        Showing <strong>{from}–{to}</strong> of <strong>{totalCount}</strong> results
      </p>

      <ul className={styles.list} role="list">
        {/* Previous */}
        <li>
          <button
            className={styles.btn}
            onClick={() => goTo(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
            type="button"
          >
            ‹
          </button>
        </li>

        {/* Page Numbers */}
        {pages.map((p, i) =>
          p === DOTS ? (
            <li key={`dots-${i}`} aria-hidden="true">
              <span className={styles.dots}>{DOTS}</span>
            </li>
          ) : (
            <li key={p}>
              <button
                className={`${styles.btn} ${p === currentPage ? styles.active : ''}`}
                onClick={() => goTo(p)}
                aria-label={`Go to page ${p}`}
                aria-current={p === currentPage ? 'page' : undefined}
                type="button"
              >
                {p}
              </button>
            </li>
          )
        )}

        {/* Next */}
        <li>
          <button
            className={styles.btn}
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
            type="button"
          >
            ›
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
