import { useGlobalContext } from '../../context/appContext';
import Overlay from '../Overlay/Overlay';
import React from 'react';
import { portalVariants } from '../../settings/variants';
import { motion } from 'framer-motion';
import { XMark } from '../../icons/icons';

const DemoMessage = () => {
    const { isOpenMessage, closeMessage } = useGlobalContext();
    return (
        <>
            <Overlay active={isOpenMessage} />
            <motion.div
                initial={'closed'}
                variants={portalVariants}
                animate={isOpenMessage ? 'open' : 'closed'}
                className={
                    'fixed inset-0 h-full w-full z-[828282] flex items-center justify-center'
                }
            >
                <div
                    onClick={closeMessage}
                    className='w-full h-full fixed inset-0'
                ></div>
                <div className='max-w-4xl relative shadow-md rounded-md w-screen md:w-[56rem]'>
                    <div className='px-7 py-4 bg-zinc-100 text-base font-bold flex items-center space-x-2'>
                        <h4>Внимание!</h4>
                        <XMark
                            onClick={closeMessage}
                            className={
                                'w-5 h-5 mx-auto absolute top-4 right-4 cursor-pointer'
                            }
                        />
                    </div>
                    <div
                        className='bg-white px-7 py-12 flex items-center justify-center text-sm md:text-base text-center font-bold'>
                        <p>
                            Все содержимое сайта только для демонстрационных целей. На сайте нельзя оформить заказ.
                        </p>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default DemoMessage;
