import { IProducts } from "@/types";

const API_URL_Product = "https://api.escuelajs.co/api/v1/products";

export const fetchForHomePage = async (): Promise<IProducts[]> => {
    const response = await fetch(API_URL_Product + "?offset=1&limit=16");

    if(!response.ok){
        throw new Error('Failed to fetch data product');
    }

    return response.json();
}

export const fetchProductBySlug = async (slug: string): Promise<IProducts> => {
    const response = await fetch(`${API_URL_Product}/slug/${slug}`);

    if(!response.ok){
        throw new Error('Failed to fetch data product');
    }

    return response.json();
}


