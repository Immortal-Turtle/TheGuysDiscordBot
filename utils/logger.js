const { format } = require('winston');
const winston = require('winston');

module.exports = winston.createLogger({
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
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log'}),
        // also write all logs to the console
        new winston.transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple(),
            ),
        })
    ],
});