import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Modal from '../components/Modal/Modal';
import ConvenientButtons from '../components/ConvenientButtons/ConvenientButtons';

const PageLayout = () => {
    return (
        <>
            <Header />
            <Modal />
            <Outlet />
            <Footer />
            <ConvenientButtons />
        </>
    );
};

export default PageLayout;
