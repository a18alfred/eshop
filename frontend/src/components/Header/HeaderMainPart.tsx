import Container from '../Container/Container';
import { Hamburger } from '../../icons/icons';
import { Link } from 'react-router-dom';
import logo from '../../assets/ps_logo.png';
import SearchElement from './SearchElement';
import React from 'react';
import { useGlobalContext } from '../../context/appContext';
import HeaderCart from './HeaderCart';
import HeaderAuth from './HeaderAuth';

const HeaderMainPart = () => {
    const { openNavMobile } = useGlobalContext();

    return (
        <div className='lg:h-24 relative w-full bg-white text-[13px] leading-10'>
            <Container>
                <div className='lg:border-t border-t-zinc-200 flex items-center justify-between flex-wrap'>
                    {/* Гамбургер для мобильной версии */}
                    <button
                        onClick={openNavMobile}
                        className='lg:hidden p-2 text-black'
                    >
                        <Hamburger className='text-violet-700 w-5 h-5' />
                    </button>
                    {/* Логотип */}
                    <Link
                        to='/'
                        className='h-20 lg:w-1/4 lg:h-24 flex justify-center lg:justify-start items-center px-4'
                    >
                        <div>
                            <img
                                className='h-14 w-auto lg:h-16 flex items-center'
                                src={logo}
                                alt='Логотип'
                            />
                        </div>
                    </Link>
                    <SearchElement />
                    <div className='px-2 lg:pr-4 xl:px-4 flex items-center justify-between lg:w-1/4 lg:order-2'>
                        {/* Корзина */}
                        <HeaderCart />
                        {/* Авторизация аккаунта */}
                        <HeaderAuth />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default HeaderMainPart;
