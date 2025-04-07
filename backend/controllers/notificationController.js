// controllers/notificationController.js
const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  try {
    const userId = '67f327b2495c2f1f6f0bd4f5';

    const page = parseInt(req.query.page) || 1;   
    const limit = parseInt(req.query.limit) || 10; 
    const skip = (page - 1) * limit;

     // Get total count for that user
     const total = await Notification.countDocuments({ recipient: userId });

    // Get notifications
    const notifications = await Notification.find({ recipient: userId })
      .populate('sender', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
      console.log(notifications);

     // Calculate pagination metadata
     const totalPages = Math.ceil(total / limit);
     const hasMore = page < totalPages;
     
     res.status(200).json({
       data: notifications,
       pagination: {
         total,
         page,
         limit,
         pages: totalPages,
         hasMore
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
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
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
    const userId = "67f32bbe495c2f1f6f0bd4f5";

    await Notification.updateMany(
      { recipient: userId, read: false },
      { read: true }
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