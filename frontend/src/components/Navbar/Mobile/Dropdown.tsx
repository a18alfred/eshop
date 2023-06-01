import React, { memo } from 'react';
import MenuItems from './MenuItems';
import { motion } from 'framer-motion';
import { MenuItem } from '../../../settings/menu';
import { mobileDropdownVariant } from '../../../settings/variants';

type DropdownProps = {
    submenus: MenuItem[];
    dropdown: boolean;
    paddingLeft: number;
};

const Dropdown = ({ submenus, dropdown, paddingLeft }: DropdownProps) => {
    paddingLeft += 15;
    return (
        <motion.ul
            initial="closed"
            animate={dropdown ? 'open' : 'closed'}
            variants={mobileDropdownVariant}
        >
            {submenus.map((submenu, i) => (
                <MenuItems
                    key={i}
                    url={submenu.url}
                    value={submenu.value}
                    submenu={submenu.submenu}
                    paddingLeft={paddingLeft}
                />
            ))}
        </motion.ul>
    );
};

export default memo(Dropdown);
