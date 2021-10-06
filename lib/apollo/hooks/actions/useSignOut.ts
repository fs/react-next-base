import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { HOME } from 'config/routes';
import { SIGN_OUT_EVENT } from 'config/globalEvents.json';

import SignOut from 'graphql/mutations/signOut.graphql';
import CurrentUser from 'graphql/queries/currentUser.graphql';

import useNotifier from 'hooks/useNotifier';

type SignOutProps = {
  everywhere?: boolean;
};

type SignOutMutationVariable = SignOutProps;

type SignOutMutationVariables = {
  input: SignOutMutationVariable;
};

const useSignOut = () => {
  const { setError } = useNotifier();
  const router = useRouter();

  const [mutation, mutationState] = useMutation<{ signout: { message: string } }, SignOutMutationVariables>(SignOut, {
    update: (store) => {
      store.writeQuery({
        query: CurrentUser,
        data: {
          me: null,
        },
      });
    },
  });

  const mutate = async ({ everywhere = false }: SignOutProps = {}) => {
    const signOutInput = { everywhere };

    try {
      await mutation({ variables: { input: signOutInput } });

      window.localStorage.setItem(SIGN_OUT_EVENT, Date.now().toString());

      router.push(HOME);
    } catch (error) {
      if (setError) setError(error);
    }
  };

  return [mutate, mutationState] as const;
};

export default useSignOut;
