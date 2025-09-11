
import { Filter, Grid, List } from 'lucide-react';
import ProductCard from '@/components/landingpage/productCard';
import { PRODUCTS, CATEGORIES } from '@/utilis/constraints';

const Products: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = selectedCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
   
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">All Products</h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-white p-2 rounded-lg shadow-sm">
              <button 
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-green-100 text-green-800' : 'text-gray-600'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={20} />
              </button>
              <button 
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-green-100 text-green-800' : 'text-gray-600'}`}
                onClick={() => setViewMode('list')}
              >
                <List size={20} />
              </button>
            </div>
            
            <div className="relative">
              <select 
                className="bg-white px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(category => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
              <Filter size={16} className="absolute right-3 top-3 text-gray-500" />
            </div>
          </div>
        </div>
        
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
      
   
    </div>
  );
};

export default Products;