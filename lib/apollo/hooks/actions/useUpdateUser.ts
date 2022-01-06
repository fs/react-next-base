import type { UpdateUserVariables } from 'api/types/user/user';
import type { UpdateUserMutationResult } from 'api/mutations/update/useUpdateUserMutation';
import useUpdateUserMutation from 'api/mutations/update/useUpdateUserMutation';

const useUpdateUser = (): [(variables: UpdateUserVariables) => Promise<void>, UpdateUserMutationResult] => {
  const [mutation, mutationResult] = useUpdateUserMutation();

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

  return [mutate, mutationResult];
};

export default useUpdateUser;
