import { createSlice } from "@reduxjs/toolkit";
import { getAxios } from "./axiosAction";

const initialState = {
    mangerLoader: false,
    departmentManager: [],
    team:[],
    summary: {},
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
        },
        setTeam:(state,{payload})=>{
            state.team = payload;
        },
        setSummary:(state,{payload})=>{
            state.summary = payload;
        },
    }
});

export const {startLoader, stopLoader, setDepartmentManager, setTeam, setSummary}  = managerSlice.actions;
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
export function getMyTeam(){
    return async(dispatch)=>{
        dispatch(startLoader());
        try {
            
            const res = await getAxios(`/manager/team`);
            if (res.statusText === 'OK') {
                dispatch(setTeam(res.data.data));
            }
        } catch (error) {
            console.error('Error fetching manager team:', error);
        } finally {
            dispatch(stopLoader());
        }
    }
}
export function getTeamSummary(){
    return async(dispatch)=>{
        dispatch(startLoader());
        try {
            
            const res = await getAxios(`/manager/summary`);
            if (res.statusText === 'OK') {
                dispatch(setSummary(res.data.data));
            }
        } catch (error) {
            console.error('Error fetching manager team:', error);
        } finally {
            dispatch(stopLoader());
        }
    }
}