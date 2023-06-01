import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Container from '../components/Container/Container';
import PageTitle from '../components/PageTitle/PageTitle';
import { getProducts, GetProductsResult } from '../services/product';
import { PRODUCTS_PER_PAGE } from '../settings/constants';
import ProductListFilter from '../components/Product/ProductListFilter';
import ProductListMain from '../components/Product/ProductListMain';
import { AxiosError } from 'axios';
import categorySlugToName from '../settings/category';

const ProductList = () => {
    const [urlSearchParams, setSearchParams] = useSearchParams();
    const productRef = useRef<HTMLElement | null>(null);

    const categorySlug = urlSearchParams.get('categorySlug') || '';
    const cost = urlSearchParams.get('cost') || '';
    const search = urlSearchParams.get('search') || '';
    const sortValue = urlSearchParams.get('sort') || 'cost-asc';
    const brandValue = urlSearchParams.get('brand') || '';
    const pageValue = urlSearchParams.get('page') || '';

    const [page, setPage] = useState(parseInt(pageValue) - 1 || 0);

    const query = `sort=${sortValue}&page=${pageValue}&categorySlug=${categorySlug}&search=${search}&cost=${cost}&brand=${brandValue}&limit=${PRODUCTS_PER_PAGE}`;

    const { isLoading, error, data } = useQuery<GetProductsResult, AxiosError>({
        queryKey: ['products', { query }],
        queryFn: () => getProducts(query).then((res) => res.data),
    });

    const scrollToTopProduct = useCallback(() => {
        if (productRef.current) {
            const rect = productRef.current.getBoundingClientRect();
            window.scrollTo({
                top: rect.top + window.scrollY,
                behavior: 'smooth',
            });
        }
    }, []);
    const handleChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value) {
            urlSearchParams.set('sort', encodeURIComponent(e.target.value));
        } else {
            urlSearchParams.delete('sort');
        }
        setSearchParams(urlSearchParams);
    };

    const title =
        search || brandValue || categorySlugToName?.[categorySlug] || 'Товары';

    return (
        <>
            <Breadcrumb active={title} />
            <Container className="relative pt-7 pb-4 lg:flex lg:items-start lg:space-x-6">
                <ProductListFilter scrollToTopProduct={scrollToTopProduct} />
                <section ref={productRef} className="w-full lg:w-3/4">
                    {/* Page Title */}
                    <PageTitle value={title} style={{ margin: '4px 0 0 0' }} />
                    {/* Sort */}
                    <div className="h-10 w-full border-b border-b-zinc-200 mb-2.5">
                        <div className="float-right text-zinc-500 text-[13px]">
                            <label className="float-left mr-2.5 leading-8 hidden md:block">
                                Сортировать:
                            </label>
                            <select
                                onChange={handleChangeSort}
                                className="float-right w-38 bg-white py-0 text-[13px] px-2.5 h-8 cursor-pointer border-none focus:ring-0 focus:outline-none bg-[length:16px_16px]"
                            >
                                <option value="cost-asc">
                                    По умолчанию (возрастание)
                                </option>
                                <option value="cost-asc">
                                    По цене (возрастание)
                                </option>
                                <option value="cost-desc">
                                    По цене (убывание)
                                </option>
                                <option value="name-asc">
                                    По алфавиту (А-Я)
                                </option>
                                <option value="name-desc">
                                    По алфавиту (Я-А)
                                </option>
                            </select>
                        </div>
                    </div>
                    <ProductListMain
                        isLoading={isLoading}
                        error={error}
                        products={data ? data.products : undefined}
                        page={page}
                        setPage={setPage}
                        totalPage={data ? data.totalPage : undefined}
                    />
                </section>
            </Container>
        </>
    );
};

export default ProductList;
