import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { ChevronLeft, ChevronRight, PeopleAlt, Edit } from '@material-ui/icons';

import { DataGrid } from '@material-ui/data-grid';

import axios from 'axios';

import CreateUserComponent from './users/create';
import EditUserComponent from './users/edit';
import DeleteUserComponent from './users/delete'


import CreateWarehouseComponent from './warehouses/create';
import EditWarehouseComponent from './warehouses/edit';
import DeleteWarehouseComponent from './warehouses/delete';

const columns2 = [
    { id: 'name', label: 'Razón social', minWidth: 170 },
    { id: 'address', label: 'Dirección', minWidth: 100, align: 'center' },
    {
        id: 'phone',
        label: 'Telefono',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'userid',
        label: 'Propietario',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'action',
        label: 'Acciones',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
];



const columns = [
    { id: 'name', label: 'Nombres', minWidth: 170 },
    { id: 'surname', label: 'Primer Apellido', minWidth: 100, align: 'center' },
    {
        id: 'lastname',
        label: 'Segundo Apellido',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'action',
        label: 'Acciones',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
];



function EditD(d) {
    console.log(d)
}


class MainComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [
            ],
            warehouses: [
            ],
            editModalState: false,
            user: []
        };
    }

    getAll = async (i) => {

        let o = await fetch('http://localhost:4200/user', {
            method: 'GET',
            mode: 'cors', // <---
            cache: 'default'
        }).then(response => {
            return response.json();
        })

        console.log(o)

        this.setState({ users: o });

        console.log(this.state.users);

    }


    getAllWare = async (i) => {

        let o = await fetch('http://localhost:4200/warehouses', {
            method: 'GET',
            mode: 'cors', // <---
            cache: 'default'
        }).then(response => {
            return response.json();
        })

        console.log(o)

        this.setState({ warehouses: o });

        console.log(this.state.users);

    }

    componentDidMount() {
        this.getAll();
        this.getAllWare();
    }

    onCreate = () => {

    }


    editUser(u) {
        console.log(u)
        this.setState({ user: u });

    }

    render() {
        return (
            <Grid container className="mainContainer">

                <Box
                    boxShadow={2}
                    bgcolor="background.paper"
                    m={1}
                    p={1}
                    style={{ width: '100%', display: 'initial', padding: '30px' }}>


                    <p>Listado de usuarios creados en la plataforma</p>

                    <div style={{ width: '100%' }}>

                        <CreateUserComponent creation={this.getAll}></CreateUserComponent>         

                        <TableContainer >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.users.map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.identificationnumer}>

                                                <TableCell key={row.surname} align={'left'}>
                                                    {row.name}
                                                </TableCell>

                                                <TableCell key={row.lastname} align={'center'}>
                                                    {row.surname}
                                                </TableCell>

                                                <TableCell key={row.email} align={'center'}>
                                                    {row.lastname}
                                                </TableCell>

                                                <TableCell key={row.phone} align={'center'}>
                                                    {row.email}
                                                </TableCell>

                                                <TableCell key={row.accountnumber + row.email} align={'center'}>

                                                    <div style={{ display: 'flex' }}>
                                                        <EditUserComponent edited={this.getAll} data={row} key={row.id}></EditUserComponent>
                                                        <DeleteUserComponent edited={this.getAll} data={row} key={row.id + 'del'}></DeleteUserComponent>
                                                    </div>

                                                </TableCell>

                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>



                    <p style={{marginTop : '150px'}}>Listado de almacenes creados en la plataforma</p>

                    <div style={{ width: '100%' }}>

                        <CreateWarehouseComponent creation={this.getAllWare}></CreateWarehouseComponent>

                        <TableContainer >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns2.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.warehouses.map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.identificationnumer}>

                                                <TableCell key={row.name} align={'left'}>
                                                    {row.name}
                                                </TableCell>

                                                <TableCell key={row.address} align={'center'}>
                                                    {row.address}
                                                </TableCell>

                                                <TableCell key={row.phone} align={'center'}>
                                                    {row.phone}
                                                </TableCell>

                                                <TableCell key={row.ownernames} align={'center'}>
                                                    {row.ownernames} {row.surname} {row.lastname} 
                                                </TableCell>

                                                <TableCell key={row.accountnumber + row.email} align={'center'}>

                                                    <div style={{ display: 'flex' }}>
                                                        <EditWarehouseComponent edited={this.getAllWare} data={row} key={row.id}></EditWarehouseComponent>
                                                        <DeleteWarehouseComponent edited={this.getAllWare} data={row} key={row.id + 'del'}></DeleteWarehouseComponent>
                                                    </div>

                                                </TableCell>

                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>

                </Box>

            </Grid>

        )
    }

}
export default MainComponent