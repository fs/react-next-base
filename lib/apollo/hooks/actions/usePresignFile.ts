import type { PresignFileVariables } from 'api/types/file/pressignApiType';
import usePresignDataMutation, { getData } from 'api/mutations/usePresignDataMutation';

const usePresignFile = () => {
  const [mutation, mutationResult] = usePresignDataMutation();

  const mutate = async ({ type, filename }: PresignFileVariables) => {
    const presignDataInput = { type, filename };

    const fetchResult = await mutation({ variables: { input: presignDataInput } });

    return getData(fetchResult.data)?.data;
  };

  return [mutate, mutationResult] as const;
};

export default usePresignFile;
