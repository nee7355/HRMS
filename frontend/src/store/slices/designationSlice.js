import { createSlice } from "@reduxjs/toolkit";
import { getAxios, postAxios } from "./axiosAction";
import { enqueueSnackbar } from "notistack";

const initialState={
    loading: false,
    designation: [],
}

const designationSlice = createSlice({
    name:'designation',
    initialState,
    reducers:{
        startLoader:(state)=>{
            state.loading=true;
        },
        stopLoader:(state)=>{
            state.loading=false;
        },
        setDesignation:(state,{payload})=>{
            state.designation = payload;
        }
    }
})
export const {startLoader, stopLoader, setDesignation} = designationSlice.actions;

export const designationSelector = (state)=>state.designation;
export default designationSlice.reducer;

export function createDesignation(data){
    return async(dispatch)=>{
        dispatch(startLoader());
        try {
            const res = await postAxios('/designation', data)

            debugger
            if(res.statusText==="Created"){
                enqueueSnackbar(res.data.message);
            }
        } catch (error) {
            
        }finally{
            dispatch(stopLoader());
        }
    }
}
export function fetchDesignation(){
    return async(dispatch)=>{
        dispatch(startLoader());
        try {
            const res = await getAxios('/designation', )
            if(res.statusText==='OK'){
                enqueueSnackbar(res.data.message);
                dispatch(setDesignation(res.data.data));
            }
        } catch (error) {
            
        }finally{
            dispatch(stopLoader());
        }
    }
}