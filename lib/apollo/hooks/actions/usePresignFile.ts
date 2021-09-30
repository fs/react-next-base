import { MutationResult, useMutation } from '@apollo/client';
import presignData from 'graphql/mutations/presignData.graphql';

interface PresignFileProps {
  type: string;
  filename: string;
}

interface PresignDataProps {
  input: PresignFileProps;
}

type PresignMutationResponseField = {
  key: string;
  value: string;
};

type PresignMutationResponse = {
  presignData: {
    url: string;
    fields: PresignMutationResponseField[];
  };
};

type PresignDataMutation = (props: PresignFileProps) => Promise<PresignMutationResponse['presignData'] | null>;

export const usePresignFile = (): [PresignDataMutation, MutationResult] => {
  const [mutation, mutationState] = useMutation<PresignMutationResponse, PresignDataProps>(presignData);

  const mutate = async ({ type, filename }: PresignFileProps) => {
    if (!type || !filename) return { fields: [], url: '' };

    const presignDataInput = { type, filename };

    const result = await mutation({ variables: { input: presignDataInput } });

    if (!result.data) {
      return null;
    }

    return result.data.presignData;
  };

  return [mutate, mutationState];
};
