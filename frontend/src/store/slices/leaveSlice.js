import { createSlice } from "@reduxjs/toolkit";
import { getAxios, postAxios } from "./axiosAction";
import { enqueueSnackbar } from "notistack";

const initialState = {
    leaveLoader: false,
    leave: null,
    leaveType: null
}
const leaveSlice = createSlice({
    name: 'leave',
    initialState,
    reducers: {
        startLoader: (state) => {
            state.leaveLoader = true;
        },
        stopLoader: (state) => {
            state.leaveLoader = false;
        },
        setLeave: (state, { payload }) => {
            state.leave = payload;
        },
        setLeaveType: (state, { payload }) => {
            state.leaveType = payload;
        },
    }
})

export const { startLoader, stopLoader, setLeave, setLeaveType } = leaveSlice.actions;
export const leaveSelector = (state) => state.leave;

export default leaveSlice.reducer;

export function applyLeave(data) {
    return async (dispatch) => {
        dispatch(startLoader())
        try {
            const res = await postAxios('/leave', data)
            
            dispatch(setLeave(res.data.data))
            enqueueSnackbar(res.data.message);
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            dispatch(stopLoader());
        }
    }
}

export function getLeaveType() {
    return async (dispatch) => {
        dispatch(startLoader())
        try {
            const res = await getAxios('/leave/leaveType');
            
            dispatch(setLeaveType(res.data.data));
            // enqueueSnackbar(res.data.message);
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            dispatch(stopLoader());
        }
    }
}
