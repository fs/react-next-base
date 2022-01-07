import { NumberLiteral } from '@babel/types';

export type ID = string | number;

export type PageInfo = {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
};
