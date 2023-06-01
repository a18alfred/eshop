import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AccountDummy from './pages/AccountDummy';
import Cart from './pages/Cart';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import SignOut from './pages/SignOut';
import PageLayout from './layouts/PageLayout';
import ProductDetails from './pages/ProductDetails';
import RequireAuth from './components/Auth/RequireAuth';
import CleanAuth from './components/Auth/CleanAuth';
import VerifyRecovery from './components/Auth/VerifyRecovery';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import Contacts from './pages/Contacts';
import About from './pages/About';
import BuyGuide from './pages/BuyGuide';
import Branches from './pages/Branches';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<PageLayout />}>

                <Route index element={<Home />} />

                <Route
                    path='/products'
                    element={<ProductList />}
                />

                <Route
                    path='/products/:productCode'
                    element={<ProductDetails />}
                />

                <Route
                    path='/cart'
                    element={<Cart />}
                />

                <Route
                    path='/contacts'
                    element={<Contacts />}
                />

                <Route
                    path='/branches'
                    element={<Branches />}
                />

                <Route
                    path='/how-to-buy'
                    element={<BuyGuide />}
                />

                <Route
                    path='/about'
                    element={<About />}
                />

                <Route element={<CleanAuth />}>
                    <Route
                        path='/signup'
                        element={<SignUp />}
                    />
                    <Route
                        path='/signin'
                        element={<SignIn />}
                    />
                    <Route
                        path='/forgot-password'
                        element={<ForgotPassword />}
                    />
                    <Route element={<VerifyRecovery />}>
                        <Route
                            path='/reset-password'
                            element={<ResetPassword />}
                        />
                    </Route>
                </Route>

                <Route
                    path='/logout'
                    element={
                        <RequireAuth redirectTo='/signin'>
                            <SignOut />
                        </RequireAuth>
                    }
                />

                <Route
                    path='/account'
                    element={
                        <RequireAuth redirectTo='/signin'>
                            <AccountDummy />
                        </RequireAuth>
                    }
                />

                <Route
                    path='*'
                    element={<NotFound />}
                />
            </Route>
        </Routes>
    );
};

export default App;
