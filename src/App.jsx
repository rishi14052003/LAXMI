import Home from './pages/Home';
import ItemsView from './components/ItemsView';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<ItemsView />} />
        </Routes>
      </div>
    </Router> 
  );
}

export default App;