import React from 'react';
import HeaderTopPart from './HeaderTopPart';
import HeaderMainPart from './HeaderMainPart';
import HeaderMenuPart from './HeaderMenuPart';

const Header = () => {

    return (
        <header>
            <HeaderTopPart />
            <HeaderMainPart />
            <HeaderMenuPart />
        </header>
    );
};

export default Header;
