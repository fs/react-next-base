const routes = require('next-routes');

module.exports = routes()
  .add({ name: 'home', pattern: '/', page: 'index' })
  .add({ name: 'formExamples', pattern: '/form-examples', page: 'formExamples' })
  .add({ name: 'login', pattern: '/login', page: 'login' })
  .add({ name: 'staticPage', pattern: '/static-page', page: 'staticPage' })
  .add({ name: 'pageWithGraphQL', pattern: '/page-with-graphql', page: 'pageWithGraphQL' });
