import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Container from '../components/Container/Container';
import BallsLoader from '../components/Loader/PullsLoader';
import { resetAuth } from '../redux/slices/authSlice';
import { signOut } from '../services/auth';
import { useAppSelector } from '../redux';

const SignOut = () => {
    const dispatch = useDispatch();
    const { data } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (data?.accessToken) {
            signOut(
                `${import.meta.env.VITE_API}/api/auth/signOut`,
                data.accessToken,
                dispatch,
            );
        } else {
            dispatch(resetAuth());
        }
    }, [dispatch, data?.accessToken]);

    return (
        <Container className='flex justify-center my-5'>
            <BallsLoader />
        </Container>
    );
};

export default SignOut;
