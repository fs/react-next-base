import { useRouter } from 'next/router';

import { HOME } from 'config/routes';
import { SIGN_IN_EVENT } from 'config/globalEvents.json';
import { useNotifier } from 'contexts/NotifierContext';

import type { SignUpVariables } from 'api/types/user/signUpApiType';
import type { SignUpMutationResult } from 'api/mutations/useSignUpMutation';
import useSignUpMutation from 'api/mutations/useSignUpMutation';

const useSignUp = (): [(variables: SignUpVariables) => Promise<void>, SignUpMutationResult] => {
  const { setError } = useNotifier();
  const router = useRouter();

  const [mutation, mutationResult] = useSignUpMutation();

  const mutate = async ({ avatarUrl, email, password, firstName, lastName }: SignUpVariables): Promise<void> => {
    const signUpInput = {
      avatarUrl,
      email,
      password,
      firstName,
      lastName,
    };

    try {
      await mutation({ variables: { input: signUpInput } });

      window.localStorage.setItem(SIGN_IN_EVENT, Date.now().toString());

      router.push(HOME);
    } catch (error) {
      if (setError) setError(error);
    }
  };

  return [mutate, mutationResult];
};

export default useSignUp;
