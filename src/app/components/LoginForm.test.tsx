import {fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => ({
    get: () => null,
  }),
}));

// Mock signIn from next-auth/react
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

import { signIn } from "next-auth/react";

describe("LoginForm Component", () => {
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