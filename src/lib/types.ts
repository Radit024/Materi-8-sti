
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  created_at: string;
  created_by: string;
  category: string;
  is_featured: boolean;
  stock: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
}

export interface CartItem {
  id: string;
  product_id: string;
  user_id: string;
  quantity: number;
  product: Product;
}

export interface Category {
  id: string;
  name: string;
}

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  is_seller: boolean;
  created_at: string;
}
