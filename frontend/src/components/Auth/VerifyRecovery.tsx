import { Outlet, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { verifyRecovery } from '../../services/auth';
import Container from '../Container/Container';
import { useAppSelector } from '../../redux';

const VerifyRecovery = () => {
    const [urlSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { error } = useAppSelector((state) => state.auth);
    const email = urlSearchParams.get('email');
    const token = urlSearchParams.get('token');

    useEffect(() => {
        if (email && token) {
            verifyRecovery(
                `${import.meta.env.VITE_API}/api/auth/verifyRecovery`,
                {
                    token: urlSearchParams.get('token'),
                    email: urlSearchParams.get('email'),
                },
                dispatch,
            );
        }
    }, [urlSearchParams, dispatch, email, token]);

    if (!(urlSearchParams.get('email') || urlSearchParams.get('token'))) {
        return (
            <Container className='my-10'>
                Ссылка недействительна или срок ее действия истек.
            </Container>
        );
    } else if (error) {
        return <Container className='my-10'>{error}</Container>;
    }

    return <Outlet />;
};

export default VerifyRecovery;
