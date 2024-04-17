import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUserData: null,
    error: null,
    sucess: null,
    loading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        authStart: (state) => {
            state.loading = true
        },
        singInSucess: (state, action) => {
            state.loading = false
            state.currentUserData = action.payload
            state.error = null
            state.sucess = null
        },
        authFail: (state, action)=>{
            state.loading = false
            state.error = action.payload
            state.sucess = null
        },
        singUpSucess: (state, action) => {
            state.loading = false
            state.error = null
            state.sucess = action.payload
         },
         changePage: (state) => {
            state.error = false
            state.sucess = false
            state.loading = false   
         }
    }
});

export const { authStart, singInSucess, authFail, singUpSucess, changePage } = userSlice.actions;

export default userSlice.reducer;