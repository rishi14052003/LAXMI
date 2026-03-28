import { Home, BarChart3, Users, Settings, ShoppingCart, Package, Calendar, ShoppingBag, X } from 'lucide-react';

const Sidebar = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  activeTab, 
  setActiveTab, 
  currentView, 
  setCurrentView,
  selectedCategory,
  handleCategoryClick 
}) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const categoryMenuItems = [
    { id: 'silk', label: 'Silk Sarees', icon: ShoppingBag },
    { id: 'cotton', label: 'Cotton Sarees', icon: ShoppingBag },
    { id: 'bridal', label: 'Bridal Collection', icon: ShoppingBag },
    { id: 'designer', label: 'Designer Wear', icon: ShoppingBag },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between h-16 px-6 border-b">
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
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <nav className="mt-6">
        <div className="px-3">
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Dashboard</h3>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setCurrentView('dashboard');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors mb-1 ${
                    activeTab === item.id && currentView === 'dashboard'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
          
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Categories</h3>
            {categoryMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors mb-1 ${
                    selectedCategory?.id === item.id
                      ? 'bg-purple-50 text-purple-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
