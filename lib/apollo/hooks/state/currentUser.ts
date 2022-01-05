import useCurrentUserQuery from 'api/queries/useCurrentUserQuery';

export const useCurrentUser = (prefetch = true) => {
  const { data, loading, error } = useCurrentUserQuery({
    fetchPolicy: prefetch ? 'cache-first' : 'cache-only',
  });

  return {
    user: data?.me,
    loading,
    error,
  };
};
