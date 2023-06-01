import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert/Alert';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Container from '../components/Container/Container';
import ButtonSubmit from '../components/Form/ButtonSubmit';
import InputGroup from '../components/Form/InputGroup';
import { resetAuth } from '../redux/slices/authSlice';
import { signUp } from '../services/auth';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAppSelector } from '../redux';

const initialValues = {
    fullName: '',
    phone: '',
    email: '',
    password: '',
};

const SignUpSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, 'ФИО должно содержать не менее 5 символов.')
        .max(50, 'ФИО не должно превышать 50 символов.')
        .required('ФИО не должно быть пустым.'),
    phone: Yup.string()
        .matches(
            /^\+\d{11}$/,
            'Неверный формат номера телефона. Номер должен начинаться с +7 и содержать 10 цифр.',
        )
        .required('Номер телефона не должен быть пустым.'),
    email: Yup.string()
        .email('Неверный формат электронной почты.')
        .required('Email не должен быть пустым.'),
    password: Yup.string()
        .min(8, 'Пароль должен содержать не менее 8 символов.')
        .max(100, 'Пароль не должен превышать 100 символов.')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Пароль должен содержать как минимум одну заглавную букву, одну строчную букву, одну цифру и один специальный символ.',
        )
        .required('Пароль не должен быть пустым.'),
});

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues,
        validationSchema: SignUpSchema,
        onSubmit: (values) => {
            signUp(
                `${import.meta.env.VITE_API}/api/auth/signUp`,
                values,
                dispatch,
                navigate,
            );
        },
    });

    const {
        isLoggedIn,
        isLoading,
        error: errorApi,
    } = useAppSelector((state) => state.auth);

    if (isLoggedIn) return <Navigate to='/account' />;

    return (
        <>
            <Breadcrumb active='Регистрация аккаунта' />
            <Container className='mt-7'>
                <h1 className='text-center  text-[26px] block mb-7'>
                    Регистрация аккаунта
                </h1>
                <form
                    onSubmit={formik.handleSubmit}
                    className='mb-14'
                    autoComplete='off'
                >
                    <div className='w-full md:w-1/2 xl:w-1/3 mx-auto'>
                        {errorApi && (
                            <div className='mb-4'>
                                <Alert
                                    type='error'
                                    value={errorApi}
                                    onClick={() => dispatch(resetAuth())}
                                />
                            </div>
                        )}
                        <div className='flex flex-col w-full space-y-4 mb-6'>
                            <InputGroup
                                name='fullName'
                                id='fullName'
                                value={formik.values.fullName}
                                content='Имя и фамилия'
                                autoComplete='off'
                                error={
                                    formik.touched.fullName &&
                                    formik.errors.fullName
                                        ? formik.errors.fullName
                                        : ''
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <InputGroup
                                name='phone'
                                id='phone'
                                value={formik.values.phone}
                                content='Номер телефона'
                                autoComplete='off'
                                error={
                                    formik.touched.phone && formik.errors.phone
                                        ? formik.errors.phone
                                        : ''
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
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
                            <InputGroup
                                type='password'
                                name='password'
                                id='password'
                                value={formik.values.password}
                                content='Пароль'
                                autoComplete='off'
                                error={
                                    formik.touched.password &&
                                    formik.errors.password
                                        ? formik.errors.password
                                        : ''
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        <div className='mb-4 block'>
                            <ButtonSubmit
                                isLoading={isLoading}
                                value={'Зарегистрироваться'}
                                title='Зарегистрироваться'
                            />
                        </div>
                        <div className='text-center'>
                            <span className='text-zinc-500'>
                                Уже есть аккаунт? Войдите{' '}
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

export default SignUp;
