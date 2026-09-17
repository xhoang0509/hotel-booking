import { all, put, takeLatest } from 'redux-saga/effects';
import jwt from 'jsonwebtoken';

import {
    SAGA_GET_USER_DATA_ASYNC,
    SAGA_GET_USER_DATA_SUCCESS,
    SAGA_GET_USER_DATA_FAILED,
} from '../actions/user.action';

const getUserById = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, {
        algorithms: process.env.JWT_ALGORITHM,
        ignoreExpiration: true,
    });
    const { type, id } = decoded;
    return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${type}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
};

function* getUserData(action) {
    try {
        const jwt = action.payload;
        const [getUserDataRes] = yield all([getUserById(jwt)]);
        const [getUserDataJson] = yield all([getUserDataRes.json()]);
        if (getUserDataJson && getUserDataJson.status) {
            yield put(SAGA_GET_USER_DATA_SUCCESS(getUserDataJson.user));
        } else {
            yield put(SAGA_GET_USER_DATA_FAILED());
        }
    } catch (e) {
        console.log('ERROR', '[user.saga.js] getUserData', e.message);
    }
}

export default function* handleUser() {
    yield takeLatest(SAGA_GET_USER_DATA_ASYNC, getUserData);
}
