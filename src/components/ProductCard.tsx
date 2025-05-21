
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/types';
import { addToCart } from '@/lib/data';
import { toast } from '@/hooks/use-toast';
import { categories } from '@/lib/data';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, price, image_url, category } = product;
  
  const categoryName = categories.find(c => c.id === category)?.name || '';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to detail page
    addToCart(id);
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link to={`/products/${id}`}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
          <img 
            src={image_url} 
            alt={name} 
            className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <div className="mb-2">
            <span className="text-xs font-medium text-farm-medium-green">{categoryName}</span>
          </div>
          <h3 className="font-medium text-lg text-farm-dark-green mb-1">{name}</h3>
          <p className="font-bold text-xl text-farm-dark-green">${price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button 
            onClick={handleAddToCart}
            className="bg-farm-dark-green text-farm-light-cream hover:bg-farm-medium-green w-full flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
