import { useMutation } from '@apollo/client';
import PresignData from 'graphql/mutations/presignData.graphql';

type PresignFileProps = {
  type: string;
  filename: string;
};

export type PresignData = {
  fields: {
    key: string;
    value: string;
  }[];
  url: string;
};

type PresignFileData = {
  presignData: PresignData;
};

type PresignFileMutationInputVariable = PresignFileProps;

type PresignFileMutationVariables = {
  input: PresignFileMutationInputVariable;
};

const usePresignFile = () => {
  const [mutation, mutationState] = useMutation<PresignFileData, PresignFileMutationVariables>(PresignData);

  const mutate = async ({ type, filename }: PresignFileProps) => {
    const presignDataInput = { type, filename };

    const resultData = (await mutation({ variables: { input: presignDataInput } })).data;

    return resultData!.presignData;
  };

  return [mutate, mutationState] as const;
};

export default usePresignFile;
