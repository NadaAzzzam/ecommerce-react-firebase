import authReducer from './authReducer';
import productsReducer from './productsReducer';
import {combineReducers} from 'redux';

const rootReducer= combineReducers({
    // auth:authReducer,
    product:productsReducer
})

export default rootReducer;