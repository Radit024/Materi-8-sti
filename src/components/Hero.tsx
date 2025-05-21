
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative bg-farm-dark-green text-farm-light-cream">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container mx-auto py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Fresh from the Farm <br/> to Your Table
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-lg">
              Discover locally grown produce, artisanal foods, and organic goods from farms committed to sustainable practices.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <Link to="/products">
                <Button size="lg" className="bg-farm-light-cream text-farm-dark-green hover:bg-farm-straw w-full sm:w-auto">
                  Shop Now
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="border-farm-light-cream text-farm-light-cream hover:bg-farm-light-cream hover:text-farm-dark-green w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1515150144380-bca9f1650ed9" 
                alt="Farmer's Market Fresh Produce" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-farm-dark-green to-transparent opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
