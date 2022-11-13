import { createSlice } from "@reduxjs/toolkit";

const initialValues ={
    uid:null
}

export const authenticationSlice = createSlice({
    name:'authentication',
    initialState:initialValues,
    reducers:{
        reducerSetauthentication:(state,action)=>{
            state.uid = action.payload.uid
        }
    }
})


export const {reducerSetauthentication} = authenticationSlice.actions

export default authenticationSlice.reducer