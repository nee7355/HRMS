import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'

const loggerMiddler = (store)=>(next)=>(action)=>{
    console.log(action);
    const result = next(action);

    console.log( store.getState());

    return result;
}
export const store = configureStore({
    reducer: {
        users: userReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(loggerMiddler),
});