"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        // Check for registration success message
        if (searchParams.get("registered") === "true") {
            setSuccess("Registration successful! Please log in.");
        }

        // Check for error message
        const errorMessage = searchParams.get("error");
        if (errorMessage) {
        setError(
            errorMessage === "CredentialsSignin"
            ? "Invalid email or password"
            : "An error occurred. Please try again."
        );
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("Login Berhasil");

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            });


            if (result?.error) {
                setError("Invalid email or password");
                setIsLoading(false);
            } else if (result?.ok) {
                // Successful login - redirect will be handle by middleware
                router.refresh();
                router.push("/");
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An error occurred. Please try again.");
            }
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 p-10 rounded-xl ring-1 ring-gray-300 shadow-md">
                <div>
                    <h2 className="text-center text-3xl font-extrabold">
                        Login 
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-900/50 p-4 rounded-md border border-red-500">
                            <p className="text-sm text-red-200">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-900/50 p-4 rounded-md border border-green-500">
                            <p className="text-sm text-green-200">{success}</p>
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">Email address</label>
                        <input 
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Enter email"
                        data-testid="email-input"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                        <input 
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Enter password"
                        data-testid="password-input"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-2.5 px-4 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-zinc-900 disabled:opacity-50 transition-all duration-200"
                            data-testid="login-button"
                        >
                            {isLoading ? "Logining..." : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}