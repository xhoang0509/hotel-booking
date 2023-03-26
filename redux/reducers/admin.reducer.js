import { createSlice } from '@reduxjs/toolkit';
import { SAGA_GET_ADMIN_DATA_SUCCESS, SAGA_GET_ADMIN_DATA_FAILED } from '../actions/admin.action';

const initialState = () => {
    return {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        birthday: '',
        gender: '',
        image: '',
        address: '',
        rule: '',
    };
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    // client side
    reducers: {
        saveAdmin: (state, action) => {
            if (action.payload !== null) {
                return {
                    ...state,
                    ...action.payload,
                };
            } else {
                return state;
            }
        },
        removeAdmin: (state) => {
            return {
                ...state,
                ...initialState,
            };
        },
    },
    // server side
    extraReducers: {
        [SAGA_GET_ADMIN_DATA_SUCCESS]: (state, action) => {
            return {
                ...state,
                id: action.payload.id,
                birthday: action.payload.birthday,
                firstName: action.payload.firstName,
                email: action.payload.email,
                phone: action.payload.phone,
                lastName: action.payload.lastName,
                gender: action.payload.gender,
                image: action.payload.image,
                address: action.payload.address,
            };
        },
        [SAGA_GET_ADMIN_DATA_FAILED]: (state) => {
            return {
                ...state,
            };
        },
    },
});

export const { saveAdmin, removeAdmin } = adminSlice.actions;

export default adminSlice.reducer;
