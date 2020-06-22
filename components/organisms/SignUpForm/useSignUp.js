import { useMutation } from '@apollo/react-hooks';
import SignUp from 'graphql/mutations/signUp.graphql';
import SignIn from 'graphql/mutations/signIn.graphql';

import CurrentUser from 'graphql/queries/CurrentUser.graphql';

const useSignUp = () => {
  const [mutation, data] = useMutation(SignIn, {
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

  const signUp = async (email, password) => {
    try {
      await mutation({ variables: { email, password } });
    } catch (error) {
      console.log(error);
    }
  };

  return { signUp, data };
};

export default useSignUp;
