import withAuthSyncEvents from './withAuthSyncEvents';
import WithTokensUpdate from './withTokensUpdate';

// combine necessary auth HOC's
const withAuth = (Page) => WithTokensUpdate(withAuthSyncEvents(Page));

export default withAuth;
