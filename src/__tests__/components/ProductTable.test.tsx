import React from "react";
import ProductTable from "@/app/components/ProductTable";
import { IProductPostProps } from "@/types";
import { fireEvent, render, screen } from "@testing-library/react";


// dummy data for product testing
const mockProduct: IProductPostProps[] = [
    {
        id: 1,
        title: "Test Product 1",
        price: 100,
        description: "This is a test product 1",
        categoryId: 1,
        images: ["https://placehold.co/600x400"],
    }
]

describe("ProductTable", () => {
    // Test if data product is empty
    test("shows 'No products available' when products is empty", () => {
        render(<ProductTable products={[]} onEdit={jest.fn()} onDelete={jest.fn()} />)
        expect(screen.getByText("No products available")).toBeInTheDocument();
    });

    // Test rendering of product data
    test("renders product data correctly", () => {
        render(<ProductTable products={mockProduct} onEdit={jest.fn()} onDelete={jest.fn()} />);

        expect(screen.getByText("Test Product 1")).toBeInTheDocument();
        expect(screen.getByText("$100.00")).toBeInTheDocument();
        expect(screen.getByText("This is a test product 1")).toBeInTheDocument();
    })

    // Test click edit button
    test("calls onEdit when Edit button is clicked", () => {
        const onEditMock = jest.fn();
        render(<ProductTable products={mockProduct} onEdit={onEditMock} onDelete={jest.fn()} />);

        // click the edit button
        const editButton = screen.getByRole("button", { name: "Edit Product"})
        fireEvent.click(editButton);

        // check if onEdit was called with the correct product
        expect(onEditMock).toHaveBeenCalledWith(mockProduct[0]);
    })

    // Test click delete button
    test("calls onDelete when Delete button is clicked", () => {
        const onDeleteMock = jest.fn();
        render(<ProductTable products={mockProduct} onEdit={jest.fn()} onDelete={onDeleteMock} />);

        // click the delete button
        const deleteButton = screen.getByRole("button", { name: "Delete Product" })
        fireEvent.click(deleteButton);

        // check if onDelete was called with the correct product id
        expect(onDeleteMock).toHaveBeenCalledWith(mockProduct[0].id);
    })

    // set placeholder image when fails to load image
    test("should set placeholder image when image fails to load", () => {
        render(<ProductTable products={mockProduct} onEdit={jest.fn()} onDelete={jest.fn()} />);

        // check if the image is rendered with the correct src
        const image = screen.getByAltText("Test Product 1") as HTMLImageElement;
        expect(image.src).toBe("https://placehold.co/600x400");

        // simulate image error
        fireEvent.error(image);
        expect(image.src).toBe("https://via.placeholder.com/150");
    })
})