import { useQuery } from '@apollo/react-hooks';
import CurrentUser from 'graphql/queries/currentUser.graphql';

export const useCurrentUser = (prefetch = true) => {
  const { data } = useQuery(CurrentUser, {
    fetchPolicy: prefetch ? 'cache-first' : 'cache-only',
  });

  const user = data?.me;

  return user;
};
