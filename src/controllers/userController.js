const User = require('../models/User');  
  
// Get user profile  
exports.getProfile = async (req, res) => {  
  try {  
    const user = await User.findById(req.user.id).select('-password');  
    if (!user) {  
      return res.status(404).json({ message: 'User not found' });  
    }  
    res.json(user);  
  } catch (err) {  
    console.error(err.message);  
    res.status(500).send('Server error');  
  }  
};  
  
// Update user profile  
exports.updateProfile = async (req, res) => {  
  try {  
    const { name, profilePicture, preferences } = req.body;  
      
    // Build update object  
    const updateFields = {};  
    if (name) updateFields.name = name;  
    if (profilePicture) updateFields.profilePicture = profilePicture;  
    if (preferences) updateFields.preferences = preferences;  
      
    const user = await User.findByIdAndUpdate(  
      req.user.id,  
      { $set: updateFields },  
      { new: true }  
    ).select('-password');  
      
    res.json(user);  
  } catch (err) {  
    console.error(err.message);  
    res.status(500).send('Server error');  
  }  
};  
  
// Add to search history  
exports.addSearchHistory = async (req, res) => {  
  try {  
    const { from, to, date } = req.body;  
      
    const user = await User.findByIdAndUpdate(  
      req.user.id,  
      {   
        $push: {   
          searchHistory: {  
            from,  
            to,  
            date: new Date(date)  
          }   
        }   
      },  
      { new: true }  
    ).select('-password');  
      
    res.json(user.searchHistory);  
  } catch (err) {  
    console.error(err.message);  
    res.status(500).send('Server error');  
  }  
};