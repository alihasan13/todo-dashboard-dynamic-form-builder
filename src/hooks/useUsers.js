import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../services/api';
import { QUERY_KEYS, STALE_TIME, CACHE_TIME } from '../utils/constants';
import { buildUserMap } from '../utils/filterUtils';
import { useMemo } from 'react';


export function useUsers() {
  const { data: users = [], isLoading, isError, error } = useQuery({
    queryKey: QUERY_KEYS.USERS,
    queryFn: fetchUsers,
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  });

  const userMap = useMemo(() => buildUserMap(users), [users]);

  return { users, userMap, isLoading, isError, error };
}
