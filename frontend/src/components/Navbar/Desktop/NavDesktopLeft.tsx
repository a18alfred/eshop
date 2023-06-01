import React, { memo, SetStateAction } from 'react';
import { CategoryMenu, Menu } from '../../../settings/menu';
import { motion } from 'framer-motion';
import MenuItems from './MenuItems';

const productCateVariants = {
    open: {
        height: 'auto',
        display: 'block',
        overflow: 'hidden',
        transition: {
            duration: 0.3,
        },
        transitionEnd: {
            overflow: 'visible',
        },
    },
    closed: {
        height: 0,
        overflow: 'hidden',
        transition: {
            duration: 0.3,
        },
        transitionEnd: {
            display: 'none',
        },
    },
};

interface NavDesktopLeftProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const NavDesktopLeft = ({ isOpen, setIsOpen }: NavDesktopLeftProps) => {
    return (
        <motion.nav
            initial={'closed'}
            variants={productCateVariants}
            animate={isOpen ? 'open' : 'closed'}
            className={'absolute top-full left-0 z-[8282] w-full shadow-lg'}
        >
            <ul
                onClick={() => setIsOpen(false)}
                className="relative block py-2.5 bg-white shadow-lg rounded-b-2xl"
            >
                {CategoryMenu.map((productCate, i) => {
                    const lengthProductCate = CategoryMenu.length;
                    return (
                        <MenuItems
                            key={i}
                            items={productCate}
                            isLastIndex={i + 1 !== lengthProductCate}
                            className="text-sm"
                        />
                    );
                })}
            </ul>
        </motion.nav>
    );
};

export default memo(NavDesktopLeft);
