import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import formatRub from '../../utils/formatRub';
import ProductRate from './ProductRate';
import { IProduct } from '../../types/types';

type ProductCardProps = {
    product: IProduct;
    withRating: boolean;
};

const ProductCard = ({ product, withRating = false }: ProductCardProps) => {
    return (
        <Link
            to={`/products/${product.code}`}
            className={`select-none text-zinc-800 hover:text-violet-700`}
        >
            <div className="px-2.5">
                {/* Фото товара  */}
                <div className="relative group mb-0.5">
                    <div
                        className={
                            'h-32 xs:h-44 lg:h-52  aspect-square w-auto mb-0.5 relative rounded-2xl bg-zinc-100'
                        }
                    >
                        {!!product.images[0] && (
                            <img
                                src={product.images[0].src}
                                alt={product.images[0].alt}
                                className="object-cover w-full h-full select-none rounded-2xl"
                            />
                        )}
                    </div>
                </div>

                {/* Информация */}
                <div className="relative pb-3">
                    <p className="text-xs font-semibold md:text-sm leading-5 min-h-[40px] mt-1.5 mb-2 line-clamp-2">
                        {product.name}
                    </p>
                    {withRating && (
                        <div className="flex items-center space-x-0.5">
                            <ProductRate rate={product.avgRating} />
                        </div>
                    )}
                    <div className="flex flex-nowrap items-center">
                        <span className="text-violet-700 text-sm md:text-base font-bold mr-2 whitespace-nowrap">
                            {formatRub(product.cost)}
                        </span>
                        {!!product.discount && (
                            <>
                                <del className="text-xs md:text-sm font-normal text-zinc-400/90 whitespace-nowrap">
                                    {formatRub(product.price)}
                                </del>
                                <span
                                    className={
                                        'text-xs font-semibold ml-4 px-3 py-1 bg-yellow-400 rounded-full whitespace-nowrap'
                                    }
                                >
                                    - {product.discount}%
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};
export default memo(ProductCard);
