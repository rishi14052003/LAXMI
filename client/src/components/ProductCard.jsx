import { Link } from 'react-router-dom';
import { IndianRupee } from 'lucide-react';

const ProductCard = ({ saree }) => {
  return (
    <Link
      to={`/product/${saree.id}`}
      className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <img
          src={saree.image}
          alt={saree.name}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://picsum.photos/seed/${saree.id}/300/400.jpg`;
          }}
        />
        {!saree.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
          {saree.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{saree.fabric}</p>
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">{saree.description}</p>
        
        <div className="flex items-center">
          <IndianRupee className="h-4 w-4 text-gray-700" />
          <span className="text-lg font-bold text-gray-900 ml-1">
            {saree.price.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
