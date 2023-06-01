import React from 'react';

export type ChildrenProps = {
    children?: React.ReactNode;
};

export type Images = {
    id: number;
    src: string;
    alt: string;
};

export type IProduct = {
    id: number;
    name: string;
    slug: string;
    brand: string;
    code: string;
    bonus: string;
    status: 'В наличии' | 'Закончился';
    stock: number;
    discount: number;
    price: number;
    cost: number;
    avgRating: number;
    currency: string;
    images: Images[];
    category: {
        id: number;
        name: string;
        slug: string;
        createdAt: Date;
        updatedAt: Date;
    };
    desc: string;
    createdAt: Date;
    updatedAt: Date;
};
