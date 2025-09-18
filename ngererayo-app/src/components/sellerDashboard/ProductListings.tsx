// components/sellerDashboard/OwnerProductsTable.tsx
import React, { useEffect, useState } from "react";
import { api } from "../../utilis/api";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import Modal from "./model";
import EditProductForm from "./editproductModel";

interface Product {
  id: number;
  product_name: string;
  description: string;
  price: string;
  quantity: number;
  product_image: string;
  owner: number;
}

interface OwnerProductsTableProps {
  ownerId: number;
  ownerName: string;
  ownerLocation: string;
}

const OwnerProductsTable: React.FC<OwnerProductsTableProps> = ({
  ownerId,
  ownerName,
  ownerLocation,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await api.get<Product[]>(
          `/market/owner/${ownerId}/products/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProducts(res.data);
      } catch (err: any) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [ownerId]);

  // Delete Product
  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const token = sessionStorage.getItem("token");
      await api.delete(`/market/products/${deleteId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p.id !== deleteId));
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    } finally {
      setDeleteId(null);
    }
  };

  // Update product state after edit
  const handleProductUpdated = (updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setEditProduct(null);
  };

  if (loading) return <p className="text-gray-600">Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto shadow-md rounded-lg relative">
      <table className="min-w-full border border-gray-200 rounded-lg bg-white">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-left">Product Name</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Quantity</th>
            <th className="px-4 py-3 text-left">Owner Name</th>
            <th className="px-4 py-3 text-left">Location</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-6 text-gray-500">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                key={product.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2">
                  <img
                    src={product.product_image}
                    alt={product.product_name}
                    className="h-12 w-12 object-cover rounded-md border"
                  />
                </td>
                <td className="px-4 py-2 font-medium">{product.product_name}</td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {product.description}
                </td>
                <td className="px-4 py-2 font-semibold">${product.price}</td>
                <td className="px-4 py-2">{product.quantity}</td>
                <td className="px-4 py-2">{ownerName}</td>
                <td className="px-4 py-2">{ownerLocation}</td>
                <td className="px-4 py-2 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setEditProduct(product)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => setDeleteId(product.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteId}
        title="Delete Product"
        onClose={() => setDeleteId(null)}
      >
        <p className="text-gray-600">
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
            onClick={() => setDeleteId(null)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            onClick={confirmDelete}
          >
            Delete
          </button>
        </div>
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        isOpen={!!editProduct}
        title="Edit Product"
        onClose={() => setEditProduct(null)}
      >
        {editProduct && (
          <EditProductForm
            product={editProduct}
            onUpdated={handleProductUpdated}
            onCancel={() => setEditProduct(null)}
          />
        )}
      </Modal>
    </div>
  );
};

export default OwnerProductsTable;
