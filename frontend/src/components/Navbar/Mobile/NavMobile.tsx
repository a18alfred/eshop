import React, { memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import MenuItems from './MenuItems';
import { Link, useLocation } from 'react-router-dom';
import { CategoryMenu, Menu } from '../../../settings/menu';
import logo from '../../../assets/ps_logo.png';
import { useGlobalContext } from '../../../context/appContext';
import Overlay from '../../Overlay/Overlay';
import { Helmet } from 'react-helmet';
import { Close, Cube, Location, User, UserPlus } from '../../../icons/icons';
import { useAppSelector } from '../../../redux';

const duration = 0.3;

const variants = {
    open: {
        x: 0,
        display: 'block',
        transition: {
            duration,
        },
    },
    closed: {
        x: '-100%',
        transition: {
            duration,
        },
        transitionEnd: {
            display: 'none',
        },
    },
};

const NavMobile = () => {
    const { pathname } = useLocation();
    const { isOpenNavMobile, closeNavMobile } = useGlobalContext();
    const { isLoggedIn } = useAppSelector((state) => state.auth);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        closeNavMobile();
    }, [pathname, closeNavMobile]);

    return (
        <>
            <Helmet>
                <body className={isOpenNavMobile ? 'overflow-hidden' : ''} />
            </Helmet>
            <Overlay
                active={isOpenNavMobile}
                onClick={closeNavMobile}
                duration={duration}
            ></Overlay>
            <motion.nav
                initial='closed'
                animate={isOpenNavMobile ? 'open' : 'closed'}
                variants={variants}
                className={
                    'w-72 h-full fixed top-0 left-0 z-[828282] shadow-navMobile bg-violet-700 overflow-y-auto lg:hidden'
                }
            >
                <div className='bg-white py-5'>
                    <Link to='/'>
                        <img
                            className='mx-auto h-16 w-auto'
                            src={logo}
                            alt='Logo'
                        />
                    </Link>
                </div>
                <div>
                    <ul>
                        <MenuItems
                            key={'category_list'}
                            url={''}
                            submenuOnly
                            value={'Каталог товаров'}
                            submenu={CategoryMenu}
                            paddingLeft={15}
                        />
                        {Menu.map((menu, i) => {
                            return (
                                <MenuItems
                                    key={i}
                                    url={menu.url}
                                    value={menu.value}
                                    submenu={menu.submenu}
                                    paddingLeft={15}
                                />
                            );
                        })}
                        {isLoggedIn ? (
                            <>
                                <li>
                                    <Link
                                        to={'/account'}
                                        state={{ value: 'Личный кабинет' }}
                                        className={styles.link}
                                    >
                                        <User className='w-3.5 h-3.5' />
                                        <span>{'Личный кабинет'}</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={'/logout'}
                                        state={{ value: 'Выйти' }}
                                        className={styles.link}
                                    >
                                        <Close className='w-3.5 h-3.5' />
                                        <span>{'Выйти'}</span>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to={'/signin'}
                                        state={{ value: 'Войти' }}
                                        className={styles.link}
                                    >
                                        <User className='w-3.5 h-3.5' />
                                        <span>{'Войти'}</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={'/signup'}
                                        state={{ value: 'Регистрация' }}
                                        className={styles.link}
                                    >
                                        <UserPlus className='w-3.5 h-3.5' />
                                        <span>{'Регистрация'}</span>
                                    </Link>
                                </li>
                            </>
                        )}

                        <li>
                            <Link
                                to={'/branches'}
                                state={{ value: 'Филиалы' }}
                                className={styles.link}
                            >
                                <Location className='w-3.5 h-3.5' />
                                <span>{'Филиалы'}</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={'/tracking'}
                                state={{ value: 'Отследить заказ' }}
                                className={styles.link}
                            >
                                <Cube className='w-3.5 h-3.5' />
                                <span>{'Отследить заказ'}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </motion.nav>
        </>
    );
};

const styles = {
    link: `flex items-center space-x-3.5 px-3 flex-auto leading-9 text-white border-b border-b-black/10 hover:underline`,
};

export default memo(NavMobile);
