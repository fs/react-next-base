import { useMutation } from '@apollo/react-hooks';
import mutations from 'pages/login/profileMutations';

const useSignUp = ({ onSuccess }) => {
  const [mutation, mutationResult] = useMutation(mutations.SIGNUP);

  const signUp = async (email, password) => {
    console.log(email, password);
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
