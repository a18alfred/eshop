import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert/Alert';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Container from '../components/Container/Container';
import ButtonSubmit from '../components/Form/ButtonSubmit';
import InputGroup from '../components/Form/InputGroup';
import { resetAuth } from '../redux/slices/authSlice';
import { forgotPassword } from '../services/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppSelector } from '../redux';

const initialValues = {
    email: '',
};

const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email('Неверный формат электронной почты.')
        .required('Email не должен быть пустым.'),
});

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues,
        validationSchema: ForgotPasswordSchema,
        onSubmit: (values) => {
            forgotPassword(
                `${import.meta.env.VITE_API}/api/auth/forgotPassword`,
                values.email,
                dispatch,
            );
        },
    });

    const {
        data,
        isLoading,
        error: errorApi,
    } = useAppSelector((state) => state.auth);

    return (
        <>
            <Breadcrumb active='Забыли пароль' />
            <Container className='mt-7'>
                <h1 className='text-center  text-[26px] block mb-7'>
                    Забыли пароль
                </h1>
                <form onSubmit={formik.handleSubmit} className='mb-14'>
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
                                onClick={() => dispatch(resetAuth())}
                            />
                        )}

                        <div className='mb-6'>
                            <InputGroup
                                type='text'
                                name='email'
                                id='email'
                                value={formik.values.email}
                                content='Email'
                                autoComplete='off'
                                error={
                                    formik.touched.email && formik.errors.email
                                        ? formik.errors.email
                                        : ''
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        <div className='mb-4 block'>
                            <ButtonSubmit
                                isLoading={isLoading}
                                value={'Отправить'}
                                title={'Отправить'}
                            />
                        </div>
                        <div className='text-center'>
                            <span className='text-zinc-500'>
                                Вернуться к входу в систему{' '}
                                <Link
                                    to='/signin'
                                    className='text-zinc-800 hover:underline'
                                >
                                    здесь
                                </Link>
                            </span>
                        </div>
                    </div>
                </form>
            </Container>
        </>
    );
};

export default ForgotPassword;
