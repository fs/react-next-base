const routes = require('next-routes');

module.exports = routes()
  .add({ name: 'home', pattern: '/', page: 'index' })
  .add({ name: 'formExamples', pattern: '/form-examples', page: 'formExamples' })
  .add({ name: 'signUp', pattern: '/signup', page: 'signUp' })
  .add({ name: 'staticPage', pattern: '/static-page', page: 'staticPage' })
  .add({ name: 'pageWithGraphQL', pattern: '/page-with-graphql', page: 'pageWithGraphQL' });
