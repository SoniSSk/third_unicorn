"use client";

import React, { useState } from 'react';
import { Button, CardContent, TextField } from '@mui/material';
import ColumnGroupingTable from '../Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee } from '@/slice/employeeSlice';
import CardWrapper from './CardWrapper';
import styles from './Home.module.css';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const employees = useSelector((state: any) => state.employeeSlice);

    const [searchTerm, setSearchTerm] = useState('');
    const [rows, setRows] = useState(employees);

    let largestEmpId = employees.reduce((maxEmpId: any, obj: any) => obj.Emp_Id > maxEmpId ? obj.Emp_Id : maxEmpId, 0);

    const [newObject, setNewObject] = useState({
        Name: '',
        Age: 0,
        Emp_Id: largestEmpId + 1,
    });


    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        if (term === '') {
            setRows(employees);
        } else {
            const filteredRows = rows.filter((row: any) =>
                row.Name.toLowerCase().includes(term) ||
                row.Age.toString().includes(term) ||
                row.Emp_Id.toString().includes(term)
            );
            setRows(filteredRows);
        }
    };

    const handleAddObject = () => {
        const isNewObjectValid = newObject.Name !== '' && newObject.Age > 0;

        if (isNewObjectValid) {
            dispatch(addEmployee(newObject));
            setRows([...rows, newObject]);
            setNewObject({
                Name: '',
                Age: 0,
                Emp_Id: largestEmpId + 2,
            });
        }
        else {
            alert("Please Fill all the details")
        }
    };

    const handleInputChange = (field: string, value: string | number) => {
        setNewObject({ ...newObject, [field]: value });
    };

    return (
        <div>
            <CardWrapper
                handleInputChange={handleInputChange}
                handleAddObject={handleAddObject}
                newObject={newObject}
            />
            <div className={styles.container}>
                <TextField
                    label="Search"
                    value={searchTerm}
                    onChange={(e: any) => handleSearch(e)}
                />
                <ColumnGroupingTable rows={rows} />
                <Button variant="contained" onClick={() => router.push("/")}>Logout</Button>
            </div>
        </div >
    );
};

export default Dashboard;
