import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import departmentReducer from './slices/departmentSlice';
import designationReducer from './slices/designationSlice';
import departmentManagerReducer from './slices/managerSlice';
import authReducer from './slices/authSllice';
import attendanceReducer from './slices/attendanceSlice';

const loggerMiddler = (store)=>(next)=>(action)=>{
    console.log(action);
    const result = next(action);

    console.log( store.getState());

    return result;
}
export const store = configureStore({
    reducer: {
        employees: userReducer,
        departments: departmentReducer,
        designation: designationReducer,
        departmentManager: departmentManagerReducer,
        auth: authReducer,
        attendance: attendanceReducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(loggerMiddler),
});