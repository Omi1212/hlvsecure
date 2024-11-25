import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageReports = () => {
    const [reports, setReports] = useState([]);
    const [sortedItems, setSortedItems] = useState([]);

    const fetchReports = async () => {
        try {
            const response = await axios.get('https://api.securityhlvs.com/api/report');
            setReports(response.data);
            setSortedItems(response.data);
        } catch (error) {
            console.error("Error al obtener los reportes:", error);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const renderCell = (item, columnKey) => {
        switch (columnKey) {
            case 'userEmail':
                return item.userEmail;
            case 'description':
                return item.description;
            case 'type':
                return item.type;
            default:
                return null;
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Gestión de Reportes
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email del Usuario</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Tipo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedItems.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    No se encontraron reportes
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedItems.map((report) => (
                                <TableRow key={report.id}>
                                    {(columnKey) => (
                                        <TableCell>{renderCell(report, columnKey)}</TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="mt-8 py-4 flex justify-center lg:justify-end">
                <Button color="secondary" variant="contained">
                    Aprobar
                </Button>
            </div>
            <ToastContainer stacked />
        </Container>
    );
};

export default ManageReports;