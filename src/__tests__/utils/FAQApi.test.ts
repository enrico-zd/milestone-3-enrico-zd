import { IFAQ } from "@/types";
import { fetchFQA } from "@/utils/FAQApi";


// mock the global fetch function
global.fetch = jest.fn();


describe("FAQApi", () => {
    // Reset mocks before each test
    beforeEach(() => {
        jest.resetAllMocks();
    });

    // simple category data for testing
    const mockUser: IFAQ[] = [
        {
            question: "What is the return policy?",
            answer: "You can return items within 30 days of purchase.",
        },
        {
            question: "How do I track my order?",
            answer: "You can track your order using the tracking link sent to your email.",
        },
    ];

    // Testing async function fetchFAQ
    describe("fetchFAQ", () => {
        test("should fetch FAQ successfully", async () => {
            // Mock successful response
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser,
            });

            // Call the function
            const result = await fetchFQA();

            // Assertions
            expect(fetch).toHaveBeenCalledWith(
                "https://68218c22259dad2655af8c2b.mockapi.io/faq"
            );
            expect(result).toEqual(mockUser);
            expect(result.length).toBe(2);
        });

        test("should throw an error when API returns non-ok response", async () => {
            // Mock failed response
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                statusText: "Failed to fetch data FAQ",
            });

            // Expect the function to throw an error
            await expect(fetchFQA()).rejects.toThrow(
                "Failed to fetch data FAQ"
            )
        });

        test("should throw an error when fetch fails", async () => {
            // Mock network error
            const networkError = new Error("Network error");
            (fetch as jest.Mock).mockRejectedValueOnce(networkError);

            // Expect the function to throw an error
            await expect(fetchFQA()).rejects.toThrow("Network error");
        })
    })

})