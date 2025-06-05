import CartItemCard from "@/app/components/CartItemCard";
import { CartItem } from "@/contexts/CartContext";
import { fireEvent, render, screen } from "@testing-library/react";

import React from "react";
const mockAddToCart = jest.fn();
const mockRemoveFromCart = jest.fn();

// Mock userCart hook
jest.mock("@/contexts/CartContext", () => ({
    useCart: () => ({
        addToCart: mockAddToCart,
        removeFromCart: mockRemoveFromCart,
    })
}))

describe("CartItemCard", () => {
    const mockItem: CartItem = {
        product: {
            id: 1,
            title: "Test Product",
            price: 99.99,
            images: ["test-image.jpg"],
            slug: "test-product",
            description: "Test description",
            category: {
                id: 1,
                name: "Test Category",
                image: "category.jpg",
                slug: "test-category"
            }
        },
        quantity: 2
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("render cart item correctly", () => {
        render(<CartItemCard item={mockItem} />);

        expect(screen.getByText("Test Product")).toBeInTheDocument();
        expect(screen.getByText("$99.99")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        
        const image = screen.getByAltText("test-product") as HTMLImageElement;
        expect(image.src).toContain("test-image.jpg");
    })

    test("calls addToCart when plus button is clicked", () => {
        render(<CartItemCard item={mockItem} />);
        
        const addButton = screen.getByLabelText("Add to cart");
        fireEvent.click(addButton);
        
        expect(mockAddToCart).toHaveBeenCalledWith(mockItem.product);
    });

    test("calls removeFromCart when minus button is clicked", () => {
        render(<CartItemCard item={mockItem} />);
        
        const removeButton = screen.getByLabelText("Remove from cart");
        fireEvent.click(removeButton);
        
        expect(mockRemoveFromCart).toHaveBeenCalledWith(mockItem.product.id);
    });
})