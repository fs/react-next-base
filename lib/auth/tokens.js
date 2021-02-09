const { REFRESH_TOKEN_KEY } = require('../../config/jwt.json');

const parseJWT = token => {
  try {
    // Get payload from JSON Web Token. Learn about: (https://jwt.io/introduction/)
    const payload = token.split('.')[1];

    // Convert base64 string (token payload) to utf8
    const payloadString = Buffer.from(payload, 'base64').toString();

    return JSON.parse(payloadString);
  } catch (error) {
    return null;
  }
};

const setRefreshToken = ({ refreshToken, res, req }) => {
  const { exp } = parseJWT(refreshToken);
  const expires = new Date(exp * 1000).toUTCString();

  const attributes = [
    `${REFRESH_TOKEN_KEY}=${refreshToken}`,
    `expires=${expires}`,
    'path=/',
    'httpOnly',
    'SameSite=Strict',
  ];

  if (req.secure) attributes.push('Secure');

  res.setHeader('Set-Cookie', attributes.join(';'));
};

const deleteRefreshToken = ({ res }) => {
  res.setHeader('Set-Cookie', [`${REFRESH_TOKEN_KEY}=; max-age=0; path=/; httpOnly;`]);
};

module.exports = {
  parseJWT,
  setRefreshToken,
  deleteRefreshToken,
};
