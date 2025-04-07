import {FaUsers, FaComment, FaVideo, FaBell, FaBars } from 'react-icons/fa';
import NavIcon from '../ui/NavIcon';
import hyt from "../../assets/hyt.png"

const Navbar = ({ unreadCount, toggleNotifications, showNotifications }) => {
  return (
    <div className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Left section */}
        <div className="flex items-center">         
          <img 
            src={hyt} 
            alt="HYT Logo" 
            className="h-8 w-auto"
          />
          <div className="hidden md:flex rounded-full bg-gray-100 px-3 py-2">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none w-60"
            />
          </div>
        </div>

        {/* Middle section - navigation icons */}
        <div className="flex flex-1 justify-center">
          <div className="flex space-x-1 md:space-x-2">
            <NavIcon icon={<FaUsers />} active={false} />
            <NavIcon icon={<FaComment />} active={false} />
            <NavIcon icon={<FaVideo />} active={false} />
            <NavIcon 
              icon={<FaBell />} 
              active={showNotifications} 
              onClick={toggleNotifications} 
              badge={unreadCount > 0 ? unreadCount : null}
            />
            <NavIcon icon={<FaBars />} active={false} />
          </div>
        </div>

     {/* Right section - profile */}
        <div className="flex items-center">
          {(
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                <div className="h-full w-full bg-gray-300 flex items-center justify-center text-gray-600">
                  U
                </div>
              </div>
              <span className="hidden md:block font-medium">User</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;