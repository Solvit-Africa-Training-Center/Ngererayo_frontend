// components/sellerDashboard/OwnerProductsTable.tsx
import React, { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { api } from "../../utilis/api";
import { Edit, Trash2, Search } from "lucide-react";
import { toast } from "react-toastify";   // ✅

import Modal from "./model";
import EditProductForm from "./editproductModel";

export interface Product {
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

// ✅ ForwardRef to allow parent to call addProduct
const OwnerProductsTable = forwardRef(
  ({ ownerId, ownerName, ownerLocation }: OwnerProductsTableProps, ref) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [editProduct, setEditProduct] = useState<Product | null>(null);

    // 🔍 search + pagination
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

 const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/da16ppdly/";

const getImageUrl = (image: string) => {
  if (!image) return "/placeholder.png"; 
  return image.startsWith("http") ? image : `${CLOUDINARY_BASE_URL}${image}`;
};
//
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

    // ✅ expose method to parent to add product dynamically
    useImperativeHandle(ref, () => ({
      addProduct: (product: Product) => {
        setProducts((prev) => [product, ...prev]); // new product on top
      },
    }));

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

    // 🔍 filter + paginate
    const filteredProducts = products.filter((p) =>
      p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    if (loading) return <p className="text-gray-600">Loading products...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
      <div className="overflow-x-auto shadow-md rounded-lg relative">
        {/* 🔍 Search bar */}
        <div className="flex items-center justify-between p-4">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search product..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset page on search
              }}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <p className="text-gray-500 text-sm">
            Page {currentPage} of {totalPages || 1}
          </p>
        </div>

        {/* Products Table */}
        <table className="min-w-full border border-gray-200 rounded-lg bg-white">
          <thead className="bg-white-600 text-gray-600">
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
            {paginatedProducts.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              paginatedProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">
                    <img
                      src={getImageUrl(product.product_image)}
                       alt={product.product_image}
                      className="h-12 w-12 object-cover rounded-md border"
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-600">
                    {product.product_name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {product.description}
                  </td>
                  <td className="px-4 py-2 font-semibold text-gray-600">
                    {product.price} RWF
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {product.quantity}
                  </td>
                  <td className="px-4 py-2 text-gray-600">{ownerName}</td>
                  <td className="px-4 py-2 text-gray-600">{ownerLocation}</td>
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

        {/* 🔄 Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center px-4 py-3 border-t">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

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
  }
);

export default OwnerProductsTable;
