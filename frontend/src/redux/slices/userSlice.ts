import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
    id: number;
    fullName: string;
    phone: number;
    email: string;
    avatar: string;
    isVerified: boolean;
    role: 'admin' | 'user';
    createdAt: Date;
    updatedAt: Date;
};

type InitialUser = {
    data: UserState | null;
    isLoading: boolean;
    error: string;
};

const initialUser: InitialUser = {
    data: null,
    isLoading: false,
    error: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUser,
    reducers: {
        getUserStart: (state) => {
            state.isLoading = true;
            state.error = '';
        },

        getUserSuccess: (state, action: PayloadAction<UserState>) => {
            state.isLoading = false;
            state.error = '';
            state.data = action.payload;
        },

        getUserFailed: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.data = null;
            state.error = action.payload;
        },
    },
});

export const { getUserStart, getUserSuccess, getUserFailed } =
    userSlice.actions;

export default userSlice.reducer;
