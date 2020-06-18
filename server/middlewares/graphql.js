const { createProxyMiddleware } = require('http-proxy-middleware');
const Cookie = require('universal-cookie');

const { API_URL } = require('../../config/vars');
const { REFRESH_TOKEN_KEY } = require('../../config/jwt.json');

const { setRefreshToken } = require('../../lib/auth/tokens');

const graphqlProxyMidlleware = createProxyMiddleware({
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

module.exports = graphqlProxyMidlleware;
