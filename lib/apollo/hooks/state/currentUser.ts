import { useQuery } from '@apollo/client';
import CurrentUser from 'graphql/queries/currentUser.graphql';
import User from 'domain/User';

type UserData = {
  me: User;
};

export const useCurrentUser = (prefetch = true) => {
  const { data, loading, error } = useQuery<UserData>(CurrentUser, {
    fetchPolicy: prefetch ? 'cache-first' : 'cache-only',
  });

  return {
    user: data?.me,
    loading,
    error,
  };
};
