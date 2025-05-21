
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCartItems } from '@/lib/data';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const cartItems = getCartItems();
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  
  // Mock authentication state - this would be replaced with actual auth state
  const isLoggedIn = false;
  const isAdmin = false;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
  ];

  // Add admin dashboard link for admin users
  if (isAdmin) {
    navLinks.push({ name: 'Dashboard', path: '/admin/dashboard' });
  }

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-farm-light-cream shadow-sm">
      <div className="container mx-auto py-4 px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-farm-dark-green text-xl font-serif font-bold">FarmStand</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-farm-dark-green border-b-2 border-farm-dark-green'
                      : 'text-farm-medium-green hover:text-farm-dark-green'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-farm-dark-green">
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-farm-dark-green text-farm-light-cream rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Authentication */}
            {isLoggedIn ? (
              <Button variant="ghost" size="icon" className="text-farm-dark-green">
                <User size={20} />
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="outline" className="text-farm-dark-green border-farm-dark-green hover:bg-farm-dark-green hover:text-farm-light-cream">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-farm-dark-green text-farm-light-cream hover:bg-farm-medium-green">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-farm-dark-green">
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-farm-dark-green text-farm-light-cream rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-farm-dark-green">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-medium py-2 transition-colors ${
                    isActive(link.path)
                      ? 'text-farm-dark-green font-bold'
                      : 'text-farm-medium-green'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {isLoggedIn ? (
                <Link to="/profile" className="py-2 text-farm-medium-green" onClick={() => setIsMenuOpen(false)}>
                  Profile
                </Link>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full text-farm-dark-green border-farm-dark-green hover:bg-farm-dark-green hover:text-farm-light-cream">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-farm-dark-green text-farm-light-cream hover:bg-farm-medium-green">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
