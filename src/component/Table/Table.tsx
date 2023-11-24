"use client";
// Import necessary components from Material-UI
import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

interface Column {
    id: 'Name' | 'Age' | 'Emp_Id';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'Name', label: 'Name', minWidth: 190, },
    { id: 'Age', label: 'Age', minWidth: 190 },
    {
        id: 'Emp_Id',
        label: 'Emp Id',
        minWidth: 160,
    },
];

interface Data {
    Name: string;
    Age: string;
    Emp_Id: number;
}




export default function ColumnGroupingTable(props: any) {
    const { rows } = props
    const [data, setData] = useState(rows);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('Emp_Id');

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'asc' | 'desc' }>({
        key: null,
        direction: 'asc',
    });

    const handleSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';

        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        setSortConfig({ key, direction });

        const sortedData = [...data].sort((a, b) => {
            const valueA = a[key];
            const valueB = b[key];

            if (direction === 'asc') {
                if (valueA < valueB) return -1;
                if (valueA > valueB) return 1;
                return 0;
            } else {
                if (valueA > valueB) return -1;
                if (valueA < valueB) return 1;
                return 0;
            }
        });

        setData(sortedData);
    };


    useEffect(() => {
        setPage(0);
        setData(rows)
    }, [rows])

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 400 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={6}>
                                Employee Data
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ top: 57, minWidth: column.minWidth }}
                                >
                                    {column.label}

                                    <TableSortLabel
                                        active={orderBy === 'Name'}
                                        direction={orderBy === 'Name' ? order : 'asc'}
                                        onClick={() => handleSort("Name")}
                                    />

                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: any) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.Age}>
                                    {columns.map((column) => (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.format && typeof row[column.id] === 'number'
                                                ? column.format(row[column.id])
                                                : row[column.id]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
