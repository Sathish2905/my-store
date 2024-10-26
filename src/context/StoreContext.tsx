import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, CartItem, WishlistItem } from '../types';

export interface StoreContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  wishlist: WishlistItem[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  addCategory: (name: string) => void;
  addSubCategory: (categoryId: string, name: string) => void;
  deleteCategory: (id: string) => void;
  deleteSubCategory: (categoryId: string, subCategoryId: string) => void;
  setSearchQuery: (query: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    subCategories: [
      { id: '1-1', name: 'Phones', categoryId: '1' },
      { id: '1-2', name: 'Laptops', categoryId: '1' },
    ],
  },
  {
    id: '2',
    name: 'Clothing',
    subCategories: [
      { id: '2-1', name: 'Men', categoryId: '2' },
      { id: '2-2', name: 'Women', categoryId: '2' },
    ],
  },
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro',
    description: 'Latest iPhone with amazing features',
    price: 999,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800',
    categoryId: '1',
    subCategoryId: '1-1',
  },
  {
    id: '2',
    title: 'MacBook Pro',
    description: 'Powerful laptop for professionals',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    categoryId: '1',
    subCategoryId: '1-2',
  },
];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem('products');
    return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const stored = localStorage.getItem('categories');
    return stored ? JSON.parse(stored) : INITIAL_CATEGORIES;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const stored = localStorage.getItem('wishlist');
    return stored ? JSON.parse(stored) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [products, categories, cart, wishlist]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (product: Product) => {
    setProducts(products.map((p) => (p.id === product.id ? product : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const addToCart = (productId: string) => {
    const existingItem = cart.find((item) => item.productId === productId);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { productId, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.productId !== productId));
  };

  const toggleWishlist = (productId: string) => {
    const exists = wishlist.some((item) => item.productId === productId);
    if (exists) {
      setWishlist(wishlist.filter((item) => item.productId !== productId));
    } else {
      setWishlist([...wishlist, { productId }]);
    }
  };

  const addCategory = (name: string) => {
    const newCategory = {
      id: Date.now().toString(),
      name,
      subCategories: [],
    };
    setCategories([...categories, newCategory]);
  };

  const addSubCategory = (categoryId: string, name: string) => {
    const newSubCategory = {
      id: `${categoryId}-${Date.now()}`,
      name,
      categoryId,
    };
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, subCategories: [...cat.subCategories, newSubCategory] }
          : cat
      )
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const deleteSubCategory = (categoryId: string, subCategoryId: string) => {
    setCategories(
      categories.map((cat) =>
        cat.id === categoryId
          ? { ...cat, subCategories: cat.subCategories.filter((sub) => sub.id !== subCategoryId) }
          : cat
      )
    );
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        cart,
        wishlist,
        addProduct,
        updateProduct,
        deleteProduct,
        addToCart,
        removeFromCart,
        toggleWishlist,
        addCategory,
        addSubCategory,
        deleteCategory,
        deleteSubCategory,
        setSearchQuery,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
