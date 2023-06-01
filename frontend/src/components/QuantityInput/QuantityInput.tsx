import React from 'react';

interface QuantityInputProps {
    quantity: number | string;
    decreaseQuantity: () => void;
    increaseQuantity: () => void;
    inputChangeQuantity: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const QuantityInput = ({
                           quantity,
                           decreaseQuantity,
                           inputChangeQuantity,
                           increaseQuantity,
                       }: QuantityInputProps) => {
    return (
        <div className='relative w-[90px] h-[40px] border border-zinc-200 rounded-sm'>
            <button
                onClick={decreaseQuantity}
                type='button'
                className='font-bold text-zinc-500 h-full text-lg absolute top-0 left-0 w-[20px] text-right z-20 transition-colors hover:text-zinc-800'
            >
                -
            </button>
            <input
                type='text'
                name='quantity'
                value={quantity}
                onChange={inputChangeQuantity}
                className='w-full h-full text-center absolute top-0 left-0 text-zinc-900 focus:outline-none border-none text-base leading-[50px] focus:ring-0 focus:border-none font-semibold'
            />
            <button
                onClick={increaseQuantity}
                type='button'
                className='font-bold text-zinc-500 h-full text-lg absolute top-0 right-0 w-[20px] text-left z-20 transition-colors hover:text-zinc-800'
            >
                +
            </button>
        </div>
    );
};

export default QuantityInput;
