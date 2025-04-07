import React from 'react';
import { useNotifications } from '../../hooks/useNotifications';
import  Button  from '../ui/Button';


const NotificationPanel = ({ userId}) => {
  const { 
    notifications, 
    loading, 
    error, 
    hasMore, 
    loadMore,
    markAsRead,
    markAllAsRead 
  } = useNotifications(userId || "67f2b2f6745628933a354d16");

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="notification-panel">
      <div className="notification-header">
        <h2>Notifications</h2>
        {notifications.length > 0 && (
          <Button 
            variant="text" 
            size="sm" 
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        )}
      </div>

      <div className="notification-list">
        {notifications.length === 0 ? (
          <div className="empty-state">No notifications</div>
        ) : (
          notifications.map(notification => (
            <div 
            key={notification._id} 
            className={`p-4 mb-2 rounded-lg shadow cursor-pointer transition 
                        ${notification.read ? 'bg-gray-100' : 'bg-blue-100'}`}
            onClick={() => markAsRead(notification._id)}
          >
            <div className="flex items-center space-x-2">
              <span className="text-xl">{notification.type}</span>
              <span className="font-medium">{notification.content}</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {new Date(notification.createdAt).toLocaleString()}
            </div>
          </div>
          ))
        )}
      </div>

      {hasMore && (
        <div className="load-more">
          <Button
            variant="text"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load more'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;