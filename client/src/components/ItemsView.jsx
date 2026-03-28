import { useState } from 'react';
import { Search, Filter, Grid, List, Heart, ShoppingCart, Eye, IndianRupee } from 'lucide-react';

const ItemsView = ({ category, items, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [selectedFilters, setSelectedFilters] = useState({
    inStock: true
  });

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = item.price >= priceRange.min && item.price <= priceRange.max;
    const matchesStock = !selectedFilters.inStock || item.inStock;
    
    return matchesSearch && matchesPrice && matchesStock;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const ItemCard = ({ item }) => (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = `https://picsum.photos/seed/${item.id}/300/200.jpg`;
          }}
        />
        {item.featured && (
          <div className="absolute top-2 left-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
        {!item.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
        <div className="absolute top-2 right-2 flex space-x-2">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <Eye className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
          {item.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{item.fabric}</p>
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <IndianRupee className="h-4 w-4 text-gray-700" />
            <span className="text-lg font-bold text-gray-900 ml-1">
              {item.price.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
        
        <button 
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            item.inStock 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!item.inStock}
        >
          {item.inStock ? (
            <span className="flex items-center justify-center">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </span>
          ) : (
            'Out of Stock'
          )}
        </button>
      </div>
    </div>
  );

  const ItemListItem = ({ item }) => (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative sm:w-32 sm:h-32 h-48">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              e.target.src = `https://picsum.photos/seed/${item.id}/150/150.jpg`;
            }}
          />
          {item.featured && (
            <div className="absolute top-2 left-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900 text-lg mb-1">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.fabric}</p>
              <p className="text-sm text-gray-700 mb-3">{item.description}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end mb-2">
                <IndianRupee className="h-4 w-4 text-gray-700" />
                <span className="text-xl font-bold text-gray-900 ml-1">
                  {item.price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.inStock 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {item.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            <div className="flex space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Heart className="h-4 w-4 text-gray-600" />
              </button>
              <button 
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  item.inStock 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!item.inStock}
              >
                {item.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{category} Collection</h1>
            <div className="text-sm text-gray-600">
              {sortedItems.length} items found
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              
              <div className="flex items-center space-x-2 border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Advanced Filters */}
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Price Range:</label>
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 50000 }))}
                className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedFilters.inStock}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                className="rounded text-blue-600"
              />
              <span className="text-sm text-gray-600">In Stock Only</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedFilters.featured}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, featured: e.target.checked }))}
                className="rounded text-blue-600"
              />
              <span className="text-sm text-gray-600">Featured Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Items Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {sortedItems.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
          }>
            {sortedItems.map((item) => (
              viewMode === 'grid' ? (
                <ItemCard key={item.id} item={item} />
              ) : (
                <ItemListItem key={item.id} item={item} />
              )
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemsView;
