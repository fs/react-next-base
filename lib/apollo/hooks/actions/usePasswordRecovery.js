import { useMutation } from '@apollo/client';

import RequestPasswordRecovery from 'graphql/mutations/requestPasswordRecovery.graphql';

import useNotifier from 'hooks/useNotifier';

const usePasswordRecovery = () => {
  const { setError } = useNotifier();

  const [mutation, mutationState] = useMutation(RequestPasswordRecovery);

  const mutate = async ({ email }) => {
    const requestPasswordRecoveryInput = { email };

    try {
      return await mutation({ variables: { input: requestPasswordRecoveryInput } });
    } catch (error) {
      setError(error);
      return null;
    }
  };

  const error = mutationState?.error;
  const detail = mutationState?.data?.requestPasswordRecovery?.detail;

  return [mutate, detail, error];
};

export default usePasswordRecovery;
