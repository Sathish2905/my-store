import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export function CategoryNav() {
  const { categories, setSearchQuery } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<string | null>(null);

  const toggleMobileMenu = (categoryId: string) => {
    setMobileMenuOpen(mobileMenuOpen === categoryId ? null : categoryId);
  };

  return (
    <nav className="bg-gray-100 border-b">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-4 h-12">
          {categories.map((category) => (
            <div key={category.id} className="group relative">
              <button 
                className="text-gray-600 hover:text-gray-900 font-medium flex items-center text-sm whitespace-nowrap"
                onClick={() => setSearchQuery(category.name)}
              >
                {category.name}
                {category.subCategories.length > 0 && (
                  <ChevronDownIcon className="h-4 w-4 ml-1" />
                )}
              </button>
              {category.subCategories.length > 0 && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                  {category.subCategories.map((sub) => (
                    <a
                      key={sub.id}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={(e) => {
                        e.preventDefault();
                        setSearchQuery(sub.name);
                      }}
                    >
                      {sub.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          {categories.map((category) => (
            <div key={category.id} className="border-b border-gray-200">
              <button
                className="w-full py-4 px-2 flex justify-between items-center text-gray-600 hover:text-gray-900 font-medium"
                onClick={() => {
                  toggleMobileMenu(category.id);
                  setSearchQuery(category.name);
                }}
              >
                {category.name}
                <ChevronDownIcon
                  className={`h-5 w-5 transform transition-transform duration-200 ${
                    mobileMenuOpen === category.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {category.subCategories.length > 0 && mobileMenuOpen === category.id && (
                <div className="bg-gray-50 py-2">
                  {category.subCategories.map((sub) => (
                    <a
                      key={sub.id}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={(e) => {
                        e.preventDefault();
                        setSearchQuery(sub.name);
                      }}
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
    </nav>
  );
}
