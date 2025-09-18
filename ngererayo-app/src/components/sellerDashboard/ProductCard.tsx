import { Product } from '../../pages/SellerDashboard/index';

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
}

const ProductCard = ({ product, onEdit }: ProductCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
      <div>
        <p className="text-sm text-gray-600">
          {product.price}/{product.unit} - {product.stock} in stock
        </p>
        <h3 className="font-medium text-gray-900">{product.onwer?.name}</h3>
      </div>
      <button
        onClick={onEdit}
        className="text-green-600 hover:text-green-700 text-sm font-medium"
      >
        Edit
      </button>
    </div>
  );
};

export default ProductCard;