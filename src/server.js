require('dotenv').config();  
const app = require('./app');  
const mongoose = require('mongoose');  
  
// Connect to MongoDB  
mongoose.connect(process.env.MONGODB_URI)  
  .then(() => console.log('MongoDB connected'))  
  .catch(err => console.error('MongoDB connection error:', err));  
  
const PORT = process.env.PORT || 5000;  
app.listen(PORT, () => {  
  console.log(`Server running on port ${PORT}`);  
});