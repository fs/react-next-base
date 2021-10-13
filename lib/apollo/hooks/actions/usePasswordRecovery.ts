import { useMutation } from '@apollo/client';

import RequestPasswordRecovery from 'graphql/mutations/requestPasswordRecovery.graphql';

import { useNotifier } from 'contexts/NotifierContext';

type PasswordRecoveryProps = {
  email: string;
};

type PasswordRecoveryMutationData = {
  requestPasswordRecovery: {
    detail: string;
  };
};

type PasswordRecoveryMutationInputVariable = PasswordRecoveryProps;

type PasswordRecoveryMutationVariables = {
  input: PasswordRecoveryMutationInputVariable;
};

const usePasswordRecovery = () => {
  const { setError } = useNotifier();

  const [mutation, mutationState] = useMutation<PasswordRecoveryMutationData, PasswordRecoveryMutationVariables>(
    RequestPasswordRecovery,
  );

  const mutate = async ({ email }: PasswordRecoveryProps) => {
    const requestPasswordRecoveryInput = { email };

    try {
      return await mutation({ variables: { input: requestPasswordRecoveryInput } });
    } catch (error) {
      if (setError) setError(error);
      return null;
    }
  };

  const error = mutationState?.error;
  const detail = mutationState?.data?.requestPasswordRecovery?.detail;

  return [mutate, detail, error];
};

export default usePasswordRecovery;
