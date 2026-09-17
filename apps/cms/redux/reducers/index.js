const { combineReducers } = require('redux');
import { HYDRATE } from 'next-redux-wrapper';
import { adminSlice } from './admin.reducer';

const rootReducer = combineReducers({
    [adminSlice.name]: adminSlice.reducer,
});

const reducer = (state, action) => {
    switch (action.type) {
        case HYDRATE:
            return {
                ...state,
                ...action.payload,
            };
        default: {
            return rootReducer(state, action);
        }
    }
};

export default reducer;
