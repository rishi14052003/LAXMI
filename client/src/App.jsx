import Home from './pages/Home';
import ItemsView from './components/ItemsView';
import Footer from './components/Footer';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-900"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen">
        {isAuthenticated && <Navbar />}
        <Routes>
          {/* Auth Routes (Public) */}
          <Route path="/signin" element={isAuthenticated ? <Navigate to="/" /> : <SignIn />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50 flex flex-col">
                  <Home />
                  <Footer />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/:categoryId"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50 flex flex-col">
                  <ItemsView />
                  <Footer />
                </div>
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to signin */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/signin"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;