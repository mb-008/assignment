import React from 'react';
import NotificationDropdown from './NotificationDropdown';

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 ">
    <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
      Notification System
    </h1>
    <div>
      <NotificationDropdown />
    </div>
  </div>
  
  );
};

export default Header;
