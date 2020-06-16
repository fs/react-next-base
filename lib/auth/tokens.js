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

let token = null;
let expiresAt = null;

const getAccessToken = () => ({
  accessToken: token,
  expires: expiresAt,
});

const setAccessToken = ({ accessToken, expires }) => {
  token = accessToken;
  expiresAt = expires;
};

const deleteAccessToken = () => {
  token = null;
  expiresAt = null;
};

module.exports = {
  parseJWT,
  getAccessToken,
  setAccessToken,
  deleteAccessToken,
};
