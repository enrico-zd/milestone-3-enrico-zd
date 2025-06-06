"use client";

import { IProducts } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Define cart item type
export type CartItem = {
    product: IProducts;
    quantity: number;
};

// Define the shape of our context state
type CartContextType = {
    items: CartItem[];
    addToCart: (product: IProducts) => void;
    removeFromCart: (productId: number) => void;
    totalItems: number;
    clearCart: () => void;
}

// Create context with default values
const CartContext = createContext<CartContextType>({
    items: [],
    addToCart: () => {},
    removeFromCart: () => {},
    totalItems: 0,
    clearCart: () => {}
});

// Custom hook for using the cart context
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }: {children: ReactNode}) => {
    const [items, setItems] = useState<CartItem[]>([]);

    // Initialize cart from local storage if available
    useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
            setItems(JSON.parse(storedCart));
        }
    }, []);

    // Save updated cart to local storage
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(items));
    }, [items]);
    
    // Calculate total items in cart
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    // Add product to cart
    const addToCart = (product: IProducts) => {
        setItems((currentItems) => {
            // Check if product already exists in cart
            const existingItem = currentItems.find(
                (item) => item.product.id === product.id
            );

            if (existingItem) {
                // If it exists, increase quantity
                return currentItems.map((item) =>
                item.product.id === product.id
                    ? { ...item, quantity: item.quantity + 1}
                    : item
                )
            } else {
                // If it doesn't exist, add new item
                return [...currentItems, { product, quantity: 1 }];
            }
        });
    };

    // Remove product from cart
    const removeFromCart = (productId: number) => {
        setItems((currentItems) => {
            // Find the item
            const existingItem = currentItems.find(
                (item) => item.product.id === productId
            );

            if (existingItem && existingItem.quantity > 1) {
                // If quantity > 1, decrease quantity
                return currentItems.map((item) => 
                item.product.id === productId
                ? { ...item, quantity: item.quantity - 1}
                : item
            );
            } else {
                // If quantity is 1, remove item completely
                return currentItems.filter((item) => item.product.id !== productId);
            }
        });
    };

    // Clear the cart
    const clearCart = () => {
        setItems([]);
        localStorage.removeItem('cartItems');
    }

    return (
        <CartContext.Provider
            value={{items, addToCart, removeFromCart, totalItems, clearCart}}
        >
            {children}
        </CartContext.Provider>
    )
}

