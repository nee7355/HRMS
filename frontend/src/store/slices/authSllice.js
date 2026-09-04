import { createSlice } from "@reduxjs/toolkit";
import { getAxios } from "./axiosAction";

const initialState = {
    authLoader: false,
    user: null,
    isAuthenticated: false,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        startLoader:(state)=>{
            state.authLoader = true;
        },
        stopLoader:(state)=>{
            state.authLoader = false;
        },
        setUser:(state,{payload})=>{
            state.user = payload;
            state.isAuthenticated = true;
        },
        setIsAuthenticated: (state, {payload})=>{
            state.isAuthenticated = payload;
        }
    }
});

export const {startLoader, stopLoader, setUser, setIsAuthenticated}  = authSlice.actions;
export const authSelector = (state)=>state.auth;

export default authSlice.reducer;

export function checkAuth(){
    return async(dispatch)=>{
        dispatch(startLoader());
        try {
            
            const res = await getAxios(`/auth`);
            
            if (res.statusText === 'OK') {
                dispatch(setUser(res.data.data));
            }
        } catch (error) {
            console.error('Error fetching manager by department:', error);
                dispatch(setUser(null));
                dispatch(setIsAuthenticated(false));
            
        } finally {
            dispatch(stopLoader());
        }
    }
}