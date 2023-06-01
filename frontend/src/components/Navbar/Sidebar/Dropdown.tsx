import React from 'react';
import { MenuItem } from '../../../settings/menu';
import { motion } from 'framer-motion';
import { mobileDropdownVariant } from '../../../settings/variants';
import MenuItems from './MenuItems';

type DropdownProps = {
    submenus: MenuItem[];
    dropdown: boolean;
};

const Dropdown = ({ submenus, dropdown }: DropdownProps) => {
    return (
        <motion.ul
            initial="closed"
            animate={dropdown ? 'open' : 'closed'}
            variants={mobileDropdownVariant}
        >
            {submenus.map((submenu) => (
                <MenuItems category={submenu} key={submenu.value} />
            ))}
        </motion.ul>
    );
};

export default Dropdown;
