import { omit } from 'lodash';

import { Token } from '../types/user/token';

const getDataWithoutToken = <TData extends Token>(data?: TData | null): Omit<TData, keyof Token> => {
  return omit(data, ['accessToken', 'refreshToken']);
};

export default getDataWithoutToken;
