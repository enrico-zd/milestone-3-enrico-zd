import { ICategory } from "@/types";
import { fetchCategory } from "@/utils/CategoryApi";

// mock the global fetch function
global.fetch = jest.fn();


describe("CategoryApi", () => {
    // Reset mocks before each test
    beforeEach(() => {
        jest.resetAllMocks();
    });

    // simple category data for testing
    const mockCategories: ICategory[] = [
        {
            id:	1,
            name: "Clothes",
            slug: "clothes",
            image: "https://i.imgur.com/QkIa5tT.jpeg",
        },
        {
            id:	2,
            name: "Electronics",
            slug: "electronics",
            image: "https://i.imgur.com/ZANVnHE.jpeg",
        },

    ];

    // Testing async function -fetchCategory
    describe("fetchCategory", () => {
        test("should fetch categories successfully", async () => {
            // Mock successful response
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockCategories,
            });

            // Call the function
            const result = await fetchCategory();

            // Assertions
            expect(fetch).toHaveBeenCalledWith(
                "https://api.escuelajs.co/api/v1/categories"
            );
            expect(result).toEqual(mockCategories);
            expect(result.length).toBe(2);
        });

        test("should throw an error when API returns non-ok response", async () => {
            // Mock failed response
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                statusText: "Failed to fetch category product",
            });

            // Expect the function to throw an error
            await expect(fetchCategory()).rejects.toThrow(
                "Failed to fetch category product"
            )
        });

        test("should throw an error when fetch fails", async () => {
            // Mock network error
            const networkError = new Error("Network error");
            (fetch as jest.Mock).mockRejectedValueOnce(networkError);

            // Expect the function to throw an error
            await expect(fetchCategory()).rejects.toThrow("Network error");
        })
    })

})