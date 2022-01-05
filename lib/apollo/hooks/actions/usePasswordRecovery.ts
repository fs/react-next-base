import type { PasswordRecoveryVariables } from 'api/types/user/passwordRecoveryApiType';
import usePasswordRecoveryMutation from 'api/mutations/usePasswordRecoveryMutation';

import { useNotifier } from 'contexts/NotifierContext';

const usePasswordRecovery = () => {
  const { setError } = useNotifier();

  const [mutation, mutationResult] = usePasswordRecoveryMutation({
    onError: (error) => {
      if (setError) setError(error);
    },
  });

  const mutate = async ({ email }: PasswordRecoveryVariables) => {
    const requestPasswordRecoveryInput = { email };
    const result = await mutation({
      variables: { input: requestPasswordRecoveryInput },
    });
    return result;
  };

  const error = mutationResult?.error;
  const detail = mutationResult?.data?.requestPasswordRecovery?.detail;

  return [mutate, detail, error];
};

export default usePasswordRecovery;
