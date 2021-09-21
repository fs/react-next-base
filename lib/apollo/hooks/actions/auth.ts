import { MutationResult, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { HOME } from 'config/routes';
import { SIGN_IN_EVENT, SIGN_OUT_EVENT } from 'config/globalEvents';

import SignIn from 'graphql/mutations/signIn.graphql';
import SignUp from 'graphql/mutations/signUp.graphql';
import SignOut from 'graphql/mutations/signOut.graphql';
import updateUser from 'graphql/mutations/updateUser.graphql';
import presignData from 'graphql/mutations/presignData.graphql';
import RequestPasswordRecovery from 'graphql/mutations/requestPasswordRecovery.graphql';
import CurrentUser from 'graphql/queries/currentUser.graphql';

import useNotifier from 'hooks/useNotifier';
import { Mutation } from '@apollo/client/react/components';

type SirnInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  avatar?: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

type PasswordRecoveryProps = {
  email: string;
};

type UpdateUserProps = {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  currentPassword?: string;
  avatar?: string;
};

export const useSignIn = () => {
  const { setError } = useNotifier();
  const router = useRouter();

  const [mutation, mutationState] = useMutation(SignIn, {
    update: (store, { data }) => {
      store.writeQuery({
        query: CurrentUser,
        data: {
          me: {
            ...data.signin.me,
          },
        },
      });
    },
  });

  const mutate = async ({ email, password }: SirnInProps) => {
    const signInInput = {
      email,
      password,
    };

    try {
      await mutation({ variables: { input: signInInput } });

      window.localStorage.setItem(SIGN_IN_EVENT, Date.now().toString());

      router.push(HOME);
    } catch (error) {
      if (setError) setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useSignUp = () => {
  const { setError } = useNotifier();
  const router = useRouter();

  const [mutation, mutationState] = useMutation(SignUp, {
    update: (store, { data }) => {
      store.writeQuery({
        query: CurrentUser,
        data: {
          me: {
            ...data.signup.me,
          },
        },
      });
    },
  });

  const mutate = async ({ avatar, email, password, firstName, lastName }: SignUpProps) => {
    const signUpInput = {
      avatar,
      email,
      password,
      firstName,
      lastName,
    };

    try {
      await mutation({ variables: { input: signUpInput } });

      window.localStorage.setItem(SIGN_IN_EVENT, Date.now().toString());

      router.push(HOME);
    } catch (error) {
      if (setError) setError(error);
    }
  };

  return [mutate, mutationState];
};

export const useSignOut = () => {
  const { setError } = useNotifier();
  const router = useRouter();

  const [mutation, mutationState] = useMutation(SignOut, {
    update: (store) => {
      store.writeQuery({
        query: CurrentUser,
        data: {
          me: null,
        },
      });
    },
  });

  const mutate = async ({ everywhere = false } = {}) => {
    const signOutInput = { everywhere };

    try {
      await mutation({ variables: { input: signOutInput } });

      window.localStorage.setItem(SIGN_OUT_EVENT, Date.now().toString());

      router.push(HOME);
    } catch (error) {
      if (setError) setError(error);
    }
  };

  return [mutate, mutationState];
};

export const usePasswordRecovery = () => {
  const { setError } = useNotifier();

  const [mutation, mutationState] = useMutation(RequestPasswordRecovery);

  const mutate = async ({ email }: PasswordRecoveryProps) => {
    const requestPasswordRecoveryInput = { email };

    try {
      return await mutation({ variables: { input: requestPasswordRecoveryInput } });
    } catch (error) {
      if (setError) setError(error);
    }
  };

  const error = mutationState?.error;
  const detail = mutationState?.data?.requestPasswordRecovery?.detail;

  return [mutate, detail, error];
};

type UpdateUserMutation = (props: UpdateUserProps) => Promise<any>;

export const useUpdateUser = (): [UpdateUserMutation, MutationResult] => {
  const [mutation, mutationState] = useMutation(updateUser, {
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

  const mutate = async ({ email, firstName, lastName, password, currentPassword, avatar }: UpdateUserProps) => {
    const updateUserInput = {
      email,
      firstName,
      lastName,
      password,
      currentPassword,
      avatar,
    };

    await mutation({ variables: { input: updateUserInput } });
  };

  return [mutate, mutationState];
};

interface PresignFileProps {
  type: string;
  filename: string;
}

interface PresignDataVars {
  input: PresignFileProps;
}

type PresignDataMutation = (props: PresignFileProps) => Promise<any>;

export const usePresignFile = (): [PresignDataMutation, MutationResult] => {
  const [mutation, mutationState] = useMutation<any, PresignDataVars>(presignData);

  const mutate = async ({ type, filename }: PresignFileProps) => {
    if (!type || !filename) return { fields: [], url: '' };

    const presignDataInput = { type, filename };

    const {
      data: { presignData: fileData },
    } = await mutation({ variables: { input: presignDataInput } });

    return fileData;
  };

  return [mutate, mutationState];
};
