const dotenv = require('dotenv');
dotenv.config();

const next = require('next');
const express = require('express');
const secure = require('express-force-https');
const { createProxyMiddleware } = require('http-proxy-middleware');

const routes = require('./routes');
const { DEV, PORT, API_URL, GRAPHQL_APP_URL, REFRESH_TOKEN_KEY } = require('./config/vars');

const { parseJWT } = require('./lib/auth/tokens');

// Create the Express-Next App
const app = next({ dev: DEV });
const handle = routes.getRequestHandler(app);

const proxy = createProxyMiddleware({
  target: API_URL,
  changeOrigin: true,
  onProxyRes: (proxyRes, req, res) => {
    const bodyChunks = [];

    proxyRes.on('data', chunk => {
      bodyChunks.push(chunk);
    });

    proxyRes.on('end', () => {
      const body = Buffer.concat(bodyChunks);

      try {
        const { data } = JSON.parse(body.toString());
        const authKey = Object.keys(data).find(key => ['signin', 'signup'].includes(key));

        if (authKey) {
          const { refreshToken } = data[authKey];
          const { exp } = parseJWT(refreshToken);
          const expires = new Date(exp * 1000).toUTCString();

          res.setHeader('Set-Cookie', [`${REFRESH_TOKEN_KEY}=${refreshToken}; expires=${expires}; path=/; httpOnly;`]);
        }
      } catch (error) {
        console.error(error);
      }

      res.end(body);
    });
  },
  selfHandleResponse: true,
});

// Start the app
app
  .prepare()
  // Start Express server and serve the
  .then(() => {
    express()
      .use(GRAPHQL_APP_URL, proxy)
      .use(secure)
      .use(handle)
      .listen(PORT);
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
