import type { MutationHookOptions, MutationTuple } from '@apollo/client';

import PresignDataMutation from 'graphql/mutations/presignData.graphql';

import type { PresignFileData, PresignFileVariables } from '../types/file/pressignApiType';
import useMutation from '../hooks/useMutationHook';
import getResponseDataField from '../helpers/getResponseDataField';

const MUTATION_NAME = 'presignData';

type PresignFileResponseData = {
  [MUTATION_NAME]: PresignFileData;
};

type PresignFileRequestVariables = {
  input: PresignFileVariables;
};

export const getData = (responseData?: PresignFileResponseData | null): PresignFileData | null | undefined =>
  getResponseDataField(MUTATION_NAME, responseData);

const usePresignDataMutation = (
  options?: MutationHookOptions<PresignFileResponseData, PresignFileRequestVariables>,
): MutationTuple<PresignFileResponseData, PresignFileRequestVariables> => {
  return useMutation<PresignFileResponseData, PresignFileRequestVariables>(PresignDataMutation, options);
};

export default usePresignDataMutation;
