import { useQuery } from '@apollo/client';
import CurrentUser from 'graphql/queries/currentUser.graphql';

export const useCurrentUser = (prefetch = true) => {
  const { loading, data, error } = useQuery(CurrentUser, {
    fetchPolicy: prefetch ? 'cache-first' : 'cache-only',
  });

  const user = data?.me;

  return { user, loading, error };
};
