import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert/Alert';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Container from '../components/Container/Container';
import ButtonSubmit from '../components/Form/ButtonSubmit';
import InputGroup from '../components/Form/InputGroup';
import { resetAuth } from '../redux/slices/authSlice';
import { signIn } from '../services/auth';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAppSelector } from '../redux';

const initialValues = {
    email: '',
    password: '',
};

const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .email('Неверный формат электронной почты')
        .required('Поле электронной почты не должно быть пустым.'),
    password: Yup.string()
        .min(8, 'Пароль должен содержать не менее 8 символов.')
        .max(100, 'Пароль не должен превышать 100 символов.')
        .required('Поле пароля не должно быть пустым.'),
});

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues,
        validationSchema: SignInSchema,
        onSubmit: (values) => {
            signIn(
                `${import.meta.env.VITE_API}/api/auth/signIn`,
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
            <Breadcrumb active='Вход в аккаунт' />
            <Container className='mt-7'>
                <h1 className='text-center  text-[26px] block mb-7'>
                    Вход в аккаунт
                </h1>
                <form
                    onSubmit={formik.handleSubmit}
                    className='mb-14'
                    method='POST'
                    autoComplete='off'
                >
                    <div className='w-full md:w-1/2 xl:w-1/3 mx-auto'>
                        {errorApi && (
                            <div className='mb-4'>
                                <Alert
                                    value={errorApi}
                                    type='error'
                                    onClick={() => dispatch(resetAuth())}
                                />
                            </div>
                        )}
                        <div className='flex flex-col w-full space-y-4 mb-6'>
                            <InputGroup
                                type='text'
                                name='email'
                                id='email'
                                value={formik.values.email}
                                content='Email'
                                autoComplete='off'
                                autoFocus={false}
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
                                autoFocus={false}
                                error={
                                    formik.touched.password &&
                                    formik.errors.password
                                        ? formik.errors.password
                                        : ''
                                }
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <div>
                                <Link
                                    to='/forgot-password'
                                    className='text-zinc-500 cursor-pointer hover:underline'
                                >
                                    Забыли пароль?
                                </Link>
                            </div>
                        </div>
                        <div className='mb-4 block'>
                            <ButtonSubmit
                                isLoading={isLoading}
                                value={'Войти'}
                                title='Войти'
                            />
                        </div>
                        <div className='text-center'>
                            <span className='text-zinc-500'>
                                Нет аккаунта? Зарегистрируйтесь{' '}
                                <Link
                                    to='/signup'
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

export default SignIn;
