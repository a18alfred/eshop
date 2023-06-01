import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import formatRub from '../../utils/formatRub';
import useQuantity from '../../hooks/useQuantity';
import { addItemCart } from '../../redux/slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { IProduct } from '../../types/types';
import QuantityInput from '../QuantityInput/QuantityInput';
import ProductInfoImage from './ProductInfoImage';
import { useAppDispatch } from '../../redux';

type MainProps = {
    product: IProduct;
};

const ProductInfo = ({ product }: MainProps) => {
    const navigate = useNavigate();
    const {
        quantity,
        increaseQuantity,
        decreaseQuantity,
        inputChangeQuantity,
        resetQuantity,
    } = useQuantity(1, product.stock);
    const dispatch = useAppDispatch();

    const onAdd = () => {
        if (!quantity) {
            resetQuantity();
        }
        dispatch(
            addItemCart({
                id: product.id,
                name: product.name,
                code: product.code,
                slug: product.slug,
                cost: product.cost,
                price: product.price,
                discount: product.discount,
                image: product.images[0]?.src,
                quantity: !quantity
                    ? 1
                    : Number(quantity),
                stock: product.stock,
            }),
        );
        navigate('/cart');
    };

    return (
        <div className='flex flex-col lg:flex-row'>
            <div className='flex flex-col md:flex-row gap-16 md:gap-8 lg:gap-16 mb-8 w-full text-zinc-800'>
                <ProductInfoImage images={product.images} />
                <div className='w-full md:flex-1 flex flex-col gap-4'>
                    <div className={'flex flex-col gap-4 w-full'}>
                        <h1 className='text-2xl font-bold'>
                            {product.name}
                        </h1>

                        <div className={'flex items-center gap-4'}>
                            <span
                                className='text-xl font-bold text-violet-700'
                            >
                                {formatRub(product.cost)}
                            </span>

                            {!!product.discount && (
                                <>
                                    <del className='text-base text-zinc-400/90'>
                                        {formatRub(product.price)}
                                    </del>
                                    <span
                                        className={
                                            'text-xs font-semibold ml-4 px-3 py-1 bg-yellow-400 rounded-full'
                                        }
                                    >
                                        - {product.discount}%
                                    </span>
                                </>
                            )}
                        </div>

                        <div
                            className={`flex items-center gap-2 ${product.status === 'В наличии' ? 'text-green-500' : 'text-red-500'}`}>
                            <div
                                className={`w-2.5 h-2.5 rounded-full ${product.status === 'В наличии' ? 'bg-green-500' : 'bg-red-500'}`} />
                            <p>{product.status}{product.status === 'В наличии' ? `: ${product.stock}` : ''}</p>
                        </div>

                    </div>

                    <ul className='flex flex-col gap-1 text-zinc-500'>
                        <li>
                            <span>Производитель:</span>{' '}
                            <Link
                                className='uppercase hover:text-violet-700'
                                to={`/products?brand=${product.brand}`}
                            >
                                {product.brand}
                            </Link>{' '}
                        </li>
                        <li>
                            <span>Артикул:</span>{' '}
                            <span className='uppercase'>{product.code}</span>
                        </li>
                    </ul>

                    <h4 className={'text-xl font-bold mt-4'}>О товаре</h4>
                    <p className={'text-sm mb-4'}>{product.desc}</p>

                    <div className='flex w-full items-center gap-4'>
                        <QuantityInput
                            quantity={quantity}
                            decreaseQuantity={decreaseQuantity}
                            increaseQuantity={increaseQuantity}
                            inputChangeQuantity={inputChangeQuantity}
                        />
                        <button
                            onClick={onAdd}
                            className='h-[40px] max-w-max rounded-2xl font-bold px-16 text-center cursor-pointer flex-auto text-sm md:text-xl bg-violet-700 text-white'
                        >
                            В корзину
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
