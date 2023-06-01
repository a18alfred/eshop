import React, { memo } from 'react';
import { Menu } from '../../../settings/menu';
import MenuItemsNav from './MenuItemsNav';

const NavDesktopRight = () => {
    return (
        <nav className="h-14 flex-1">
            <ul className="h-full w-full flex items-center justify-between">
                {Menu.map((items, i) => (
                    <MenuItemsNav items={items} key={i} />
                ))}
            </ul>
        </nav>
    );
};

export default memo(NavDesktopRight);
