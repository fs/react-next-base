import { ApolloLink } from '@apollo/client';

export const createConsoleLink = () =>
  new ApolloLink((operation, forward) => {
    const timestamp = new Date().getTime();
    console.log(`starting request for ${operation.operationName} at ${timestamp}`);

    return forward(operation).map(data => {
      console.log(`ending request for ${operation.operationName} started at ${timestamp}`);
      console.log(JSON.stringify(data));
      return data;
    });
  });

export const createAuthHeaderLink = ({ getAccessToken, cookie }) =>
  new ApolloLink((operation, forward) => {
    const accessToken = typeof getAccessToken === 'function' ? getAccessToken() : undefined;
    const authHeader = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
    const cookieHeader = cookie ? { Cookie: cookie } : {};

    operation.setContext(({ headers }) => {
      return {
        headers: {
          ...authHeader,
          ...cookieHeader,
          ...headers,
        },
      };
    });

    return forward(operation);
  });

export const createUpdateTokenLink = ({ setAccessToken, deleteAccessToken }) =>
  new ApolloLink((operation, forward) => {
    return forward(operation).map(data => {
      const name = operation.operationName;

      switch (name) {
        case 'signin':
        case 'signup':
        case 'updateToken': {
          if (!data?.data?.[name]) break;

          const { accessToken } = data.data[name];

          if (accessToken) setAccessToken(accessToken);

          break;
        }
        case 'signout': {
          deleteAccessToken();
          break;
        }
      }

      return data;
    });
  });
