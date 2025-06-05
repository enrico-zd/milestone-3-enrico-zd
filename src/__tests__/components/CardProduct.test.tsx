// CardProduct.test.tsx
import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import CardProduct from '@/app/components/CardProduct';
import * as nextNavigation from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CardProduct', () => {
  test('renders products when available', () => {
    const mockUseRouter = nextNavigation.useRouter as jest.Mock;
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
    });

    render(
      <CardProduct
        images="https://placehold.co/600x400"
        title="Product A"
        slug="product-a"
        category="Kategori A"
        price={90}
      />
    );

    const productCard = screen.getByTestId('product-card');
    expect(productCard).toBeInTheDocument();

    // product card should have an image
    const image = screen.getByAltText('product-a') as HTMLImageElement;
    expect(image.src).toBe('https://placehold.co/600x400');
    
    // product card title should be visible
    expect(screen.getByText("Product A")).toBeInTheDocument();

    // product card category should be visible
    expect(screen.getByText("Category: Kategori A")).toBeInTheDocument();

    // product card price should be visible
    expect(screen.getByText("$90")).toBeInTheDocument();

  });

  test('handle click direct to product detail path ', () => {
    const mockPush = jest.fn();
    const mockUseRouter = nextNavigation.useRouter as jest.Mock;
    mockUseRouter.mockReturnValue({
      push: mockPush
    });

    render(
      <CardProduct
        images="https://placehold.co/600x400"
        title="Product B"
        slug="product-b"
        category="Kategori B"
        price={120}
      />
    );

    const productCard = screen.getByTestId('product-card');
    fireEvent.click(productCard);

    // Check router.push was called with the correct slug
    expect(mockPush).toHaveBeenCalledWith('/product/product-b');
  });
});
