import { createAction } from '@reduxjs/toolkit';

export const SAGA_GET_ADMIN_DATA_ASYNC = createAction('admin/GetAdminDataAsync');
export const SAGA_GET_ADMIN_DATA_SUCCESS = createAction('admin/GetAdminDataSuccess');
export const SAGA_GET_ADMIN_DATA_FAILED = createAction('admin/GetAdminDataFailed');
