import type { MutationHookOptions, MutationTuple } from '@apollo/client';

import RequestPasswordRecoveryMutation from 'graphql/mutations/requestPasswordRecovery.graphql';

import type { PasswordRecoveryVariables, PasswordRecoveryData } from '../types/user/passwordRecoveryApiType';
import useMutation from '../hooks/useMutationHook';

type PasswordRecoveryResponseData = {
  requestPasswordRecovery: PasswordRecoveryData;
};

type PasswordRecoveryRequestVariables = {
  input: PasswordRecoveryVariables;
};

const useRequestPasswordRecoveryMutation = (
  options: MutationHookOptions<PasswordRecoveryResponseData, PasswordRecoveryRequestVariables>,
): MutationTuple<PasswordRecoveryResponseData, PasswordRecoveryRequestVariables> => {
  return useMutation<PasswordRecoveryResponseData, PasswordRecoveryRequestVariables>(
    RequestPasswordRecoveryMutation,
    options,
  );
};

export default useRequestPasswordRecoveryMutation;
