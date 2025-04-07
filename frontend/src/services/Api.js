import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Notification services
export const notificationService = {
  getNotifications: async (userId = '67f327b2495c2f1f6f0bd4f5', page = 1, limit = 10) => {
    try {
    const response = await api.get(`/notifications?userId=${userId}&page=${page}&limit=${limit}`);
    console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error in getNotifications:', error);
      throw error;
    }
  },

  markAsRead: async (notificationId) => {
    try {
      const response = await api.patch(`/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  markAllAsRead: async (userId = '67f327b2495c2f1f6f0bd4f5') => {
    try {
      const response = await api.patch(`/notifications/read-all?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};