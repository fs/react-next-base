import { useRouter } from 'next/router';

import { SIGNIN } from 'config/routes';
import { useNotifier } from 'contexts/NotifierContext';

import type { UpdatePasswordVariables } from 'api/types/user/updatePasswordApiType';
import type { UpdatePasswordMutationResult } from 'api/mutations/update/useUpdatePasswordMutation';
import useUpdatePasswordMutation from 'api/mutations/update/useUpdatePasswordMutation';

const useUpdatePassword = (): [(variables: UpdatePasswordVariables) => Promise<void>, UpdatePasswordMutationResult] => {
  const { setError, setSuccess } = useNotifier();
  const router = useRouter();

  const onCompleted = () => {
    setSuccess('Пароль успешно изменен');
    setTimeout(() => router.push(SIGNIN), 1000);
  };

  const [mutation, mutationResult] = useUpdatePasswordMutation({
    onCompleted,
  });

  const mutate = async ({ password, resetToken }: UpdatePasswordVariables) => {
    const updatePasswordInput = { password, resetToken };

    try {
      await mutation({ variables: { input: updatePasswordInput } });
    } catch (error) {
      if (setError) setError(error);
    }
  };

  return [mutate, mutationResult];
};

export default useUpdatePassword;
