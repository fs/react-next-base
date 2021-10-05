import { useMutation } from '@apollo/client';
import PresignData from 'graphql/mutations/presignData.graphql';

const usePresignFile = () => {
  const [mutation, mutationState] = useMutation(PresignData);

  const mutate = async ({ type, filename }) => {
    if (!type || !filename) return { fields: [], url: '' };

    const presignDataInput = { type, filename };

    const {
      data: { presignData: fileData },
    } = await mutation({ variables: { input: presignDataInput } });

    return fileData;
  };

  return [mutate, mutationState];
};

export default usePresignFile;
