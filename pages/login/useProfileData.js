import { useApolloClient } from '@apollo/react-hooks';
import mutations from './profileMutations';

const useProfileData = () => {
  const apolloClient = useApolloClient();

  const variables = {
    email: 'bilbo.baggins@shire.com',
    password: 'TheRing',
  };

  // const { data, loading, error } = await apolloClient.mutate({
  //   mutation: mutations.REGISTRATION,
  //   variables,
  //   fetchPolicy: 'no-cache',
  // });

  // return {
  //   loading,
  //   error,
  //   data,
  // };
};

export default useProfileData;
