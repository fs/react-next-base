import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { LOGIN } from 'config/routes';

import UpdatePassword from 'graphql/mutations/updatePassword.graphql';

import useNotifier from 'hooks/useNotifier';

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

  const mutate = async ({ password, resetToken }) => {
    const updatePasswordInput = { password, resetToken };

    try {
      return await mutation({ variables: { input: updatePasswordInput } });
    } catch (error) {
      setError(error);
      return null;
    }
  };

  return [mutate, mutationState];
};

export default useUpdatePassword;
