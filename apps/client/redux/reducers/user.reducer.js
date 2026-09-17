import { createSlice } from '@reduxjs/toolkit';
import { SAGA_GET_USER_DATA_SUCCESS, SAGA_GET_USER_DATA_FAILED } from '../actions/user.action';

const initialState = () => {
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
        address: '',
    };
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    // client side
    reducers: {
        saveUser: (state, action) => {
            if (action.payload !== null) {
                return {
                    ...state,
                    ...action.payload,
                };
            } else {
                return state;
            }
        },
        removeUser: (state) => {
            return {
                ...state,
                ...initialState,
            };
        },
    },
    // server side
    extraReducers: {
        [SAGA_GET_USER_DATA_SUCCESS]: (state, action) => {
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
                address: action.payload.address,
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
