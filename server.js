const next = require('next');
const routes = require('./routes');
const express = require('express');

const dev = process.env.NODE_ENV !== 'production';
// Create the Express-Next App
const app = next({ dev });
const handle = routes.getRequestHandler(app);
// Start the app
app
  .prepare()
  // Start Express server and serve the
  .then(() => {
    express()
      .use(handle)
      .listen(3000);
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
