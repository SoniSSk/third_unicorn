import { Button, CardContent, TextField } from '@mui/material';
import React from 'react';
import styles from "./CardWrapper.module.css";

interface CardWrapperProps {
    handleInputChange: (key: string, value: string | number) => void;
    handleAddObject: () => void;
    newObject: any;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ handleInputChange, handleAddObject, newObject }) => {
    return (
        <div>
            <CardContent className={styles.container}>
                {Object.keys(newObject).map((key) => (
                    <TextField
                        key={key}
                        label={key}
                        value={newObject[key]}
                        type={key === 'Age' ? 'number' : 'text'}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        disabled={key === 'Emp_Id'}
                    />
                ))}
                < Button variant="contained" onClick={handleAddObject}>
                    Add New Employee
                </Button>
            </CardContent>
        </div >
    );
};

export default CardWrapper;
