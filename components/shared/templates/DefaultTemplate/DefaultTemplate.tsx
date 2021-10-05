import React from 'react';
import type { PropsWithChildren } from 'react';
import ITest from 'interfaces/testType';
import ISignOut from 'interfaces/actionsType';

import Header from 'components/shared/organisms/Header';

import { useCurrentUser } from 'lib/apollo/hooks/state/currentUser';
import useSignOut from 'lib/apollo/hooks/actions/useSignOut';

import { Wrapper, PageContent } from './styled';

const DefaultTemplate = ({ children, testId = 'default-template' }: PropsWithChildren<ITest>): JSX.Element => {
  const { user } = useCurrentUser(false);
  const [signOut] = useSignOut() as [ISignOut];

  return (
    <Wrapper data-cy={testId} data-testid={testId}>
      <Header user={user} signOut={signOut} />
      <PageContent>{children}</PageContent>
    </Wrapper>
  );
};

export default DefaultTemplate;
