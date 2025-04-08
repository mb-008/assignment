import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Bell, User, Heart, MessageSquare,
  Tag, Lock, Users, Settings, Home
} from 'react-feather';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

 
  const fetchNotifications = async (isInitialLoad = false) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/notifications?page=${isInitialLoad ? 1 : page}&limit=${limit}`
      );
      
      if (isInitialLoad) {
        setNotifications(response.data.data);
      } else {
        setNotifications(prev => [...prev, ...response.data.data]);
      }
      
      setHasMore(response.data.pagination.page < response.data.pagination.pages);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Only for first Initial load
  useEffect(() => {
    fetchNotifications(true);
  }, []);

  // Load more after the initial load(to remove data redundacny)
  useEffect(() => {
    if (page > 1) {
      fetchNotifications();
    }
  }, [page]);

  const markAsRead = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/notifications/${id}/read`);
      setNotifications(notifications.map(n => 
        n._id === id ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.patch('http://localhost:5000/api/notifications/read-all');
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getNotificationIcon = (type) => {
    const iconClass = "w-5 h-5";
    switch (type) {
      case 'friend_request': return <User className={`${iconClass} text-blue-500`} />;
      case 'post_like': return <Heart className={`${iconClass} text-rose-500`} />;
      case 'comment': return <MessageSquare className={`${iconClass} text-emerald-500`} />;
      case 'tag': return <Tag className={`${iconClass} text-amber-500`} />;
      case 'login_alert': return <Lock className={`${iconClass} text-violet-500`} />;
      case 'group_invitation': return <Users className={`${iconClass} text-indigo-500`} />;
      default: return <Bell className={`${iconClass} text-gray-500`} />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 p-4 bg-white rounded-lg shadow-sm">
          <h1 className="text-xl font-bold text-gray-800">Check Your Notifications</h1>
          <div className="flex items-center space-x-4">
          <div className="flex space-x-3">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Home className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <User className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          <div className="relative">
            <div className="p-2 rounded-full bg-gray-100 relative">
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Panel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-2 border-gray-200 bg-gray-50">
        <button 
          onClick={markAllAsRead}
          className="w-full text-lg text-blue-600 hover:text-blue-800 font-medium py-2 border-4 rounded-lg border-blue-600 hover:border-blue-800"
        >
          Mark all as read
        </button>
      </div>

        <div className="divide-y divide-gray-100">
          {loading && notifications.length === 0 ? (
            <div className="p-8 text-center">
              <p className="mt-3 text-gray-500">Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-300 mx-auto" />
              <p className="mt-3 text-gray-500">No notifications found</p>
            </div>
          ) : (
            notifications.map(notification => (
              <div 
                key={notification._id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${
                    !notification.read ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-800">
                        {notification.sender?.name || 'System'}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {new Date(notification.createdAt).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{notification.content}</p>
                    <div className="mt-2 flex justify-between items-center">
                      {!notification.read && (
                        <button
                        onClick={() => {
                          markAsRead(notification._id);   
                          window.alert(`Marked notification for ${notification._id} as read`);  
                        }}
                          className="text-xs text-gray-400 hover:text-blue-600"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Pagination via Load More */}
        {hasMore && (
          <div className="p-4 border-t border-gray-200 text-center">
            <button
              onClick={() => setPage(prev => prev + 1)}
              disabled={loading}
              className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Load more'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default NotificationSystem;