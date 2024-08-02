import logger from '@utils/logger';
import { ServerResponse, StatusMsg } from '@utils/response'
import { Request, Response, NextFunction } from 'express'

export function extendedResponse(req: Request, res: Response, next: NextFunction) {
  res.serverResponse = function ({
    message = "Result not specified",
    status_code = 400,
    status_message = StatusMsg.ERROR,
    result = null,
  }: ServerResponse) {
  
    if (status_message === StatusMsg.ERROR) {
      logger.info(`Request completed success: ${status_code} ${message}`);
    } else {
      logger.info(`Request completed success: ${status_code} ${message}`);
    }
  
    const response: ServerResponse = {
      message, status_code, status_message
    };

    if (result) response.result = result
    res.status(status_code).json(response)
  }

  next();
}
