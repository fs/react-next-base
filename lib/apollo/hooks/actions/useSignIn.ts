import { useRouter } from 'next/router';

import { HOME } from 'config/routes';
import { SIGN_IN_EVENT } from 'config/globalEvents.json';
import { useNotifier } from 'contexts/NotifierContext';

import type { SignInVariables } from 'api/types/user/signInApiType';
import type { SignInMutationResult } from 'api/mutations/useSignInMutation';
import useSignInMutation from 'api/mutations/useSignInMutation';

const useSignIn = (): [(variables: SignInVariables) => Promise<void>, SignInMutationResult] => {
  const { setError } = useNotifier();
  const router = useRouter();

  const [mutation, mutationResult] = useSignInMutation();

  const mutate = async ({ email, password }: SignInVariables) => {
    const signInInput = {
      email,
      password,
    };

    try {
      await mutation({ variables: { input: signInInput } });

      window.localStorage.setItem(SIGN_IN_EVENT, Date.now().toString());

      router.push(HOME);
    } catch (error) {
      if (setError) setError(error);
    }
  };

  return [mutate, mutationResult];
};

export default useSignIn;
