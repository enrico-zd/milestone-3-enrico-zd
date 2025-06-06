import { IUser } from "@/types";
import { fetchUser } from "@/utils/UserAPI";

// mock the global fetch function
global.fetch = jest.fn();


describe("UserApi", () => {
    // Reset mocks before each test
    beforeEach(() => {
        jest.resetAllMocks();
    });

    // simple category data for testing
    const mockUser: IUser[] = [
        {
            id:	1,
            email: "john@email.co",
            password: "password123",
            name: "John",
            role: "customer",
            avatar: "https://i.imgur.com/QkIa5tT.jpeg",
        },
        {
            id:	2,
            email: "michael@email.co",
            password: "password123",
            name: "michael",
            role: "customer",
            avatar: "https://i.imgur.com/DTfowdu.jpg",
        },
    ];

    // Testing async function -fetchUsers
    describe("fetchUsers", () => {
        test("should fetch users successfully", async () => {
            // Mock successful response
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser,
            });

            // Call the function
            const result = await fetchUser();

            // Assertions
            expect(fetch).toHaveBeenCalledWith(
                "https://api.escuelajs.co/api/v1/users"
            );
            expect(result).toEqual(mockUser);
            expect(result.length).toBe(2);
        });

        test("should throw an error when API returns non-ok response", async () => {
            // Mock failed response
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                statusText: "Failed to fetch user data",
            });

            // Expect the function to throw an error
            await expect(fetchUser()).rejects.toThrow(
                "Failed to fetch user data"
            )
        });

        test("should throw an error when fetch fails", async () => {
            // Mock network error
            const networkError = new Error("Network error");
            (fetch as jest.Mock).mockRejectedValueOnce(networkError);

            // Expect the function to throw an error
            await expect(fetchUser()).rejects.toThrow("Network error");
        })
    })

})