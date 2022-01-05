import type { QueryHookOptions, QueryResult } from '@apollo/client';
import ActivitiesQuery from 'graphql/queries/pages/activities.graphql';

import type { ActivityData, ActivityVariables } from '../types/user/activity';
import useQuery from '../hooks/useQueryHook';

const useActivitiesQuery = (
  options: QueryHookOptions<ActivityData, ActivityVariables>,
): QueryResult<ActivityData, ActivityVariables> => {
  return useQuery<ActivityData, ActivityVariables>(ActivitiesQuery, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    ...options,
  });
};

export default useActivitiesQuery;
