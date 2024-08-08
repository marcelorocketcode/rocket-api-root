import express, { Request, Response } from 'express';

import logger from '@utils/logger';
import { StatusMsg } from '@utils/response'
import { User, UserEntity } from 'db/user.entity';
import { createTokenByUser } from '@utils/jsonwebtoken';

import 'dotenv/config';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.post('/sign-up', (req: Request, res: Response) => {
  try {
    logger.info("Initializing request using SignUp customer")

    const { username, email, password } = req.body;

    const userRepository = new UserEntity();

    logger.info("User request: %s", JSON.stringify(req.body));

    logger.info("Creating user in local database");
    const userBuild = new User(username, email, password);
    const user = userRepository.create(userBuild);
    
    logger.info("Creating User Token Authorization");
    const token = createTokenByUser(user);

    const response = {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    }

    return res.status(200).json({
      message: 'User created successful',
      result: response,
      status_code: 200,
      status_message: StatusMsg.SUCCESS
    });
  } catch (error: any) {
    logger.error(error);

    return res.status(400).json({
      message: error.message || 'Server error, try again later',
      result: null,
      statusCode: 400,
      statusMessage: StatusMsg.ERROR
    });
  }
}); 

app.post('/sign-in', (req: Request, res: Response) => {
  try {
    logger.info("Initializing request using SinIn customer")

    const { email, password } = req.body;

    const userRepository = new UserEntity();

    logger.info("User request: %s", JSON.stringify(req.body));

    logger.info("Looking for user in local database");
    const user = userRepository.findByEmail(email);

    if (user.password !== password) throw new Error("Invalid credentials");

    logger.info("Creating User Token Authorization");
    const token = createTokenByUser(user);

    const response = {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    }

    return res.status(200).json({
      message: 'Sign In successful',
      result: response,
      status_code: 200,
      status_message: StatusMsg.SUCCESS
    });
  } catch (error: any) {
    logger.error(error);
    return res.status(400).json({
      message: error.message || 'Server error, try again later',
      result: null,
      statusCode: 400,
      statusMessage: StatusMsg.ERROR
    });
  }
});

app.listen(port, () => {
  logger.info(`Servidor escuchando en http://localhost:${port}`);
});
