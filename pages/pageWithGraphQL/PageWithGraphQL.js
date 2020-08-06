import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import CurrentUser from 'graphql/queries/currentUser.graphql';
import ErrorDecorator from 'decorators/ErrorDecorator';
import ErrorMessage from 'components/atoms/ErrorMessage';
import WithAuth from 'lib/auth/withAuth';
import WithAuthSecurity from 'lib/auth/withAuthSecurity';
import { withApolloClient } from 'lib/withApolloClient';
import { useSignOut } from 'lib/apollo/hooks/actions';

import DefaultTemplate from 'components/templates/DefaultTemplate';

const StyledProfileActions = styled.div`
  margin: 0 0 2rem;
`;

const PageWithGraphQL = () => {
  const { loading, error, data } = useQuery(CurrentUser);
  const [signOut] = useSignOut();

  const me = data?.me;
  const errorMessage = error ? new ErrorDecorator(error).getMessages() : null;
  const LogOutFromAllDevices = () => signOut({ everywhere: true });

  return (
    <DefaultTemplate>
      {loading && <h3>Loading...</h3>}
      {error && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {!loading && !error && (
        <>
          <StyledProfileActions>
            <button type="button" onClick={LogOutFromAllDevices}>
              Log out from all devices
            </button>
          </StyledProfileActions>
          <div>{`This is Current User: ${JSON.stringify(me)}`}</div>
        </>
      )}
    </DefaultTemplate>
  );
};

export default withApolloClient(WithAuth(WithAuthSecurity(PageWithGraphQL)));
