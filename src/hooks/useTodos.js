import { useQuery } from '@tanstack/react-query';
import { useReducer, useEffect, useMemo, useCallback } from 'react';
import { fetchTodos } from '../services/api';
import {
  QUERY_KEYS,
  STALE_TIME,
  CACHE_TIME,
  PAGE_SIZE,
  STORAGE_KEYS,
} from '../utils/constants';
import { filterTodos, paginateItems } from '../utils/filterUtils';
import { getStorageItem, setStorageItem } from '../utils/storageUtils';
import { useDebounce } from './useDebounce';

// ── Filter State Shape 
const DEFAULT_FILTERS = {
  search: '',
  userId: '',
  status: '',
  page: 1,
};

// ── Reducer 
function filterReducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: action.payload, page: 1 };
    case 'SET_USER':
      return { ...state, userId: action.payload, page: 1 };
    case 'SET_STATUS':
      return { ...state, status: action.payload, page: 1 };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'RESET':
      return DEFAULT_FILTERS;
    default:
      return state;
  }
}


export function useTodos() {
  // Hydrate filters from localStorage on first mount
  const [filters, dispatch] = useReducer(
    filterReducer,
    DEFAULT_FILTERS,
    () => getStorageItem(STORAGE_KEYS.TODO_FILTERS, DEFAULT_FILTERS)
  );

  // Persist filters to localStorage whenever they change
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.TODO_FILTERS, filters);
  }, [filters]);

  // Debounce the search string to avoid filtering on every keystroke
  const debouncedSearch = useDebounce(filters.search, 300);

  // Fetch all todos (cached by TanStack Query)
  const {
    data: todos = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: QUERY_KEYS.TODOS,
    queryFn: fetchTodos,
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    // Keep previous data while re-fetching to avoid layout shift
    placeholderData: (previousData) => previousData,
  });

  // Apply filters (memoized — only recalculates when deps change)
  const filteredTodos = useMemo(
    () =>
      filterTodos(todos, {
        search: debouncedSearch,
        userId: filters.userId,
        status: filters.status,
      }),
    [todos, debouncedSearch, filters.userId, filters.status]
  );

  // Paginate the filtered result
  const { items: paginatedTodos, totalPages, totalCount, safePage } = useMemo(
    () => paginateItems(filteredTodos, filters.page, PAGE_SIZE),
    [filteredTodos, filters.page]
  );

  // Stable dispatch helpers
  const setSearch  = useCallback((v) => dispatch({ type: 'SET_SEARCH', payload: v }), []);
  const setUser    = useCallback((v) => dispatch({ type: 'SET_USER',   payload: v }), []);
  const setStatus  = useCallback((v) => dispatch({ type: 'SET_STATUS', payload: v }), []);
  const setPage    = useCallback((v) => dispatch({ type: 'SET_PAGE',   payload: v }), []);
  const resetFilters = useCallback(() => dispatch({ type: 'RESET' }), []);

  return {
    // Data
    todos,
    filteredTodos,
    paginatedTodos,
    // Pagination
    currentPage: safePage,
    totalPages,
    totalCount,
    // Filter state
    filters,
    // Actions
    setSearch,
    setUser,
    setStatus,
    setPage,
    resetFilters,
    // Async state
    isLoading,
    isFetching,
    isError,
    error,
  };
}
