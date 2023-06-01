import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Container from '../components/Container/Container';
import React from 'react';

const Branches = () => {
    return (
        <div>
            <Breadcrumb active="Филиалы" />
            <Container className="my-5">
                <h1 className="text-3xl text-zinc-700 font-medium leading-snug">
                    Филиалы
                </h1>
                <div className={'flex flex-col gap-6 text-[15px] mt-8 mb-16'}>
                    <div>
                        <h6 className={'text-xl'}>Продсервис</h6>
                        <p>620033, г. Екатеринбург, ул. Краснодарская, 11</p>
                        <a
                            href="tel:88002227970"
                            className="text-violet-700 hover:text-zinc-800"
                        >
                            8-800-222-79-70
                        </a>
                    </div>
                    <div>
                        <h6 className={'text-xl'}>Продсервис Москва</h6>
                        <p>
                            140000, г. Люберцы, ул. Красная, д. 1, лит. 2Д-2Д7,
                            этаж 1, №10,16
                        </p>
                        <a
                            href="tel:+7495105769"
                            className="text-violet-700 hover:text-zinc-800"
                        >
                            +7 (495) 105-97-69
                        </a>
                    </div>
                    <div>
                        <h6 className={'text-xl'}>Продсервис Челябинск</h6>
                        <p>454006, г.Челябинск, ул. Ленина, 25а</p>
                        <a
                            href="tel:+73512256069"
                            className="text-violet-700 hover:text-zinc-800"
                        >
                            +7 (351) 225-60-69
                        </a>
                    </div>
                    <div>
                        <h6 className={'text-xl'}>Склад г.Челябинск</h6>
                        <p>
                            454036, г. Челябинск, тракт Свердловский, 10-Д, стр.
                            1
                        </p>
                        <p>Выписка документов будет производиться по адресу:</p>
                        <p>г. Челябинск, тракт Свердловский, 14, офис 305</p>
                        <a
                            href="tel:+73512256069"
                            className="text-violet-700 hover:text-zinc-800"
                        >
                            +7 (351) 225-60-69
                        </a>
                    </div>
                    <div>
                        <h6 className={'text-xl'}>Продсервис Крым</h6>
                        <p>
                            295022, г. Симферополь, ул. Кубанская, д. 25а (склад
                            литер в)
                        </p>
                        <a
                            href="tel:+79786440879"
                            className="text-violet-700 hover:text-zinc-800"
                        >
                            +7 (978) 644-08-79
                        </a>
                    </div>
                    <div>
                        <h6 className={'text-xl'}>Продсервис Курган</h6>
                        <p>640007, г.Курган, ул.Омская, 101/15</p>
                        <a
                            href="tel:+73522630777"
                            className="text-violet-700 hover:text-zinc-800"
                        >
                            +7 (3522) 630-777
                        </a>
                    </div>
                    <div>
                        <h6 className={'text-xl'}>Продсервис Уфа</h6>
                        <p>450075, г. Уфа, ул. Бульвар Славы, 5</p>
                        <a
                            href="tel:+73472001888"
                            className="text-violet-700 hover:text-zinc-800"
                        >
                            +7 (347) 200-18-88
                        </a>
                    </div>
                    <div>
                        <h6 className={'text-xl'}>ТОО ТД Продсервис</h6>
                        <p>
                            150000, Казахстан, СКО, г. Петропавловск, ул.
                            Универсальная, 5
                        </p>
                        <a
                            href="tel:+77152625254"
                            className="text-violet-700 hover:text-zinc-800"
                        >
                            +7 (7152) 625-254
                        </a>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Branches;
