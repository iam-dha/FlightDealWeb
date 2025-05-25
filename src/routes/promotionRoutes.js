const express = require('express');  
const router = express.Router();  
const promotionController = require('../controllers/promotionController');  
const auth = require('../middleware/auth');  
  
// @route   GET api/promotions  
// @desc    Get all active promotions for a user  
// @access  Private  
router.get('/', auth, promotionController.getUserPromotions);  
  
// @route   POST api/promotions/apply  
// @desc    Apply promotion code  
// @access  Private  
router.post('/apply', auth, promotionController.applyPromotion);  
  
module.exports = router;