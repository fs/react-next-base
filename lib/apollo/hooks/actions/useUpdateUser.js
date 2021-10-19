import { useMutation } from '@apollo/client';

import UpdateUser from 'graphql/mutations/updateUser.graphql';
import CurrentUser from 'graphql/queries/currentUser.graphql';

const useUpdateUser = () => {
  const [mutation, mutationState] = useMutation(UpdateUser, {
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

  const mutate = async ({ avatarUrl, email, firstName, lastName, password, currentPassword }) => {
    const updateUserInput = {
      avatarUrl,
      email,
      firstName,
      lastName,
      password,
      currentPassword,
    };

    await mutation({ variables: { input: updateUserInput } });
  };

  return [mutate, mutationState];
};

export default useUpdateUser;
