import { User2 } from '../../icons/icons';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useAppSelector } from '../../redux';

const HeaderAuth = () => {
    const { isLoggedIn } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    return (
        <div className='hidden lg:flex items-center justify-center space-x-3 text-zinc-800'>
            <User2
                className='w-5 h-6 cursor-pointer'
                onClick={() => {
                    navigate('/account');
                }}
            />
            <div className={'font-montserrat leading-5 text-right'}>
                {isLoggedIn ? (
                    <>
                        <Link
                            to='/logout'
                            className='hover:text-violet-600'
                        >
                            Выйти
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to='/signup'
                            className='block hover:text-violet-600'
                        >
                            Регистрация
                        </Link>
                        <span
                            className='text-zinc-400/80'>или</span>{' '}
                        <Link
                            to='/signin'
                            className='hover:text-violet-600'
                        >
                            Войти
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default HeaderAuth;
