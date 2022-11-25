import jwt from 'jsonwebtoken';

import { TokenPublic } from '../config/config_tokens';

async function authJWT(req, res, next) {
  const { token } = req.cookies; // Retrieving the 'token' cookie
  if (!token) return res.status(401).send({ error: 'Access Denied' }); // Access denied if user is not logged in

  // console.log(token);

  try {
    jwt.verify(token, TokenPublic); //Verification of the public key + token
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Invalid Token !' }); // Invlid Token
  }
}

export default authJWT;
