import { all, put, takeLatest } from 'redux-saga/effects';

import {
    SAGA_GET_USER_DATA_ASYNC,
    SAGA_GET_USER_DATA_SUCCESS,
    SAGA_GET_USER_DATA_FAILED,
} from '../actions/user.action';

const getUserById = (jwt) =>
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/1`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
    });

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
