import asyncHandler from 'express-async-handler';
import jwksClient from 'jwks-rsa';
import { verify } from 'jwt-promisify';
import { ROLES_KEY, URLs } from '../constants';
import axios from 'axios';

const AUTHORIZATION_HEADER = 'authorization';

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers[AUTHORIZATION_HEADER] && req.headers[AUTHORIZATION_HEADER].startsWith('Bearer')) {
    try {
      const client = jwksClient({
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      });

      function getKey(header, callback) {
        client.getSigningKey(header.kid, function (err, key) {
          const signingKey = key?.publicKey || key?.rsaPublicKey;
          callback(null, signingKey);
        });
      }
      // Get token from header
      token = req.headers[AUTHORIZATION_HEADER].split(' ')[1];
      // Verify token
      const decoded = await verify(token, getKey);
      const response = await axios.get(URLs.getUserInfo, {
        headers: { authorization: req.headers[AUTHORIZATION_HEADER] },
      });
      if (Date.now() >= decoded?.exp * 1000) {
        throw new Error('Token is expired please use refresh with current token to generate a new token.');
      }
      // Get user from the token
      req.user = { ...decoded, ...response?.data };
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export const minRequiredPermission = (PERMISSION) => {
  return (req, res, next) => {
    if (req.user && req.user[ROLES_KEY] && req.user[ROLES_KEY].find((value) => value === PERMISSION)) {
      console.log(`user can perform action to: ${req.originalUrl}`.bgGreen);
      next();
    } else {
      res.status(403).send({ message: 'User is not authorized to perform this action.' });
    }
  };
};
