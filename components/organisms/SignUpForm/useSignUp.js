import { useMutation } from '@apollo/react-hooks';
import SignUp from 'graphql/mutations/signUp.graphql';

const useSignUp = ({ onSuccess }) => {
  const [mutation, mutationResult] = useMutation(SignUp);

  const signUp = async ({ fistName, lastName, email, password }) => {
    try {
      const result = await mutation({ variables: { fistName, lastName, email, password } });
      await onSuccess(result);
    } catch (error) {
      console.log(error);
    }
  };

  return { signUp, mutationResult };
};

export default useSignUp;
