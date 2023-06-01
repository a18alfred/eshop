import React from 'react';

const FooterSubscribe = () => {
    return (
        <div className='text-black lg:col-span-2'>
            <h4 className='text-[13px] py-1 leading-8 uppercase flex items-center justify-between md:text-lg md:leading-8'>
                <span>ПОДПИСКА</span>
            </h4>
            <p className='text-xs leading-6 mb-2.5'>
                Подпишитесь, чтобы получать специальные предложения.
            </p>
            <form className='mb-8 flex items-center gap-2'>
                <input
                    type='text'
                    placeholder='Email'
                    className='rounded-2xl min-h-[40px] flex-1 min-w-0 w-full px-5 border-zinc-200 border border-solid text-zinc-800 placeholder:text-zinc-500/90 caret-violet-700 focus:outline-none'
                />
                <button
                    type='submit'
                    className='rounded-2xl bg-violet-700 cursor-pointer px-4 uppercase text-white text-center font-medium border-zinc-200 border border-l-0 min-h-[40px] text-xs'
                >
                    Подписаться
                </button>
            </form>
        </div>
    );
};

export default FooterSubscribe;
