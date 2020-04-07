const routes = require('next-routes');

module.exports = routes()
  .add({ name: 'home', pattern: '/', page: 'index.tsx' })
  .add({ name: 'formExamples', pattern: '/formExamples', page: 'formExamples' });
