import { createSlice } from "@reduxjs/toolkit";
import { deleteAxios, getAxios, postAxios, putAxios } from "./axiosAction";
import { enqueueSnackbar } from "notistack";

const initialState = {
    loading:false,
    users:[]
}
export const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        getUsersLoading:(state)=>{
            state.loading = true;
        },
        getUsers:(state, {payload})=>{
            state.users = payload.data
        },
        getUsersLoadingFailure: (state)=>{
            state.loading = false;
        }
    }
});

export const {getUsersLoading, getUsers, getUsersLoadingFailure} = userSlice.actions;
export const userSelector = (state) => state.users;
export default userSlice.reducer;


export function handleUserAction(data, action) {
    return async (dispatch) => {
        dispatch(getUsersLoading());
        try {
            const { _id } = data;

            switch (action) {
                case 'add': {
                    const res = await postAxios('/users/addUser', data);
                    enqueueSnackbar(res.data.message);
                    break;
                }

                case 'edit': {
                    const res = await putAxios(`/users/editUser/${_id}`, data);
                    if(res.status>=200&&res.status<300){
                        dispatch(getUsersData());
                    }
                    enqueueSnackbar(res.data.message, {variant:'success'});
                    break;
                }

                case 'delete': {
                    const res = await deleteAxios(`/users/delete/${_id}`);
                    enqueueSnackbar(res.data.message);
                    break;
                }

                default:
                    console.error('Invalid action:', action);
            }

        } catch (error) {
            console.error(error);
            dispatch(getUsersLoadingFailure());
        }
    };
}
export function getUsersData(){
    return async(dispatch)=>{
        dispatch(getUsersLoading());
        try {
            const res = await getAxios('/users');
            dispatch(getUsers(res.data));
        } catch (error) {
            dispatch(getUsersLoadingFailure());
        }
    }
}