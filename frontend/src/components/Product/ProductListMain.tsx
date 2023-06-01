import { IProduct } from '../../types/types';
import ProductCard from './ProductCard';
import React from 'react';
import SkeletonProductCard from '../Skeleton/SkeletonProductCard';
import { PRODUCTS_PER_PAGE } from '../../settings/constants';
import ReactPaginate from 'react-paginate';
import { ArrowLeft, ArrowRight } from '../../icons/icons';
import { useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';

interface ListProps {
    products: IProduct[] | undefined;
    isLoading: boolean;
    error: AxiosError | null;
    page: number;
    totalPage: number | undefined;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const ProductListMain = ({
    products,
    isLoading,
    error,
    page,
    setPage,
    totalPage,
}: ListProps) => {
    const [urlSearchParams, setSearchParams] = useSearchParams();
    const handlePageClick = ({ selected }: { selected: number }) => {
        window.scrollTo({ top: 0 });
        urlSearchParams.set('page', (selected + 1).toString());
        setSearchParams(urlSearchParams);
        setPage(selected);
    };

    if (isLoading)
        return (
            <div className={style.container}>
                {[...Array(PRODUCTS_PER_PAGE)].map((_, i) => (
                    <SkeletonProductCard key={i} />
                ))}
            </div>
        );

    if (products?.length === 0)
        return <p className={style.message}>Ничего не найдено.</p>;

    if (!products || !totalPage || error)
        return <p className={style.message}>Что-то пошло не так</p>;

    return (
        <>
            <div className={style.container}>
                {products.map((product) => (
                    <ProductCard
                        withRating={false}
                        product={product}
                        key={product.id}
                    />
                ))}
            </div>
            {totalPage > 1 && (
                <nav className="flex items-center justify-center select-none">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel={<ArrowRight className="w-3.5 h-3.5" />}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={2}
                        pageCount={totalPage}
                        previousLabel={<ArrowLeft className="w-3.5 h-3.5" />}
                        onPageChange={handlePageClick}
                        forcePage={page}
                        containerClassName="inline-flex my-2.5 space-x-2"
                        breakLinkClassName={style.pagination}
                        pageLinkClassName={style.pagination}
                        activeLinkClassName="bg-violet-700 text-white border-violet-700"
                        previousLinkClassName={style.pagination}
                        nextLinkClassName={style.pagination}
                        disabledClassName="hidden"
                        renderOnZeroPageCount={() => null}
                    />
                </nav>
            )}
        </>
    );
};

const style = {
    container: 'grid gap-7 grid-cols-2 md:grid-cols-3 mb-7',
    message: 'my-2 p-4 grid-rows-3 w-full text-violet-700',
    pagination:
        'w-7 h-7 ml-0 leading-7 border hover:border-violet-700 hover:bg-violet-700 hover:text-white transition-all ease-in-out duration-150 flex items-center justify-center rounded-full',
};

export default ProductListMain;
