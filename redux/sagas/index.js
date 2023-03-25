import { all } from 'redux-saga/effects';
import handleUser from './user.saga';

export function* helloSaga() {
    console.log('Hello Sagas!');
}

export default function* rootSaga() {
    yield all([handleUser()]);
}
