import axios from 'axios';
import errorHandling from '../utils/errorHandling';
import { AppDispatch } from '../redux';
import { NavigateFunction } from 'react-router-dom';
import {
    forgotPasswordFailed,
    forgotPasswordStart,
    forgotPasswordSuccess,
    resetAuth,
    signInFailed,
    signInStart,
    signInSuccess,
    signUpFailed,
    signUpStart,
    signUpSuccess,
    verifyRecoveryFailed,
} from '../redux/slices/authSlice';
import axiosJWT from '../utils/axiosJWT';

type DataSignIn = {
    email: string;
    password: string;
};

type DataSignUp = {
    fullName: string;
    phone: string;
} & DataSignIn;

type DataRecovery = {
    token: string | null;
    email: string | null;
};

const signUp = async (
    url: string,
    data: DataSignUp,
    dispatch: AppDispatch,
    navigate: NavigateFunction
) => {
    dispatch(signUpStart());

    try {
        const res = await axios.post(url, data);
        if (res.status === 201) {
            dispatch(signUpSuccess());
            navigate('/signin');
        }
    } catch (error) {
        dispatch(signUpFailed(errorHandling(error).message));
    }
};

const signIn = async (
    url: string,
    data: DataSignIn,
    dispatch: AppDispatch,
    navigate: NavigateFunction
) => {
    dispatch(signInStart());

    try {
        const res = await axios.post(url, data, {
            withCredentials: true,
        });
        dispatch(signInSuccess(res.data));
        navigate('/account');
    } catch (error) {
        dispatch(signInFailed(errorHandling(error).message));
    }
};

const signOut = async (
    url: string,
    accessToken: string,
    dispatch: AppDispatch
) => {
    try {
        const res = await axiosJWT(accessToken, dispatch).post(
            url,
            {
                accessToken,
            },
            {
                withCredentials: true,
            }
        );

        if (res.status === 200) {
            dispatch(resetAuth());
        }
    } catch (error) {
        console.log(error);
    }
};

const forgotPassword = async (
    url: string,
    email: string,
    dispatch: AppDispatch
) => {
    dispatch(forgotPasswordStart());
    try {
        const res = await axios.post(url, { email });
        if (res.status === 200) {
            dispatch(forgotPasswordSuccess(res.data));
        }
    } catch (error) {
        dispatch(forgotPasswordFailed(errorHandling(error).message));
    }
};

const verifyRecovery = async (
    url: string,
    data: DataRecovery,
    dispatch: AppDispatch
) => {
    try {
        const res = await axios.post(url, data);
        if (res.status !== 200) {
            dispatch(
                verifyRecoveryFailed(
                    'Произошла ошибка. Пожалуйста, попробуйте еще раз позже!'
                )
            );
        }
    } catch (error) {
        dispatch(verifyRecoveryFailed(errorHandling(error).message));
    }
};

export { signUp, signIn, signOut, forgotPassword, verifyRecovery };
