import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { getSareeById, getSareesByCategory } from '../data/sarees';
import { categories } from '../data/categories';
import WhatsAppButton from '../components/WhatsAppButton';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RefreshCw,
  IndianRupee 
} from 'lucide-react';

const ProductDetail = () => {
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const saree = getSareeById(productId);
  
  if (!saree) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const category = categories.find(cat => cat.id === saree.category);
  const relatedSarees = getSareesByCategory(saree.category)
    .filter(s => s.id !== saree.id)
    .slice(0, 4);

  const images = [
    saree.image,
    `${saree.image}?variant=2`,
    `${saree.image}?variant=3`,
    `${saree.image}?variant=4`
  ];

  const handleWhatsAppInquiry = () => {
    const message = `Hi! I'm interested in this saree: ${saree.name} (ID: ${saree.id}). Please provide more details.`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary-600">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link 
              to={`/category/${saree.category}`} 
              className="text-gray-500 hover:text-primary-600"
            >
              {category?.name}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{saree.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={saree.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://picsum.photos/seed/${saree.id}-${selectedImage}/600/600.jpg`;
                }}
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-primary-600' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${saree.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://picsum.photos/seed/${saree.id}-${index}/150/150.jpg`;
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
                {saree.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(4.0 out of 5)</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
                      }`}
                    />
                  </button>
                  
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Share2 className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <IndianRupee className="h-6 w-6 text-gray-900" />
                <span className="text-3xl font-bold text-gray-900">
                  {saree.price.toLocaleString('en-IN')}
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed">{saree.description}</p>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Fabric</span>
                  <p className="font-medium text-gray-900">{saree.fabric}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Category</span>
                  <p className="font-medium text-gray-900">{category?.name}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Availability</span>
                  <p className={`font-medium ${saree.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {saree.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Product ID</span>
                  <p className="font-medium text-gray-900">{saree.id}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppInquiry}
                disabled={!saree.inStock}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saree.inStock ? 'Inquire on WhatsApp' : 'Out of Stock'}
              </button>
              
              <WhatsAppButton 
                phoneNumber="919876543210"
                message={`Hi! I'm interested in ${saree.name} (ID: ${saree.id})`}
                className="w-full"
              />
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-b">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                  <p className="text-xs text-gray-500">On orders above ₹2000</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Authentic</p>
                  <p className="text-xs text-gray-500">100% genuine products</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                  <p className="text-xs text-gray-500">7-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedSarees.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedSarees.map((relatedSaree) => (
                <Link
                  key={relatedSaree.id}
                  to={`/product/${relatedSaree.id}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="aspect-square bg-gray-200">
                    <img
                      src={relatedSaree.image}
                      alt={relatedSaree.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = `https://picsum.photos/seed/${relatedSaree.id}/300/300.jpg`;
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                      {relatedSaree.name}
                    </h3>
                    <div className="flex items-center mt-2">
                      <IndianRupee className="h-4 w-4 text-gray-700" />
                      <span className="font-bold text-gray-900 ml-1">
                        {relatedSaree.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
