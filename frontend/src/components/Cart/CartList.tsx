import React, { memo } from 'react';
import CartProduct from './CartProduct';
import formatRub from '../../utils/formatRub';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux';

type CartListProps = {
    isPage?: boolean;
};

const CartList = ({ isPage = false }: CartListProps) => {
    const navigate = useNavigate();
    const { items, total } = useAppSelector((state) => state.cart);
    const { isLoggedIn } = useAppSelector((state) => state.auth);

    const onOrder = () => {
        if (!isLoggedIn) navigate('/signin');
    };

    return (
        <>
            <div
                className={`flex flex-col mb-8 ${
                    !isPage && 'overflow-y-auto max-h-[500px] scrollbar'
                }`}
            >
                {items
                    .slice(0)
                    .reverse()
                    .map((item) => (
                        <CartProduct key={item.id} item={item} />
                    ))}
            </div>
            <div className='flex flex-col items-end gap-4 mb-12'>
                <div className='py-4 pb-2.5 pl-9'>
                    <p className='inline-block mr-4'>Общая стоимость:</p>
                    <span className='text-violet-700 font-bold text-xl inline-block'>
                        {formatRub(total)}
                    </span>
                </div>
                <button
                    onClick={onOrder}
                    type='button'
                    className='font-bold px-8 mb-2.5 border h-[50px] text-base border-violet-700 text-center cursor-pointer transition-colors duration-100 ease-in flex-auto bg-violet-700 text-white rounded-2xl'
                >
                    Оформить заказ
                </button>
            </div>
        </>
    );
};

export default memo(CartList);
