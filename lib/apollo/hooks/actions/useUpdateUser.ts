import type { UpdateUserVariables } from 'api/types/user/user';
import useUpdateUserMutation from 'api/mutations/update/useUpdateUserMutation';

import CurrentUser from 'graphql/queries/currentUser.graphql';

const useUpdateUser = () => {
  const [mutation, mutationResult] = useUpdateUserMutation({
    update: (store, { data }) => {
      if (!data) {
        return;
      }

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

  const mutate = async ({ avatar, email, firstName, lastName, password, currentPassword }: UpdateUserVariables) => {
    const updateUserInput = {
      avatar,
      email,
      firstName,
      lastName,
      password,
      currentPassword,
    };

    await mutation({ variables: { input: updateUserInput } });
  };

  return [mutate, mutationResult] as const;
};

export default useUpdateUser;
