import React, { ButtonHTMLAttributes } from 'react';
import SpinnerLoader from '../Loader/SpinnerLoader';

type ButtonSubmitProps = {
    isLoading: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonSubmit = ({ isLoading, ...otherAttributes }: ButtonSubmitProps) => {
    return (
        <button
            className="block w-full h-[44px] py-2.5 rounded-2xl text-base bg-violet-700 text-white border border-violet-700 uppercase font-bold text-center transition-colors duration-100 ease-in flex items-center justify-center"
            type="submit"
            {...otherAttributes}
            disabled={isLoading}
        >
            {isLoading ? <SpinnerLoader /> : otherAttributes.value}
        </button>
    );
};

export default ButtonSubmit;
