
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/data';

const Index = () => {
  return (
    <div className="min-h-screen bg-farm-light-cream">
      <Navbar />
      
      <main>
        {/* Hero Banner */}
        <Hero />
        
        {/* Featured Products */}
        <FeaturedProducts />
        
        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-farm-dark-green mb-4">Why Choose FarmStand</h2>
              <p className="text-farm-medium-green max-w-2xl mx-auto">
                We're committed to bringing you the freshest, highest-quality produce directly from local farms.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-farm-light-cream">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-farm-dark-green text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-farm-dark-green mb-2">100% Organic</h3>
                <p className="text-farm-medium-green">
                  All our products are certified organic, grown without harmful pesticides or chemicals.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-farm-light-cream">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-farm-dark-green text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-farm-dark-green mb-2">Locally Sourced</h3>
                <p className="text-farm-medium-green">
                  We work with local farmers to reduce food miles and support our community.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-farm-light-cream">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-farm-dark-green text-white mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-farm-dark-green mb-2">Farm Fresh</h3>
                <p className="text-farm-medium-green">
                  From harvest to your table in under 24 hours for maximum freshness and nutrition.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Shop by Category */}
        <section className="py-16 bg-farm-light-cream">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-farm-dark-green mb-4">Shop by Category</h2>
              <p className="text-farm-medium-green max-w-2xl mx-auto">
                Explore our wide selection of farm-fresh products across different categories.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <Link 
                  key={category.id} 
                  to={`/products?category=${category.id}`}
                  className="block group"
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                      <h3 className="text-lg font-medium text-farm-dark-green group-hover:text-farm-medium-green transition-colors">
                        {category.name}
                      </h3>
                      <div className="mt-2 text-farm-medium-green opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight size={16} className="inline" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-16 bg-farm-dark-green text-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-lg text-farm-light-cream opacity-90 mb-8">
                Stay updated with seasonal produce, special offers, and farming news.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-md flex-grow max-w-md w-full text-farm-dark-green"
                />
                <Button size="lg" className="bg-farm-straw text-farm-dark-green hover:bg-opacity-90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
