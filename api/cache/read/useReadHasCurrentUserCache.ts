import type { ApolloClient, InMemoryCache } from '@apollo/client';

// TODO: Maybe rename query?
import HasCurrentUserFragment from 'graphql/fragments/hasCurrentUser.graphql';

import type { Me } from 'api/types/user/user';
import { readCacheFragmentApi } from 'api/hooks/useReadCacheFragmentHook';

export const readHasCurrentUserCache = (apolloClient: ApolloClient<InMemoryCache>): Me | null => {
  return readCacheFragmentApi(apolloClient, {
    fragment: HasCurrentUserFragment,
    fragmentName: 'HasCurrentUser',
  });
};
