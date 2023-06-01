import { DoubleUp, Phone } from '../../icons/icons';
import React from 'react';
import useScroll from '../../hooks/useScroll';

const ConvenientButtons = () => {
    const [, y] = useScroll();
    
    return (
        <>
            {/* Телефон */}
            <a
                href='tel:88002227970'
                title='Позвонить'
                className='w-8 h-8 fixed bottom-8 left-4 z-[82] text-white bg-violet-700 rounded-full flex items-center justify-center animate-growUp md:hidden'
            >
                <Phone className='w-3.5 h-4' />
            </a>
            {/* Прокрутка вверх */}
            <button
                type='button'
                title='Прокрутить вверх'
                style={{
                    opacity: `${y > 200 ? '1' : '0'}`,
                }}
                onClick={() =>
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    })
                }
                className='border-violet-600 border-2 transition-opacity duration-200 ease-out w-12 h-12 text-white flex items-center justify-center bg-violet-700 fixed bottom-8 right-4 z-[82] rounded-full'
            >
                <DoubleUp className='w-3 h-3' />
            </button>
        </>
    );
};

export default ConvenientButtons;
