import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '../../settings/menu';
import { Home, Envelope, Phone } from '../../icons/icons';
import Container from '../Container/Container';
import helpLinks from './footerHelpLinks';
import FooterCopyright from './FooterCopyright';
import FooterSubscribe from './FooterSubscribe';
import FooterSocial from './FooterSocial';
import FooterMenuWrapper from './FooterMenuWrapper';

const Footer = () => {
    return (
        <footer className='bg-zinc-100 mt-auto'>
            <Container className=' pt-7 text-black grid md:grid-cols-2 md:gap-x-8 lg:grid-cols-6'>
                <div>
                    <FooterMenuWrapper title='Общее'>
                        {Menu.map((menu, i) => (
                            <li
                                key={i}
                                className='leading-7 hover:ml-2.5 transition-all duration-500 group'
                            >
                                <Link
                                    to={menu.url}
                                    className='text-xs group-hover:text-violet-700 transition-all duration-150 ease-in-out'
                                >
                                    {menu.value}
                                </Link>
                            </li>
                        ))}
                    </FooterMenuWrapper>
                </div>
                <div>
                    <FooterMenuWrapper title='Помощь'>
                        {helpLinks.map((policy, i) => (
                            <li
                                key={i}
                                className='leading-7 hover:ml-2.5 transition-all duration-500 group'
                            >
                                <Link
                                    to={policy.url}
                                    className='text-xs group-hover:text-violet-700 transition-all duration-150 ease-in-out'
                                >
                                    {policy.value}
                                </Link>
                            </li>
                        ))}
                    </FooterMenuWrapper>
                </div>
                <div className='lg:col-span-2'>
                    <FooterMenuWrapper title='Контакты'>
                        <li className='leading-7 flex items-center space-x-4'>
                            <span>
                                <Home className='w-3 h-3 flex-auto' />
                            </span>
                            <span className='text-xs leading-7 pr-4'>
                                Екатеринбург, ул. Краснодарская, 11
                            </span>
                        </li>
                        <li className='leading-7 flex items-center space-x-4'>
                            <span>
                                <Phone className='w-3 h-3' />
                            </span>
                            <a
                                href='tel:+88002227970'
                                className='text-xs leading-7 hover:text-violet-700 transition-all duration-150 ease-in-out pr-4'
                            >
                                8-800-222-79-70
                            </a>
                        </li>
                        <li className='leading-7 flex items-center space-x-4'>
                            <span>
                                <Envelope className='w-3 h-3' />
                            </span>
                            <a
                                href='mailto:im@prodservice.ru'
                                className='text-xs leading-7 hover:text-violet-700 transition-all duration-150 ease-in-out pr-4'
                            >
                                im@prodservice.ru
                            </a>
                        </li>
                    </FooterMenuWrapper>
                    <FooterSocial />
                </div>
                <FooterSubscribe />
            </Container>
            <FooterCopyright />
        </footer>
    );
};

export default Footer;
