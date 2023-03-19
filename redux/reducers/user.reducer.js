import { LocalStorage } from "@/constants/Storage.const";
import { createSlice } from "@reduxjs/toolkit";

const initialState =  () => {
    // const user = JSON.parse(localStorage.getItem(LocalStorage.user));
    return  {
        id: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        birthday: "",
        nationality: "",
        gender: "",
        genius: "",
        images: "",
        createdAt: "",
        updatedAt: "",
        token: "",
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUser: (state, action) => {
            if (action.payload !== null) {
                localStorage.setItem(LocalStorage.user, JSON.stringify(action.payload));
                return {
                    ...state,
                    ...action.payload
                }
            } else {
                return state;
            }
        },
        removeUser: (state, action) => {
            localStorage.removeItem(LocalStorage.user);
            return initialState;
        }
    }
});

export const { saveUser, removeUser } = userSlice.actions;

export default userSlice.reducer;