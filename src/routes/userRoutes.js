const express = require('express');  
const router = express.Router();  
const userController = require('../controllers/userController');  
const auth = require('../middleware/auth');  
  
// @route   GET api/users/profile  
// @desc    Get user profile  
// @access  Private  
router.get('/profile', auth, userController.getProfile);  
  
// @route   PUT api/users/profile  
// @desc    Update user profile  
// @access  Private  
router.put('/profile', auth, userController.updateProfile);  
  
// @route   POST api/users/search-history  
// @desc    Add to search history  
// @access  Private  
router.post('/search-history', auth, userController.addSearchHistory);  
  
module.exports = router;