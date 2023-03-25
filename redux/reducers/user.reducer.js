import { LocalStorage } from '@/constants/Storage.const';
import { createSlice } from '@reduxjs/toolkit';
import { SAGA_GET_USER_DATA_SUCCESS } from '../actions/user.action';
import { SAGA_GET_USER_DATA_FAILED } from './../actions/user.action';

const initialState = () => {
    // const user = JSON.parse(localStorage.getItem(LocalStorage.user));
    return {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        birthday: '',
        nationality: '',
        gender: '',
        genius: '',
        images: '',
    };
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    // client side
    reducers: {
        saveUser: (state, action) => {
            if (action.payload !== null) {
                localStorage.setItem(LocalStorage.user, JSON.stringify(action.payload));
                return {
                    ...state,
                    ...action.payload,
                };
            } else {
                return state;
            }
        },
        removeUser: (state, action) => {
            localStorage.removeItem(LocalStorage.user);
            return initialState;
        },
    },
    // server side
    extraReducers: {
        [SAGA_GET_USER_DATA_SUCCESS]: (state, action) => {
            console.log('state: ', state);
            console.log('action: ', JSON.stringify(action));
            return {
                ...state,
                id: action.payload.id,
                birthday: action.payload.birthday,
                firstName: action.payload.firstName,
                email: action.payload.email,
                phone: action.payload.phone,
                lastName: action.payload.lastName,
                nationality: action.payload.nationality,
                gender: action.payload.gender,
                genius: action.payload.genius,
                images: action.payload.images,
            };
        },
        [SAGA_GET_USER_DATA_FAILED]: (state) => {
            return {
                ...state,
            };
        },
    },
});

export const { saveUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
