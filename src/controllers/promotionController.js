const Promotion = require('../models/Promotion');  
const User = require('../models/User');  
  
// Get all active promotions for a user  
exports.getUserPromotions = async (req, res) => {  
  try {  
    const userId = req.user.id;  
      
    const promotions = await Promotion.find({  
      $or: [  
        { eligibleUsers: { $in: [userId] } },  
        { eligibleUsers: { $size: 0 } } // Promotions for all users  
      ],  
      isActive: true,  
      startDate: { $lte: new Date() },  
      endDate: { $gte: new Date() }  
    });  
      
    res.json(promotions);  
  } catch (err) {  
    console.error(err.message);  
    res.status(500).send('Server error');  
  }  
};  
  
// Apply promotion code  
exports.applyPromotion = async (req, res) => {  
  try {  
    const { code } = req.body;  
    const userId = req.user.id;  
      
    const promotion = await Promotion.findOne({  
      code,  
      isActive: true,  
      startDate: { $lte: new Date() },  
      endDate: { $gte: new Date() }  
    });  
      
    if (!promotion) {  
      return res.status(404).json({ message: 'Promotion not found or expired' });  
    }  
      
    // Check if promotion is applicable to this user  
    if (promotion.eligibleUsers.length > 0 &&   
        !promotion.eligibleUsers.includes(userId)) {  
      return res.status(403).json({ message: 'You are not eligible for this promotion' });  
    }  
      
    res.json({  
      message: 'Promotion applied successfully',  
      discount: promotion.discountPercentage,  
      promotionId: promotion._id  
    });  
  } catch (err) {  
    console.error(err.message);  
    res.status(500).send('Server error');  
  }  
};