import React from 'react';
import styled from 'styled-components';

import Header from 'components/organisms/Header';

import { useCurrentUser } from 'lib/apollo/hooks/state';
import { useSignOut } from 'lib/apollo/hooks/actions';

const Wrapper = styled.div`
  min-height: 100vh;
`;

const DefaultTemplate = ({ children }) => {
  const user = useCurrentUser(false);
  const [signOut] = useSignOut();

  return (
    <Wrapper>
      <Header user={user} signOut={signOut} />
      {children}
    </Wrapper>
  );
};

export default DefaultTemplate;
