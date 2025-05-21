
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Minus, 
  Plus, 
  ArrowLeft,
  Truck,
  ShieldCheck,
  Leaf
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProductById, addToCart, getProductsByCategory } from '@/lib/data';
import { Product } from '@/lib/types';
import { toast } from '@/hooks/use-toast';
import ProductCard from '@/components/ProductCard';
import { categories } from '@/lib/data';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call
      const foundProduct = getProductById(id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Get related products from the same category
        const related = getProductsByCategory(foundProduct.category)
          .filter(p => p.id !== foundProduct.id)
          .slice(0, 4);
        
        setRelatedProducts(related);
      }
      
      setLoading(false);
    }
  }, [id]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
      toast({
        title: "Added to cart",
        description: `${quantity} × ${product.name} has been added to your cart.`,
        duration: 3000,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-farm-light-cream">
        <Navbar />
        <div className="container mx-auto py-16 text-center">
          <div className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-farm-light-cream">
        <Navbar />
        <div className="container mx-auto py-16 text-center">
          <h1 className="text-3xl font-bold text-farm-dark-green mb-4">Product Not Found</h1>
          <p className="text-farm-medium-green mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products">
            <Button className="bg-farm-dark-green text-farm-light-cream hover:bg-farm-medium-green">
              <ArrowLeft size={16} className="mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const categoryName = categories.find(c => c.id === product.category)?.name || '';

  return (
    <div className="min-h-screen bg-farm-light-cream">
      <Navbar />
      
      <main className="container mx-auto py-8 px-4">
        {/* Breadcrumbs */}
        <div className="mb-6 text-sm">
          <Link to="/" className="text-farm-medium-green hover:text-farm-dark-green">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/products" className="text-farm-medium-green hover:text-farm-dark-green">Products</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to={`/products?category=${product.category}`} className="text-farm-medium-green hover:text-farm-dark-green">
            {categoryName}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-farm-dark-green">{product.name}</span>
        </div>
        
        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="p-4 md:p-8">
              <div className="aspect-w-1 aspect-h-1 w-full bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Product Info */}
            <div className="p-4 md:p-8 flex flex-col">
              <div className="mb-2">
                <span className="text-sm font-medium text-farm-medium-green">
                  {categoryName}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-farm-dark-green mb-2">
                {product.name}
              </h1>
              
              <div className="text-2xl font-bold text-farm-dark-green mb-6">
                ${product.price.toFixed(2)}
              </div>
              
              <div className="prose text-farm-medium-green mb-8">
                <p>{product.description}</p>
              </div>
              
              {/* Stock Status */}
              <div className="mb-6">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center mb-6">
                <span className="mr-4 text-farm-dark-green font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-none"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>
                  
                  <span className="w-12 text-center">{quantity}</span>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-none"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
              
              {/* Add to Cart */}
              <Button 
                size="lg" 
                className="bg-farm-dark-green text-farm-light-cream hover:bg-farm-medium-green flex items-center gap-2 mb-8"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </Button>
              
              {/* Product Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-auto">
                <div className="flex flex-col items-center text-center p-3">
                  <Truck size={24} className="text-farm-dark-green mb-2" />
                  <span className="text-sm font-medium text-farm-medium-green">Free Delivery</span>
                  <span className="text-xs text-gray-500">On orders over $50</span>
                </div>
                
                <div className="flex flex-col items-center text-center p-3">
                  <ShieldCheck size={24} className="text-farm-dark-green mb-2" />
                  <span className="text-sm font-medium text-farm-medium-green">Quality Guarantee</span>
                  <span className="text-xs text-gray-500">100% satisfaction</span>
                </div>
                
                <div className="flex flex-col items-center text-center p-3">
                  <Leaf size={24} className="text-farm-dark-green mb-2" />
                  <span className="text-sm font-medium text-farm-medium-green">Sustainably Grown</span>
                  <span className="text-xs text-gray-500">Environmentally friendly</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-bold text-farm-dark-green mb-6">
              You might also like
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
