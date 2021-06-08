import React from 'react';
import type { PropsWithChildren } from 'react';
import ITest from 'types/testType';

import Header from 'components/shared/organisms/Header';

import { useCurrentUser } from 'lib/apollo/hooks/state/currentUser';
import { useSignOut } from 'lib/apollo/hooks/actions/auth';

import { Wrapper, PageContent } from './styled';

interface Props extends ITest {}

const DefaultTemplate = ({ children, testId = 'default-template' }: PropsWithChildren<Props>): JSX.Element => {
  const { user } = useCurrentUser(false);
  const [signOut] = useSignOut();

  return (
    <Wrapper data-cy={testId} data-testid={testId}>
      <Header user={user} signOut={signOut} />
      <PageContent>{children}</PageContent>
    </Wrapper>
  );
};

export default DefaultTemplate;
