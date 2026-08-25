import { createSlice } from "@reduxjs/toolkit";
import { deleteAxios, getAxios, postAxios, putAxios } from "./axiosAction";
import { enqueueSnackbar } from "notistack";

const initialState = {
    loading:false,
    departments: []
}
export const departmentSlice = createSlice({
    name: 'departments',
    initialState,
    reducers:{
        startLoader:(state)=>{
            state.loading = true;
        },
        stopLoader:(state)=>{
            state.loading = false;
        },
        getDepartmentSuccess: (state, {payload})=>{
            state.departments = payload
        }
    }
});


export const {startLoader, stopLoader, getDepartmentSuccess} = departmentSlice.actions;
export const deparmentSelector = (state)=>state.departments;

export default departmentSlice.reducer;


export function fetchDepartments(){
    return async(dispatch)=>{
        dispatch(startLoader());
        try {
            const res = await getAxios('/department')
            
            if(res.statusText==="OK"){
                dispatch(getDepartmentSuccess(res.data.data))
            }
        } catch (error) {
            
        }finally{
            dispatch(stopLoader());
        }
    }
}

export const createDepartment = (data)=>{
    return async(dispatch)=>{
        dispatch(startLoader());
        try {
            const res = await postAxios('/department', data);
            if(res.statusText==='OK'){
                dispatch(fetchDepartments());
                enqueueSnackbar(res.data.message);
            }
        } catch (error) {
            console.error(error)
        }finally{
            dispatch(stopLoader());
        }
    }
}
export const editDepartment = (data, id)=>{
    return async(dispatch)=>{
        dispatch(startLoader());
        try {
            const res = await putAxios(`/department/${id}`, data);
            if(res.statusText==='OK'){
                dispatch(fetchDepartments());
                enqueueSnackbar(res.data.message);
            }
        } catch (error) {
            console.error(error)
        }finally{
            dispatch(stopLoader());
        }
    }
}
export const deleteDepartment = (id)=>{
    return async(dispatch)=>{
        dispatch(startLoader());
        try {
            const res = await deleteAxios(`/department/${id}`);
            if(res.statusText==='OK'){
                dispatch(fetchDepartments());
                enqueueSnackbar(res.data.message);
            }
        } catch (error) {
            console.error(error)
        }finally{
            dispatch(stopLoader());
        }
    }
}
