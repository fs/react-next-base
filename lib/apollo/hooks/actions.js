import { useMutation } from '@apollo/client';
import { Router } from 'routes';
import { HOME } from 'config/routes';

import SignIn from 'graphql/mutations/signIn.graphql';
import SignUp from 'graphql/mutations/signUp.graphql';
import SignOut from 'graphql/mutations/signOut.graphql';
import RequestPasswordRecovery from 'graphql/mutations/requestPasswordRecovery.graphql';

import CurrentUser from 'graphql/queries/currentUser.graphql';
import useError from 'hooks/useError';

export const useSignIn = () => {
  const { setError } = useError();

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
      setError('');
      Router.pushRoute(HOME.pattern);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return [mutate, mutationState];
};

export const useSignUp = () => {
  const { setError } = useError();

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
      setError('');

      Router.pushRoute(HOME.pattern);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return [mutate, mutationState];
};

export const useSignOut = () => {
  const { setError } = useError();

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

  const mutate = async () => {
    try {
      await mutation();
      setError('');

      Router.pushRoute(HOME.pattern);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return [mutate, mutationState];
};

export const usePasswordRecovery = () => {
  const { setError } = useError();

  const [mutation, mutationState] = useMutation(RequestPasswordRecovery);

  const mutate = ({ email }) => {
    try {
      setError('');
      return mutation({ variables: { email } });
    } catch (error) {
      setError(error);
      console.log(error);
      return null;
    }
  };

  return [mutate, mutationState];
};
