interface ICategory {
    id: number;
    name: string;
    slug: string;
    image: string;
}

export interface IProducts {
    id: number;
    title: string;
    slug: string;
    price: number;
    description: string;
    category: ICategory;
    images: string[];
}

export interface ICardProductProps {
    images: string;
    title: string;
    slug: string;
    category: string;
    price: number;
}

export interface IError {
    message: string;
    name?: string;
    code?: number;
}