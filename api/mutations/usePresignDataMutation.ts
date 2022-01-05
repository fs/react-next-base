import type { MutationHookOptions, MutationTuple } from '@apollo/client';

import PresignDataMutation from 'graphql/mutations/presignData.graphql';

import type { PresignFileData, PresignFileVariables } from '../types/file/pressignApiType';
import useMutation from '../hooks/useMutationHook';

type PresignFileResponseData = {
  presignData: PresignFileData;
};

type PresignFileRequestVariables = {
  input: PresignFileVariables;
};

const usePresignDataMutation = (
  options?: MutationHookOptions<PresignFileResponseData, PresignFileRequestVariables>,
): MutationTuple<PresignFileResponseData, PresignFileRequestVariables> => {
  return useMutation<PresignFileResponseData, PresignFileRequestVariables>(PresignDataMutation, options);
};

export default usePresignDataMutation;
