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


const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'surname', label: 'ISO\u00a0Code', minWidth: 100, align: 'center' },
    {
        id: 'lastname',
        label: 'Population',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'email',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'phone',
        label: 'Density',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
];


class MainComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [

            ]
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

    componentDidMount() {
        this.getAll();

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

                        <CreateUserComponent></CreateUserComponent>

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
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>

                                                <TableCell key={row.surname} align={'left'}>
                                                    {row.name}
                                                </TableCell>

                                                <TableCell key={row.lastname} align={'center'}>
                                                    {row.name}
                                                </TableCell>

                                                <TableCell key={row.email} align={'center'}>
                                                    {row.name}
                                                </TableCell>

                                                <TableCell key={row.phone} align={'center'}>
                                                    {row.name}
                                                </TableCell>

                                                <TableCell key={row.density} align={'center'}>
                                                    <IconButton onClick={() => this.edit(row.name)}>
                                                        <Edit color="primary" />
                                                    </IconButton>
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