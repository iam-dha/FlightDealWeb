const express = require('express');  
const cors = require('cors');  
const helmet = require('helmet');  
const morgan = require('morgan');  
  
// Import routes  
const authRoutes = require('./routes/authRoutes');  
const userRoutes = require('./routes/userRoutes');  
const flightRoutes = require('./routes/flightRoutes');  
const promotionRoutes = require('./routes/promotionRoutes');  
  
const app = express();  
  
// Middleware  
app.use(express.json());  
app.use(cors());  
app.use(helmet());  
app.use(morgan('dev'));  
  
// Routes
// endpoints
app.use('/api/auth', authRoutes);  
app.use('/api/users', userRoutes);  
app.use('/api/flights', flightRoutes);  
app.use('/api/promotions', promotionRoutes);  
  
// Home route  
app.get('/', (req, res) => {  
  res.send('Flight Deal Web API');  
});  
  
// Error handling middleware  
app.use((err, req, res, next) => {  
  console.error(err.stack);  
  res.status(500).json({ message: 'Something went wrong!' });  
});  
  
module.exports = app;