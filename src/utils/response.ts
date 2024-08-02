import logger from '@utils/logger'

export enum StatusMsg {
  ERROR = "ERROR",
  SUCCESS = "SUCCESS"
}

export interface ServerResponse {
  message: string;
  status_code: number;
  status_message: StatusMsg;
  result?: null | any
}