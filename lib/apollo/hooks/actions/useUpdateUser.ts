import { useMutation } from '@apollo/client';

import UpdateUser from 'graphql/mutations/updateUser.graphql';
import CurrentUser from 'graphql/queries/currentUser.graphql';

import type { Uploaded } from 'hooks/useFileUpload';
import User from 'domain/User';

type UpdateUserProps = {
  avatar?: Uploaded;
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

  const mutate = async ({ avatar, email, firstName, lastName, password, currentPassword }: UpdateUserProps) => {
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

  return [mutate, mutationState] as const;
};

export default useUpdateUser;
