import { ServerResponse } from '@utils/response';

declare module 'express-serve-static-core' {
  export interface Response {
    serverResponse(response: ServerResponse): void;
  }
}