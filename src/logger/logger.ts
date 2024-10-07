import * as dotenv from 'dotenv';
import * as WinstonCloudWatch from 'winston-cloudwatch';
import * as winston from 'winston';

dotenv.config();

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  CLOUDWATCH_LOG_GROUP,
  CLOUDWATCH_LOG_STREAM,
} = process.env;

const cloudWatchConfig = {
  logGroupName: CLOUDWATCH_LOG_GROUP,
  logStreamName: CLOUDWATCH_LOG_STREAM,
  awsAcessKeyId: AWS_ACCESS_KEY_ID,
  awsSecretKey: AWS_SECRET_ACCESS_KEY,
  awsRegion: AWS_REGION,
  region: AWS_REGION,
  messageFormatter: ({ level, message, additionalInfo }) =>
    JSON.stringify({
      level,
      message,
      ...additionalInfo,
    }),
};

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new WinstonCloudWatch(cloudWatchConfig),
  ],
  exceptionHandlers: [
    new winston.transports.Console(),
    new WinstonCloudWatch(cloudWatchConfig),
  ],
  rejectionHandlers: [
    new winston.transports.Console(),
    new WinstonCloudWatch(cloudWatchConfig),
  ],
});

export default logger;