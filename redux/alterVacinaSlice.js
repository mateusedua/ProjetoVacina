import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
    id_doc:null
}

export const alterVacinaSlice = createSlice({
    name:'alterVacina',
    initialState:initialValues,
    reducers:{
        reducerSetAlterVacina:(state,action)=>{
            state.id_doc = action.payload.id_doc
        }
    }
})

export const {reducerSetAlterVacina} = alterVacinaSlice.actions

export default alterVacinaSlice.reducer