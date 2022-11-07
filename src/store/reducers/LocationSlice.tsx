import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface LocationState {
    path: string,
    data: string,
    text: string,
}

const initialState: LocationState = {
    path: '/',
    data: '',
    text: 'Главная',
}

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        changeLocation(state, action: PayloadAction<string>) {
            switch(action.payload) {
                case '/':
                    state.path = '/';
                    state.data = '';
                    state.text = 'Главная';
                    break;
                case '/animes':
                    state.path = '/animes';
                    state.data = 'アニメ';
                    state.text = 'Аниме';
                    break;
                case '/mangas':
                    state.path = '/mangas';
                    state.data = 'マンガ';
                    state.text = 'Манга';
                    break;
                case '/ranobe':
                    state.path = '/ranobe';
                    state.data = 'ラノベ';
                    state.text = 'Ранобэ';
                    break;
                default:
                    state.path = '/';
                    state.data = '';
                    state.text = 'Главная';
            }
        }
    }
})

export default locationSlice.reducer