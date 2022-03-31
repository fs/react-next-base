import type { QueryHookOptions, QueryResult } from '@apollo/client';
import ActivitiesQuery from 'graphql/queries/pages/activities.graphql';

// import type { ActivityData, ActivityVariables } from 'api/types/user/activity';
import useQuery from 'api/hooks/useQueryHook';
import { ActivitiesVariables, Activities } from 'graphql/queries/pages/__generated__/Activities';

type ActivitiesQueryOptions = QueryHookOptions<Activities, ActivitiesVariables>;

type ActivitiesQueryResult = QueryResult<Activities, ActivitiesVariables>;

const useActivitiesQuery = (options: ActivitiesQueryOptions): ActivitiesQueryResult => {
  return useQuery<Activities, ActivitiesVariables>(ActivitiesQuery, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    ...options,
  });
};

export default useActivitiesQuery;
