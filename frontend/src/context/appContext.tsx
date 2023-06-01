import React, { useState, createContext, useContext, useCallback } from 'react';
import { ChildrenProps, IProduct } from '../types/types';

type AppContextType = {
    isOpenMessage: boolean;
    closeMessage: () => void;
    isOpenNavMobile: boolean;
    closeNavMobile: () => void;
    isActiveProductQuickview: boolean;
    openProductQuickview: (product: IProduct) => void;
    product: IProduct | null;
    closeProductQuickview: () => void;
    openNavMobile: () => void;
    isOpenPopUpCart: boolean;
    openPopUpCart: () => void;
    closePopUpCart: () => void;
};

const AppContext = createContext({} as AppContextType);

const AppProvider = ({ children }: ChildrenProps) => {
    const [isOpenNavMobile, setIsOpenNavMobile] = useState(false);
    const [isOpenMessage, setIsOpenMessage] = useState(true);
    const [isActiveProductQuickview, setIsActiveProductQuickview] =
        useState(false);
    const [isOpenPopUpCart, setIsOpenPopUpCart] = useState(false);
    const [product, setProduct] = useState<AppContextType['product']>(null);

    const closeMessage = useCallback(() => {
        setIsOpenMessage(false);
    }, []);

    const closeNavMobile = useCallback(() => {
        setIsOpenNavMobile(false);
    }, []);

    const openNavMobile = useCallback(() => {
        setIsOpenNavMobile(true);
    }, []);

    const openProductQuickview = useCallback((product: IProduct) => {
        setIsActiveProductQuickview(true);
        setProduct(product);
    }, []);

    const closeProductQuickview = useCallback(() => {
        setIsActiveProductQuickview(false);
    }, []);

    const openPopUpCart = useCallback(() => {
        setIsOpenPopUpCart(true);
    }, []);

    const closePopUpCart = useCallback(() => {
        setIsOpenPopUpCart(false);
    }, []);

    return (
        <AppContext.Provider
            value={{
                isOpenMessage,
                closeMessage,
                isOpenNavMobile,
                closeNavMobile,
                openNavMobile,
                isActiveProductQuickview,
                openProductQuickview,
                product,
                closeProductQuickview,
                isOpenPopUpCart,
                openPopUpCart,
                closePopUpCart,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () => useContext(AppContext);

export { AppProvider, AppContext, useGlobalContext };
