import { useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { categories } from '../data/categories';
import { getFeaturedSarees } from '../data/sarees';
import { ArrowRight, Sparkles, Search, ShoppingCart, Heart, User, Menu, X, ShoppingBag } from 'lucide-react';

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const featuredCategories = categories.filter(cat => cat.featured);
  const featuredSarees = getFeaturedSarees();

  const customerMenuItems = [
    { id: 'home', label: 'Home', icon: ShoppingBag },
    { id: 'silk', label: 'Silk Sarees', icon: ShoppingBag },
    { id: 'cotton', label: 'Cotton Sarees', icon: ShoppingBag },
    { id: 'bridal', label: 'Bridal Collection', icon: ShoppingBag },
    { id: 'designer', label: 'Designer Wear', icon: ShoppingBag },
    { id: 'about', label: 'About Us', icon: User },
    { id: 'contact', label: 'Contact', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <img 
                  src="/laxmi-logo.png" 
                  alt="Laxmi Sarees Logo" 
                  className="h-8 w-auto"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'block';
                  }}
                />
                <h1 className="text-xl font-bold text-gray-900" style={{ display: 'none' }}>Laxmi Sarees</h1>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for sarees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <User className="h-5 w-5 text-gray-600" />
              </button>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for sarees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <nav className="px-2 py-3 space-y-1">
              {customerMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.id === 'home' ? '/' : `/category/${item.id}`}
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-pink-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Sparkles className="h-12 w-12 text-primary-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-gray-900 mb-6">
              Discover Timeless
              <span className="text-primary-600 block">Elegance</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Explore our exquisite collection of traditional and contemporary sarees, 
              crafted with love and designed to make you shine on every occasion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/category/silk"
                className="btn-primary inline-flex items-center justify-center"
              >
                Shop Silk Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/category/bridal"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Bridal Special
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect saree for every occasion from our curated collections
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              to="/categories"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              View All Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
              Featured Sarees
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked favorites from our latest collection
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredSarees.slice(0, 8).map((saree) => (
              <ProductCard key={saree.id} saree={saree} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              to="/category/silk"
              className="btn-primary inline-flex items-center"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
