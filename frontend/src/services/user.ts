import { resetAuth } from '../redux/slices/authSlice';
import {
    getUserStart,
    getUserSuccess,
    getUserFailed,
} from '../redux/slices/userSlice';
import { AppDispatch } from '../redux';
import axiosJWT from '../utils/axiosJWT';
import errorHandling from '../utils/errorHandling';

export const getUser = async (
    url: string,
    accessToken: string,
    dispatch: AppDispatch
) => {
    dispatch(getUserStart());
    try {
        const res = await axiosJWT(accessToken, dispatch).get(url);
        dispatch(getUserSuccess(res.data));
    } catch (error) {
        dispatch(resetAuth());
        dispatch(getUserFailed(errorHandling(error).message));
    }
};
