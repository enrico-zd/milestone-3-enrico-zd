import { ICategory } from "@/types";

const API_URL = "https://api.escuelajs.co/api/v1/categories";


export const fetchCategory = async (): Promise<ICategory[]> => {
    const response = await fetch(API_URL, { next: { revalidate: 60 } });

    if(!response.ok){
        throw new Error('Failed to fetch category product');
    }

    return response.json();
}