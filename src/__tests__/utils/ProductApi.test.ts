import { IProducts } from "@/types";
import { fetchForHomePage, fetchProductBySlug } from "@/utils/ProductApi";


// mock the global fetch function
global.fetch = jest.fn();

describe("ProductApi", () => {
    // Reset mocks before each test
    beforeEach(() => {
        jest.resetAllMocks();
    });

    // simple product data for testing
    const mockProducts: IProducts[] = [
        {
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
        },
        {
            id: 1,
            title: "Generic Product",
            slug: "generic-product",
            price: 200,
            description: "Generic description",
            category: {
                id: 1,
                name: "Category 1",
                image: "https://placehold.co/600x400",
                slug: "category-1",
            },
            images: ["https://placehold.co/600x400"],
        },
    ];

    // Testing async function fetchProducts for home page
    describe("fetch Products for home page", () => {
        test("should fetch products successfully for home page", async () => {
            // Mock successful response
            (fetch as jest.Mock).mockReturnValueOnce({
                ok: true,
                json: async () => mockProducts,
            });

            // call the function
            const result = await fetchForHomePage();

            // Assertions
            expect(fetch).toHaveBeenCalledWith(
                "https://api.escuelajs.co/api/v1/products?offset=1&limit=16"
            );
            expect(result).toEqual(mockProducts);
            expect(result.length).toBe(2);
        })
        
        test("should fetch product by slug successfully", async () => {
            // Mock successful response
            (fetch as jest.Mock).mockReturnValueOnce({
                ok: true,
                json: async () => mockProducts,
            });

            // call the function
            const result = await fetchProductBySlug(mockProducts[0].slug);

            // Assertions
            expect(fetch).toHaveBeenCalledWith(
                "https://api.escuelajs.co/api/v1/products/slug/test-product"
            );
            expect(result).toEqual(mockProducts);
        })

        test("should throw an error when API returns non-ok response", async () => {
            // Mock failed response
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                statusText: "Failed to fetch data product",
            });

            // Expect the function to throw an error
            await expect(fetchForHomePage()).rejects.toThrow(
                "Failed to fetch data product"
            )
        });

        test("should throw an error when fetch fails", async () => {
            // Mock network error
            const networkError = new Error("Network error");
            (fetch as jest.Mock).mockRejectedValueOnce(networkError);

            // Expect the function to throw an error
            await expect(fetchForHomePage()).rejects.toThrow("Network error");
        })
    })

    // Testing async function fetch Products by slug
    describe("fetch Products by slug", () => {
        test("should fetch products successfully by slug", async () => {
            // Mock successful response
            (fetch as jest.Mock).mockReturnValueOnce({
                ok: true,
                json: async () => mockProducts[0].slug,
            });

            // call the function
            const result = await fetchProductBySlug(mockProducts[0].slug);

            // Assertions
            expect(fetch).toHaveBeenCalledWith(
                "https://api.escuelajs.co/api/v1/products/slug/test-product"
            );
            expect(result).toEqual(mockProducts[0].slug);
            // expect(result.length).toBe(1);
        })

        test("should throw an error when API returns non-ok response", async () => {
            // Mock failed response
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                statusText: "Failed to fetch data product",
            });

            // Expect the function to throw an error
            await expect(fetchProductBySlug(mockProducts[0].slug)).rejects.toThrow(
                "Failed to fetch data product"
            )
        });

        test("should throw an error when fetch fails", async () => {
            // Mock network error
            const networkError = new Error("Network error");
            (fetch as jest.Mock).mockRejectedValueOnce(networkError);

            // Expect the function to throw an error
            await expect(fetchProductBySlug(mockProducts[0].slug)).rejects.toThrow("Network error");
        })
    })

})