import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import departmentReducer from './slices/departmentSlice';

const loggerMiddler = (store)=>(next)=>(action)=>{
    console.log(action);
    const result = next(action);

    console.log( store.getState());

    return result;
}
export const store = configureStore({
    reducer: {
        employees: userReducer,
        departments: departmentReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(loggerMiddler),
});