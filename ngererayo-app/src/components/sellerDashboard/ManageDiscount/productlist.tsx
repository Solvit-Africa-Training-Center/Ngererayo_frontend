// components/sellerDashboard/OwnerProductsTable.tsx
import React, { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { api } from "../../../utilis/api";


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
  onDiscountClick?: (product: Product) => void;
}

const OwnerProductsTable = forwardRef(
  ({ ownerId, ownerName, ownerLocation, onDiscountClick }: OwnerProductsTableProps, ref) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Fetch only this seller's products
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const token = sessionStorage.getItem("token");
          const res = await api.get<Product[]>(
            `/market/owner/${ownerId}/products/`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setProducts(res.data);
        } catch (err) {
          console.error(err);
          setError("Failed to fetch products");
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }, [ownerId]);

    // Expose method to parent for dynamically adding products
    useImperativeHandle(ref, () => ({
      addProduct: (product: Product) => setProducts((prev) => [product, ...prev]),
    }));

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
        {/* Search bar */}
        <div className="flex items-center justify-between p-4">
          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-64 p-2 border rounded"
          />
          <p className="text-gray-500 text-sm">
            Page {currentPage} of {totalPages || 1}
          </p>
        </div>

        {/* Products Table */}
        <table className="min-w-full border border-gray-200 rounded-lg bg-white">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Product Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Owner Name</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-center">Actions</th>
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
                      src={product.product_image}
                      alt={product.product_name}
                      className="h-12 w-12 object-cover rounded-md border"
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-600">{product.product_name}</td>
                  <td className="px-4 py-2 text-sm text-gray-600">{product.description}</td>
                  <td className="px-4 py-2 font-semibold text-gray-600">{product.price} RWF</td>
                  <td className="px-4 py-2 text-gray-600">{product.quantity}</td>
                  <td className="px-4 py-2 text-gray-600">{ownerName}</td>
                  <td className="px-4 py-2 text-gray-600">{ownerLocation}</td>
                  <td className="px-4 py-2 flex justify-center">
                    <button
                      onClick={() => onDiscountClick && onDiscountClick(product)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Add Discount
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
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
      </div>
    );
  }
);

export default OwnerProductsTable;
