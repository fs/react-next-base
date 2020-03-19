const dotenv = require('dotenv');
dotenv.config();

const next = require('next');
const routes = require('./routes');
const express = require('express');
const secure = require('express-force-https');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3000;

// Create the Express-Next App
const app = next({ dev });
const handle = routes.getRequestHandler(app);
// Start the app
app
  .prepare()
  // Start Express server and serve the
  .then(() => {
    express()
      .use(secure)
      .use(handle)
      .listen(port);
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
