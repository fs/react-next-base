import type { ApolloClient, InMemoryCache } from '@apollo/client';

import HasCurrentUserFragment from 'graphql/fragments/currentUser/hasCurrentUser.graphql';

import type { Me } from '../../types/user/user';
import readCacheFragmentApi from '../../class/readCacheFragmentApi';

export const readHasCurrentUserCache = (apolloClient: ApolloClient<InMemoryCache>): Me | null => {
  return readCacheFragmentApi(apolloClient, {
    fragment: HasCurrentUserFragment,
    fragmentName: 'HasCurrentUser',
  });
};
