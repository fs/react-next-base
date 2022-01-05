import type { PresignFileVariables } from 'api/types/file/pressignApiType';
import usePresignDataMutation from 'api/mutations/usePresignDataMutation';

const usePresignFile = () => {
  const [mutation, mutationResult] = usePresignDataMutation();

  const mutate = async ({ type, filename }: PresignFileVariables) => {
    const presignDataInput = { type, filename };

    const resultData = (await mutation({ variables: { input: presignDataInput } })).data;

    return resultData!.presignData.data;
  };

  return [mutate, mutationResult] as const;
};

export default usePresignFile;
