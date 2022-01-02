import { useRouter } from 'next/router';

import { HOME } from 'config/routes';
import { SIGN_IN_EVENT } from 'config/globalEvents.json';
import { useNotifier } from 'contexts/NotifierContext';

import type { SignUpVariables } from 'api/types/user/signUpApiType';
import useSignUpMutation from 'api/mutations/useSignUpMutation';

import CurrentUser from 'graphql/queries/currentUser.graphql';

const useSignUp = () => {
  const { setError } = useNotifier();
  const router = useRouter();

  const [mutation, mutationResult] = useSignUpMutation({
    update: (store, { data }) => {
      if (!data) {
        return;
      }

      store.writeQuery({
        query: CurrentUser,
        data: {
          me: {
            ...data.signup.me,
          },
        },
      });
    },
  });

  const mutate = async ({ avatarUrl, email, password, firstName, lastName }: SignUpVariables) => {
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
