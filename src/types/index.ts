export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  subCategoryId?: string;
}

export interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  categoryId: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
}