const { format } = require('winston');
const winston = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
    ),
    defaultMeta: { service: 'the-guys-discord-bot' },
    transports: [
        // Write all logs with level 'info' and below to 'combined.log'
        // Write all error level and below logs to 'error.log'
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log'}),
    ],
});

// If not in production, also write all logs to the console
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple(),
        ),
    }));
}

export default logger;