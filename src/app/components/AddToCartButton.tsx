"use client";

import { useCart } from "@/contexts/CartContext";
import { IProducts } from "@/types";
import { useSession } from "next-auth/react";
import React from "react";

export default function AddToCartButton(product: IProducts) {
    const { addToCart } = useCart();
    const {data: session} = useSession();
    const isCustomer = session?.user.role === "customer";

    const handleAddToCart = () => {
        if(!session || !isCustomer) return;
        addToCart(product);
    }

    if(!session || !isCustomer){
        return (
            <button className="w-[145px] h-[35px] text-white hover:text-gray-100 rounded-3xl bg-[#668db4] hover:bg-[#8ca8bd]"
            onClick={handleAddToCart}
            >
                {!session ? "Login to Add": "Not a Customer"}
            </button>
        )
    }

    return (
        <button className="w-[145px] h-[35px] text-white hover:text-gray-100 rounded-3xl bg-[#45A2FF] hover:bg-[#45aeff]"
        onClick={handleAddToCart}
        >
            Add to Cart
        </button>
    )
}