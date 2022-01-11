import type { QueryHookOptions, QueryResult } from '@apollo/client';
import ActivitiesQuery from 'graphql/queries/pages/activities.graphql';

import type { ActivityData, ActivityVariables } from 'api/types/user/activity';
import useQuery from 'api/hooks/useQueryHook';

type ActivitiesQueryOptions = QueryHookOptions<ActivityData, ActivityVariables>;

type ActivitiesQueryResult = QueryResult<ActivityData, ActivityVariables>;

const useActivitiesQuery = (options: ActivitiesQueryOptions): ActivitiesQueryResult => {
  return useQuery<ActivityData, ActivityVariables>(ActivitiesQuery, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    ...options,
  });
};

export default useActivitiesQuery;
