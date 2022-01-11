import type { MutationHookOptions, MutationTuple } from '@apollo/client';

import PresignDataMutation from 'graphql/mutations/presignData.graphql';

import type { PresignFileData, PresignFileVariables } from 'api/types/file/pressignApiType';
import useMutation from 'api/hooks/useMutationHook';
import getResponseDataField from 'api/helpers/getResponseDataField';

const MUTATION_NAME = 'presignData';

type PresignFileResponseData = {
  [MUTATION_NAME]: PresignFileData;
};

type PresignFileRequestVariables = {
  input: PresignFileVariables;
};

type PresignDataMutationTuple = MutationTuple<PresignFileResponseData, PresignFileRequestVariables>;

type PresignDataMutationOptions = MutationHookOptions<PresignFileResponseData, PresignFileRequestVariables>;

export const getData = (responseData?: PresignFileResponseData | null): PresignFileData | null | undefined =>
  getResponseDataField(MUTATION_NAME, responseData);

const usePresignDataMutation = (options?: PresignDataMutationOptions): PresignDataMutationTuple => {
  return useMutation<PresignFileResponseData, PresignFileRequestVariables>(PresignDataMutation, options);
};

export default usePresignDataMutation;
