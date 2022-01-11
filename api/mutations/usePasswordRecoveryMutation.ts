import type { MutationHookOptions, MutationTuple } from '@apollo/client';

import PasswordRecoveryMutation from 'graphql/mutations/requestPasswordRecovery.graphql';

import type { PasswordRecoveryVariables, PasswordRecoveryData } from 'api/types/user/passwordRecoveryApiType';
import useMutation from 'api/hooks/useMutationHook';
import getResponseDataField from 'api/helpers/getResponseDataField';

const MUTATION_NAME = 'requestPasswordRecovery';

type PasswordRecoveryResponseData = {
  [MUTATION_NAME]: PasswordRecoveryData;
};

type PasswordRecoveryRequestVariables = {
  input: PasswordRecoveryVariables;
};

type PasswordRecoveryMutationTuple = MutationTuple<PasswordRecoveryResponseData, PasswordRecoveryRequestVariables>;

type PasswordRecoveryMutationOptions = MutationHookOptions<
  PasswordRecoveryResponseData,
  PasswordRecoveryRequestVariables
>;

export const getData = (responseData?: PasswordRecoveryResponseData | null): PasswordRecoveryData | null | undefined =>
  getResponseDataField(MUTATION_NAME, responseData);

const usePasswordRecoveryMutation = (options: PasswordRecoveryMutationOptions): PasswordRecoveryMutationTuple => {
  return useMutation<PasswordRecoveryResponseData, PasswordRecoveryRequestVariables>(PasswordRecoveryMutation, options);
};

export default usePasswordRecoveryMutation;
