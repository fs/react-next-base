const nextRoutes = require('next-routes');
const routes = require('./config/routes');

module.exports = nextRoutes()
  .add(routes.HOME)
  .add(routes.FORM_EXAMPLES)
  .add(routes.LOGIN)
  .add(routes.STATIC_PAGE)
  .add(routes.PAGE_WITH_GRAPHQL)
  .add(routes.ACTIVITY);
