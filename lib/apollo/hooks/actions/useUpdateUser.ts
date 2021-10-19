import { useMutation } from '@apollo/client';

import UpdateUser from 'graphql/mutations/updateUser.graphql';
import CurrentUser from 'graphql/queries/currentUser.graphql';

import User from 'domain/User';

type UpdateUserProps = {
  avatarUrl: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  currentPassword: string;
};

type UpdateUserMutationData = {
  updateUser: User;
};

type UpdateUserMutationInputVariable = UpdateUserProps;

type UpdateUserMutationVariables = { input: UpdateUserMutationInputVariable };

const useUpdateUser = () => {
  const [mutation, mutationState] = useMutation<UpdateUserMutationData, UpdateUserMutationVariables>(UpdateUser, {
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

  const mutate = async ({ avatarUrl, email, firstName, lastName, password, currentPassword }: UpdateUserProps) => {
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
