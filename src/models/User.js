const mongoose = require('mongoose');  
const bcrypt = require('bcryptjs');  
  
const userSchema = new mongoose.Schema({  
  name: {  
    type: String,  
    required: true  
  },  
  email: {  
    type: String,  
    required: true,  
    unique: true  
  },  
  password: {  
    type: String,  
    required: true  
  },  
  profilePicture: String,  
  preferences: {  
    preferredAirlines: [String],  
    preferredClass: String,  
    preferredDestinations: [String]  
  },  
  searchHistory: [{  
    from: String,  
    to: String,  
    date: Date,  
    timestamp: {  
      type: Date,  
      default: Date.now  
    }  
  }],  
  createdAt: {  
    type: Date,  
    default: Date.now  
  }  
});  
  
// Hash password before saving  
userSchema.pre('save', async function(next) {  
  if (!this.isModified('password')) return next();  
    
  try {  
    const salt = await bcrypt.genSalt(10);  
    this.password = await bcrypt.hash(this.password, salt);  
    next();  
  } catch (error) {  
    next(error);  
  }  
});  
  
// Method to compare passwords  
userSchema.methods.comparePassword = async function(candidatePassword) {  
  return await bcrypt.compare(candidatePassword, this.password);  
};  
  
module.exports = mongoose.model('User', userSchema);