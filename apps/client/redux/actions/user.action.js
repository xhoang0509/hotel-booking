import { createAction } from '@reduxjs/toolkit';

export const SAGA_GET_USER_DATA_ASYNC = createAction('user/GetUserDataAsync');
export const SAGA_GET_USER_DATA_SUCCESS = createAction('user/GetUserDataSuccess');
export const SAGA_GET_USER_DATA_FAILED = createAction('user/GetUserDataFailed');
