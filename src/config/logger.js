const winston = require('winston');  
const path = require('path');  
  
const logger = winston.createLogger({  
  level: process.env.LOG_LEVEL || 'info',  
  format: winston.format.combine(  
    winston.format.timestamp(),  
    winston.format.errors({ stack: true }),  
    winston.format.json()  
  ),  
  defaultMeta: { service: 'flight-booking-service' },  
  transports: [  
    new winston.transports.File({   
      filename: path.join(__dirname, '../logs/error.log'),   
      level: 'error'   
    }),  
    new winston.transports.File({   
      filename: path.join(__dirname, '../logs/combined.log')   
    }),  
  ],  
});  
  
// Add console output in development  
if (process.env.NODE_ENV !== 'production') {  
  logger.add(new winston.transports.Console({  
    format: winston.format.combine(  
      winston.format.colorize(),  
      winston.format.simple()  
    ),  
  }));  
}  
  
// Create a middleware for Express  
logger.expressMiddleware = (err, req, res, next) => {  
  logger.error({  
    message: err.message,  
    stack: err.stack,  
    method: req.method,  
    path: req.path,  
    ip: req.ip,  
    userId: req.user?.id,  
  });  
    
  next(err);  
};  
  
module.exports = logger;