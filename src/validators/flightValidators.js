const Joi = require('joi');  
  
const flightSearchSchema = Joi.object({  
  origin: Joi.string().required().min(3).max(3),  
  destination: Joi.string().required().min(3).max(3),  
  departureDate: Joi.date().required().greater('now'),  
  returnDate: Joi.date().greater(Joi.ref('departureDate')),  
  passengers: Joi.object({  
    adults: Joi.number().required().min(1).max(9),  
    children: Joi.number().min(0).max(9),  
    infants: Joi.number().min(0).max(9)  
  }).required(),  
  cabinClass: Joi.string().valid('ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST')  
});  
  
const validateFlightSearch = (req, res, next) => {  
  const { error } = flightSearchSchema.validate(req.body);  
    
  if (error) {  
    return res.status(400).json({  
      success: false,  
      message: 'Invalid input data',  
      errors: error.details.map(detail => detail.message)  
    });  
  }  
    
  next();  
};  
  
module.exports = { validateFlightSearch };