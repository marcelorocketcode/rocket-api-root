import { createLogger, transports, format } from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';

const consoleTransport = new transports.Console({
  format: format.combine(
    format.timestamp(),
    format.splat(),
    format.printf(({ timestamp, level, message, }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
});

// const gcpTransport = new LoggingWinston();

const logger = createLogger({
  level: 'info',
  transports: [
    consoleTransport,
    // gcpTransport
  ],
});

export default logger;
