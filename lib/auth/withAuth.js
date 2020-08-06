import WithAuthSyncEvents from './withAuthSyncEvents';
import WithTokensUpdate from './withTokensUpdate';

// combine necessary auth HOC's
const WithAuth = Page => WithTokensUpdate(WithAuthSyncEvents(Page));

export default WithAuth;
