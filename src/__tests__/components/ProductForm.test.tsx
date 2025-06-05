import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "@testing-library/react";
import ProductForm from "@/app/components/ProductForm";
import { fetchCategory } from "@/utils/CategoryApi";
import React from "react";

// Mock the CategoryApi
jest.mock("@/utils/CategoryApi", () => ({
    fetchCategory: jest.fn()
}));

describe("ProductForm", () => {
    const mockOnSubmit = jest.fn();
    const mockOnCancel = jest.fn();
    const mockCategories = [
        { id: 1, name: "Category 1", image: "cat1.jpg", slug: "cat-1" },
        { id: 2, name: "Category 2", image: "cat2.jpg", slug: "cat-2" }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        (fetchCategory as jest.Mock).mockResolvedValue(mockCategories);
    });

    test("renders empty form for create mode", async () => {
        await act(async () => {
            render(<ProductForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
        });

        // Check if all form elements are present
        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/image url/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
        
        // Check initial values
        expect(screen.getByLabelText(/title/i)).toHaveValue("");
        expect(screen.getByLabelText(/price/i)).toHaveValue(0);
        expect(screen.getByLabelText(/description/i)).toHaveValue("");
        
        // Check if categories are loaded
        await waitFor(() => {
            expect(screen.getByText("Category 1")).toBeInTheDocument();
            expect(screen.getByText("Category 2")).toBeInTheDocument();
        });
    });

    test("renders form with initial data for edit mode", async () => {
        const mockProduct = {
            id: 1,
            title: "Test Product",
            price: 99.99,
            description: "Test Description",
            categoryId: 1,
            images: ["test-image.jpg"]
        };

        await act(async () => {
            render(
                <ProductForm 
                    product={mockProduct}
                    onSubmit={mockOnSubmit}
                    onCancel={mockOnCancel}
                />
            );
        });

        expect(screen.getByLabelText(/title/i)).toHaveValue("Test Product");
        expect(screen.getByLabelText(/price/i)).toHaveValue(99.99);
        expect(screen.getByLabelText(/description/i)).toHaveValue("Test Description");
        expect(screen.getByLabelText(/image url/i)).toHaveValue("test-image.jpg");
    });

    test("handles form submission with valid data", async () => {
        await act(async () => {
            render(<ProductForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
        });

        // Fill form
        await act(async () => {
            fireEvent.change(screen.getByLabelText(/title/i), {
                target: { value: "New Product" }
            });
            fireEvent.change(screen.getByLabelText(/price/i), {
                target: { value: "49.99" }
            });
            fireEvent.change(screen.getByLabelText(/description/i), {
                target: { value: "New Description" }
            });
            fireEvent.change(screen.getByLabelText(/category/i), {
                target: { value: "1" }
            });
        });

        // Submit form
        await act(async () => {
            fireEvent.click(screen.getByRole("button", { name: "Submit Product Form" }));
        });

        expect(mockOnSubmit).toHaveBeenCalledWith({
            title: "New Product",
            price: 49.99,
            description: "New Description",
            categoryId: 1,
            images: ["https://via.placeholder.com/150"]
        });
    });

    test("calls onCancel when cancel button is clicked", async () => {
        await act(async () => {
            render(<ProductForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
        });

        fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
        expect(mockOnCancel).toHaveBeenCalled();
    });

    test("handles image error by showing placeholder", async () => {
        await act(async () => {
            render(<ProductForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
        });

        const img = screen.getByAltText("Product preview");
        fireEvent.error(img);

        expect(img).toHaveAttribute("src", "https://via.placeholder.com/150");
    });
});