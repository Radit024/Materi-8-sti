
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { updateCartQuantity, removeFromCart } from '@/lib/data';

interface CartItemProps {
  product: Product;
  quantity: number;
  onUpdate: () => void;
}

const CartItem = ({ product, quantity, onUpdate }: CartItemProps) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setItemQuantity(newQuantity);
    updateCartQuantity(product.id, newQuantity);
    onUpdate();
  };

  const handleRemove = () => {
    removeFromCart(product.id);
    onUpdate();
  };

  return (
    <div className="flex flex-col md:flex-row items-center py-6 border-b border-gray-200">
      {/* Product Image */}
      <div className="w-full md:w-24 h-24 mb-4 md:mb-0 mr-0 md:mr-4">
        <img 
          src={product.image_url} 
          alt={product.name} 
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      
      {/* Product Details */}
      <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
        <Link to={`/products/${product.id}`} className="text-lg font-medium text-farm-dark-green hover:underline">
          {product.name}
        </Link>
        <p className="text-sm text-farm-medium-green mt-1">
          ${product.price.toFixed(2)} each
        </p>
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center space-x-2 mb-4 md:mb-0 md:mr-8">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => handleQuantityChange(itemQuantity - 1)}
          disabled={itemQuantity <= 1}
        >
          <Minus size={16} />
        </Button>
        
        <span className="w-10 text-center">{itemQuantity}</span>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => handleQuantityChange(itemQuantity + 1)}
        >
          <Plus size={16} />
        </Button>
      </div>
      
      {/* Price */}
      <div className="text-right md:w-32 font-medium mb-4 md:mb-0">
        ${(product.price * itemQuantity).toFixed(2)}
      </div>
      
      {/* Remove Button */}
      <div className="ml-0 md:ml-4">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={handleRemove}
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
