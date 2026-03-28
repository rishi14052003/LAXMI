import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Category from '../pages/Category';
import ProductDetail from '../pages/ProductDetail';
import WhatsAppButton from '../components/WhatsAppButton';

const AppRoutes = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
        
        {/* Floating WhatsApp Button */}
        <div className="fixed bottom-6 right-6 z-40">
          <WhatsAppButton 
            phoneNumber="919876543210"
            message="Hi! I would like to inquire about your products."
            className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-full"
          />
        </div>
      </div>
    </Router>
  );
};

export default AppRoutes;
