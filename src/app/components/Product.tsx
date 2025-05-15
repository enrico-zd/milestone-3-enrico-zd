"use client"

import CardProduct from "@/app/components/CardProduct";
import { IError, IProducts } from "@/types";

import { useEffect, useState } from "react";
import { fetchForHomePage } from "@/utils/ProductApi";

export default function Product() {

  const [dataProducts, setDataProducts] = useState<IProducts[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);

  const loadProduct = async (): Promise<void> => {
    try{
      setIsLoading(true);
      setError(null);
      const data = await fetchForHomePage();
      setDataProducts(data);
    } catch(err){
      setError(
        {
          message: err instanceof Error ? err.message : "Unknown error occured",
          name: err instanceof Error ? err.name : undefined,
          code: err instanceof Error ? 500 : undefined
        }
      )
    } finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <main>
    <section>
        {/* Show Error message if fail to fetching */}
        {error && (
        <div className="p-4 mt-10 mx-auto w-80 bg-red-500 border border-red-400 rounded text-red-200">
            <p>message: {error.message}</p>
            <p>name: {error.name}</p>
            <p>code: {error.code}</p>
        </div>
        )}
        
        {/* render card product */}
        <div className='grid grid-cols-4 gap-y-10 place-items-center mx-auto my-6'>
        {/* Show loading indicator while fetching */}
        {isLoading && (
            [...Array(8)].map((_, index) => (
            <div key={index} className="h-[480px] w-[300px] rounded-md border border-gray-300">
            <div className="flex flex-col animate-pulse space-x-4 overflow-hidden">
                <div className="size-[300px] bg-gray-200"></div>
                <div className="flex-1 space-y-6 py-4">
                <div className="h-6 mx-2 rounded bg-gray-200"></div>
                <div className="flex flex-row w-[60%]">
                    <div className="h-4 w-[30%] mx-2 rounded bg-gray-200"></div>
                    <div className="h-4 w-[30%] rounded bg-gray-200"></div>
                </div>
                <div className="h-4 w-[30%] mx-2 rounded bg-gray-200"></div>
                </div>
            </div>
            </div>
        )))}
        {!isLoading && dataProducts.length > 0 && (
            dataProducts.filter((product) => 
            !product.images[0].includes("https://placehold.co/600x400") &&
            !product.title.includes("new string")).map((product: IProducts, index: number) => (
            <CardProduct
                key={`${product.id}-${index}`}
                images={product.images[0]}
                title={product.title}
                slug={product.slug}
                price={product.price}
                category={product.category.name}
            />
            )))
        }
        </div>
    </section>
    </main>
  );
}
