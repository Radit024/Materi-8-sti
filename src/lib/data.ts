
import { Product, Category } from './types';

export const categories: Category[] = [
  { id: '1', name: 'Vegetables' },
  { id: '2', name: 'Fruits' },
  { id: '3', name: 'Dairy' },
  { id: '4', name: 'Meat' },
  { id: '5', name: 'Grains' },
  { id: '6', name: 'Honey & Preserves' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Carrots (Bundle)',
    price: 3.99,
    description: 'Fresh organic carrots harvested from our local farms. Perfect for salads, juicing, or cooking.',
    image_url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5d4f1',
    created_at: '2023-01-01T00:00:00Z',
    created_by: 'admin',
    category: '1',
    is_featured: true,
    stock: 50
  },
  {
    id: '2',
    name: 'Fresh Strawberries (1lb)',
    price: 4.99,
    description: 'Sweet and juicy strawberries, perfect for desserts or eating fresh.',
    image_url: 'https://images.unsplash.com/photo-1518635017480-01eb8c2aa3da',
    created_at: '2023-01-02T00:00:00Z',
    created_by: 'admin',
    category: '2',
    is_featured: true,
    stock: 30
  },
  {
    id: '3',
    name: 'Artisanal Goat Cheese',
    price: 6.50,
    description: 'Creamy goat cheese made with milk from our free-range goats. Perfect spread on crackers or bread.',
    image_url: 'https://images.unsplash.com/photo-1559561853-08451507cbe7',
    created_at: '2023-01-03T00:00:00Z',
    created_by: 'admin',
    category: '3',
    is_featured: true,
    stock: 20
  },
  {
    id: '4',
    name: 'Farm Fresh Eggs (Dozen)',
    price: 5.25,
    description: 'Free-range, organic eggs from our happy hens. Packed with nutrition and flavor.',
    image_url: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9',
    created_at: '2023-01-04T00:00:00Z',
    created_by: 'admin',
    category: '3',
    is_featured: false,
    stock: 40
  },
  {
    id: '5',
    name: 'Grass-Fed Ground Beef (1lb)',
    price: 8.99,
    description: 'Grass-fed, ethically raised beef from our local farms. No antibiotics or hormones.',
    image_url: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976',
    created_at: '2023-01-05T00:00:00Z',
    created_by: 'admin',
    category: '4',
    is_featured: true,
    stock: 25
  },
  {
    id: '6',
    name: 'Organic Spinach (8oz)',
    price: 3.50,
    description: 'Fresh, organic spinach leaves. Perfect for salads, smoothies, or cooking.',
    image_url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
    created_at: '2023-01-06T00:00:00Z',
    created_by: 'admin',
    category: '1',
    is_featured: false,
    stock: 35
  },
  {
    id: '7',
    name: 'Wildflower Honey (16oz)',
    price: 7.99,
    description: 'Pure, raw honey harvested from our local beehives. Floral and sweet with natural health benefits.',
    image_url: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924',
    created_at: '2023-01-07T00:00:00Z',
    created_by: 'admin',
    category: '6',
    is_featured: true,
    stock: 15
  },
  {
    id: '8',
    name: 'Organic Quinoa (1lb)',
    price: 5.99,
    description: 'Nutritious, organic quinoa. A complete protein source that's perfect for any meal.',
    image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac',
    created_at: '2023-01-08T00:00:00Z',
    created_by: 'admin',
    category: '5',
    is_featured: false,
    stock: 30
  }
];

// Helper function to get products by category
export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
}

// Helper function to get featured products
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.is_featured);
}

// Helper function to get a product by id
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
}

// Mock cart data
export const cart: { items: { [productId: string]: number } } = {
  items: {}
};

// Helper functions for cart management
export const addToCart = (productId: string, quantity: number = 1): void => {
  if (cart.items[productId]) {
    cart.items[productId] += quantity;
  } else {
    cart.items[productId] = quantity;
  }
}

export const removeFromCart = (productId: string): void => {
  if (cart.items[productId]) {
    delete cart.items[productId];
  }
}

export const updateCartQuantity = (productId: string, quantity: number): void => {
  if (quantity <= 0) {
    removeFromCart(productId);
  } else {
    cart.items[productId] = quantity;
  }
}

export const getCartItems = (): { product: Product, quantity: number }[] => {
  return Object.entries(cart.items).map(([productId, quantity]) => {
    const product = getProductById(productId);
    if (!product) throw new Error(`Product with id ${productId} not found`);
    return { product, quantity };
  });
}

export const getCartTotal = (): number => {
  return getCartItems().reduce((total, { product, quantity }) => {
    return total + (product.price * quantity);
  }, 0);
}

export const clearCart = (): void => {
  cart.items = {};
}
