import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

export function Wishlist() {
  const { wishlist, products } = useStore();
  
  const wishlistItems = wishlist.map((item) => 
    products.find((p) => p.id === item.productId)!
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}