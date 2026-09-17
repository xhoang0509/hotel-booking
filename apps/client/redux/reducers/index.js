const { combineReducers } = require('redux');
import { HYDRATE } from 'next-redux-wrapper';
import { userSlice } from './user.reducer';

const rootReducer = combineReducers({
    [userSlice.name]: userSlice.reducer,
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
