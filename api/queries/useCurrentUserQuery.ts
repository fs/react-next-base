import type { QueryHookOptions, QueryResult } from '@apollo/client';
import CurrentUser from 'graphql/queries/currentUser.graphql';

import type { Me } from '../types/user/user';
import useQuery from '../hooks/useQueryHook';

const useCurrentUserQuery = (options: QueryHookOptions<Me, undefined>): QueryResult<Me, undefined> => {
  return useQuery<Me, undefined>(CurrentUser, options);
};

export default useCurrentUserQuery;
