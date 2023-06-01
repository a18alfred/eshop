import React, { memo } from 'react';
import { CartShopping, XMark } from '../../icons/icons';
import formatRub from '../../utils/formatRub';
import { motion } from 'framer-motion';
import { useGlobalContext } from '../../context/appContext';
import Overlay from '../Overlay/Overlay';
import { portalVariants } from '../../settings/variants';
import CartList from './CartList';
import { useAppSelector } from '../../redux';

const PopUpCart = () => {
    const { total } = useAppSelector((state) => state.cart);
    const { isOpenPopUpCart, closePopUpCart } = useGlobalContext();

    return (
        <>
            <Overlay active={isOpenPopUpCart} />
            <motion.div
                initial={'closed'}
                variants={portalVariants}
                animate={isOpenPopUpCart ? 'open' : 'closed'}
                className={
                    'fixed inset-0 h-full w-full z-[828282] flex items-center justify-center'
                }
            >
                <div
                    onClick={closePopUpCart}
                    className='w-full h-full fixed inset-0'
                ></div>
                <div className='max-w-4xl relative shadow-md rounded-md w-screen md:w-[56rem]'>
                    <div className='px-7 py-4 bg-zinc-100 text-sm flex items-center space-x-2'>
                        <CartShopping className='w-5 h-5 mr-2' />
                        <p>Ваша корзина</p>
                        <XMark
                            onClick={closePopUpCart}
                            className={
                                'w-5 h-5 mx-auto absolute top-4 right-4 cursor-pointer'
                            }
                        />
                    </div>
                    <div className='bg-white px-7 py-2 '>
                        <CartList />
                        <div className='flex flex-col items-end gap-2'>
                            <div className='py-4 pb-2.5 pl-9'>
                                <p className='inline-block mr-4'>
                                    Общая стоимость:
                                </p>
                                <span className='text-violet-700 font-bold text-lg inline-block'>
                                    {formatRub(total)}
                                </span>
                            </div>
                            <button
                                type='button'
                                className='font-bold px-8 mb-2.5 border h-[50px] text-base border-violet-700 text-center cursor-pointer transition-colors duration-100 ease-in flex-auto bg-violet-700 text-white rounded-md'
                            >
                                Оформить заказ
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default memo(PopUpCart);
