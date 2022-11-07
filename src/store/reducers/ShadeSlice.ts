import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ShadeState {
    isActive: boolean,
    type: 'drop' | 'search',
}

const initialState: ShadeState = {
    isActive: false,
    type: 'drop',
}

export const shadeSlice = createSlice({
    name: 'shade',
    initialState,
    reducers: {
        hideShade(state) {
            state.isActive = false
        },
        showShade(state, action: PayloadAction<'drop' | 'search'>) {
            state.isActive = true
            state.type = action.payload
        },
        toggleShade(state) {
            state.isActive = !state.isActive
        }
    }
})

export default shadeSlice.reducer;