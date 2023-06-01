import { Link } from 'react-router-dom';
import { CartShopping } from '../../icons/icons';
import React from 'react';
import { useAppSelector } from '../../redux';

const HeaderCart = () => {
    const { length } = useAppSelector((state) => state.cart);

    return (
        <div className='relative lg:ml-3 xl:ml-6'>
            <Link
                to='/cart'
                className='peer inline-flex items-center text-zinc-700 h-10 w-10 rounded-full bg-zinc-200/70 hover:bg-zinc-300/70 relative'
            >
                <CartShopping className='w-4 h-4 mx-auto' />
                <span
                    className='absolute font-semibold text-xs -top-1 -right-2 w-5 h-5 lg:w-6 lg:h-6 lg:-right-2.5 lg:-top-2 bg-violet-700 rounded-full text-white text-center flex items-center justify-center'
                >
                {length}
                </span>
            </Link>
        </div>
    );
};

export default HeaderCart;
