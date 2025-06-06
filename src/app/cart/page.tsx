"use client";

import { useCart } from "@/contexts/CartContext";
import CartItemCard from "../components/CartItemCard";
import Link from "next/link";

export default function CartPage() {
    const { items, totalItems, clearCart } = useCart();

    // Calculate total price
    const totalPrice = items.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0)

    const handleCheckout = () => {
        alert("Checkout Products");
        clearCart(); // Clear cart after checkout
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-semibold mb-4">Shopping Cart</h1>
                    {totalItems > 0 ? (
                        <>
                            <div>
                                {items.map((item) => (
                                    <div key={item.product.id}>
                                        <CartItemCard item={item}/>
                                    </div>
                                ))}
                            </div>
                            <div className="text-2xl flex gap-2">
                                <span>
                                    Total:
                                </span>
                                <span className="font-semibold">
                                    ${totalPrice.toFixed(2)}
                                </span>
                            </div>
                            <button onClick={handleCheckout} className="bg-green-600 hover:bg-green-700 text-white py-3 px-10 text-2xl mt-2 rounded-xl">
                                Checkout
                            </button>
                        </>
                    ): (
                        <div className="flex flex-col items-center">
                            <h2 className="text-xl font-semibold text-text-light dark:text-white mb-2">
                                Your cart is empty
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 mb-6">
                                Looks like you haven&apos;t added any products to your cart yet.
                            </p>
                            <Link
                                href="/"
                                className="inline-block py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-md transition-all transform hover:scale-105"
                            >
                                Browse Products
                            </Link>
                        </div>
                    )}
                </div>
        </div>
    );
}