import { IFAQ } from "@/types";

const API_URL_FAQ = "https://68218c22259dad2655af8c2b.mockapi.io/faq";

export const fetchFQA = async (): Promise<IFAQ[]> => {
    const response = await fetch(API_URL_FAQ);

    if(!response.ok){
        throw new Error('Failed to fetch data FAQ');
    }

    return response.json();
}