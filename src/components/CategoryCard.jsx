import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/category/${category.id}`}
      className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    >
      <div className="aspect-w-16 aspect-h-12 bg-gray-200">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://picsum.photos/seed/${category.id}/400/300.jpg`;
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-bold font-playfair mb-2">{category.name}</h3>
          <p className="text-sm opacity-90">{category.description}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <h3 className="text-lg font-bold text-white font-playfair">{category.name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
