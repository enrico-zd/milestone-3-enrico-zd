'use client'
import React, { useEffect, useState } from "react";
import { ICategory } from "@/types";
import { fetchCategory } from "@/utils/CategoryApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function HomePage(): React.JSX.Element {

    const [categoryData, setCategoryData] = useState<ICategory[]>([]);

    const loadData = async (): Promise<void> => {
        try{
            const fetchData = await fetchCategory();
            setCategoryData(fetchData);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    // const categoryFilter: string[] = ["clothes" ,"electronics", "furniture", "shoes", "miscellaneous"];

    return (
        <div className="flex justify-center my-8">
            <div className="grid grid-cols-[420px_420px_420px] grid-rows-[420px_420px] place-items-center">
                {
                    categoryData.length > 0 && (
                        categoryData.map((category: ICategory) => (
                            <div key={category.id} className="w-[400px] h-[400px] rounded-xl overflow-hidden relative group">
                                <img src={category.image} alt={category.slug} className="w-[400px] h-[400px]" />
                                <div className="absolute top-20 opacity-0 group-hover:opacity-100 rounded-b-2xl w-[400px] h-[340px] inset-0 bg-gradient-to-t from-black/75 to-transparent">
                                    <p className="text-white text-sm font-semibold mt-20 ml-8 text-shadow-md">Category</p>
                                    <p className="text-white text-5xl font-semibold mt-2 ml-8 text-shadow-md">{category.name}</p>
                                    <button className="absolute right-6 bottom-10 text-white hover:text-gray-200">Go to Product <FontAwesomeIcon icon={faAngleRight} /></button>
                                </div>
                            </div>
                        ))
                    )
                }
                
            </div>
        </div>
    );
}