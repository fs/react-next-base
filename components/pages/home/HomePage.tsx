import WithAuth from 'lib/auth/withAuth';
import { withApolloClient } from 'lib/withApolloClient';

import DefaultTemplate from 'components/shared/templates/DefaultTemplate';
import { NotifierProvider } from 'contexts/NotifierContext';

import { Title, PageContent } from './styled';

const HomePage = () => {
  return (
    <NotifierProvider>
      <DefaultTemplate>
        <PageContent data-testid="page-content">
          <Title className="capitalize" data-cy="welcome-page">
            Welcome to React Next Base
          </Title>
        </PageContent>
      </DefaultTemplate>
    </NotifierProvider>
  );
};

export default withApolloClient(WithAuth(HomePage));
