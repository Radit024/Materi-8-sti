
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-farm-dark-green text-farm-light-cream pt-12 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-serif font-bold mb-4">FarmStand</h3>
            <p className="text-sm mb-4">Supporting local farmers and bringing fresh, organic produce directly to your table.</p>
            <p className="text-xs opacity-75">© 2023 FarmStand. All rights reserved.</p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-farm-straw transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:text-farm-straw transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-farm-straw transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-farm-straw transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-1">
            <h4 className="font-bold mb-4">Product Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=1" className="text-sm hover:text-farm-straw transition-colors">Vegetables</Link>
              </li>
              <li>
                <Link to="/products?category=2" className="text-sm hover:text-farm-straw transition-colors">Fruits</Link>
              </li>
              <li>
                <Link to="/products?category=3" className="text-sm hover:text-farm-straw transition-colors">Dairy</Link>
              </li>
              <li>
                <Link to="/products?category=4" className="text-sm hover:text-farm-straw transition-colors">Meat</Link>
              </li>
              <li>
                <Link to="/products?category=5" className="text-sm hover:text-farm-straw transition-colors">Grains</Link>
              </li>
              <li>
                <Link to="/products?category=6" className="text-sm hover:text-farm-straw transition-colors">Honey & Preserves</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h4 className="font-bold mb-4">Stay Updated</h4>
            <p className="text-sm mb-4">Subscribe to our newsletter for seasonal updates and special offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white bg-opacity-20 rounded-l-md px-4 py-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-farm-straw"
              />
              <button className="bg-farm-straw text-farm-dark-green font-medium rounded-r-md px-4 py-2 text-sm hover:bg-opacity-90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-farm-light-cream border-opacity-20 mt-8 pt-8 text-center text-xs">
          <p>Made with ❤️ for local farming communities</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
