import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  
  const isInWishlist = wishlist.some((item) => item.productId === product.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
        <p className="mt-1 text-gray-500">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          <div className="flex space-x-2">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2 rounded-full ${
                isInWishlist
                  ? 'text-red-500 bg-red-50'
                  : 'text-gray-400 hover:text-red-500 bg-gray-50'
              }`}
            >
              <Heart className="h-5 w-5" />
            </button>
            <button
              onClick={() => addToCart(product.id)}
              className="p-2 rounded-full text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}