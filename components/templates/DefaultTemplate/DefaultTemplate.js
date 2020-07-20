import React from 'react';
import styled from 'styled-components';

import Header from 'components/organisms/Header';

import { useCurrentUser } from 'lib/apollo/hooks/state';
import { useSignOut } from 'lib/apollo/hooks/actions';

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 1rem 2rem;
`;

const DefaultTemplate = props => {
  console.warn(props);
  const { children } = props;
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
