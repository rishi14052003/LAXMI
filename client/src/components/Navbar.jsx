import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-8 w-8 text-pink-600" />
              <span className="font-playfair text-xl md:text-2xl font-bold text-gray-900">
                Laxmi Sarees
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/category/silk"
              className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Silk
            </Link>
            <Link
              to="/category/cotton"
              className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Cotton
            </Link>
            <Link
              to="/category/bridal"
              className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Bridal
            </Link>
            <Link
              to="/category/designer"
              className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Designer
            </Link>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <User className="h-5 w-5 text-pink-600" />
                <span className="text-sm font-medium text-gray-700">
                  {user?.fullName || user?.username}
                </span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-10">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">{user?.fullName || user?.username}</p>
                    <p className="text-xs text-gray-600">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile User Profile */}
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <User className="h-6 w-6 text-pink-600" />
            </button>
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-pink-600 p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile User Menu */}
        {showUserMenu && (
          <div className="md:hidden bg-gray-50 border-t border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-900 mb-1">{user?.fullName || user?.username}</p>
            <p className="text-xs text-gray-600 mb-3">{user?.email}</p>
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded flex items-center space-x-2 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        )}

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                to="/"
                className="text-gray-700 hover:text-pink-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/category/silk"
                className="text-gray-700 hover:text-pink-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Silk
              </Link>
              <Link
                to="/category/cotton"
                className="text-gray-700 hover:text-pink-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Cotton
              </Link>
              <Link
                to="/category/bridal"
                className="text-gray-700 hover:text-pink-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Bridal
              </Link>
              <Link
                to="/category/designer"
                className="text-gray-700 hover:text-pink-600 block px-3 py-2 text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Designer
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
