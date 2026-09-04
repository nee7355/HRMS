import { createSlice } from "@reduxjs/toolkit";
import { getAxios } from "./axiosAction";

const initialState = {
    mangerLoader: false,
    departmentManager: [],
}
const managerSlice = createSlice({
    name: 'manager',
    initialState,
    reducers:{
        startLoader:(state)=>{
            state.mangerLoader = true;
        },
        stopLoader:(state)=>{
            state.mangerLoader = false;
        },
        setDepartmentManager:(state,{payload})=>{
            state.departmentManager = payload;
        }
    }
});

export const {startLoader, stopLoader, setDepartmentManager}  = managerSlice.actions;
export const departmentManagerSelector = (state)=>state.departmentManager;

export default managerSlice.reducer;

export function fetchMangerByDepartment(departmentId, role){
    return async(dispatch)=>{
        dispatch(startLoader());
        try {
            
            const res = await getAxios(`/manager/${departmentId}`, {params: {role}});
            if (res.statusText === 'OK') {
                dispatch(setDepartmentManager(res.data.data));
            }
        } catch (error) {
            console.error('Error fetching manager by department:', error);
        } finally {
            dispatch(stopLoader());
        }
    }
}