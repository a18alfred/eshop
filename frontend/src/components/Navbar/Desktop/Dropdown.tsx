import React, { memo } from 'react';
import { motion } from 'framer-motion';
import MenuItems from './MenuItems';
import { MenuItem } from '../../../settings/menu';

type DropdownProps = {
    submenus: MenuItem[];
    dropdown: boolean;
};

const variants = {
    open: {
        scaleX: 1,
        originX: 0,
        transition: {
            duration: 0.3,
        },
    },
    closed: {
        scaleX: 0,
        transition: {
            duration: 0.3,
        },
    },
};

const Dropdown = ({ submenus, dropdown }: DropdownProps) => {
    return (
        <motion.ul
            initial={'false'}
            variants={variants}
            animate={dropdown ? 'open' : 'closed'}
            className={
                'absolute top-0 left-full block w-full py-2.5 shadow-lg bg-white text-black z-50 rounded-2xl'
            }
        >
            {submenus.map((submenu, i) => (
                <MenuItems
                    key={i}
                    items={submenu}
                    isLastIndex={i + 1 !== submenus.length}
                    className="text-sm font-medium"
                />
            ))}
        </motion.ul>
    );
};

export default memo(Dropdown);
