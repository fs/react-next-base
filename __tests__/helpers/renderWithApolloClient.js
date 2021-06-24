import React from 'react';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

export default function renderWithApolloClient(component) {
  const mockClient = new ApolloClient({
    link: new HttpLink({ uri: `${process.env.API_URL}/graphql` }),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={mockClient}>{component}</ApolloProvider>;
}
