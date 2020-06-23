import { useMutation } from '@apollo/react-hooks';

import SignIn from 'graphql/mutations/signIn.graphql';
import SignUp from 'graphql/mutations/SignUp.graphql';

import CurrentUser from 'graphql/queries/CurrentUser.graphql';

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
    } catch (error) {
      console.log(error);
    }
  };

  return [mutate, mutationState];
};
