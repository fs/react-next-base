const routes = require('next-routes');

module.exports = routes()
  .add({ name: 'home', pattern: '/', page: 'index' })
  .add({ name: 'formExamples', pattern: '/formExamples', page: 'formExamples' });
