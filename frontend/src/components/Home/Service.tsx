import React, { memo } from 'react';
import { ClientService, DeliveryCar, Quality, Wallet } from '../../icons/icons';

const services = [
    {
        title: 'Быстрая доставка',
        subtitle: 'Бережно доставляем товары по России за 24 часа',
        Icon: DeliveryCar,
    },
    {
        title: 'Клиентский сервис',
        subtitle: 'Отвечаем на вопросы покупателей в течение 10 минут',
        Icon: ClientService,
    },
    {
        title: 'Гарантия качества',
        subtitle: 'Соответствуем требованиям и стандартам качества',
        Icon: Quality,
    },
    {
        title: 'Доступные цены',
        subtitle: 'Работаем напрямую с ведущими производителями',
        Icon: Wallet,
    },
];
const Service = () => {
    return (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 mt-14">
            {services.map((item, index) => (
                <div key={index} className={'flex flex-col gap-2 items-center'}>
                    <item.Icon className={'fill-violet-700'} />
                    <p className={'text-base text-center'}>{item.title}</p>
                    <p className={'text-center text-xs'}>{item.subtitle}</p>
                </div>
            ))}
        </section>
    );
};

export default memo(Service);
