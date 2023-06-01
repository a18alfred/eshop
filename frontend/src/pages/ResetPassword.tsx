import axios from 'axios';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Alert from '../components/Alert/Alert';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Container from '../components/Container/Container';
import ButtonSubmit from '../components/Form/ButtonSubmit';
import InputGroup from '../components/Form/InputGroup';
import {
    resetAuth,
    resetPasswordFailed,
    resetPasswordStart,
    resetPasswordSuccess,
} from '../redux/slices/authSlice';
import { validateFormEachField } from '../utils/validateForm';
import { useAppSelector } from '../redux';

const ResetPassword = () => {
    const navigator = useNavigate();
    const [value, setValue] = useState({
        password: '',
        rePassword: '',
    });
    const [error, setError] = useState({
        password: '',
        rePassword: '',
    });
    const dispatch = useDispatch();
    const [urlSearchParams] = useSearchParams();
    const {
        isLoading,
        data,
        error: errorApi,
    } = useAppSelector((state) => state.auth);

    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            dispatch(resetPasswordStart());
            const res = await axios.post(
                `${import.meta.env.VITE_API}/api/auth/resetPassword`,
                {
                    email: urlSearchParams.get('email'),
                    token: urlSearchParams.get('token'),
                    password: value.password,
                },
            );
            dispatch(resetPasswordSuccess(res.data));
        } catch (error) {
            console.log(error);
            dispatch(resetPasswordFailed('Что-то пошло не так'));
        }
    };

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        const err = validateFormEachField({
            name: e.target.name,
            value: e.target.value,
            value2: e.target.name === 'rePassword' ? value.password : '',
        });
        setError({ ...error, [e.target.name]: err });
    };

    return (
        <>
            <Breadcrumb active='Изменить пароль' />
            <Container className='mt-7'>
                <h1 className='text-center  text-[26px] block mb-7'>
                    Изменить пароль
                </h1>
                <form onSubmit={handleSubmitForm} className='mb-14'>
                    <div className='w-full md:w-1/2 xl:w-1/3 mx-auto'>
                        {errorApi && (
                            <Alert
                                value={errorApi}
                                type='error'
                                onClick={() => dispatch(resetAuth())}
                            />
                        )}

                        {data?.message && (
                            <Alert
                                value={data.message}
                                type='success'
                                onClick={() => {
                                    navigator('/signin');
                                    dispatch(resetAuth());
                                }}
                            />
                        )}

                        <div className='flex flex-col w-full space-y-4 mb-6'>
                            <InputGroup
                                type='password'
                                name='password'
                                id='password'
                                value={value.password}
                                content='Новый пароль'
                                autoComplete='off'
                                error={error.password}
                                onChange={handleChangeValue}
                            />
                            <InputGroup
                                type='password'
                                name='rePassword'
                                id='rePassword'
                                value={value.rePassword}
                                content='Подтверждение пароля'
                                autoComplete='off'
                                error={error.rePassword}
                                onChange={handleChangeValue}
                            />
                        </div>
                        <div className='mb-4 block'>
                            <ButtonSubmit
                                isLoading={isLoading}
                                value={'Изменить пароль'}
                                title={'Изменить пароль'}
                            />
                        </div>
                    </div>
                </form>
            </Container>
        </>
    );
};

export default ResetPassword;
