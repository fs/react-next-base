import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

export default function renderWithApolloClient(component) {
  const mockClient = new ApolloClient({
    link: new createUploadLink({ uri: `${process.env.API_URL}/graphql` }),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={mockClient}>{component}</ApolloProvider>;
}
