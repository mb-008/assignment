import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import NotificationPanel from '../components/notifications/notificationPanel';
import { useNotifications } from '../hooks/useNotifications';

const Home = () => {

  const [showNotifications, setShowNotifications] = useState(false);

  
  const {
    notifications,
    loading,
    hasMore,
    unreadCount,
    markAsRead,
    markAllAsRead,
    loadMore
  } = useNotifications("67f32bbe495c2f1f6f0bd4f5");

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar 
        unreadCount={unreadCount}
        toggleNotifications={toggleNotifications}
        showNotifications={showNotifications}
      />
      
      <div className="container mx-auto pt-20 p-4">
  {showNotifications ? (
    <NotificationPanel
      notifications={notifications}
      loading={loading}
      markAsRead={markAsRead}
      markAllAsRead={markAllAsRead}
      loadMore={loadMore}
      hasMore={hasMore}
    />
  ) : (
    <>
      <h1 className="text-2xl font-bold">Notifications Demo</h1>
      <p className="mt-2">Click on the notification icon in the navbar to see your notifications.</p>
    </>
  )}
</div>

    </div>
  );
};

export default Home;