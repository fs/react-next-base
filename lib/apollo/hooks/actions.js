import { useMutation } from '@apollo/client';
import { Router } from 'routes';
import { HOME } from 'config/routes';
import { SIGN_IN_EVENT, SIGN_OUT_EVENT } from 'config/globalEvents.json';

import SignIn from 'graphql/mutations/signIn.graphql';
import SignUp from 'graphql/mutations/signUp.graphql';
import SignOut from 'graphql/mutations/signOut.graphql';
import updateUser from 'graphql/mutations/updateUser.graphql';
import RequestPasswordRecovery from 'graphql/mutations/requestPasswordRecovery.graphql';

import CurrentUser from 'graphql/queries/currentUser.graphql';
import useNotifier from 'hooks/useNotifier';

export const useSignIn = () => {
  const { setError } = useNotifier();

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
    try {
      await mutation({ variables: { email, password } });

      window.localStorage.setItem(SIGN_IN_EVENT, Date.now());

      Router.pushRoute(HOME.pattern);
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useSignUp = () => {
  const { setError } = useNotifier();

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

  const mutate = async ({ email, password, ...rest }) => {
    try {
      await mutation({ variables: { email, password, ...rest } });

      window.localStorage.setItem(SIGN_IN_EVENT, Date.now());

      Router.pushRoute(HOME.pattern);
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useSignOut = () => {
  const { setError } = useNotifier();

  const [mutation, mutationState] = useMutation(SignOut, {
    update: store => {
      store.writeQuery({
        query: CurrentUser,
        data: {
          me: null,
        },
      });
    },
  });

  const mutate = async ({ everywhere = false } = {}) => {
    try {
      await mutation({ variables: { everywhere } });

      window.localStorage.setItem(SIGN_OUT_EVENT, Date.now());

      Router.pushRoute(HOME.pattern);
    } catch (error) {
      setError(error);
    }
  };

  return [mutate, mutationState];
};

export const usePasswordRecovery = () => {
  const { setError } = useNotifier();

  const [mutation, mutationState] = useMutation(RequestPasswordRecovery);

  const mutate = ({ email }) => {
    try {
      return mutation({ variables: { email } });
    } catch (error) {
      setError(error);
      return null;
    }
  };

  return [mutate, mutationState];
};

export const useUpdateUser = () => {
  const [mutation, mutationState] = useMutation(updateUser, {
    update: (store, { data }) => {
      store.writeQuery({
        query: CurrentUser,
        data: {
          me: {
            ...data.updateUser,
          },
        },
      });
    },
  });

  const mutate = async ({ email, firstName, lastName, password, currentPassword }) => {
    await mutation({ variables: { email, firstName, lastName, password, currentPassword } });
  };

  return [mutate, mutationState];
};
