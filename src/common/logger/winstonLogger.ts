import {config} from 'src/config/config';
import winston, {Logger, format} from 'winston';
import 'winston-daily-rotate-file';
const {
  combine,
  errors,
  timestamp,
  label,
  // json,
  printf,
  // prettyPrint,
  colorize,
  // simple,
} = format;
const colorizer = colorize();
let logger: Logger;
const createLogger = async () => {
  if (logger) {
    logger.error('Logger instance already exist.');
    return;
  }

  logger = winston.createLogger({
    level: config.MODE === 'prod' ? 'info' : 'debug',
    format: combine(
      errors({stack: true}),
      // timestamp({ format: 'YYYY-MM-dd HH:mm:ss:SSS' })
      timestamp({format: 'HH:mm:ss:SSS'})
      // json()
      // ...(Config.NODE_ENV !== 'production' ? [prettyPrint()] : [])
    ),
    // defaultMeta: { service: 'pie' },
    exitOnError: false,
    transports: [],
  });

  if (config.MODE === 'local') {
    logger.add(
      new winston.transports.Console({
        format: combine(
          colorize({
            all: true,
            colors: {
              label: 'grey',
              from: 'blue',
              error: 'bold red',
              warn: 'yellow',
              info: 'green',
              verbose: 'cyan',
              debug: 'magenta',
            },
          }),
          label({label: 'server'}),
          printf(
            (info: {level: string; message: any; [key: string]: string}) =>
              colorizer.colorize('label', `[${info.label}]`) +
              ` ${info.level} ${info.timestamp} ` +
              colorizer.colorize('from', `[${info.from}]`) +
              ` ${info.message}`
          )
        ),
      })
    );
  } else {
    logger.add(
      new winston.transports.Console({
        format: printf(
          (info: {level: string; message: any; [key: string]: string}) =>
            `${info.level} [${info.from}] ${info.message}`
        ),
      })
    );
  }
};

export {logger, createLogger};
