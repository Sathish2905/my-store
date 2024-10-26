import React from 'react';
import { useStore } from '../context/StoreContext';

export function CategoryNav() {
  const { categories } = useStore();

  return (
    <div className="bg-gray-100 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center space-x-8 h-12 overflow-x-auto">
          {categories.map((category) => (
            <div key={category.id} className="group relative">
              <button className="text-gray-600 hover:text-gray-900 font-medium">
                {category.name}
              </button>
              {category.subCategories.length > 0 && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  {category.subCategories.map((sub) => (
                    <a
                      key={sub.id}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {sub.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}