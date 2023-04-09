import { all, put, takeLatest } from 'redux-saga/effects';
import jwt from 'jsonwebtoken';
import {
    SAGA_GET_ADMIN_DATA_ASYNC,
    SAGA_GET_ADMIN_DATA_SUCCESS,
    SAGA_GET_ADMIN_DATA_FAILED,
} from '../actions/admin.action';
import writeLog from '@/logger';

const getAdminById = (token) => {
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

function* getAdminData(action) {
    try {
        const jwt = action.payload;
        const [getAdminDataRes] = yield all([getAdminById(jwt)]);
        const [getAdminDataJson] = yield all([getAdminDataRes.json()]);
        if (getAdminDataJson && getAdminDataJson.status) {
            yield put(SAGA_GET_ADMIN_DATA_SUCCESS(getAdminDataJson.admin));
        } else {
            yield put(SAGA_GET_ADMIN_DATA_FAILED());
        }
    } catch (e) {
        writeLog('admin.saga', 'getAdminData', e.message, 'ERROR');
    }
}

export default function* handleAdmin() {
    yield takeLatest(SAGA_GET_ADMIN_DATA_ASYNC, getAdminData);
}
