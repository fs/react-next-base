import { useMutation } from '@apollo/client';
import { Router } from 'routes';
import { HOME } from 'config/routes';

import SignIn from 'graphql/mutations/signIn.graphql';
import SignUp from 'graphql/mutations/signUp.graphql';
import SignOut from 'graphql/mutations/signOut.graphql';
import RequestPasswordRecovery from 'graphql/mutations/requestPasswordRecovery.graphql';

import CurrentUser from 'graphql/queries/currentUser.graphql';

export const useSignIn = () => {
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

      Router.pushRoute(HOME.pattern);
    } catch (error) {
      console.log(error);
    }
  };

  return [mutate, mutationState];
};

export const useSignUp = () => {
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

      Router.pushRoute(HOME.pattern);
    } catch (error) {
      console.log(error);
    }
  };

  return [mutate, mutationState];
};

export const useSignOut = () => {
  const [mutation, mutationState] = useMutation(SignOut, {
    update: (store, { data }) => {
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

      Router.pushRoute(HOME.pattern);
    } catch (error) {
      console.log(error);
    }
  };

  return [mutate, mutationState];
};

export const usePasswordRecovery = () => {
  const [mutation, mutationState] = useMutation(RequestPasswordRecovery);

  const mutate = ({ email }) => {
    try {
      return mutation({ variables: { email } });
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return [mutate, mutationState];
};
