const express = require('express');  
const router = express.Router();  
const flightController = require('../controllers/flightController');  
const { validateFlightSearch } = require('../validators/flightValidators.js');  
const auth = require('../middleware/auth');  
  
router.post('/search', validateFlightSearch, flightController.searchFlights);  
router.get('/:id', flightController.getFlightDetails);  
router.get('/airports/autocomplete', flightController.autocompleteAirports);  
  
module.exports = router;