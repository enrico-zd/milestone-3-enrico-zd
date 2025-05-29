export interface IUser {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar: string;
}

export interface ICategory {
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

export interface IProductPostProps {
    id: number;
    title: string;
    price: number;
    description: string;
    categoryId: number;
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

export interface IFAQ {
    question: string;
    answer: string;
}

export interface IFAQProps {
    faqs: IFAQ[];
}