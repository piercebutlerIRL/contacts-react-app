const jwt = require('jsonwebtoken');
const config = require('config');

// middleware function for protected routes only
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorisation denied' });
  }

  try {
    // Verify token, pull out payload
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // set user in payload to req.user
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
