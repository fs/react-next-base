import { useQuery } from '@apollo/client';
import CurrentUser from 'graphql/queries/currentUser.graphql';

export const useCurrentUser = (prefetch = true) => {
  const { data, loading, error } = useQuery(CurrentUser, {
    fetchPolicy: prefetch ? 'cache-first' : 'cache-only',
  });

  return {
    user: data?.me,
    loading,
    error,
  };
};
