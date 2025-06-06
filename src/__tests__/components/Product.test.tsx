import { render, screen, waitFor } from "@testing-library/react";
import Product from "@/app/components/Product";
import { fetchForHomePage } from "@/utils/ProductApi";
import React from "react";
import { useRouter } from "next/navigation";

// Mock the ProductApi
jest.mock("@/utils/ProductApi", () => ({
    fetchForHomePage: jest.fn()
}));

// Mock Next.js router
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        prefetch: jest.fn(),
        route: '/'
    }))
}));

const mockRouter = {
    push: jest.fn(),
    prefetch: jest.fn(),
    route: '/'
};

describe("Product", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Setup router mock for each test
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
    });

    const mockProducts = [
        {
            id: 1,
            title: "Test Product 1",
            price: 99.99,
            description: "Test Description 1",
            images: ["test-image-1.jpg"],
            slug: "test-product-1",
            category: {
                id: 1,
                name: "Test Category",
                image: "category.jpg",
                slug: "test-category"
            }
        },
        {
            id: 2,
            title: "Test Product 2",
            price: 149.99,
            description: "Test Description 2",
            images: ["test-image-2.jpg"],
            slug: "test-product-2",
            category: {
                id: 1,
                name: "Test Category",
                image: "category.jpg",
                slug: "test-category"
            }
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("shows loading state initially", () => {
        (fetchForHomePage as jest.Mock).mockImplementation(() => 
            new Promise(resolve => setTimeout(resolve, 100))
        );

        render(<Product />);
        
        // Should show 8 loading skeletons
        const loadingElements = screen.getAllByRole("generic").filter(
            element => element.className.includes("animate-pulse")
        );
        expect(loadingElements).toHaveLength(8);
    });

    test("renders products successfully", async () => {
        (fetchForHomePage as jest.Mock).mockResolvedValue(mockProducts);

        render(<Product />);

        // Wait for products to load
        await waitFor(
            () => {
                expect(screen.queryAllByRole("generic").filter(
                    element => element.className.includes("animate-pulse")
                )).toHaveLength(0);
            },
            { timeout: 2000 }
        );

        // Check if products are rendered
        await waitFor(
            () => {
                expect(screen.queryByText("Test Product 1")).toBeInTheDocument();
                expect(screen.queryByText("Test Product 2")).toBeInTheDocument();
                expect(screen.queryByText("$99.99")).toBeInTheDocument();
                expect(screen.queryByText("$149.99")).toBeInTheDocument();
            },
            { timeout: 2000 }
        );
    });

    test("shows error message when fetch fails", async () => {
        const errorMessage = "Failed to fetch products";
        (fetchForHomePage as jest.Mock).mockRejectedValue(new Error(errorMessage));

        render(<Product />);

        // Wait for error message to appear
        await waitFor(() => {
            expect(screen.getByText(`message: ${errorMessage}`)).toBeInTheDocument();
        });

        // Check error details
        expect(screen.getByText("name: Error")).toBeInTheDocument();
        expect(screen.getByText("code: 500")).toBeInTheDocument();
    });

    test("renders empty state when no products", async () => {
        (fetchForHomePage as jest.Mock).mockResolvedValue([]);

        render(<Product />);

        // Wait for loading to finish
        await waitFor(() => {
            const loadingElements = screen.queryAllByRole("generic").filter(
                element => element.className.includes("animate-pulse")
            );
            expect(loadingElements).toHaveLength(0);
        });

        // Check that no products are rendered
        expect(screen.queryByRole("article")).not.toBeInTheDocument();
    });
});