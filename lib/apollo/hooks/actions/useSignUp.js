import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { HOME } from 'config/routes';
import { SIGN_IN_EVENT } from 'config/globalEvents.json';

import SignUp from 'graphql/mutations/signUp.graphql';
import CurrentUser from 'graphql/queries/currentUser.graphql';

import useNotifier from 'hooks/useNotifier';

const useSignUp = () => {
  const { setError } = useNotifier();
  const router = useRouter();

  const [mutation, mutationState] = useMutation(SignUp, {
    update: (store, { data }) => {
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

  const mutate = async ({ avatar, email, password, firstName, lastName }) => {
    const signUpInput = {
      avatar,
      email,
      password,
      firstName,
      lastName,
    };

    try {
      await mutation({ variables: { input: signUpInput } });

      window.localStorage.setItem(SIGN_IN_EVENT, Date.now());

      router.push(HOME);
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export default useSignUp;
