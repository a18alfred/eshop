import { Minus, Plus } from '../../icons/icons';
import { motion } from 'framer-motion';
import { Menu } from '../../settings/menu';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import useWindowResize from '../../hooks/useWindowResize';
import { ChildrenProps } from '../../types/types';

const variants = {
    open: {
        height: 'auto',
        display: 'block',
        transition: {
            duration: 0.3,
        },
    },
    closed: {
        height: 0,
        transition: {
            duration: 0.3,
        },
        transitionEnd: {
            display: 'none',
            overflow: 'hidden',
        },
    },
};

interface FooterMenuWrapperProps extends ChildrenProps {
    title: string;
}

const FooterMenuWrapper = ({ title, children }: FooterMenuWrapperProps) => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const windowWidth = useWindowResize();
    return (
        <>
            <h4
                onClick={() => windowWidth < 768 && setIsOpenMenu(prev => !prev)}
                className='text-[13px] py-1 leading-8 uppercase cursor-pointer flex items-center justify-between md:cursor-auto md:text-lg md:leading-8'
            >
                <span>{title}</span>
                {windowWidth < 768 && (
                    <button
                        className='w-3.5 h-3.5 flex items-center justify-center rounded-full bg-zinc-500 mr-4'>
                        {isOpenMenu ? (
                            <Minus className='w-2.5 h-2.5 text-white' />
                        ) : (
                            <Plus className='w-2.5 h-2.5 text-white' />
                        )}
                    </button>
                )}
            </h4>
            <motion.ul
                initial='closed'
                variants={variants}
                animate={
                    isOpenMenu || windowWidth >= 768
                        ? 'open'
                        : 'closed'
                }
                className='mb-4'
            >
                {children}
            </motion.ul>
        </>
    );
};

export default FooterMenuWrapper;
