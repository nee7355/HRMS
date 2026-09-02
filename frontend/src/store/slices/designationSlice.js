import { createSlice } from "@reduxjs/toolkit";
import { deleteAxios, getAxios, patchAxios, postAxios, putAxios } from "./axiosAction";
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

            if(res.statusText==="Created"){
                dispatch(fetchDesignation());
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
                // enqueueSnackbar(res.data.message);
                dispatch(setDesignation(res.data.data));
            }
        } catch (error) {
            
        }finally{
            dispatch(stopLoader());
        }
    }
}

export const editDesignation = (data, id)=>{
    
    return async(dispatch)=>{
        dispatch(startLoader());
        try {
            const res = await patchAxios(`/designation/${id}`, data);
            if(res.statusText==='OK'){
                dispatch(fetchDesignation());
                enqueueSnackbar(res.data.message);
            }
        } catch (error) {
            console.error(error)
        }finally{
            dispatch(stopLoader());
        }
    }
}
export const deleteDesignation = (id)=>{
    return async(dispatch)=>{
        dispatch(startLoader());
        try {
            const res = await deleteAxios(`/designation/${id}`);
            if(res.statusText==='OK'){
                dispatch(fetchDesignation());
                enqueueSnackbar(res.data.message);
            }
        } catch (error) {
            console.error(error)
        }finally{
            dispatch(stopLoader());
        }
    }
}
