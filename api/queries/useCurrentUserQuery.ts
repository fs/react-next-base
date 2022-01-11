import type { QueryHookOptions, QueryResult } from '@apollo/client';
import CurrentUser from 'graphql/queries/currentUser.graphql';

import type { Me } from 'api/types/user/user';
import useQuery from 'api/hooks/useQueryHook';

type CurrentUserQueryOptions = QueryHookOptions<Me, undefined>;

type CurrentUserQueryResult = QueryResult<Me, undefined>;

const useCurrentUserQuery = (options: CurrentUserQueryOptions): CurrentUserQueryResult => {
  return useQuery<Me, undefined>(CurrentUser, options);
};

export default useCurrentUserQuery;
