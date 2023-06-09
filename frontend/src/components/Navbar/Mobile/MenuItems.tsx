import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuItem } from '../../../settings/menu';
import { Minus, Plus } from '../../../icons/icons';
import Dropdown from './Dropdown';

type MenuItemsProps = MenuItem & {
    paddingLeft: number;
    submenuOnly?: boolean;
};

const MenuItems = ({
                       url,
                       value,
                       submenu,
                       paddingLeft,
                       submenuOnly,
                   }: MenuItemsProps) => {
    const [dropdown, setDropdown] = useState(false);

    return (
        <li className='relative'>
            {submenu ? (
                <>
                    <div
                        className='flex items-center justify-between text-white border-b border-b-black/10 cursor-pointer'>
                        {submenuOnly ? (
                            <p
                                onClick={() => setDropdown((prev) => !prev)}
                                className='block px-3 flex-auto leading-9'
                            >
                                {value}
                            </p>
                        ) : (
                            <Link
                                to={url}
                                className='block px-3 flex-auto leading-9 hover:underline'
                                style={{
                                    paddingLeft: `${paddingLeft}px`,
                                }}
                            >
                                {value}
                            </Link>
                        )}
                        <button
                            onClick={() => setDropdown((prev) => !prev)}
                            className='w-8 block h-9 mr-1.5'
                        >
                            {dropdown ? (
                                <Minus className='w-5 h-5 mx-auto' />
                            ) : (
                                <Plus className='w-5 h-5 mx-auto' />
                            )}
                        </button>
                    </div>
                    <Dropdown
                        submenus={submenu}
                        dropdown={dropdown}
                        paddingLeft={paddingLeft}
                    />
                </>
            ) : (
                <Link
                    to={url}
                    className='block px-3 flex-auto leading-9 text-white border-b border-b-black/10 hover:underline'
                    style={{
                        paddingLeft: `${paddingLeft}px`,
                    }}
                >
                    {value}
                </Link>
            )}
        </li>
    );
};

export default memo(MenuItems);
