import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Container from '../components/Container/Container';
import React from 'react';

const BuyGuide = () => {
    return (
        <div>
            <Breadcrumb active="Как купить" />
            <Container className="my-5">
                <h1 className="text-3xl text-zinc-700 font-medium leading-snug">
                    Как купить
                </h1>
                <div className={'flex flex-col gap-6 text-[15px] mt-8 mb-16'}>
                    <p>
                        Оформить заказ на нашем сайте легко. Просто добавьте
                        выбранные товары в корзину, а затем перейдите на
                        страницу Корзина, проверьте правильность заказанных
                        позиций и нажмите кнопку «Оформить заказ».
                    </p>
                    <h4 className={'text-2xl'}>Оформление заказа</h4>
                    <h6 className={'text-xl'}>Заполнение адреса</h6>
                    <p>
                        Выберите из списка название вашего региона и населённого
                        пункта. Если вы не нашли свой населённый пункт в списке,
                        выберите значение «Другое местоположение» и впишите
                        название своего населённого пункта в графу «Город».
                        Введите правильный индекс.
                    </p>
                    <h6 className={'text-xl'}>Доставка</h6>
                    <p>
                        В зависимости от места жительства вам предложат варианты
                        доставки. Выберите любой удобный способ. Подробнее об
                        условиях доставки читайте в разделе «Доставка».
                    </p>
                    <h6 className={'text-xl'}>Оплата</h6>
                    <p>
                        Выберите оптимальный способ оплаты. Подробнее о всех
                        вариантах читайте в разделе «Оплата»
                    </p>
                    <h6 className={'text-xl'}>Покупатель</h6>
                    <p>
                        Введите данные о себе: ФИО, адрес доставки, номер
                        телефона. В поле «Комментарии к заказу» введите
                        сведения, которые могут пригодиться курьеру.
                    </p>
                    <h6 className={'text-xl'}>Оформление заказа</h6>
                    <p>
                        Проверьте правильность ввода информации: позиции заказа,
                        выбор местоположения, данные о покупателе. Нажмите
                        кнопку «Оформить заказ».
                    </p>
                    <p>
                        Наш сервис запоминает данные о пользователе, информацию
                        о заказе и в следующий раз предложит вам повторить к
                        вводу данные предыдущего заказа. Если условия вам не
                        подходят, выбирайте другие варианты.
                    </p>
                    <h6 className={'text-xl'}>Доставка</h6>
                    <p>
                        При доставке заказа нашим транспортом водитель передает
                        Вам коробку с заказом. Необходимо вскрыть коробку,
                        проверить качество и количество товара, поставить
                        подпись в накладной. При отсутствии какого-либо товара
                        или получении товара ненадлежащего качества, необходимо
                        сделать исправления в накладной. В накладной необходимо
                        указать номер карты для возврата денежные средств, если
                        это необходимо. Возврат денежных средств будет
                        осуществлён в течении нескольких дней после исправления
                        документов.
                    </p>
                    <p>
                        ВНИМАНИЕ!!! Мы не несем ответственность за целостность
                        товаров доставляемых сторонними транспортными службами.
                    </p>
                    <h6 className={'text-xl'}>Претензии</h6>
                    <p>
                        При обнаружении скрытых дефектов в товаре, в течение 3
                        рабочих дней после получения товара необходимо составить
                        претензию в письменном виде с указанием дефектов товара,
                        с приложенными фотографиями. Претензию необходимо
                        отправить на{' '}
                        <a
                            href="im@prodservice.ru"
                            className="text-violet-700 hover:text-zinc-800"
                        >
                            im@prodservice.ru
                        </a>
                        . Претензия будет рассмотрена в течение 5 рабочих дней.
                        После положительного результата по претензии будет
                        осуществлен возврат денежных средств.
                    </p>
                </div>
            </Container>
        </div>
    );
};

export default BuyGuide;
