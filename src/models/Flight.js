const mongoose = require('mongoose');  
  
const FlightSchema = new mongoose.Schema({  
  flightNumber: {  
    type: String,  
    required: [true, 'Flight number is required'],  
    unique: true  
  },  
  airline: {  
    type: String,  
    required: [true, 'Airline name is required']  
  },  
  origin: {  
    type: String,  
    required: [true, 'Origin is required']  
  },  
  destination: {  
    type: String,  
    required: [true, 'Destination is required']  
  },  
  departureDate: {  
    type: Date,  
    required: [true, 'Departure date is required']  
  },  
  arrivalDate: {  
    type: Date,  
    required: [true, 'Arrival date is required']  
  },  
  price: {  
    type: Number,  
    required: [true, 'Price is required']  
  },  
  seatsAvailable: {  
    type: Number,  
    required: [true, 'Number of available seats is required']  
  }  
}, { timestamps: true });  
  
module.exports = mongoose.model('Flight', FlightSchema);