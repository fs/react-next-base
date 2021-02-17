import { useMutation } from '@apollo/client';
import { Router } from 'routes';
import { HOME } from 'config/routes';
import { SIGN_IN_EVENT, SIGN_OUT_EVENT } from 'config/globalEvents.json';

import SignIn from 'graphql/mutations/signIn.graphql';
import SignUp from 'graphql/mutations/signUp.graphql';
import SignOut from 'graphql/mutations/signOut.graphql';
import updateUser from 'graphql/mutations/updateUser.graphql';
import presignData from 'graphql/mutations/presignData.graphql';
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
    const signInInput = {
      email,
      password,
    };

    try {
      await mutation({ variables: { input: signInInput } });

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
    const signUpInput = {
      email,
      password,
      ...rest,
    };

    try {
      await mutation({ variables: { input: signUpInput } });

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
    const signOutInput = { everywhere };

    try {
      await mutation({ variables: { input: signOutInput } });

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
    const requestPasswordRecoveryInput = { email };

    try {
      return mutation({ variables: { input: requestPasswordRecoveryInput } });
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

  const mutate = async ({ email, firstName, lastName, password, currentPassword, avatar }) => {
    const updateUserInput = {
      email,
      firstName,
      lastName,
      password,
      currentPassword,
      avatar,
    };

    await mutation({ variables: { input: updateUserInput } });
  };

  return [mutate, mutationState];
};

export const usePresignFile = () => {
  const [mutation, mutationState] = useMutation(presignData);

  const mutate = async ({ type, filename }) => {
    if (!type || !filename) return { fields: [], url: '' };

    const presignDataInput = { type, filename };

    const {
      data: { presignData: fileData },
    } = await mutation({ variables: { input: presignDataInput } });

    return fileData;
  };

  return [mutate, mutationState];
};
