import type { FetchResult, ApolloClient, InMemoryCache } from '@apollo/client';

import UpdateTokenMutation from 'graphql/mutations/updateToken.graphql';

import type { UpdateTokenData } from '../../types/user/updateToken';
import mutationApi from '../../class/mutationApi';
import getResponseDataField from '../../helpers/getResponseDataField';
import { writeCurrentUserCache } from '../../cache/write/useWriteCurrentUserCache';

const MUTATION_NAME = 'updateToken';

type UpdateTokenResponseData = {
  [MUTATION_NAME]: UpdateTokenData;
};

export const getData = (responseData?: UpdateTokenResponseData | null): UpdateTokenData | null | undefined =>
  getResponseDataField(MUTATION_NAME, responseData);

export const updateTokenMutation = async (
  apolloClient: ApolloClient<InMemoryCache>,
  withCacheUpdate = false,
): Promise<FetchResult<UpdateTokenResponseData>> => {
  const fetchResult = await mutationApi<UpdateTokenResponseData, undefined>(apolloClient, {
    mutation: UpdateTokenMutation,
    fetchPolicy: 'no-cache', // to not leak tokens data in apolloState $ROOT_MUTATION
  });

  if (withCacheUpdate) {
    const data = getData(fetchResult.data);
    writeCurrentUserCache(apolloClient, { data: data ? { me: data.me } : null });
  }

  return fetchResult;
};
