import { configureStore } from "@reduxjs/toolkit";
import contactReducer from '../redux/contactSlice'
export type RootStoreType = ReturnType<typeof store.getState>;


const store = configureStore({
    reducer: {
        contactReducerState: contactReducer
    }
})

export default store;


