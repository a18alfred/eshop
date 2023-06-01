import React from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Container from '../components/Container/Container';
import NotFound from './NotFound';
import PullsLoader from '../components/Loader/PullsLoader';
import ProductInfo from '../components/Product/ProductInfo';
import { useQuery } from 'react-query';
import { IProduct } from '../types/types';
import { getProductByCode } from '../services/product';
import ProductCarousel from '../components/Product/ProductCarousel';

const ProductDetails = () => {
    const { productCode } = useParams();

    const { data: product, isLoading } = useQuery<IProduct, Error>({
        queryKey: ['products', productCode],
        queryFn: () =>
            getProductByCode(productCode || '').then((res) => res.data),
    });

    if (isLoading) {
        return (
            <Container className='flex justify-center py-5'>
                <PullsLoader />
            </Container>
        );
    }

    if (!product) {
        return <NotFound />;
    }

    return (
        <main>
            <Breadcrumb
                items={[
                    {
                        src: `/products?categorySlug=${product.category.slug}`,
                        value: product.category.name,
                    },
                ]}
                active={product.name}
            />
            <Container>
                <section className='flex flex-col mt-2 lg:mt-4 gap-4 mb-4'>
                    <ProductInfo product={product} />
                    <ProductCarousel
                        noTitleLink
                        excludeItemById={product.id}
                        titleHeadValue='Вам может понравится'
                        titleHeadUrl='products?sort=discount-desc'
                        query='sort=discount-desc'
                        delay={5000}
                    />
                </section>
            </Container>
        </main>
    );
};

export default ProductDetails;
