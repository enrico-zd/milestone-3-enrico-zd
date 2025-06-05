import AddToCartButton from "@/app/components/AddToCartButton";
import { IProducts } from "@/types";
import { fireEvent, render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import React from "react";

// Mock useCart
const mockAddToCart = jest.fn();
jest.mock("@/contexts/CartContext", () => {
    return {
        useCart: () => ({
            addToCart: mockAddToCart
        }),
        __esModule: true,
    }
})

// Mock useSession
jest.mock("next-auth/react", () => ({
    useSession: jest.fn(),
}));

const product: IProducts = {
    id: 0,
    title: "Test Product",
    slug: "test-product",
    price: 100,
    description: "Test description",
    category: {
        id: 1,
        name: "Category 1",
        image: "https://placehold.co/600x400",
        slug: "category-1",
    },
    images: ["https://placehold.co/600x400"],
}

describe("AddtoCartbutton", () => {
    beforeEach(() => {
        mockAddToCart.mockClear();
    });

    test("show 'Login to Add' if not logged in", () => {
        (useSession as jest.Mock).mockReturnValue({data: null});
        render(<AddToCartButton {...product}/>);
        expect(screen.getByText("Login to Add")).toBeInTheDocument();
        fireEvent.click(screen.getByText("Login to Add"));
        expect(mockAddToCart).not.toHaveBeenCalled();
    })

    test("shows 'Not a Customer' if logged in but not a customer", () => {
        (useSession as jest.Mock).mockReturnValue({
            data: {
                user: {
                    role: "admin",
                }
            },
        });
        render(<AddToCartButton {...product}/>);
        expect(screen.getByText("Not a Customer")).toBeInTheDocument();
        fireEvent.click(screen.getByText("Not a Customer"));
        expect(mockAddToCart).not.toHaveBeenCalled();
    })

    test("calls addToCart if user is customer and button clicked", () => {
        (useSession as jest.Mock).mockReturnValue({
            data: {
                user: {
                    role: "customer",
                }
            },
        });
        render(<AddToCartButton {...product}/>);
        expect(screen.getByText("Add to Cart")).toBeInTheDocument();
        fireEvent.click(screen.getByText("Add to Cart"));
        expect(mockAddToCart).toHaveBeenCalledWith(product);
    })

});