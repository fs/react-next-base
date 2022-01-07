import type { PresignFileVariables } from 'api/types/file/pressignApiType';
import usePresignDataMutation, { getData } from 'api/mutations/usePresignDataMutation';

const usePresignFile = () => {
  const [mutation, mutationResult] = usePresignDataMutation();

  const mutate = async ({ type, filename }: PresignFileVariables) => {
    const presignDataInput = { type, filename };

    const mutationResult = await mutation({ variables: { input: presignDataInput } });

    return getData(mutationResult.data)?.data;
  };

  return [mutate, mutationResult] as const;
};

export default usePresignFile;
