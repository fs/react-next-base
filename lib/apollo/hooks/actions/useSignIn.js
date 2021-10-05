import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { HOME } from 'config/routes';
import { SIGN_IN_EVENT } from 'config/globalEvents.json';

import SignIn from 'graphql/mutations/signIn.graphql';
import CurrentUser from 'graphql/queries/currentUser.graphql';

import useNotifier from 'hooks/useNotifier';

const useSignIn = () => {
  const { setError } = useNotifier();
  const router = useRouter();

  const [mutation, mutationState] = useMutation(SignIn, {
    update: (store, { data }) => {
      store.writeQuery({
        query: CurrentUser,
        data: {
          me: {
            ...data.signin.me,
          },
        },
      });
    },
  });

  const mutate = async ({ email, password }) => {
    const signInInput = {
      email,
      password,
    };

    try {
      await mutation({ variables: { input: signInInput } });

      window.localStorage.setItem(SIGN_IN_EVENT, Date.now());

      router.push(HOME);
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export default useSignIn;
