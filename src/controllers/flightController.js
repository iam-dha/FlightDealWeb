const logger = require('../config/logger');  
const flightService = require('../services/flightService');  
  
exports.searchFlights = async (req, res) => {  
  try {  
    logger.info('Flight search initiated', {   
      origin: req.body.origin,  
      destination: req.body.destination,  
      userId: req.user?.id   
    });  
      
    const flights = await flightService.searchFlights(req.body);  
      
    logger.info('Flight search completed', {   
      resultCount: flights.length,  
      origin: req.body.origin,  
      destination: req.body.destination   
    });  
      
    return res.json({  
      success: true,  
      data: flights  
    });  
  } catch (error) {  
    logger.error('Error in flight search', {  
      error: error.message,  
      stack: error.stack,  
      searchParams: req.body  
    });  
      
    return res.status(500).json({  
      success: false,  
      message: 'Failed to search flights',  
      error: process.env.NODE_ENV === 'development' ? error.message : undefined  
    });  
  }  
};