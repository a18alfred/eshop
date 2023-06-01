import axios, { AxiosPromise } from 'axios';
import { IProduct } from '../types/types';

export interface GetProductsResult {
    products: IProduct[];
    total: number;
    currentPage: number;
    limit: number;
    totalPage: number;
}

export const getProducts = (query: string): AxiosPromise<GetProductsResult> => {
    return axios({
        url: `${import.meta.env.VITE_API}/api/product/get?${query}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
export const getProductByCode = (code: string): AxiosPromise<IProduct> => {
    return axios({
        url: `${import.meta.env.VITE_API}/api/product/get/${code}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
