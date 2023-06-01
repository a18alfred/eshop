import Container from '../components/Container/Container';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import React from 'react';

const Contacts = () => {
    return (
        <>
            <Breadcrumb active="Контакты" />
            <Container className="my-5">
                <h1 className="text-3xl text-zinc-700 font-medium leading-snug">
                    Контакты
                </h1>
                <div
                    className={
                        'flex flex-col md:flex-row gap-8 text-[15px] mt-8'
                    }
                >
                    <div>
                        <p className={'text-xs text-zinc-500'}>АДРЕС</p>
                        <div>
                            620033, РФ,
                            <br />
                            Свердловская область,
                            <br />
                            г. Екатеринбург,
                            <br />
                            ул. Краснодарская, 11
                            <br />
                            <br />
                        </div>

                        <p className={'text-xs text-zinc-500'}>РЕЖИМ РАБОТЫ</p>
                        <p>Заказы принимаем круглосуточно.</p>
                        <br />
                        <p>Формирование, сбор и отправка заказов:</p>
                        <div>
                            Пн - Пт: с 8:00 до 17:00.
                            <br />
                            Сб - Вс: выходные.
                        </div>
                    </div>
                    <div>
                        <p className={'text-xs text-zinc-500'}>ТЕЛЕФОН</p>
                        <a
                            href="tel:88002227970"
                            className="text-violet-700 hover:text-zinc-800"
                        >
                            8-800-222-79-70
                        </a>
                        <br />
                        <br />
                        <p className={'text-xs text-zinc-500'}>E-MAIL</p>
                        <a
                            href="im@prodservice.ru"
                            className="text-violet-700 hover:text-zinc-800"
                        >
                            im@prodservice.ru
                        </a>
                    </div>
                </div>
                <div className={'text-[15px] my-12'}>
                    <p>
                        Мы активно развиваемся и нам важно Ваше мнение.
                        Воспользуйтесь сервисом отзывов - напишите нам какое
                        сырье, инвентарь вам интересен, но вы не нашли его у
                        нас! Напишите нам свою оценку и пожелания! Мы
                        постараемся учесть их в нашей работе для ВАС.
                    </p>
                    <br />
                    <br />
                    <div>
                        Руководитель отдела развития ресторанного бизнеса <br />
                        Таврина Алена Ильдаровна <br />
                        <a
                            href="tel:+79041687362"
                            className="text-violet-700 hover:text-zinc-800"
                        >
                            +79041687362
                        </a>
                        <br />
                        <a
                            href="mailto:hai@prodservice.ru"
                            className="text-violet-700 hover:text-zinc-800"
                        >
                            hai@prodservice.ru
                        </a>{' '}
                        <br />
                        <br />
                        Руководитель отдела продаж интернет-магазина <br />
                        Колосова Вероника Владимировна <br />
                        <a
                            href="tel:+79221669893"
                            className="text-violet-700 hover:text-zinc-800"
                        >
                            +79221669893
                        </a>
                        <br />
                        <a
                            href="mailto:veronika@prodservice.ru"
                            className="text-violet-700 hover:text-zinc-800"
                        >
                            veronika@prodservice.ru
                        </a>{' '}
                        <br />
                    </div>
                    <br />
                    <div>
                        Менеджер Урал, Уфа
                        <br />
                        Безниско Анастасия&nbsp;
                        <br />
                        <a
                            href="tel:+79126997070"
                            className="text-violet-700 hover:text-zinc-800"
                        >
                            +79126997070
                        </a>
                        <br />
                        <a
                            href="mailto:im@prodservice.ru"
                            className="text-violet-700 hover:text-zinc-800"
                        >
                            im@prodservice.ru
                        </a>
                        <br />
                    </div>
                    <br />
                    <div>
                        Менеджер XMAO, ЯНАО, Тюменская область
                        <br />
                        Яровая Любовь
                        <br />
                        <a
                            href="tel:+79224822927"
                            className="text-violet-700 hover:text-zinc-800"
                        >
                            +79224822927
                        </a>
                        <br />
                        <a
                            href="mailto:ylv@prodservice.ru"
                            className="text-violet-700 hover:text-zinc-800"
                        >
                            ylv@prodservice.ru
                        </a>
                        <br />
                    </div>
                    <br />
                    <div>
                        Менеджер Крым, Москва, доставка транспортными компаниями
                        <br />
                        Ушакова Злата&nbsp;
                        <br />
                        <a
                            href="tel:+79826501329"
                            className="text-violet-700 hover:text-zinc-800"
                        >
                            +79826501329
                        </a>
                        <br />
                        <a
                            href="mailto:z.ushakova@prodservice.ru"
                            className="text-violet-700 hover:text-zinc-800"
                        >
                            z.ushakova@prodservice.ru
                        </a>
                        <br />
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Contacts;
