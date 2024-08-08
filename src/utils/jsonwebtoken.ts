import jwt from 'jsonwebtoken';

import { User } from "db/user.entity";
import logger from './logger';


export const createTokenByUser = (user: User) => {
  const PRIVATE_KEY = process.env.PRIVATE_TOKEN_KEY as string;
  
  const ALGORITHM_TOKEN = 'RS256';
  const EXPIRE_IN = '8h'

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  }

  const token = jwt.sign(
    payload,
    PRIVATE_KEY,
    {
      expiresIn: EXPIRE_IN,
    }
  );

  return token;
}