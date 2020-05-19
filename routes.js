const routes = require('next-routes');

module.exports = routes()
  .add({ name: 'home', pattern: '/', page: 'index' })
  .add({ name: 'login', pattern: '/login', page: 'login' })
  .add({ name: 'static-page', pattern: '/static-page', page: 'static-page' });
