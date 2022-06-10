import { NextPageContext } from 'next';
import { AccessTokenManager } from 'lib/auth/accessTokenManager';

export interface PageContext extends NextPageContext {
  accessTokenManager?: AccessTokenManager;
}

export interface ErrorPageContext extends NextPageContext {
  statusCode?: number;
}
