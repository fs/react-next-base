/* eslint-disable @typescript-eslint/no-var-requires */
import next from 'next';
import express from 'express';
import secure from 'express-force-https';
import bodyParser from 'body-parser';
import { DEV, PORT, GRAPHQL_APP_URL } from './config/vars';
import graphqlProxyMiddleware from './server/middlewares/graphql';

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
      // @ts-ignore
      .use(GRAPHQL_APP_URL, bodyParserJSON, graphqlProxyMiddleware)
      .use(secure)
      .use((req, res) => {
        return handle(req, res);
      })
      .listen(PORT, () => {
        console.log(`> Ready on http://localhost:${PORT}`);
      });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
