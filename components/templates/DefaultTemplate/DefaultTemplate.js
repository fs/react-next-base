import React from 'react';
import styled from 'styled-components';

import { useQuery } from '@apollo/react-hooks';
import { withApolloClient } from 'lib/withApolloClient';
import Header from 'components/organisms/Header';

import CurrentUser from 'graphql/queries/currentUser.graphql';

const Wrapper = styled.div`
  min-height: 100vh;
`;

const DefaultTemplate = ({ apolloClient, children }) => {
  const { data } = useQuery(CurrentUser, {
    fetchPolicy: 'cache-only',
  });

  const user = data?.me;

  return (
    <Wrapper>
      <Header user={user} />
      {children}
    </Wrapper>
  );
};

export default withApolloClient(DefaultTemplate);
