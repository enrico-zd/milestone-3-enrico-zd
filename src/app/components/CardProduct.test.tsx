// CardProduct.test.tsx
import { render, screen } from '@testing-library/react';
import CardProduct from './CardProduct';
import * as nextNavigation from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CardProduct', () => {
  it('renders products when available', () => {
    const mockUseRouter = nextNavigation.useRouter as jest.Mock;
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
    });

    render(
      <CardProduct
        images="https://placehold.co/600x400"
        title="Produk A"
        slug="produk-a"
        category="Kategori A"
        price={90}
      />
    );

    expect(screen.getByText(/Produk A/i)).toBeInTheDocument();
  });
});
