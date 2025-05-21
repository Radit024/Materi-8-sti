
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowRight, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartItem from '@/components/CartItem';
import { getCartItems, getCartTotal, clearCart } from '@/lib/data';
import { Product } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

const Cart = () => {
  const [cartItems, setCartItems] = useState<{ product: Product, quantity: number }[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  
  // Load cart data
  const loadCart = () => {
    const items = getCartItems();
    setCartItems(items);
    setCartTotal(getCartTotal());
  };
  
  useEffect(() => {
    loadCart();
  }, []);
  
  const handleClearCart = () => {
    clearCart();
    loadCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-farm-light-cream">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-farm-dark-green mb-6">Your Shopping Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                    <h2 className="text-xl font-medium text-farm-dark-green">
                      Cart Items ({cartItems.reduce((total, item) => total + item.quantity, 0)})
                    </h2>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 flex items-center gap-2"
                      onClick={handleClearCart}
                    >
                      <Trash2 size={16} />
                      Clear Cart
                    </Button>
                  </div>
                  
                  {/* Cart Items List */}
                  {cartItems.map((item) => (
                    <CartItem 
                      key={item.product.id} 
                      product={item.product} 
                      quantity={item.quantity} 
                      onUpdate={loadCart}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-medium text-farm-dark-green mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-farm-medium-green">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-farm-medium-green">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="flex justify-between text-farm-medium-green">
                      <span>Tax</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between font-bold text-farm-dark-green">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-farm-dark-green text-farm-light-cream hover:bg-farm-medium-green flex items-center justify-center gap-2">
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </Button>
                  
                  <div className="mt-6 text-center">
                    <Link to="/products" className="text-farm-medium-green hover:text-farm-dark-green text-sm inline-flex items-center">
                      <ShoppingCart size={14} className="mr-1" />
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingCart size={64} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-medium text-farm-dark-green mb-2">Your cart is empty</h2>
            <p className="text-farm-medium-green mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products">
              <Button className="bg-farm-dark-green text-farm-light-cream hover:bg-farm-medium-green">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
