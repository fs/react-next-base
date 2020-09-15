import React from 'react';
import styled, { css } from 'styled-components';

import Header from 'components/organisms/Header';

import { useCurrentUser } from 'lib/apollo/hooks/state';
import { useSignOut } from 'lib/apollo/hooks/actions';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
`;

const PageContent = styled.div(
  ({ customStyles }) => css`
    padding: 2rem 1rem;
    max-width: 40rem;

    ${customStyles}
  `,
);

const DefaultTemplate = ({ children, contentStyles = '' }) => {
  const { user } = useCurrentUser(false);
  const [signOut] = useSignOut();

  return (
    <Wrapper>
      <Header user={user} signOut={signOut} />
      <PageContent customStyles={contentStyles}>{children}</PageContent>
    </Wrapper>
  );
};

export default DefaultTemplate;
