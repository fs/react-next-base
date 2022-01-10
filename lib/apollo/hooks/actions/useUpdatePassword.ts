import { useRouter } from 'next/router';

import { SIGNIN } from 'config/routes';
import { useNotifier } from 'contexts/NotifierContext';

import useUpdatePasswordMutation from 'api/mutations/update/useUpdatePasswordMutation';

export type UpdatePasswordProps = {
  password: string;
  resetToken: string | string[] | undefined;
};

const useUpdatePassword = () => {
  const { setError, setSuccess } = useNotifier();
  const router = useRouter();

  const onCompleted = () => {
    setSuccess('Пароль успешно изменен');
    setTimeout(() => router.push(SIGNIN), 1000);
  };

  const [mutation, mutationResult] = useUpdatePasswordMutation({
    onCompleted,
  });

  const mutate = async ({ password, resetToken }: UpdatePasswordProps) => {
    const updatePasswordInput = { password, resetToken };

    try {
      await mutation({ variables: { input: updatePasswordInput } });
    } catch (error) {
      if (setError) setError(error);
    }
  };

  return [mutate, mutationResult] as const;
};

export default useUpdatePassword;
