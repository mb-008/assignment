// src/components/Navbar.js
import React from 'react';
import NotificationDropdown from './NotificationDropdown';

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <div className="flex items-center">
            <span className="text-lg font-medium text-gray-800">Social</span>
          </div>
          <div className="flex items-center space-x-3">
            <NotificationDropdown />
            <div className="ml-2 flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">U1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;