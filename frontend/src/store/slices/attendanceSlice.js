import { createSlice } from "@reduxjs/toolkit";
import { getAxios, postAxios } from "./axiosAction";
import { enqueueSnackbar } from "notistack";

const initialState = {
    attendanceLoader: false,
    attendance: {},
}
const attendanceslice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {
        startLoader: (state) => {
            state.attendanceLoader = true;
        },
        stopLoader: (state) => {
            state.attendanceLoader = false;
        },
        setAttendance: (state, { payload }) => {
            state.attendance = payload;
        },
    }
})

export const { startLoader, stopLoader, setAttendance } = attendanceslice.actions;
export const attendanceSelector = (state) => state.attendance;

export default attendanceslice.reducer;

export function checkInApi() {
    return async (dispatch) => {
        dispatch(startLoader())
        try {
            const res = await postAxios('/attendance/check-in')
            
            dispatch(setAttendance(res.data.data))
            enqueueSnackbar(res.data.message);
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            dispatch(stopLoader());
        }
    }
}
export function checkOutApi() {
    return async (dispatch) => {
        dispatch(startLoader())
        try {
             const res = await postAxios('/attendance/check-out')
             dispatch(setAttendance(res.data.data))
            enqueueSnackbar(res.data.message);
        } catch (error) {

        } finally {
            dispatch(stopLoader());
        }
    }
}
export function getTodayAttendance() {
    return async (dispatch) => {
        dispatch(startLoader())
        try {
             const res = await getAxios('/attendance/today-atendance')
            if (res.statusText === 'OK') {
                dispatch(setAttendance(res.data.data))
            }
        } catch (error) {

        } finally {
            dispatch(stopLoader());
        }
    }
}