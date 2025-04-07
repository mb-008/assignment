import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Bell, Check,User, Heart, MessageSquare,
  Tag, Lock, Users, Search, Menu, Settings, Home
} from 'react-feather';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const dropdownRef = useRef(null);

  const fetchNotifications = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/notifications?page=${page}&limit=${pagination.limit}`);
      setNotifications(prev => page === 1 ? response.data.data : [...prev, ...response.data.data]);
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
    } else {
      setPagination(prev => ({ ...prev, page: 1 }));
    }
  }, [isOpen]);

  const handleLoadMore = () => {
    fetchNotifications(pagination.page + 1);
  };

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

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification._id, { stopPropagation: () => {} });
    }
  };

  const getNotificationIcon = (type) => {
    const iconClass = "w-2 h-2 text-gray-600";
    switch (type) {
      case 'friend_request':
        return <User className={iconClass} />;
      case 'post_like':
        return <Heart className={`${iconClass} text-pink-500`} />;
      case 'comment':
        return <MessageSquare className={`${iconClass} text-blue-500`} />;
      case 'tag':
        return <Tag className={`${iconClass} text-green-500`} />;
      case 'login_alert':
        return <Lock className={`${iconClass} text-yellow-500`} />;
      case 'group_invitation':
        return <Users className={`${iconClass} text-purple-500`} />;
      default:
        return <Bell className={`${iconClass} text-indigo-500`} />;
    }
  };


  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex items-center space-x-5 px-5 py-2 rounded-full shadow-md">
      <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
        <Home className="w-5 h-5 text-gray-600" />
      </button>
      <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
        <Search className="w-5 h-5 text-gray-600" />
      </button>
      <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
        <Settings className="w-5 h-5 text-gray-600" />
      </button>
      <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
        <Menu className="w-5 h-5 text-gray-600" />
      </button>
      
      <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

      <div className="relative" ref={dropdownRef}>
        

        {isOpen && (
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-gray-800 text-lg text-center w-full">Notifications</h3>
              <div className="absolute right-4 flex space-x-3">
                <button
                  onClick={markAllAsRead}
                  className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Mark all read
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 && !loading ? (
                <div className="p-6 text-center">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">No new notifications</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100 mb-5">
                  {notifications.map(notification => (
                    <li
                      key={notification._id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`p-4  hover:bg-gray-50 transition-colors cursor-pointer ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex items-center justify-center h-10 w-10 rounded-full ${
                          !notification.read
                            ? 'bg-blue-100 border-2 border-blue-200'
                            : 'bg-gray-100 border-2 border-gray-200'
                        }`}>
                          {getNotificationIcon(notification.type)}
                        </div>

                        <div className="flex-1">
                          <p className="text-sm text-gray-800">
                            <span className="font-semibold">{notification.sender?.name || 'System'}</span>: {notification.content}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notification.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} at {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>

                        {!notification.read && (
                          <button
                            onClick={(e) => markAsRead(notification._id, e)}
                            className="text-gray-400 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50"
                            title="Mark as read"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {loading && (
                <div className="p-4 text-center">
                  <p className="text-sm text-gray-400 mt-2">Loading notifications...</p>
                </div>
              )}

              {hasMore && !loading && (
                <div className="p-3 border-t border-gray-100 flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors font-medium"
                  >
                    Load more
                  </button>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
