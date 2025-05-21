
import { Product } from './types';

// Sample categories data
export const categories = [
  { id: 'vegetables', name: 'Vegetables' },
  { id: 'fruits', name: 'Fruits' },
  { id: 'dairy', name: 'Dairy' },
  { id: 'meat', name: 'Meat' },
  { id: 'bakery', name: 'Bakery' },
  { id: 'beverages', name: 'Beverages' },
];

// Sample products data
export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Carrots',
    price: 2.99,
    description: 'Fresh, organic carrots grown locally. Perfect for salads, cooking, or snacking.',
    image_url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
    created_at: '2023-01-01T00:00:00Z',
    created_by: 'admin',
    category: 'vegetables',
    is_featured: true,
    stock: 50
  },
  {
    id: '2',
    name: 'Organic Apples',
    price: 3.99,
    description: 'Sweet and crisp organic apples. Great for snacking or baking.',
    image_url: 'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a',
    created_at: '2023-01-02T00:00:00Z',
    created_by: 'admin',
    category: 'fruits',
    is_featured: true,
    stock: 75
  },
  {
    id: '3',
    name: 'Farm Fresh Milk',
    price: 4.50,
    description: 'Fresh, pasteurized whole milk from grass-fed cows.',
    image_url: 'https://images.unsplash.com/photo-1563636619-e9143da7973b',
    created_at: '2023-01-03T00:00:00Z',
    created_by: 'admin',
    category: 'dairy',
    is_featured: false,
    stock: 30
  },
  {
    id: '4',
    name: 'Artisan Sourdough Bread',
    price: 5.99,
    description: 'Hand-crafted sourdough bread made with organic flour and traditional methods.',
    image_url: 'https://images.unsplash.com/photo-1555951015-6da899b5c2cd',
    created_at: '2023-01-04T00:00:00Z',
    created_by: 'admin',
    category: 'bakery',
    is_featured: true,
    stock: 15
  },
  {
    id: '5',
    name: 'Grass-fed Ground Beef',
    price: 8.99,
    description: 'Locally raised, grass-fed ground beef. Hormone and antibiotic free.',
    image_url: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f',
    created_at: '2023-01-05T00:00:00Z',
    created_by: 'admin',
    category: 'meat',
    is_featured: false,
    stock: 20
  },
  {
    id: '6',
    name: 'Organic Strawberries',
    price: 4.99,
    description: 'Sweet, juicy organic strawberries picked at peak ripeness.',
    image_url: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba',
    created_at: '2023-01-06T00:00:00Z',
    created_by: 'admin',
    category: 'fruits',
    is_featured: true,
    stock: 40
  },
  {
    id: '7',
    name: 'Organic Spinach',
    price: 3.49,
    description: 'Fresh, organic spinach. Packed with nutrients and perfect for salads or cooking.',
    image_url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
    created_at: '2023-01-07T00:00:00Z',
    created_by: 'admin',
    category: 'vegetables',
    is_featured: false,
    stock: 35
  },
  {
    id: '8',
    name: 'Artisan Cheese Selection',
    price: 12.99,
    description: 'A selection of handcrafted artisan cheeses from local dairies.',
    image_url: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b',
    created_at: '2023-01-08T00:00:00Z',
    created_by: 'admin',
    category: 'dairy',
    is_featured: true,
    stock: 15
  }
];

// Cart functionality
interface CartItem {
  productId: string;
  quantity: number;
}

// Local storage key for cart
const CART_STORAGE_KEY = 'farmstand_cart';

// Get cart from local storage
const getCart = (): CartItem[] => {
  const cartJson = localStorage.getItem(CART_STORAGE_KEY);
  return cartJson ? JSON.parse(cartJson) : [];
};

// Save cart to local storage
const saveCart = (cart: CartItem[]) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

// Add product to cart
export const addToCart = (productId: string, quantity = 1) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.productId === productId);
  
  if (existingItemIndex >= 0) {
    // Update quantity if product already in cart
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    cart.push({ productId, quantity });
  }
  
  saveCart(cart);
};

// Update quantity of item in cart
export const updateCartQuantity = (productId: string, quantity: number) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.productId === productId);
  
  if (existingItemIndex >= 0 && quantity > 0) {
    cart[existingItemIndex].quantity = quantity;
    saveCart(cart);
  }
};

// Remove item from cart
export const removeFromCart = (productId: string) => {
  const cart = getCart().filter(item => item.productId !== productId);
  saveCart(cart);
};

// Get all cart items with product details
export const getCartItems = () => {
  const cart = getCart();
  return cart.map(item => {
    const product = getProductById(item.productId);
    return {
      product: product || { 
        id: item.productId, 
        name: 'Product not found', 
        price: 0, 
        description: '', 
        image_url: '', 
        created_at: '', 
        created_by: '',
        category: '',
        is_featured: false,
        stock: 0
      },
      quantity: item.quantity
    };
  }).filter(item => item.product.id !== 'Product not found');
};

// Calculate cart total
export const getCartTotal = () => {
  const cartItems = getCartItems();
  return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};

// Clear entire cart
export const clearCart = () => {
  saveCart([]);
};

// Get product by ID
export const getProductById = (id: string): Product | null => {
  return products.find(product => product.id === id) || null;
};

// Get products by category
export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

// Get featured products
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.is_featured);
};

// Add a simple function to clean up product references after deletion
export const removeDeletedProductReferences = (productId: string) => {
  // In a real Supabase app, this would be handled by database triggers or cascade deletes
  // For now, let's remove the item from any carts
  const cart = getCart();
  const updatedCart = cart.filter(item => item.productId !== productId);
  saveCart(updatedCart);
};
