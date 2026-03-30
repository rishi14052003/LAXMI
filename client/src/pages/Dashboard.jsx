import { useState } from 'react';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatsCard from '../components/StatsCard';
import SalesChart from '../components/SalesChart';
import RecentOrders from '../components/RecentOrders';
import ActivityFeed from '../components/ActivityFeed';
import QuickActions from '../components/QuickActions';
import ItemsView from '../components/ItemsView';
import Footer from '../components/Footer';
import { categories } from '../data/categories';
import { getSareesByCategory } from '../data/sarees';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryItems, setCategoryItems] = useState([]);

  const statsCards = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Orders',
      value: '1,423',
      change: '+15.3%',
      changeType: 'positive',
      icon: ShoppingCart,
      color: 'bg-green-500'
    },
    {
      title: 'Total Customers',
      value: '8,549',
      change: '+5.2%',
      changeType: 'positive',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-2.1%',
      changeType: 'negative',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const recentOrders = [
    { id: '#3210', customer: 'John Doe', amount: '$89.00', status: 'completed', date: '2004-01-15' },
    { id: '#3209', customer: 'Jane Smith', amount: '$156.00', status: 'processing', date: '2004-01-15' },
    { id: '#3208', customer: 'Bob Johnson', amount: '$234.00', status: 'pending', date: '2004-01-14' },
    { id: '#3207', customer: 'Alice Brown', amount: '$67.00', status: 'completed', date: '2004-01-14' },
  ];

  const chartData = [
    { month: 'Jan', sales: 4000, orders: 240 },
    { month: 'Feb', sales: 3000, orders: 198 },
    { month: 'Mar', sales: 5000, orders: 290 },
    { month: 'Apr', sales: 4500, orders: 260 },
    { month: 'May', sales: 6000, orders: 340 },
    { month: 'Jun', sales: 5500, orders: 310 },
  ];

  const handleCategoryClick = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    const items = getSareesByCategory(categoryId);
    setSelectedCategory(category);
    setCategoryItems(items);
    setCurrentView('items');
    setSidebarOpen(false);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedCategory(null);
    setCategoryItems([]);
  };

  // If showing items view
  if (currentView === 'items' && selectedCategory) {
    return (
      <>
        <ItemsView 
          category={selectedCategory.name}
          items={categoryItems}
          onBack={handleBackToDashboard}
        />
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentView={currentView}
        setCurrentView={setCurrentView}
        selectedCategory={selectedCategory}
        handleCategoryClick={handleCategoryClick}
      />

      <div className="flex-1 lg:ml-0">
        <Header 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          {/* Page Title */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store today.</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {statsCards.map((stat, index) => (
              <StatsCard key={index} stat={stat} />
            ))}
          </div>

          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <SalesChart chartData={chartData} />
            <RecentOrders recentOrders={recentOrders} />
          </div>

          {/* Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityFeed />
            <QuickActions />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
