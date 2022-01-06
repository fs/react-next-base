import type { MutationHookOptions, MutationTuple } from '@apollo/client';

import PasswordRecoveryMutation from 'graphql/mutations/requestPasswordRecovery.graphql';

import type { PasswordRecoveryVariables, PasswordRecoveryData } from '../types/user/passwordRecoveryApiType';
import useMutation from '../hooks/useMutationHook';

const MUTATION_NAME = 'requestPasswordRecovery';

type PasswordRecoveryResponseData = {
  [MUTATION_NAME]: PasswordRecoveryData;
};

type PasswordRecoveryRequestVariables = {
  input: PasswordRecoveryVariables;
};

const usePasswordRecoveryMutation = (
  options: MutationHookOptions<PasswordRecoveryResponseData, PasswordRecoveryRequestVariables>,
): MutationTuple<PasswordRecoveryResponseData, PasswordRecoveryRequestVariables> => {
  return useMutation<PasswordRecoveryResponseData, PasswordRecoveryRequestVariables>(PasswordRecoveryMutation, options);
};

export default usePasswordRecoveryMutation;
