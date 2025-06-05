import React from "react";
import {fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginForm from "@/app/components/LoginForm";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn()
  }),
}));

// Mock signIn from next-auth/react
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

import { signIn } from "next-auth/react";

describe("LoginForm Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("handles successful login", async () => {
        // Mock successful signIn response
        (signIn as jest.Mock).mockResolvedValue({
            ok: true,
            error: null
        });

        render(<LoginForm />);

        // Fill in form
        fireEvent.change(screen.getByTestId("email-input"), {
            target: { value: "test@example.com" }
        });
        fireEvent.change(screen.getByTestId("password-input"), {
            target: { value: "password123" }
        });

        // Submit form
        fireEvent.click(screen.getByTestId("login-button"));

        // Check loading state
        expect(screen.getByText("Logining...")).toBeInTheDocument();
        expect(screen.getByTestId("login-button")).toBeDisabled();

        // Wait for submission to complete
        await waitFor(() => {
            expect(signIn).toHaveBeenCalledWith("credentials", {
                redirect: false,
                email: "test@example.com",
                password: "password123"
            });
        });
    });

    test("handles invalid credentials", async () => {
        // Mock failed signIn response
        (signIn as jest.Mock).mockResolvedValue({
            ok: false,
            error: "CredentialsSignin"
        });

        render(<LoginForm />);

        // Fill and submit form
        fireEvent.change(screen.getByTestId("email-input"), {
            target: { value: "test@example.com" }
        });
        fireEvent.change(screen.getByTestId("password-input"), {
            target: { value: "wrongpassword" }
        });
        fireEvent.click(screen.getByTestId("login-button"));

        // Wait for error message
        await waitFor(() => {
            expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
            expect(screen.getByTestId("login-button")).not.toBeDisabled();
        });
    });

    // Test case 1: Initial rendering
    test("should render login form with empty fields", () => {
        render(<LoginForm />);

        const emailInput = screen.getByTestId("email-input");
        const passwordInput = screen.getByTestId("password-input");
        const submitButton = screen.getByTestId("login-button");

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
        expect(emailInput).toHaveValue("");
        expect(passwordInput).toHaveValue("");
    })

    test("shows 'Invalid email or password' when signIn returns error", async () => {
    (signIn as jest.Mock).mockResolvedValue({ error: "CredentialsSignin" });

    render(<LoginForm />);
    fireEvent.change(screen.getByTestId("email-input"), { target: { value: "test@mail.com" } });
    fireEvent.change(screen.getByTestId("password-input"), { target: { value: "wrongpass" } });
    fireEvent.click(screen.getByTestId("login-button"));

    await waitFor(() => {
      expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
    });
  });

  test("handles network error", async () => {
      // Mock network error
      const networkError = new Error("Network error");
      (signIn as jest.Mock).mockRejectedValue(networkError);

      render(<LoginForm />);

      // Fill and submit form
      fireEvent.change(screen.getByTestId("email-input"), {
          target: { value: "test@example.com" }
      });
      fireEvent.change(screen.getByTestId("password-input"), {
          target: { value: "password123" }
      });
      fireEvent.click(screen.getByTestId("login-button"));

      // Wait for error message
      await waitFor(() => {
          expect(screen.getByText("Network error")).toBeInTheDocument();
          expect(screen.getByTestId("login-button")).not.toBeDisabled();
      });
  });

  test("handles unknown error", async () => {
        // Mock unknown error
        (signIn as jest.Mock).mockRejectedValue("Unknown error");

        render(<LoginForm />);

        // Fill and submit form
        fireEvent.change(screen.getByTestId("email-input"), {
            target: { value: "test@example.com" }
        });
        fireEvent.change(screen.getByTestId("password-input"), {
            target: { value: "password123" }
        });
        fireEvent.click(screen.getByTestId("login-button"));

        // Wait for generic error message
        await waitFor(() => {
            expect(screen.getByText("An error occurred. Please try again.")).toBeInTheDocument();
            expect(screen.getByTestId("login-button")).not.toBeDisabled();
        });
    });

  test("shows generic error when signIn throws", async () => {
    (signIn as jest.Mock).mockImplementation(() => {
      throw "Some error";
    });

    render(<LoginForm />);
    fireEvent.change(screen.getByTestId("email-input"), { target: { value: "test@mail.com" } });
    fireEvent.change(screen.getByTestId("password-input"), { target: { value: "any" } });
    fireEvent.click(screen.getByTestId("login-button"));

    await waitFor(() => {
      expect(screen.getByText("An error occurred. Please try again.")).toBeInTheDocument();
    });
  });
    
})