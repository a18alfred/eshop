import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { resetAuth } from '../../redux/slices/authSlice';

const CleanAuth = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch, pathname]);

    return <Outlet />;
};

export default CleanAuth;
