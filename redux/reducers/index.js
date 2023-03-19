const { combineReducers } = require("redux");
import { userSlice } from './user.reducer';


const rootReducer = combineReducers({
    [userSlice.name]: userSlice.reducer
});

export default rootReducer;
