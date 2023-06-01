import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuItem } from '../../../settings/menu';
import { AngleRight } from '../../../icons/icons';
import Dropdown from './Dropdown';

type MenuItemsProps = {
    items: MenuItem;
    isLastIndex: boolean;
    className: string;
};

const MenuItems = ({ items, isLastIndex, className }: MenuItemsProps) => {
    const [dropdown, setDropdown] = useState(false);

    return (
        <>
            {items.submenu ? (
                <li
                    onMouseEnter={() => setDropdown(true)}
                    onMouseLeave={() => setDropdown(false)}
                    className="px-5 text-zinc-800 hover:text-violet-700"
                >
                    <Link
                        to={items.url}
                        className={`flex justify-between items-center border-b-zinc-200 border-solid py-1.5 transition-all ease-in-out duration-150  ${
                            isLastIndex && 'border-b'
                        } ${className} leading-6`}
                    >
                        <span>{items.value}</span>
                        <AngleRight className="w-1.5 h-3.5" />
                    </Link>
                    <Dropdown submenus={items.submenu} dropdown={dropdown} />
                </li>
            ) : (
                <li className="px-5 text-zinc-800 hover:text-violet-700">
                    <Link
                        to={items.url}
                        className={`flex justify-between items-center border-b-zinc-200 border-solid py-1.5 transition-all ease-in-out duration-150 ${
                            isLastIndex && 'border-b'
                        } ${className} leading-6`}
                    >
                        <span>{items.value}</span>
                    </Link>
                </li>
            )}
        </>
    );
};

export default memo(MenuItems);
