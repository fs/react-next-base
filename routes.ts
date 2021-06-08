/* eslint-disable @typescript-eslint/no-var-requires */
const nextRoutes = require('next-routes');
const routesConfig = require('./config/routes');

const routes = nextRoutes()
  .add(routesConfig.HOME)
  .add(routesConfig.FORM_EXAMPLES)
  .add(routesConfig.LOGIN)
  .add(routesConfig.STATIC_PAGE)
  .add(routesConfig.PROFILE)
  .add(routesConfig.ACTIVITY);

export const Link = routes.Link;
export const Router = routes.Router;

export default routes;
