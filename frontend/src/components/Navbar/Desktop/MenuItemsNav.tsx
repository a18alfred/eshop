import React, { memo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AngleDown } from '../../../icons/icons';
import { motion } from 'framer-motion';
import MenuItems from './MenuItems';
import { MenuItem } from '../../../settings/menu';

const variants = {
    open: {
        opacity: 1,
        display: 'block',
        top: '100%',
        transition: {
            duration: 0.3,
        },
    },
    closed: {
        opacity: 0,
        top: '125%',
        transition: {
            duration: 0.3,
        },
        transitionEnd: {
            display: 'none',
        },
    },
};

type MenuItemsNavProps = {
    items: MenuItem;
};

const MenuItemsNav = ({ items }: MenuItemsNavProps) => {
    const { pathname } = useLocation();
    const [dropdown, setDropdown] = useState(false);

    return (
        <>
            {items.submenu ? (
                <li
                    onMouseEnter={() => setDropdown(true)}
                    onMouseLeave={() => setDropdown(false)}
                    className="relative px-1.5 xl:px-3.5 h-full flex items-center"
                >
                    <Link
                        to={items.url}
                        className={`h-full flex items-center space-x-1 px-2 hover:bg-violet-600 uppercase font-bold
                        ${items.url === pathname ? 'bg-violet-600' : ''}`}
                    >
                        <span>{items.value}</span>
                        <AngleDown className="w-2.5 h-3.5" />
                    </Link>
                    <motion.ul
                        initial="closed"
                        variants={variants}
                        animate={dropdown ? 'open' : 'closed'}
                        className="absolute top-full left-0 bg-white w-[220px] z-[82]"
                    >
                        {items.submenu.map((submenus, i) => {
                            const lengthProductCate = items.submenu?.length;
                            return (
                                <MenuItems
                                    key={i}
                                    items={submenus}
                                    isLastIndex={i + 1 !== lengthProductCate}
                                    className="text-base font-semibold py-2.5"
                                />
                            );
                        })}
                    </motion.ul>
                </li>
            ) : (
                <li
                    className={`px-1.5 xl:px-4 h-full flex items-center hover:bg-violet-600 ${
                        items.url === pathname ? 'bg-violet-600' : ''
                    }`}
                >
                    <Link
                        to={items.url}
                        className="h-full flex items-center px-2 text-sm uppercase font-bold"
                    >
                        {items.value}
                    </Link>
                </li>
            )}
        </>
    );
};

export default memo(MenuItemsNav);
