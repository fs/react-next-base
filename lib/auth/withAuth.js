import withAuthSyncEvents from './withAuthSyncEvents';
import withTokensUpdate from './withTokensUpdate';

// combine necessary auth HOC's
const withAuth = (Page) => withTokensUpdate(withAuthSyncEvents(Page));

export default withAuth;
