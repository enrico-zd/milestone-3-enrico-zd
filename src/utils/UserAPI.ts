import { IUser } from "@/types";

const API_URL = "https://api.escuelajs.co/api/v1/users";

export const fetchUser = async (): Promise<IUser[]> => {
    const response = await fetch(API_URL);
    
    if(!response.ok){
        throw new Error('Failed to fetch user product');
    }

    return response.json();
}