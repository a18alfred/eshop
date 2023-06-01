import { createPortal } from 'react-dom';
import NavMobile from '../Navbar/Mobile/NavMobile';
import DemoMessage from '../DemoMessage/DemoMessage';
import React from 'react';
import useWindowResize from '../../hooks/useWindowResize';

const Modal = () => {
    const windowWidth = useWindowResize();

    return (
        <>
            {createPortal(
                <div id='portal'>{windowWidth < 992 && <NavMobile />}
                    <DemoMessage />
                </div>,
                document.body,
            )}
        </>
    );
};

export default Modal;
