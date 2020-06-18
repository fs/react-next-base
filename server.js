const dotenv = require('dotenv');
dotenv.config();

const next = require('next');
const express = require('express');
const secure = require('express-force-https');
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const Cookie = require('universal-cookie');

const routes = require('./routes');
const { DEV, PORT, API_URL, GRAPHQL_APP_URL } = require('./config/vars');
const { REFRESH_TOKEN_KEY } = require('./config/jwt.json');

const { setRefreshToken } = require('./lib/auth/tokens');

// Create the Express-Next App
const app = next({ dev: DEV });
const handle = routes.getRequestHandler(app);

const proxy = createProxyMiddleware({
  target: API_URL,
  selfHandleResponse: true,
  onProxyReq: (proxyReq, req, res) => {
    if (!req.body || !Object.keys(req.body).length) {
      return;
    }

    if (req.body.operationName === 'updateToken') {
      const cookie = new Cookie(req.headers.cookie);
      const refreshToken = cookie.get(REFRESH_TOKEN_KEY);

      proxyReq.setHeader('Authorization', `Bearer ${refreshToken}`);
    }

    const contentType = proxyReq.getHeader('Content-Type');
    const writeBody = bodyData => {
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    };

    if (contentType === 'application/json') {
      writeBody(JSON.stringify(req.body));
    }

    if (contentType === 'application/x-www-form-urlencoded') {
      writeBody(querystring.stringify(req.body));
    }
  },
  onProxyRes: (proxyRes, req, res) => {
    const bodyChunks = [];

    proxyRes.on('data', chunk => {
      bodyChunks.push(chunk);
    });

    proxyRes.on('end', () => {
      const body = Buffer.concat(bodyChunks);

      try {
        const { data } = JSON.parse(body.toString());
        const authKey = Object.keys(data).find(key => ['signin', 'signup', 'updateToken'].includes(key));

        if (authKey && data[authKey]) {
          const { refreshToken } = data[authKey];

          setRefreshToken({ refreshToken, res });
        }
      } catch (error) {
        console.error(error);
      }

      res.end(body);
    });
  },
});

// Start the app
app
  .prepare()
  // Start Express server and serve the
  .then(() => {
    express()
      .use(bodyParser.json())
      .use(GRAPHQL_APP_URL, proxy)
      .use(secure)
      .use(handle)
      .listen(PORT);
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
