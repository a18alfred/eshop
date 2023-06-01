import CheckboxGroup from './CheckboxGroup';
import { useSearchParams } from 'react-router-dom';
import { categoryFilter, costFilter } from '../../settings/filters';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Close, Filter } from '../../icons/icons';
import Overlay from '../Overlay/Overlay';
import { Helmet } from 'react-helmet';

interface ProductListFilterProps {
    scrollToTopProduct: () => void;
}

const duration = 0.3;

const variants = {
    open: {
        x: 0,
        display: 'block',
        transition: {
            duration,
        },
    },
    closed: {
        x: '100%',
        transition: {
            duration,
        },
        transitionEnd: {
            display: 'none',
        },
    },
};

const variants2 = {
    open: {
        right: 256,
        transition: {
            duration,
        },
    },
    closed: {
        right: 0,
        transition: {
            duration,
        },
    },
};

const ProductListFilter = ({ scrollToTopProduct }: ProductListFilterProps) => {
    const [urlSearchParams, setSearchParams] = useSearchParams();
    const [isOpenFilterMobile, setIsOpenFilterMobile] = useState(false);

    return (
        <>
            <Helmet>
                <body className={isOpenFilterMobile ? 'overflow-hidden' : ''} />
            </Helmet>
            <aside className='hidden lg:block max-w-[25%] w-full'>
                <h2 className=' text-lg inline-block text-zinc-800 font-medium relative w-full border-b boder-b-zinc-200 mt-0.5 mb-6'>
                    <span
                        className="block h-9 before:absolute before:left-0 before:-bottom-[1px] before:content-[''] before:h-0.5 before:bg-violet-700 before:w-[50px]">
                        Фильтры
                    </span>
                </h2>
                <CheckboxGroup
                    {...categoryFilter}
                    onClick={scrollToTopProduct}
                />
                <CheckboxGroup {...costFilter} onClick={scrollToTopProduct} />
                <button
                    onClick={() => {
                        const params = new URLSearchParams(urlSearchParams);
                        params.delete('cost');
                        params.delete('categorySlug');
                        setSearchParams(params.toString());
                        scrollToTopProduct();
                    }}
                    className='px-4 bg-violet-700 text-center py-2 flex items-center justify-center text-sm uppercase text-white rounded-2xl'
                >
                    Очистить все
                </button>
            </aside>
            {/* Mobile Filter */}
            <motion.nav
                initial='closed'
                variants={variants}
                animate={isOpenFilterMobile ? 'open' : 'closed'}
                className='fixed top-0 bottom-0 right-0 w-64 h-full bg-white z-[9999] overflow-y-auto'
            >
                <aside className='p-4 w-full'>
                    <h2 className=' text-lg inline-block text-zinc-800 font-medium relative w-full border-b boder-b-zinc-200 mt-0.5 mb-6'>
                        <span
                            className="block h-9 before:absolute before:left-0 before:-bottom-[1px] before:content-[''] before:h-0.5 before:bg-violet-700 before:w-[50px]">
                            Фильтр по
                        </span>
                    </h2>
                    <CheckboxGroup {...categoryFilter} />
                    <CheckboxGroup {...costFilter} />
                </aside>
            </motion.nav>

            <motion.button
                initial='closed'
                animate={isOpenFilterMobile ? 'open' : 'closed'}
                variants={variants2}
                onClick={() => setIsOpenFilterMobile(!isOpenFilterMobile)}
                className='fixed z-[9999] top-[39%] lg:hidden w-10 h-10 text-white bg-violet-700 rounded-tl-[20px] rounded-bl-[20px]'
            >
                {isOpenFilterMobile ? (
                    <Close className='w-4 h-4 mx-auto' />
                ) : (
                    <Filter className='w-4 h-4 mx-auto' />
                )}
            </motion.button>

            <Overlay
                active={isOpenFilterMobile}
                onClick={() => setIsOpenFilterMobile(!isOpenFilterMobile)}
                duration={duration}
            ></Overlay>
        </>
    );
};

export default ProductListFilter;
