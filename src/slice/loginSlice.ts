import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import data from "../data.json"

interface credential {
    userName: string,
    userPassword: string
}

const loginSlice = createSlice({
    name: 'credential',
    initialState: data.credential,
    reducers: {

    },
});

export const { } = loginSlice.actions;
export default loginSlice.reducer;
