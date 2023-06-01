import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Container from '../components/Container/Container';

const NotFound = () => {
    return (
        <div>
            <Breadcrumb active="404 Страница не найдена" />
            <Container className="my-5">
                <h1 className="text-3xl text-zinc-700 font-medium leading-snug">
                    Ошибка: страница не найдена
                </h1>
                <p className="my-4">
                    Извините, мы ничего не нашли. Пожалуйста, вернитесь на
                    главную страницу.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center justify-center bg-zinc-800 text-white h-10 px-5 text-lg rounded-2xl"
                >
                    На главную страницу
                </Link>
            </Container>
        </div>
    );
};

export default NotFound;
