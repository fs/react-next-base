import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { HOME } from 'config/routes';
import { SIGN_IN_EVENT } from 'config/globalEvents.json';

import SignUp from 'graphql/mutations/signUp.graphql';
import CurrentUser from 'graphql/queries/currentUser.graphql';

import useNotifier from 'hooks/useNotifier';

import User from 'domain/User';

type SignUpProps = {
  avatarUrl?: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

type SignUpMutationInputVariable = SignUpProps;

type SignUpMutationVariables = { input: SignUpMutationInputVariable };

type SignUpMutationData = {
  signup: { me: User };
};

const useSignUp = () => {
  const { setError } = useNotifier();
  const router = useRouter();

  const [mutation, mutationState] = useMutation<SignUpMutationData, SignUpMutationVariables>(SignUp, {
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

  const mutate = async ({ avatarUrl, email, password, firstName, lastName }: SignUpProps) => {
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
      if (setError) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknown error');
        }
      }
    }
  };

  return [mutate, mutationState];
};

export default useSignUp;
