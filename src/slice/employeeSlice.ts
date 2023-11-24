import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import data from "../data.json"

interface Employee {
    Name: string;
    Age: number;
    Emp_Id: number;
}

const employeeSlice = createSlice({
    name: 'employees',
    initialState: data.employeeData,
    reducers: {
        addEmployee: (state, action: PayloadAction<Employee>) => {
            state.push(action.payload);
        },
    },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
