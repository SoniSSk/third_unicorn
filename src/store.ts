import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from './slice/employeeSlice';
import loginSlice from './slice/loginSlice';

export const store = configureStore({
    reducer: {
        employeeSlice,
        loginSlice
    },
});
