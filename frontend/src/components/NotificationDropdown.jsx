// src/components/NotificationDropdown.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bell, Check, X, User, Heart, MessageSquare, Tag, Lock, Users } from 'react-feather';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch notifications function remains the same
  // Mark as read functions remain the same

  const fetchNotifications = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/notifications?page=${page}&limit=${pagination.limit}`);
      setNotifications(prev => [...prev, ...response.data.data]);
      setPagination(response.data.pagination);
      setHasMore(response.data.pagination.page < response.data.pagination.pages);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  const handleLoadMore = () => {
    fetchNotifications(pagination.page + 1);
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/notifications/${id}/read`);
      setNotifications(notifications.map(n => 
        n._id === id ? { ...n, isRead: true } : n
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.patch('http://localhost:5000/api/notifications/read-all');
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };


  const getNotificationIcon = (type) => {
    const iconClass = "w-4 h-4 text-gray-500";
    switch (type) {
      case 'friend_request':
        return <User className={iconClass} />;
      case 'post_like':
        return <Heart className={iconClass} />;
      case 'comment':
        return <MessageSquare className={iconClass} />;
      case 'tag':
        return <Tag className={iconClass} />;
      case 'login_alert':
        return <Lock className={iconClass} />;
      case 'group_invitation':
        return <Users className={iconClass} />;
      default:
        return <Bell className={iconClass} />;
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {notifications.some(n => !n.isRead) && (
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 z-50 transform origin-top transition-all duration-150 ease-out">
          <div className="p-3 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-medium text-gray-800">Notifications</h3>
            <div className="flex space-x-2">
              <button 
                onClick={markAllAsRead}
                className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
              >
                Mark all read
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 && !loading ? (
              <div className="p-4 text-center text-gray-400 text-sm">No new notifications</div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {notifications.map(notification => (
                  <li 
                    key={notification._id} 
                    className={`p-3 hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className="flex items-start space-x-2">
                      <div className={`mt-0.5 p-1.5 rounded-full ${!notification.isRead ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium text-gray-800">
                            {notification.sender?.name || 'System'}
                          </p>
                          <span className="text-xs text-gray-400">
                            {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {notification.content}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <button 
                          onClick={() => markAsRead(notification._id)}
                          className="text-gray-300 hover:text-gray-500 transition-colors mt-0.5"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {loading && (
              <div className="p-3 text-center">
                <div className="animate-pulse text-xs text-gray-400">Loading...</div>
              </div>
            )}
            {hasMore && !loading && (
              <div className="p-2 text-center border-t border-gray-100">
                <button 
                  onClick={handleLoadMore}
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Show more
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;