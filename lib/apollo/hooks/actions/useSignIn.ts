import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { HOME } from 'config/routes';
import { SIGN_IN_EVENT } from 'config/globalEvents.json';

import SignIn from 'graphql/mutations/signIn.graphql';
import CurrentUser from 'graphql/queries/currentUser.graphql';

import { useNotifier } from 'contexts/NotifierContext';

import User from 'domain/User';

type SignInProps = {
  email: string;
  password: string;
};
type SignInMutationInputVariable = SignInProps;

type SignInMutationVariables = { input: SignInMutationInputVariable };

type SignInMutationData = {
  signin: { me: User };
};

const useSignIn = () => {
  const { setError } = useNotifier();
  const router = useRouter();

  const [mutation, mutationState] = useMutation<SignInMutationData, SignInMutationVariables>(SignIn, {
    update: (store, { data }) => {
      if (!data) {
        return;
      }

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

  const mutate = async ({ email, password }: SignInProps) => {
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

  return [mutate, mutationState];
};

export default useSignIn;
