const dotenv = require('dotenv');
dotenv.config();

const next = require('next');
const express = require('express');
const secure = require('express-force-https');
const { createProxyMiddleware } = require('http-proxy-middleware');

const routes = require('./routes');
const { DEV, PORT, API_URL, GRAPHQL_APP_URL } = require('./config/vars');

// Create the Express-Next App
const app = next({ dev: DEV });
const handle = routes.getRequestHandler(app);
// Start the app
app
  .prepare()
  // Start Express server and serve the
  .then(() => {
    express()
      .use(GRAPHQL_APP_URL, createProxyMiddleware({ target: API_URL, changeOrigin: true }))
      .use(secure)
      .use(handle)
      .listen(PORT);
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
