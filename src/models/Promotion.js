const mongoose = require('mongoose');  
  
const promotionSchema = new mongoose.Schema({  
  title: {  
    type: String,  
    required: true  
  },  
  description: {  
    type: String,  
    required: true  
  },  
  code: {  
    type: String,  
    required: true,  
    unique: true  
  },  
  discountPercentage: {  
    type: Number,  
    required: true  
  },  
  startDate: {  
    type: Date,  
    required: true  
  },  
  endDate: {  
    type: Date,  
    required: true  
  },  
  isActive: {  
    type: Boolean,  
    default: true  
  },  
  eligibleUsers: [{  
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User'  
  }],  
  createdAt: {  
    type: Date,  
    default: Date.now  
  }  
});  
  
module.exports = mongoose.model('Promotion', promotionSchema);