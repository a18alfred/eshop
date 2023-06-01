import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import CartList from '../components/Cart/CartList';
import Container from '../components/Container/Container';
import PageTitle from '../components/PageTitle/PageTitle';
import { useAppSelector } from '../redux';

const Cart = () => {
    const { items } = useAppSelector((state) => state.cart);

    return (
        <>
            <Breadcrumb active='Корзина' />
            <Container>
                <PageTitle value='Корзина' />
                {items.length > 0 ? (
                    <CartList isPage={true} />
                ) : (
                    <p className='mb-5'>
                        В корзине пусто. Вернитесь{' '}
                        <Link
                            to='/'
                            className='transition hover:text-violet-700 hover:underline'
                        >
                            в магазин,
                        </Link>{' '}
                        чтобы продолжить покупки.
                    </p>
                )}
            </Container>
        </>
    );
};

export default Cart;
