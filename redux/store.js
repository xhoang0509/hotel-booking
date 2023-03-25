import createSagaMiddleware from '@redux-saga/core';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import reducer from './reducers/index';
import rootSaga from './sagas';

export const makeStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];
    const store = configureStore({
        reducer: reducer,
        devTools: process.env.NODE_ENV !== 'production',
        middleware,
    });
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
