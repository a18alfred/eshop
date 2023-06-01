import React, { memo } from 'react';

const FooterCopyright = () => {
    return (
        <div
            className='py-6 md:py-4 leading-6 md:flex md:items-center md:justify-center md:space-x-1 bg-white text-center text-sm'>
            <div>
                    <span className='text-zinc-400'>
                        © {new Date().getFullYear()} {'Продсервис'}.{' '}
                        {'Все права защищены.'}
                    </span>
            </div>
        </div>
    );
};

export default FooterCopyright;
