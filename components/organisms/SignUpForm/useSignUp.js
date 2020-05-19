import { useMutation } from '@apollo/react-hooks';
import mutations from 'pages/login/profileMutations';

const useSignUp = ({ onSuccess }) => {
  const [mutation, mutationResult] = useMutation(mutations.REGISTRATION);

  const signUp = async (login, password) => {
    console.log(login, password);
    try {
      const result = await mutation({ variables: { login, password } });
      await onSuccess(result);
    } catch (error) {
      console.log(error);
    }
  };

  return { signUp, mutationResult };
};

export default useSignUp;
