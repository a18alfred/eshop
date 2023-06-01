import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AngleDown, CircleRight } from '../../../icons/icons';
import { MenuItem } from '../../../settings/menu';
import Dropdown from '../Sidebar/Dropdown';

type MenuItemsProps = {
    category: MenuItem;
};

const MenuItems = ({ category }: MenuItemsProps) => {
    const [dropdown, setDropdown] = useState(false);
    return (
        <li>
            {category.submenu ? (
                <>
                    <div className="flex items-center justify-between border-b-zinc-200 py-2.5 border-b">
                        <Link
                            to={category.url}
                            className="flex items-center space-x-2 flex-1 transition-all ease-in-out text-zinc-500 hover:text-violet-700"
                        >
                            <CircleRight className="w-3.5 h-3.5" />
                            <span>{category.value}</span>
                        </Link>
                        <button
                            onClick={() => setDropdown(!dropdown)}
                            className="px-2 py-1 hover:text-violet-700 transition-all ease-in-out"
                        >
                            <AngleDown className="w-2.5 h-2.5" />
                        </button>
                    </div>
                    <Dropdown submenus={category.submenu} dropdown={dropdown} />
                </>
            ) : (
                <Link
                    to={category.url}
                    className="flex items-center space-x-2 flex-1 transition-all ease-in-out text-zinc-500 hover:text-violet-700 border-b-zinc-200 py-2.5 border-b"
                >
                    <CircleRight className="w-3.5 h-3.5" />
                    <span>{category.value}</span>
                </Link>
            )}
        </li>
    );
};

export default MenuItems;
