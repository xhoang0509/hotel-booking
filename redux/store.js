import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import rootReducer from './reducers/index';
export const makeStore = () => {
    const store = configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== "production",
    })

    return store;
}


export const wrapper = createWrapper(makeStore, { debug: true })