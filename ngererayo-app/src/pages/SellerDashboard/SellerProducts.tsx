import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, MessageSquare } from 'lucide-react';
import { Product, Chat } from '../../types/seller';

const SellerProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'Maize',
      price: 20,
      unit: 'kg',
      stock: 103,
      category: 'Grains',
      description: 'Fresh organic maize',
      images: [],
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      sellerId: '1'
    },
    {
      id: '2',
      name: 'Tomatoes',
      price: 23,
      unit: 'kg',
      stock: 129,
      category: 'Vegetables',
      description: 'Fresh red tomatoes',
      images: [],
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      sellerId: '1'
    },
    {
      id: '3',
      name: 'Yams',
      price: 12,
      unit: 'kg',
      stock: 142,
      category: 'Root Vegetables',
      description: 'Fresh yams',
      images: [],
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      sellerId: '1'
    }
  ];

  const sampleChats = [
    {
      id: '1',
      buyerId: 'buyer1',
      buyerName: 'John Doe',
      productId: '1',
      productName: 'Maize',
      lastMessage: 'Is this still available?',
      lastMessageTime: new Date(),
      unreadCount: 2,
      status: 'active' as const
    },
    {
      id: '2',
      buyerId: 'buyer2',
      buyerName: 'Jane Smith',
      productId: '2',
      productName: 'Tomatoes',
      lastMessage: 'Can you deliver to Nyamirambo?',
      lastMessageTime: new Date(Date.now() - 3600000),
      unreadCount: 1,
      status: 'active' as const
    }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setProducts(sampleProducts);
    setChats(sampleChats);
    setLoading(false);
  };

  const getProductChats = (productId: string) => {
    return chats.filter(chat => chat.productId === productId);
  };

  const deleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
            <p className="text-gray-600">Manage all your product listings</p>
          </div>
          <button
            onClick={() => navigate('/seller/products/new')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chats
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => {
                  const productChats = getProductChats(product.id);
                  const unreadCount = productChats.reduce((sum, chat) => sum + chat.unreadCount, 0);
                  
                  return (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.category}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${product.price}/{product.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{productChats.length}</span>
                          {unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                              {unreadCount}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigate(`/seller/products/${product.id}`)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => navigate(`/seller/products/${product.id}/edit`)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => navigate(`/seller/chats?product=${product.id}`)}
                            className="text-purple-600 hover:text-purple-900"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProducts;