import { all } from 'redux-saga/effects';
import handleAdmin from './admin.saga';

export function* helloSaga() {
    console.log('Hello Sagas!');
}

export default function* rootSaga() {
    yield all([handleAdmin()]);
}
