import React from 'react';
import styled from 'styled-components';

import Header from 'components/organisms/Header';

import { withApolloClient } from 'lib/withApolloClient';
import { useCurrentUser } from 'lib/apollo/hooks/state';

const Wrapper = styled.div`
  min-height: 100vh;
`;

const DefaultTemplate = ({ children }) => {
  const user = useCurrentUser(false);

  return (
    <Wrapper>
      <Header user={user} />
      {children}
    </Wrapper>
  );
};

export default withApolloClient(DefaultTemplate);
