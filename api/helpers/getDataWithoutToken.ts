import omit from 'lodash/omit';

import { Token } from 'api/types/user/token';

const getDataWithoutToken = <TData extends Token>(data?: TData | null): Omit<TData, keyof Token> => {
  return omit(data, ['accessToken', 'refreshToken']);
};

export default getDataWithoutToken;
