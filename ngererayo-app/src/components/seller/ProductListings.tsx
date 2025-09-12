import { useNavigate } from 'react-router-dom';
import { Product } from '../../type/seller';
import ProductCard from './ProductCard';

interface ProductListingsProps {
  products: Product[];
}

const ProductListings = ({ products }: ProductListingsProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">My listings</h2>
        <button
          onClick={() => navigate('/seller/products')}
          className="text-green-600 hover:text-green-700 text-sm font-medium"
        >
          View all
        </button>
      </div>
      
      <div className="space-y-3">
        {products.slice(0, 3).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => navigate(`/seller/products/${product.id}/edit`)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductListings;