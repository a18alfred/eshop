import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Container from '../components/Container/Container';
import { getUser } from '../services/user';
import PullsLoader from '../components/Loader/PullsLoader';
import avatarFallback from '../assets/avatar-placeholder.png';
import { useAppSelector } from '../redux';

const AccountDummy = () => {
    const { data } = useAppSelector((state) => state.auth);
    const { data: user } = useAppSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data?.accessToken) {
            getUser(
                `${import.meta.env.VITE_API}/api/user/get`,
                data.accessToken,
                dispatch,
            );
        }
    }, [data, dispatch]);

    if (!user) {
        return (
            <Container className='flex justify-center py-5'>
                <PullsLoader />
            </Container>
        );
    }

    return (
        <Container className='my-5 flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
                <div className='text-left'>
                    <h2 className='text-xl font-semibold'>{user.fullName}</h2>
                    <p className='text-gray-500'>{user.email}</p>
                </div>
                <img
                    src={user.avatar || avatarFallback}
                    alt='Аватар пользователя'
                    className='w-12 h-12 rounded-full object-cover'
                />
            </div>

            <div>
                <h3 className='text-lg font-semibold'>
                    Информация о пользователе
                </h3>
                <p>
                    <span className='font-medium'>Телефон:</span>{' '}
                    {user.phone}
                </p>
                <p>
                    <span className='font-medium'>Подтвержден:</span>{' '}
                    {user.isVerified ? 'Да' : 'Нет'}
                </p>
            </div>
            <div className='mt-8'>
                <h3 className='text-lg font-semibold'>Заказы</h3>
            </div>
        </Container>
    );
};

export default AccountDummy;
