import { useMutation } from '@apollo/client';
import PresignData from 'graphql/mutations/presignData.graphql';

type PresignFileProps = {
  type: string;
  filename: string;
};

type PresignFileData = {
  presignData: {
    fields: {
      key: string;
      value: string;
    };
    url: string;
  };
};

type PresignFileMutationInputVariable = PresignFileProps;

type PresignFileMutationVariables = {
  input: PresignFileMutationInputVariable;
};

const usePresignFile = () => {
  const [mutation, mutationState] = useMutation<PresignFileData, PresignFileMutationVariables>(PresignData);

  const mutate = async ({ type, filename }: PresignFileProps) => {
    const presignDataInput = { type, filename };

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (await mutation({ variables: { input: presignDataInput } })).data!.presignData;
  };

  return [mutate, mutationState] as const;
};

export default usePresignFile;
