import {
    addItemCart,
    CartItem,
    deleteItemCart,
    subItemCart,
    updateItemCart,
} from '../../redux/slices/cartSlice';
import React, { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import formatRub from '../../utils/formatRub';
import { Check, Close } from '../../icons/icons';
import { useDispatch } from 'react-redux';
import { useGlobalContext } from '../../context/appContext';
import QuantityInput from '../QuantityInput/QuantityInput';
import { useAppSelector } from '../../redux';

interface CartItemProps {
    item: CartItem;
}

const CartProduct = React.memo(({ item }: CartItemProps) => {
    const dispatch = useDispatch();
    const { items, newItem } = useAppSelector((state) => state.cart);
    const { closePopUpCart } = useGlobalContext();
    const increaseQuantity = () => {
        dispatch(
            addItemCart({
                id: item.id,
                name: item.name,
                slug: item.slug,
                code: item.code,
                cost: item.cost,
                price: item.price,
                discount: item.discount,
                image: item.image,
                quantity: 1,
                stock: item.stock,
            }),
        );
    };

    const decreaseQuantity = () => {
        if (item.quantity === 1) {
            deleteCart(item.id);
            return;
        }

        dispatch(
            subItemCart({
                id: item.id,
                name: item.name,
                slug: item.slug,
                cost: item.cost,
                code: item.code,
                price: item.price,
                discount: item.discount,
                image: item.image,
                quantity: 1,
                stock: item.stock,
            }),
        );
    };

    const updateQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const newQuantity = parseInt(value.split(/\D/).join(''));

        if (isNaN(newQuantity) || newQuantity < 1 || newQuantity > item.stock)
            return;

        dispatch(
            updateItemCart({
                id: item.id,
                name: item.name,
                slug: item.slug,
                cost: item.cost,
                price: item.price,
                discount: item.discount,
                code: item.code,
                image: item.image,
                quantity: newQuantity,
                stock: item.stock,
            }),
        );
    };

    const deleteCart = (id: number) => {
        if (items.length <= 1) {
            closePopUpCart();
        }
        dispatch(deleteItemCart(id));
    };

    return (
        <div
            className={
                'flex flex-col gap-4 border-b border-b-zinc-200 py-4 relative'
            }
        >
            <div className={'flex flex-row gap-8'}>
                <Link to={'/products/' + item.code}>
                    <div
                        className='overflow-hidden bg-zinc-200 w-[75px] h-[75px] md:w-[100px] md:h-[100px] rounded-2xl'>
                        {!!item.image && (
                            <img
                                src={item.image}
                                alt={item.name}
                                className='object-cover w-full h-full rounded-2xl'
                            />
                        )}
                    </div>
                </Link>
                <div className={'flex flex-col gap-2 text-xs md:text-sm'}>
                    <Link
                        to={'/products/' + item.code}
                        className={`line-clamp-2 mb-1 pr-4 transition hover:text-violet-700`}
                    >
                        {item.name}
                    </Link>
                    <p className='text-zinc-700 font-bold mb-1'>
                        {formatRub(item.cost)}
                    </p>
                    {item.id === newItem?.id && (
                        <p className='flex items-center space-x-1.5 text-violet-500'>
                            <Check className='w-3.5 h-3.5' />
                            <span>Недавно добавлено</span>
                        </p>
                    )}
                </div>
            </div>
            <div className={'flex justify-between'}>
                <Close
                    onClick={() => deleteCart(item.id)}
                    className={
                        'absolute right-2 top-4 w-[9px] w-[9px] fill-zinc-500 cursor-pointer'
                    }
                />
                <div className={'flex items-center justify-between w-full'}>
                    <QuantityInput
                        quantity={item.quantity}
                        decreaseQuantity={decreaseQuantity}
                        increaseQuantity={increaseQuantity}
                        inputChangeQuantity={updateQuantity}
                    />
                    <div
                        className={'flex items-center gap-2 whitespace-nowrap'}
                    >
                        <p className='text-violet-700 text-xl font-bold  pr-2 text-right select-none'>
                            {formatRub(item.quantity * item.cost)}
                        </p>
                        {!!item.discount && (
                            <del className='text-base text-zinc-400/90'>
                                {formatRub(item.quantity * item.price)}
                            </del>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CartProduct;
