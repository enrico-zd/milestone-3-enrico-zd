"use client";

import ProductForm from "@/app/components/ProductForm";
import ProductTable from "@/app/components/ProductTable";
import { IProductPostProps } from "@/types";
import React, { useEffect, useState } from "react";


export default function DashboardProductsPage() {
  const [products, setProducts] = useState<IProductPostProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<IProductPostProps | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 10;

  // fetch products pagination
  const fetchProducts = async (page: number = 1, search: string = "") => {
    
    setError("");
    try{
      const offset = (page - 1) * productsPerPage;
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${productsPerPage}${search ? `&title=${encodeURIComponent(search)}` : ""
        }`
      );

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);

      // Get total count from headers or estimate from data length
      const totalCount = response.headers.get("x-total-count");
      setTotalProducts(totalCount ? parseInt(totalCount) : data.length * 10) // Assuming there are at least 10 pages
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products. Please try again later.");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      fetchProducts(currentPage, searchTerm);
    }, 300)

    return () => clearTimeout(timer)
  }, [currentPage, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    fetchProducts(1, searchTerm);
  };

  const handleCreateProduct = () => {
    setCurrentProduct(undefined);
    setShowForm(true);
  };

  const handleEditProduct = (product: IProductPostProps) => {
    setCurrentProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/products/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok){
          throw new Error(`Delete failed with status: ${response.status}`);
        }

        // Refresh the product list
        fetchProducts(currentPage, searchTerm);
      } catch (error) {
        console.error(`Error deleting product with id: ${id}`, error);
        setError("Failed to delete product. Please try again.");
      }
    }
  };

  const handleSubmitProduct = async (product: Partial<IProductPostProps>) => {
    try {
      let response;

      if (currentProduct) {
        // Update existing product
        response = await fetch(
          `https://api.escuelajs.co/api/v1/products/${currentProduct.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          }
        );
      } else {
        // Create new product
        response = await fetch(
          "https://api.escuelajs.co/api/v1/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });
      }

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      setShowForm(false);
      fetchProducts(currentPage, searchTerm);
    } catch (error) {
      console.error("Error saving product:", error);
      setError("Failed to save product. Please try again.");
    }
  };

  const totalPages = Math.max(1, Math.ceil(totalProducts / productsPerPage))

  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-2">
        <h1 className="text-2xl font-semibold">Product Management</h1>
        <button
        onClick={handleCreateProduct}
        className="text-white bg-gray-700 p-2 rounded-md"
        >
          Add Product
        </button>
      </div>

      {error && (
        <div className="bg-red-900/50 p-4 rounded-md mb-6 border border-red-500">
          <p className="text-sm text-red-200">{error}</p>
        </div>
      )}

      <div className="mb-1">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 pl-10 pr-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 sm:text-sm w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-700 px-4 py-2 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {showForm ? (
        <div>
          <h2>
            {currentProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <ProductForm
            product={currentProduct}
            onSubmit={handleSubmitProduct}
            onCancel={() => setShowForm(false)}
          />
        </div>
      ) : isLoading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-300">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-gray-200 rounded-lg border border-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <p className="mt-4 text-gray-600 text-lg">No products found</p>
          <p className="text-gray-900 mt-2">
            Try adjusting your search or add a new product
          </p>
        </div>
      ) : (
        <div className="bg-gray-200 shadow overflow-hidden sm:rounded-lg border border-gray-600">
          <ProductTable
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />

          {/* Pagination */}
          <div className="bg-gray-200 px-4 py-3 flex items-center justify-between border-t border-gray-600 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() =>
                  setCurrentPage(Math.max(1, currentPage - 1))
                }
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border rounded-md ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-800 cursor-not-allowed border-gray-600"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-600 border-gray-600"
                } transition-colors`}
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-800 cursor-not-allowed border-gray-600"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-600 border-gray-600"
                } transition-colors`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-800">
                  Showing{" "}
                  <span className="font-medium">
                    {(currentPage - 1) * productsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      currentPage * productsPerPage,
                      totalProducts
                    )}
                  </span>{" "}
                  of <span className="font-medium">{totalProducts}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() =>
                      setCurrentPage(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-800 cursor-not-allowed border-gray-600"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300 border-gray-600"
                    } transition-colors`}
                  >
                    <span className="sr-only">Previous</span>
                    &larr;
                  </button>

                  {/* Page numbers - limit to 5 pages for better UI */}
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    // Calculate page number to show
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border ${
                          currentPage === pageNum
                            ? "bg-blue-800 border-blue-700 text-blue-100"
                            : "bg-gray-200 border-gray-600 text-gray-800 hover:bg-gray-300"
                        } text-sm font-medium transition-colors`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      setCurrentPage(
                        Math.min(totalPages, currentPage + 1)
                      )
                    }
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-800 cursor-not-allowed border-gray-600"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300 border-gray-600"
                    } transition-colors`}
                  >
                    <span className="sr-only">Next</span>
                    &rarr;
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}