import {configureStore} from "@reduxjs/toolkit";
import shadeReducer from './reducers/ShadeSlice';
import locationReducer from './reducers/LocationSlice';

export const store = configureStore({
    reducer: {
        shadeReducer,
        locationReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch