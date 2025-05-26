import React, { useState } from 'react';
import { Menu, Bell, BarChart2, Package, Users, ShoppingBag, Home, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import Badge from '../ui/Badge';

interface NavBarProps {
  onNavChange: (nav: string) => void;
  currentNav: string;
}

const NavBar: React.FC<NavBarProps> = ({ onNavChange, currentNav }) => {
  const { notifications } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const unreadNotifications = notifications.filter(n => !n.read);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'suppliers', label: 'Suppliers', icon: <Users size={20} /> },
    { id: 'products', label: 'Products', icon: <Package size={20} /> },
    { id: 'prices', label: 'Price Tracker', icon: <BarChart2 size={20} /> },
    { id: 'compare', label: 'Compare Prices', icon: <ShoppingBag size={20} /> },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <BarChart2 className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">PriceTracker</span>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavChange(item.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-md flex items-center transition-colors ${
                    currentNav === item.id
                      ? 'bg-blue-900 text-white'
                      : 'text-blue-100 hover:bg-blue-700'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="p-2 rounded-full text-blue-100 hover:bg-blue-700 relative"
              >
                <Bell size={20} />
                {unreadNotifications.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-xs font-bold text-white">
                    {unreadNotifications.length}
                  </span>
                )}
              </button>
              
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 text-gray-800">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-sm font-medium">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-500">
                        No notifications
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start">
                            <div className="flex-1">
                              <p className="text-sm">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(notification.date).toLocaleString()}
                              </p>
                            </div>
                            <Badge
                              variant={
                                notification.type === 'success'
                                  ? 'success'
                                  : notification.type === 'warning'
                                  ? 'warning'
                                  : notification.type === 'error'
                                  ? 'danger'
                                  : 'primary'
                              }
                            >
                              {notification.type}
                            </Badge>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden ml-2">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-blue-100 hover:bg-blue-700 focus:outline-none"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-900 shadow-inner">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="flex justify-end px-4">
              <button 
                onClick={toggleMobileMenu}
                className="text-blue-100 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavChange(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left flex items-center ${
                  currentNav === item.id
                    ? 'bg-blue-800 text-white'
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;