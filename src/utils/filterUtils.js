// Pure filter + pagination helpers — fully unit-testable, no side-effects


export function filterTodos(todos, { search = '', userId = '', status = '' } = {}) {
  return todos.filter((todo) => {
    const matchesSearch = search
      ? todo.title.toLowerCase().includes(search.toLowerCase().trim())
      : true;

    const matchesUser = userId
      ? String(todo.userId) === String(userId)
      : true;

    const matchesStatus =
      status === 'completed'
        ? todo.completed === true
        : status === 'pending'
        ? todo.completed === false
        : true;

    return matchesSearch && matchesUser && matchesStatus;
  });
}

/**
 * Slice a filtered list for pagination.
 * @param {Array}  items
 * @param {number} page     - 1-indexed
 * @param {number} pageSize
 * @returns {{ items: Array, totalPages: number, totalCount: number }}
 */
export function paginateItems(items, page, pageSize) {
  const totalCount = items.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage   = Math.min(Math.max(1, page), totalPages);
  const start      = (safePage - 1) * pageSize;
  const end        = start + pageSize;
  return {
    items: items.slice(start, end),
    totalPages,
    totalCount,
    safePage,
  };
}


export function buildUserMap(users) {
  return new Map(users.map((u) => [u.id, u.name]));
}
