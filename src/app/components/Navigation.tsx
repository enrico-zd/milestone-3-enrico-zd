"use client";

import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import React from "react"
import { signOut, useSession } from "next-auth/react"
import { useCart } from "@/contexts/CartContext";

export default function Navigation() {
    const { data: session } = useSession();
    const { totalItems } = useCart();

    return (
        <header>
            <nav className="flex justify-center items-center w-full bg-white top-0 py-4 shadow-sm text-lg text-black fixed z-10">
                <div className="flex flex-row justify-between items-center w-full h-full">
                    <Link className="z-10 ml-20" href="/">RevoShop</Link>
                    <div className="flex gap-4 items-center z-10">
                        {/* Home Page */}
                        <Link className="nav-hover" href="/">Home</Link>

                        {/* About page */}
                        <Link className="nav-hover" href="/about">About</Link>

                        {/* FAQ page */}
                        <Link className="nav-hover" href="/faq">FAQ</Link>

                        {session ? (
                            <>
                                {/* cart page */}
                                <Link 
                                href="/cart" 
                                className="flex flex-row items-center relative"
                                >
                                    Cart <FontAwesomeIcon icon={faCartShopping} width={20}/>
                                    {totalItems > 0 && (
                                        <span
                                        className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-green-600 dark:bg-green-500 rounded-full"
                                        >
                                        {totalItems}
                                        </span>
                                    )}
                                </Link>

                                {/* Profile or Dashboard link */}
                                <Link
                                href={session?.user?.role === "admin" ? "/dashboard" : "/profile"}
                                className="overflow-hidden rounded-full w-10 h-10 ring-1 ring-gray-300"
                                >
                                    <img src={session?.user?.avatar}/>
                                </Link>
                                <button
                                onClick={() => signOut({ callbackUrl: "/login" })}
                                className="text-sm text-red-400 hover:text-red-300 transition-colors mr-6"
                                >
                                    Sign out    
                                </button>
                            </>
                            
                        ) : (
                            <Link 
                            className="ring-1 ring-black active:bg-black active:text-white rounded-md py-1 px-2 mr-6" 
                            href="/login"
                            >
                                Login
                            </Link>
                        )}
                        
                    </div>
                </div>
            </nav>
        </header>
    )
}