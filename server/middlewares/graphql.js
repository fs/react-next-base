/* eslint-disable @typescript-eslint/no-var-requires */
const zlib = require('zlib');
const Cookie = require('universal-cookie');
const { createProxyMiddleware } = require('http-proxy-middleware');

const { API_URL } = require('../../config/vars');
const { REFRESH_TOKEN_KEY } = require('../../config/jwt');

const { setRefreshToken, deleteRefreshToken } = require('../../lib/auth/tokens');

// Working with refresh token
const handleResponse = ({ req, res, body }) => {
  const authOperationNames = ['signin', 'signup', 'signout', 'updateToken'];

  try {
    const { data } = JSON.parse(body.toString());

    const authOperationName = Object.keys(data).find((key) => authOperationNames.includes(key));

    if (authOperationName === 'signout') {
      deleteRefreshToken({ res });
    } else if (authOperationName && data[authOperationName]) {
      const { refreshToken } = data[authOperationName];

      setRefreshToken({ refreshToken, req, res });
    }
  } catch (error) {
    console.error(error);
  }

  res.end(body);
};

const graphqlProxyMidlleware = createProxyMiddleware({
  target: API_URL,
  changeOrigin: true,
  selfHandleResponse: true,
  onProxyReq: (proxyReq, req, res) => {
    const { body } = req;

    if (!body || !Object.keys(body).length) {
      res.end();
      return;
    }

    const { operationName } = body;

    if (['updateToken', 'signout'].includes(operationName)) {
      const cookie = new Cookie(req.headers.cookie);
      const refreshToken = cookie.get(REFRESH_TOKEN_KEY);

      proxyReq.setHeader('Authorization', `Bearer ${refreshToken}`);
    }

    // send request body in correct format (after parsing body with body-parser library)
    const contentType = proxyReq.getHeader('Content-Type');

    const writeBody = (bodyData) => {
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    };

    if (contentType === 'application/json') {
      writeBody(JSON.stringify(body));
    }
    // TODO: what it is?
    // if (contentType === 'application/x-www-form-urlencoded') {
    //   writeBody(querystring.stringify(body));
    // }
  },
  onProxyRes: (proxyRes, req, res) => {
    const bodyChunks = [];

    proxyRes.on('data', (chunk) => {
      bodyChunks.push(chunk);
    });

    proxyRes.on('end', () => {
      const body = Buffer.concat(bodyChunks);

      const contentEncoding = proxyRes.headers['content-encoding'];

      if (contentEncoding === 'gzip') {
        zlib.gunzip(body, (err, dezipped) => {
          handleResponse({ req, res, body: dezipped });
        });
      } else {
        handleResponse({ req, res, body });
      }
    });
  },
});

module.exports = graphqlProxyMidlleware;
