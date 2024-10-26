import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';

export function Navbar() {
  const { user, logout } = useAuth();
  const { cart, wishlist } = useStore();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              ModernShop
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user && (
              <>
                <Link
                  to="/cart"
                  className="relative p-2 text-gray-600 hover:text-gray-900"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cart.length}
                    </span>
                  )}
                </Link>
                <Link
                  to="/wishlist"
                  className="relative p-2 text-gray-600 hover:text-gray-900"
                >
                  <Heart className="h-6 w-6" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </>
            )}
            {!user && (
              <Link to="/login" className="p-2 text-gray-600 hover:text-gray-900">
                <User className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}