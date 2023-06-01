import { ChildrenProps } from '../../types/types';
import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAppSelector } from '../../redux';

const RequireAuth = ({
                         children,
                         redirectTo,
                     }: ChildrenProps & { redirectTo: string }) => {
    const { isLoggedIn } = useAppSelector((state) => state.auth);

    if (!isLoggedIn) {
        return <Navigate to={redirectTo} />;
    }
    return <>{children}</>;
};

export default RequireAuth;
