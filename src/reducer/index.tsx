import { combineReducers } from 'redux';
import login from './login';
import userData from './userData';


const rootReducer = combineReducers({
    login,
    userData
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;