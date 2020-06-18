const dotenv = require('dotenv');
dotenv.config();

const next = require('next');
const express = require('express');
const secure = require('express-force-https');
const bodyParser = require('body-parser');

const graphqlProxyMidlleware = require('./server/middlewares/graphql');

const routes = require('./routes');
const { DEV, PORT, GRAPHQL_APP_URL } = require('./config/vars');

// Create the Express-Next App
const app = next({ dev: DEV });
const handle = routes.getRequestHandler(app);

// Start the app
app
  .prepare()
  // Start Express server and serve the
  .then(() => {
    express()
      .use(bodyParser.json())
      .use(GRAPHQL_APP_URL, graphqlProxyMidlleware)
      .use(secure)
      .use(handle)
      .listen(PORT);
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
