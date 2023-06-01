import Container from '../Container/Container';
import { CaretDown, Hamburger } from '../../icons/icons';
import NavDesktopLeft from '../Navbar/Desktop/NavDesktopLeft';
import NavDesktopRight from '../Navbar/Desktop/NavDesktopRight';
import React, { useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

const HeaderMenuPart = () => {
    const [isOpenNavDesktopLeft, setIsOpenNavDesktopLeft] = useState(false);

    const navDesktopLeftRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(navDesktopLeftRef.current, () => {
        setIsOpenNavDesktopLeft(false);
    });
    
    return (
        <div className='hidden lg:block w-full text-white bg-violet-700 border-b border-b-zinc-200'>
            <Container className='flex items-center px-0'>
                {/* Навигация слева */}
                <div className='w-[30%] px-4 -ml-4'>
                    <div className='relative' ref={navDesktopLeftRef}>
                        <button
                            onClick={() =>
                                setIsOpenNavDesktopLeft((prev) => !prev)
                            }
                            className='px-5 w-full uppercase h-14 flex items-center justify-between hover:bg-violet-600'
                        >
                            <Hamburger className='w-[18px] h-[18px] text-white' />
                            <span className='uppercase text-ыь font-bold xl:font-bold inline-block'>
                                    Каталог товаров
                                </span>
                            <CaretDown className='w-2 h-3.5 text-white' />
                        </button>
                        <NavDesktopLeft
                            isOpen={isOpenNavDesktopLeft}
                            setIsOpen={setIsOpenNavDesktopLeft}
                        />
                    </div>
                </div>
                {/* Навигация справа */}
                <div className='w-[70%] flex justify-between items-center'>
                    <NavDesktopRight />
                </div>
            </Container>
        </div>
    );
};

export default HeaderMenuPart;
