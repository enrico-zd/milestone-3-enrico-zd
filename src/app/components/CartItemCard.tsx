"use client";

import { CartItem, useCart } from "@/contexts/CartContext";

type CartItemCardProps = {
    item: CartItem;
};

const CartItemCard = ({ item }: CartItemCardProps) => {
    const { addToCart, removeFromCart } = useCart();
    const { product, quantity } = item;

    const handleAddToCart = () => {
        addToCart(product);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(product.id);
    };

    return (
        <div className="flex flex-row shadow-md ring-gray-300 ring-1 p-2 rounded-xl mb-4 items-center">
            <div className="rounded-2xl overflow-hidden size-32">
                <img src={product.images[0]} alt={product.slug}/>
            </div>
            <div className="ml-3 flex flex-col w-[300px] justify-center">
                <h3 className="text-xl">
                    {product.title}
                </h3>
                <p className="text-lg">
                    ${product.price}
                </p>
                <div className="self-end">
                    <button onClick={handleRemoveFromCart} aria-label="Remove from cart" className="text-3xl p-2 active:text-red-400">
                        -
                    </button>
                    <span className="text-xl p-2 bg-gray-100 ring-1 ring-gray-200">
                        {quantity}
                    </span>
                    <button onClick={handleAddToCart} aria-label="Add to cart" className="text-xl p-2 active:text-green-400">
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartItemCard;