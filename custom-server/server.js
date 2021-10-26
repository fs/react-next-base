/* eslint-disable @typescript-eslint/no-var-requires */

const dotenv = require('dotenv');

dotenv.config();

const next = require('next');
const express = require('express');
const secure = require('express-force-https');
const bodyParser = require('body-parser');

const graphqlProxyMiddleware = require('../server/middlewares/graphql');

const { DEV, PORT, GRAPHQL_APP_URL } = require('../config/vars');

// Create body-parser json middleware
const bodyParserJSON = bodyParser.json();
// Create the Express-Next App
const app = next({ dev: DEV });
const handle = app.getRequestHandler();

// Start the app
app
  .prepare()
  // Start Express server and serve the
  .then(() => {
    express()
      // use proxy middleware to send graphql requests to api server
      .use(GRAPHQL_APP_URL, bodyParserJSON, graphqlProxyMiddleware)
      .use(secure)
      .use(handle)
      .listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
      });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
