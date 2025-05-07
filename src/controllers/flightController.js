const amadeus = require('../config/amadeus');  
  
// Search for flights  
exports.searchFlights = async (req, res) => {  
  try {  
    const { originCode, destinationCode, departureDate, returnDate, adults, travelClass } = req.query;  
      
    // Validate required parameters  
    if (!originCode || !destinationCode || !departureDate) {  
      return res.status(400).json({ message: 'Missing required parameters' });  
    }  
  
    const response = await amadeus.shopping.flightOffersSearch.get({  
      originLocationCode: originCode,  
      destinationLocationCode: destinationCode,  
      departureDate,  
      returnDate: returnDate || undefined,  
      adults: adults || 1,  
      travelClass: travelClass || 'ECONOMY'  
    });  
  
    res.json(response.data);  
  } catch (error) {  
    console.error('Flight search error:', error.response?.data || error);  
    res.status(500).json({   
      message: 'Error searching flights',  
      error: error.response?.data || error.message   
    });  
  }  
};  
  
// Get flight details by ID  
exports.getFlightDetails = async (req, res) => {  
  try {  
    const { flightOfferId } = req.params;  
      
    const response = await amadeus.shopping.flightOffers.pricing.post(  
      JSON.stringify({  
        data: {  
          type: 'flight-offers-pricing',  
          flightOffers: [JSON.parse(req.body.flightOffer)]  
        }  
      })  
    );  
  
    res.json(response.data);  
  } catch (error) {  
    console.error('Flight details error:', error.response?.data || error);  
    res.status(500).json({   
      message: 'Error retrieving flight details',  
      error: error.response?.data || error.message   
    });  
  }  
};  
  
// Get airport information  
exports.searchAirports = async (req, res) => {  
  try {  
    const { keyword } = req.query;  
      
    if (!keyword) {  
      return res.status(400).json({ message: 'Search keyword is required' });  
    }  
      
    const response = await amadeus.referenceData.locations.get({  
      keyword,  
      subType: 'AIRPORT,CITY'  
    });  
      
    res.json(response.data);  
  } catch (error) {  
    console.error('Airport search error:', error.response?.data || error);  
    res.status(500).json({   
      message: 'Error searching airports',  
      error: error.response?.data || error.message   
    });  
  }  
};