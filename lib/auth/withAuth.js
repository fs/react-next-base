import WithAuthSyncEvents from './withAuthSyncEvents';
import WithTokensUpdate from './withTokensUpdate';

// combine necessary auth HOC's
const withAuth = (Page) => WithTokensUpdate(WithAuthSyncEvents(Page));

export default withAuth;
