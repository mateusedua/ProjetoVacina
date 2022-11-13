import { configureStore } from "@reduxjs/toolkit";
import alterVacinaSlice from "./alterVacinaSlice";
import authenticationSlice from "./authenticationSlice";



export const store = configureStore({
    reducer:{
        authentication:authenticationSlice,
        alterVacina:alterVacinaSlice
    }
})