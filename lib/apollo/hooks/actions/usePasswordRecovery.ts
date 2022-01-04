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

  const [mutation, mutationResult] = useMutation<PasswordRecoveryMutationData, PasswordRecoveryMutationVariables>(
    RequestPasswordRecovery,
    {
      onError: (error) => {
        if (setError) setError(error);
      },
    },
  );

  const mutate = async ({ email }: PasswordRecoveryProps) => {
    const requestPasswordRecoveryInput = { email };
    const result = await mutation({
      variables: { input: requestPasswordRecoveryInput },
    });
    return result;
  };

  const detailMessage = mutationResult?.data?.requestPasswordRecovery?.detail;
  const loading = mutationResult?.loading;

  return [mutate, detailMessage, loading] as const;
};

export default usePasswordRecovery;
