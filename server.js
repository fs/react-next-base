const dotenv = require('dotenv');
dotenv.config();

const next = require('next');
const express = require('express');
const secure = require('express-force-https');
const bodyParser = require('body-parser');

const graphqlProxyMidlleware = require('./server/middlewares/graphql');

const routes = require('./routes');
const { DEV, PORT, GRAPHQL_APP_URL } = require('./config/vars');

// Create body-parser json middleware
const bodyParserJSON = bodyParser.json();
// Create the Express-Next App
const app = next({ dev: DEV });
const handle = routes.getRequestHandler(app);
const { parse } = require('url');
const { join } = require('path');

// Start the app
app
  .prepare()
  // Start Express server and serve the
  .then(() => {
    const swPathName = '/service-worker.js';
    const server = express();
    server
      // use proxy middleware to send graphql requests to api server
      .use(GRAPHQL_APP_URL, bodyParserJSON, graphqlProxyMidlleware)
      .use(secure)
      .use(handle)
      .listen(PORT, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
      });
    server.get(swPathName, (req, res) => {
      const filePath = join(__dirname, '.next', '/service-worker.js');
      app.serveStatic(req, res, filePath);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
