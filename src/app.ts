import express, { Request, Response } from 'express';

import logger from '@utils/logger';
import { StatusMsg } from '@utils/response'

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.post('/sign-up', (req: Request, res: Response) => {
  logger.info("Initializing request using SignUp customer")

  const { username, email, password } = req.body;

  logger.info("username: %s", username);
  logger.info("email: %s", email);
  logger.info("password: %s", password);

  return res.status(200).json({
    message: 'Testing ROOT endpoint successful',
    result: null,
    status_code: 200,
    status_message: StatusMsg.SUCCESS
  })
});

app.listen(port, () => {
  logger.info(`Servidor escuchando en http://localhost:${port}`);
});
