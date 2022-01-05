import { useRouter } from 'next/router';

import { HOME } from 'config/routes';
import { SIGN_OUT_EVENT } from 'config/globalEvents.json';
import { useNotifier } from 'contexts/NotifierContext';

import type { SignOutVariables } from 'api/types/user/signOutApiType';
import type { SignOutMutationResult } from 'api/mutations/useSignOutMutation';
import useSignOutMutation from 'api/mutations/useSignOutMutation';

import CurrentUser from 'graphql/queries/currentUser.graphql';

const useSignOut = (): [(variables?: SignOutVariables) => Promise<void>, SignOutMutationResult] => {
  const { setError } = useNotifier();
  const router = useRouter();

  const [mutation, mutationResult] = useSignOutMutation({
    update: (store) => {
      store.writeQuery({
        query: CurrentUser,
        data: {
          me: null,
        },
      });
    },
  });

  const mutate = async ({ everywhere = false }: SignOutVariables = {}) => {
    const signOutInput = { everywhere };

    try {
      await mutation({ variables: { input: signOutInput } });

      window.localStorage.setItem(SIGN_OUT_EVENT, Date.now().toString());

      router.push(HOME);
    } catch (error) {
      if (setError) setError(error);
    }
  };

  return [mutate, mutationResult];
};

export default useSignOut;
