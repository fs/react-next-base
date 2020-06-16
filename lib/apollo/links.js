import { ApolloLink } from 'apollo-link';

export const createConsoleLink = () =>
  new ApolloLink((operation, forward) => {
    console.log(`starting request for ${operation.operationName}`);

    return forward(operation).map(data => {
      console.log(`ending request for ${operation.operationName}`);
      return data;
    });
  });

export const createAuthHeaderLink = ({ getAccessToken }) =>
  new ApolloLink((operation, forward) => {
    const accessToken = typeof getAccessToken === 'function' ? getAccessToken() : undefined;
    const authHeader = accessToken ? { authorization: `Bearer ${accessToken}` } : {};

    operation.setContext(({ headers }) => ({
      headers: {
        ...authHeader,
        ...headers,
      },
    }));

    return forward(operation);
  });

export const createUpdateTokenLink = ({ setAccessToken }) =>
  new ApolloLink((operation, forward) => {
    return forward(operation).map(data => {
      switch (operation.operationName) {
        case 'SignUp':
        case 'SignIn': {
          const { accessToken } = data.data.signin;

          setAccessToken(accessToken);

          break;
        }
      }

      return data;
    });
  });
