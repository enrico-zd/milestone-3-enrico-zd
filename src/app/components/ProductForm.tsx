"use client";

import React from "react";
import { useState, useEffect } from "react";
import { ICategory, IProductPostProps } from "@/types";
import { fetchCategory } from "@/utils/CategoryApi";

interface ProductFormProps {
  product?: IProductPostProps;
  onSubmit: (product: Partial<IProductPostProps>) => void;
  onCancel: () => void;
}

export default function ProductForm({
  product,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [formData, setFormData] = useState<Partial<IProductPostProps>>({
    title: "",
    price: 0,
    description: "",
    categoryId: 0,
    images: ["https://via.placeholder.com/150"],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState<ICategory[]>([]);

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  // Fetch categories when the component mounts
  const dataCategory = async (): Promise<void> => {
    const data = await fetchCategory();
    setCategory(data);
  }

  useEffect(() => {
    dataCategory();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = "Title is required";
    }

    if (formData.price === undefined || formData.price < 0) {
      newErrors.price = "Price must be a positive number";
    }

    if (!formData.description?.trim()) {
      newErrors.description = "Description is required";
    }

    if (formData.categoryId === undefined || formData.categoryId < 1) {
      newErrors.categoryName = "Category ID is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    if (name === "price") {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else if (name === "imageUrl") {
      // Handle image URL input
      setFormData({
        ...formData,
        images: [value, ...(formData.images?.slice(1) || [])],
      });
    } else if (name === "categoryId"){
      setFormData({
        ...formData,
        categoryId: parseInt(value),
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-800"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title || ""}
          onChange={handleChange}
          required
          className={`mt-1 block w-full bg-gray-100 border ${
            errors.title ? "border-red-500" : "border-gray-700"
          } rounded-md shadow-sm py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          placeholder="Product title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-800"
        >
          Price <span className="text-red-500">*</span>
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-800 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price || 0}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className={`block w-full pl-7 bg-gray-100 border ${
              errors.price ? "border-red-500" : "border-gray-700"
            } rounded-md shadow-sm py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            placeholder="0.00"
          />
        </div>
        {errors.price && (
          <p className="mt-1 text-sm text-red-500">{errors.price}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-800"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          id="description"
          value={formData.description || ""}
          onChange={handleChange}
          required
          rows={3}
          className={`mt-1 block w-full bg-gray-100 border ${
            errors.description ? "border-red-500" : "border-gray-700"
          } rounded-md shadow-sm py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          placeholder="Product description"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-800"
        >
          Image URL
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={formData.images?.[0] || ""}
            onChange={handleChange}
            className="block w-full bg-gray-100 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div className="mt-2">
          <div className="flex items-center space-x-2">
            <div className="h-16 w-16 rounded-md overflow-hidden border border-gray-700">
              <img
                src={formData.images?.[0] || "https://via.placeholder.com/150"}
                alt="Product preview"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/150";
                }}
              />
            </div>
            <span className="text-sm text-gray-800">Preview</span>
          </div>
        </div>
      </div>

      <div className="w-80">
        <label
          htmlFor="categoryId"
          className="block text-sm font-medium text-gray-800"
        >
          Category
        </label>
        <select 
          name="categoryId" 
          id="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="mt-1 block w-full bg-gray-100 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        >
          {
            category?.map((categoryItem) => (
              <option key={categoryItem.id} value={categoryItem.id}>
                {categoryItem.name}
              </option>
            ))
          }
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="bg-gray-100 py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gray-800 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          aria-label="Submit Product Form"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Saving...</span>
            </>
          ) : (
            <>{product ? "Update" : "Create"}</>
          )}
        </button>
      </div>
    </form>
  );
}
