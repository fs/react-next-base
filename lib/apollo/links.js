import { ApolloLink } from 'apollo-link';

export const createConsoleLink = () =>
  new ApolloLink((operation, forward) => {
    console.log(`starting request for ${operation.operationName}`);

    return forward(operation).map(data => {
      console.log(`ending request for ${operation.operationName}`);
      console.log(data);
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
      const name = operation.operationName.toLowerCase();

      switch (name) {
        case 'signup':
        case 'signin': {
          if (!data?.data?.[name]) break;

          const { accessToken } = data.data[name];

          if (accessToken) setAccessToken(accessToken);

          break;
        }
      }

      return data;
    });
  });
