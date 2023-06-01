import Container from '../Container/Container';
import { AngleDown, Cube, Envelope2, Location, Phone } from '../../icons/icons';
import { Link } from 'react-router-dom';
import React from 'react';

const HeaderTopPart = () => {
    return (
        <div className={'h-10 leading-10 overflow-hidden text-[13px] text-zinc-700 bg-white hidden lg:block'}>
            <Container className={'flex items-center justify-between'}>
                <div className={'px-4 w-1/2 flex items-center'}>
                    <div>
                            <span>
                                <Phone className='h-3 w-3 inline-block mb-0.5 mr-2' />
                                <a
                                    href='tel:88002227970'
                                    className={'font-semibold'}
                                >
                                    8-800-222-79-70
                                </a>
                            </span>
                    </div>
                    <div
                        className={'pl-14 relative before:absolute before:content-[\'\'] before:h-2.5 before:w-[1px] before:bg-zinc-200 before:left-5 before:top-1/2 before:-translate-y-1/2'}>
                            <span>
                                <Envelope2 className='h-[13px] w-[13px] inline-block mb-0 mr-2' />{' '}
                                <a
                                    href='mailto:im@prodservice.ru'
                                    className={'font-semibold'}
                                >
                                    im@prodservice.ru
                                </a>
                            </span>
                    </div>
                </div>
                <div className='px-4 w-1/2 flex items-center justify-end'>
                    <div>
                            <span>
                                <Location className='h-[13px] w-2 inline-block mb-0.5 mr-2' />
                                <Link to='/branches'>
                                    Филиалы
                                    <AngleDown className='ml-2 h-[13px] w-2 inline-block mb-0.5' />
                                </Link>
                            </span>
                    </div>
                    <div
                        className={
                            'pl-14 relative before:absolute before:content-[\'\'] before:h-2.5 before:w-[1px] before:bg-zinc-200 before:left-5 before:top-1/2 before:-translate-y-1/2'
                        }
                    >
                            <span>
                                <Cube className='h-[13px] w-[13px] inline-block mb-0.5 mr-2' />
                                <Link to='/tracking'>Отследить заказ</Link>
                            </span>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default HeaderTopPart;
