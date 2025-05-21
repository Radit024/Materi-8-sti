
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { getFeaturedProducts } from '@/lib/data';
import { Product } from '@/lib/types';

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    setFeaturedProducts(getFeaturedProducts());
  }, []);

  return (
    <section className="py-16 bg-farm-light-cream">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-farm-dark-green mb-4">Featured Products</h2>
          <p className="text-farm-medium-green max-w-2xl mx-auto">
            Our selection of the finest seasonal produce and artisanal goods from local farmers and producers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/products">
            <Button variant="outline" size="lg" className="border-farm-dark-green text-farm-dark-green hover:bg-farm-dark-green hover:text-farm-light-cream">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
