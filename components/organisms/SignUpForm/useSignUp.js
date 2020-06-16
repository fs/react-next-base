import { useMutation } from '@apollo/react-hooks';
import SignUp from 'graphql/mutations/signUp.graphql';
import SignIn from 'graphql/mutations/SignIn.graphql';

const useSignUp = ({ onSuccess }) => {
  const [mutation, mutationResult] = useMutation(SignIn);

  const signUp = async (email, password) => {
    try {
      const result = await mutation({ variables: { email, password } });
      await onSuccess(result);
    } catch (error) {
      console.log(error);
    }
  };

  return { signUp, mutationResult };
};

export default useSignUp;
