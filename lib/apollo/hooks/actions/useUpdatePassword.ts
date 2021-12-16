import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { LOGIN } from 'config/routes';

import { useNotifier } from 'contexts/NotifierContext';

import UpdatePassword from 'graphql/mutations/updatePassword.graphql';

export type UpdatePasswordProps = {
  password: string;
  resetToken: string;
};

const useUpdatePassword = () => {
  const { setError, setSuccess } = useNotifier();
  const router = useRouter();

  const onCompleted = () => {
    setSuccess('Пароль успешно изменен');
    setTimeout(() => router.push(LOGIN), 1000);
  };

  const [mutation, mutationState] = useMutation(UpdatePassword, {
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

  return [mutate, mutationState] as const;
};

export default useUpdatePassword;
