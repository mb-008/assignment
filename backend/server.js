  // server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const notificationRoutes = require('./routes/notifications');
const User = require('./models/User');
const Notification = require('./models/Notification');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/notification_app')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/notifications', notificationRoutes);

// Seed data route (for demo purposes)
app.get('/api/seed', async (req, res) => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Notification.deleteMany({});

    // Create users
    const mainUser = await User.findOneAndUpdate(
      { email: 'abc@example.com' },
      { name: 'user1', email: 'abc@example.com' },
      { upsert: true, new: true }
    );
    
    const users = await User.insertMany([
      { name: 'Rachel Chen', email: 'rachel@example.com' },
      { name: 'Alex Kim', email: 'alex@example.com' },
      { name: 'Gowtham Mohan', email: 'gowtham@example.com' },
      { name: 'Greater Chennai Corporation', email: 'gcc@example.com' },
      { name: 'Rahul Kaul', email: 'rahul@example.com' },
    ]);

   
    // Create notifications
    const notifications = await Notification.insertMany([
      // friend_request (10)
      { recipient: mainUser._id, type: 'friend_request', sender: users[0]._id, content: 'sent you a friend request.', createdAt: new Date() },
      { recipient: mainUser._id, type: 'friend_request', sender: users[1]._id, content: 'sent you a friend request.', createdAt: new Date() },
      { recipient: mainUser._id, type: 'friend_request', sender: users[2]._id, content: 'sent you a friend request.', createdAt: new Date() },
      { recipient: mainUser._id, type: 'friend_request', sender: users[3]._id, content: 'sent you a friend request.', createdAt: new Date() },
      { recipient: mainUser._id, type: 'friend_request', sender: users[4]._id, content: 'sent you a friend request.', createdAt: new Date() },
      { recipient: mainUser._id, type: 'friend_request', sender: users[0]._id, content: 'sent you a friend request.', createdAt: new Date() },
      { recipient: mainUser._id, type: 'friend_request', sender: users[1]._id, content: 'sent you a friend request.', createdAt: new Date() },
      { recipient: mainUser._id, type: 'friend_request', sender: users[2]._id, content: 'sent you a friend request.', createdAt: new Date() },
      { recipient: mainUser._id, type: 'friend_request', sender: users[3]._id, content: 'sent you a friend request.', createdAt: new Date() },
      { recipient: mainUser._id, type: 'friend_request', sender: users[4]._id, content: 'sent you a friend request.', createdAt: new Date() },
    
      // post_like (10)
      { recipient: mainUser._id, type: 'post_like', sender: users[1]._id, content: 'liked your post.', createdAt: new Date() },
      { recipient: mainUser._id, type: 'post_like', sender: users[2]._id, content: 'liked your post.', createdAt: new Date() },
      { recipient: mainUser._id, type: 'post_like', sender: users[3]._id, content: 'liked your post.', createdAt: new Date() },
      { recipient: mainUser._id, type: 'post_like', sender: users[4]._id, content: 'liked your post.', createdAt: new Date() },
      { recipient: mainUser._id, type: 'post_like', sender: users[0]._id, content: 'liked your post.', createdAt: new Date() },
      { recipient: mainUser._id, type: 'post_like', sender: users[1]._id, content: 'liked your post.', createdAt: new Date() },
      { recipient: mainUser._id, type: 'post_like', sender: users[2]._id, content: 'liked your post.', createdAt: new Date() },
      { recipient: mainUser._id, type: 'post_like', sender: users[3]._id, content: 'liked your post.', createdAt: new Date() },
      { recipient: mainUser._id, type: 'post_like', sender: users[4]._id, content: 'liked your post.', createdAt: new Date() },
      { recipient: mainUser._id, type: 'post_like', sender: users[0]._id, content: 'liked your post.', createdAt: new Date() },
    
      // comment (10)
      { recipient: mainUser._id, type: 'comment', sender: users[2]._id, content: 'commented: "Nice post!"', referenceLink: 'https://example.com/post1', createdAt: new Date() },
      { recipient: mainUser._id, type: 'comment', sender: users[3]._id, content: 'commented: "Looks great!"', referenceLink: 'https://example.com/post2', createdAt: new Date() },
      { recipient: mainUser._id, type: 'comment', sender: users[4]._id, content: 'commented: "Awesome!"', referenceLink: 'https://example.com/post3', createdAt: new Date() },
      { recipient: mainUser._id, type: 'comment', sender: users[0]._id, content: 'commented: "Well done!"', referenceLink: 'https://example.com/post4', createdAt: new Date() },
      { recipient: mainUser._id, type: 'comment', sender: users[1]._id, content: 'commented: "This is amazing!"', referenceLink: 'https://example.com/post5', createdAt: new Date() },
      { recipient: mainUser._id, type: 'comment', sender: users[2]._id, content: 'commented: "So cool!"', referenceLink: 'https://example.com/post6', createdAt: new Date() },
      { recipient: mainUser._id, type: 'comment', sender: users[3]._id, content: 'commented: "Wow!"', referenceLink: 'https://example.com/post7', createdAt: new Date() },
      { recipient: mainUser._id, type: 'comment', sender: users[4]._id, content: 'commented: "Interesting!"', referenceLink: 'https://example.com/post8', createdAt: new Date() },
      { recipient: mainUser._id, type: 'comment', sender: users[0]._id, content: 'commented: "Great work!"', referenceLink: 'https://example.com/post9', createdAt: new Date() },
      { recipient: mainUser._id, type: 'comment', sender: users[1]._id, content: 'commented: "Fantastic!"', referenceLink: 'https://example.com/post10', createdAt: new Date() },
    
      // tag (10)
      { recipient: mainUser._id, type: 'tag', sender: users[0]._id, content: 'tagged you in a post.', referenceLink: 'https://example.com/tag1', createdAt: new Date() },
      { recipient: mainUser._id, type: 'tag', sender: users[1]._id, content: 'tagged you in a post.', referenceLink: 'https://example.com/tag2', createdAt: new Date() },
      { recipient: mainUser._id, type: 'tag', sender: users[2]._id, content: 'tagged you in a post.', referenceLink: 'https://example.com/tag3', createdAt: new Date() },
      { recipient: mainUser._id, type: 'tag', sender: users[3]._id, content: 'tagged you in a post.', referenceLink: 'https://example.com/tag4', createdAt: new Date() },
      { recipient: mainUser._id, type: 'tag', sender: users[4]._id, content: 'tagged you in a post.', referenceLink: 'https://example.com/tag5', createdAt: new Date() },
      { recipient: mainUser._id, type: 'tag', sender: users[0]._id, content: 'tagged you in a post.', referenceLink: 'https://example.com/tag6', createdAt: new Date() },
      { recipient: mainUser._id, type: 'tag', sender: users[1]._id, content: 'tagged you in a post.', referenceLink: 'https://example.com/tag7', createdAt: new Date() },
      { recipient: mainUser._id, type: 'tag', sender: users[2]._id, content: 'tagged you in a post.', referenceLink: 'https://example.com/tag8', createdAt: new Date() },
      { recipient: mainUser._id, type: 'tag', sender: users[3]._id, content: 'tagged you in a post.', referenceLink: 'https://example.com/tag9', createdAt: new Date() },
      { recipient: mainUser._id, type: 'tag', sender: users[4]._id, content: 'tagged you in a post.', referenceLink: 'https://example.com/tag10', createdAt: new Date() },
    
      // login_alert (10)
      { recipient: mainUser._id, type: 'login_alert', content: 'New login detected from Mumbai, India. Is this you?', createdAt: new Date() },
      { recipient: mainUser._id, type: 'login_alert', content: 'New login detected from Delhi, India. Is this you?', createdAt: new Date() },
      { recipient: mainUser._id, type: 'login_alert', content: 'New login detected from Tokyo, Japan. Is this you?', createdAt: new Date() },
      { recipient: mainUser._id, type: 'login_alert', content: 'New login detected from New York, USA. Is this you?', createdAt: new Date() },
      { recipient: mainUser._id, type: 'login_alert', content: 'New login detected from Sydney, Australia. Is this you?', createdAt: new Date() },
      { recipient: mainUser._id, type: 'login_alert', content: 'New login detected from London, UK. Is this you?', createdAt: new Date() },
      { recipient: mainUser._id, type: 'login_alert', content: 'New login detected from Berlin, Germany. Is this you?', createdAt: new Date() },
      { recipient: mainUser._id, type: 'login_alert', content: 'New login detected from Dubai, UAE. Is this you?', createdAt: new Date() },
      { recipient: mainUser._id, type: 'login_alert', content: 'New login detected from Paris, France. Is this you?', createdAt: new Date() },
      { recipient: mainUser._id, type: 'login_alert', content: 'New login detected from San Francisco, USA. Is this you?', createdAt: new Date() },
    
      // group_invitation (10)
      { recipient: mainUser._id, type: 'group_invitation', sender: users[1]._id, content: 'invited you to join their group.', referenceLink: 'https://example.com/group1', createdAt: new Date() },
      { recipient: mainUser._id, type: 'group_invitation', sender: users[2]._id, content: 'invited you to join their group.', referenceLink: 'https://example.com/group2', createdAt: new Date() },
      { recipient: mainUser._id, type: 'group_invitation', sender: users[3]._id, content: 'invited you to join their group.', referenceLink: 'https://example.com/group3', createdAt: new Date() },
      { recipient: mainUser._id, type: 'group_invitation', sender: users[4]._id, content: 'invited you to join their group.', referenceLink: 'https://example.com/group4', createdAt: new Date() },
      { recipient: mainUser._id, type: 'group_invitation', sender: users[0]._id, content: 'invited you to join their group.', referenceLink: 'https://example.com/group5', createdAt: new Date() },
      { recipient: mainUser._id, type: 'group_invitation', sender: users[1]._id, content: 'invited you to join their group.', referenceLink: 'https://example.com/group6', createdAt: new Date() },
      { recipient: mainUser._id, type: 'group_invitation', sender: users[2]._id, content: 'invited you to join their group.', referenceLink: 'https://example.com/group7', createdAt: new Date() },
      { recipient: mainUser._id, type: 'group_invitation', sender: users[3]._id, content: 'invited you to join their group.', referenceLink: 'https://example.com/group8', createdAt: new Date() },
      { recipient: mainUser._id, type: 'group_invitation', sender: users[4]._id, content: 'invited you to join their group.', referenceLink: 'https://example.com/group9', createdAt: new Date() },
      { recipient: mainUser._id, type: 'group_invitation', sender: users[0]._id, content: 'invited you to join their group.', referenceLink: 'https://example.com/group10', createdAt: new Date() },
    ]);
    
    res.status(200).json({
      success: true,
      message: 'Database seeded successfully',
      data: { mainUser, users, notifications }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));