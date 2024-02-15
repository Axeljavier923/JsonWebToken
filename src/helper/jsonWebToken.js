import jwt from 'jsonwebtoken';
import { key } from './keys.js';

export const generateToken = (payload) => {
  return jwt.sign(payload, key, {
    expiresIn: '7d',
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, key);
};