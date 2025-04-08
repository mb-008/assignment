const Notification = require('../models/Notification');
const User = require('../models/User');

exports.getNotifications = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    // To enforce a maximum limit so 
    const maxlimit = Math.min(limit, 20);
    const skip = (page - 1) * maxlimit;

   

    // For demo, we'll use this user
    const mainUser = await User.findOne({ email: 'abc@example.com' });
    
    const notifications = await Notification.find({ recipient: mainUser._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(maxlimit)
      .populate('sender', 'name');

    const total = await Notification.countDocuments({ recipient: mainUser._id });

    res.status(200).json({
      success: true,
      data: notifications,
      pagination: {
        page,
        maxlimit,
        total,
        pages: Math.ceil(total / maxlimit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const mainUser = await User.findOne({ email: 'abc@example.com' });

    const notification = await Notification.findByIdAndUpdate(
      { _id: req.params.id, recipient: mainUser._id, read: false },  
      { $set: { read: true } }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        error: 'Notification not found'
      });
    }

    res.status(200).json({
      success: true,
      data: notification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    const mainUser = await User.findOne({ email: 'abc@example.com' });
    
    await Notification.updateMany(
      { recipient: mainUser._id, read: false },
      { $set: { read: true } }
    );

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};