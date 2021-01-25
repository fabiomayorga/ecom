import { React, Fragment, Component } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';

import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import { Home } from '@material-ui/icons';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

class CreateWarehouseComponent extends Component {


    constructor() {
        super()
        this.state = {
            open: false,
            scroll: 'paper',

            openTooltip: false,
            tooltopSeverity: 'success',
            tooltopMessage: 'Almacen Creado satisfactoriamente',
            users: [],
            formFields: {
                name: {
                    data: '',
                    stateError: false
                },
                address: {
                    data: '',
                    stateError: false
                },
                bankaccountnumber: {
                    data: '',
                    stateError: false
                },
                phone: {
                    data: '',
                    stateError: false
                },
                productid: {
                    data: 1,
                    stateError: false
                },
                maxvolume: {
                    data: '',
                    stateError: false
                },
                userid: {
                    data: 1,
                    stateError: false
                },
                nit: {
                    data: 1,
                    stateError: false
                },
            }
        }
    }


    handleToggle = () => {
        this.setState({ open: !this.state.open })
        this.getUsers();
    }

    restat = () => {
        console.log(this.state.formFields.names.data.value)
    }

    getUsers = async () => {

        let o = await fetch('http://localhost:4200/user', {
            method: 'GET',
            mode: 'cors', // <---
            cache: 'default'
        }).then(response => {
            return response.json();
        })

        let state = this.state;
        state.users = o
        this.setState(state)

    }

    create = async () => {

        let data = {
            name: this.state.formFields.name.data.value,
            address : this.state.formFields.address.data.value,
            bankaccountnumber: this.state.formFields.bankaccountnumber.data.value,
            phone: this.state.formFields.phone.data.value,
            productid: this.state.formFields.productid.data.value,
            userid: this.state.formFields.userid.data.value,
            maxvolume: this.state.formFields.maxvolume.data.value,
            nit: this.state.formFields.nit.data.value,
        }

        let o = await fetch('http://localhost:4200/warehouses', {
            method: 'POST',
            mode: 'cors',
            cache: 'default',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {

                console.log(response)
                if (response.status == 200 || response.status == 201) {
                    this.setState({ openTooltip: true, tooltopMessage: 'Almacen creado satisfactoriamente.', tooltopSeverity: 'success' })
                    this.handleToggle();
                    this.props.creation();
                } else {

                    let error = response.json().then(e => {
                        this.setState({ openTooltip: true, tooltopMessage: e.message, tooltopSeverity: 'error' })
                    });

                }
            })

    }

    render() {

        const { open, scroll } = this.state;

        return (

            <Fragment>

                <Snackbar open={this.state.openTooltip} autoHideDuration={6000} onClose={() => this.setState({ openTooltip: false })}>
                    <Alert onClose={() => this.setState({ openTooltip: false })} severity={this.state.tooltopSeverity}>
                        {this.state.tooltopMessage}
                    </Alert>
                </Snackbar>

                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ float: 'right', margin: '30px 0px', backgroundColor: '#4CAF50 !important' }}
                        onClick={this.handleToggle}
                        className="successButton"
                        startIcon={<Home />}
                    > Crear Almacen </Button>
                </div>

                <Dialog open={open} onClose={this.handleToggle} scroll={scroll} fullWidth={true}>
                    <DialogTitle id="scroll-dialog-title">Creación de Almacen</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'} >

                        <form noValidate autoComplete="off">


                            <div style={{ margin: "16px 0px" }}>

                                <InputLabel id="it-label">Usuario dueño del almacen</InputLabel>
                                <Select
                                    required
                                    labelId="tp-label"
                                    id="u-select"
                                    inputRef={(c) => { this.state.formFields.userid.data = c }}
                                    className="col-sm-12 col-md-12 col-lg-12">

                                    {this.state.users.map((row) => {
                                        return (
                                            <MenuItem value={row.id}>{row.name} {row.surname} {row.lastname} ({row.identificationnumber}) </MenuItem>
                                        )
                                    })
                                    }

                                </Select>
                            </div>


                            <div style={{ margin: "16px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.nit.data = c }} id="nit" label="NIT"
                                    name="nit"
                                    type="number"
                                    onChange={
                                        (evt) => {
                                            console.log("you have typed: ", evt.target.value);
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>


                            <div style={{ margin: "8px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.name.data = c }} id="name" label="Nombre del Almacen"
                                    name="name"
                                    onChange={
                                        (evt) => {
                                            console.log("you have typed: ", evt.target.value);
                                            console.log(this.state.formFields.name.data.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>
                            <div style={{ margin: "16px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.address.data = c }} id="address" label="Dirección"
                                    name="address"
                                    onChange={
                                        (evt) => {
                                            console.log("you have typed: ", evt.target.value);
                                            console.log(this.state.formFields.address.data.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>

                            <div style={{ margin: "16px 0px" }}>
                                <TextField type="number" required inputRef={(c) => { this.state.formFields.phone.data = c }} id="phone" label="Teléfono del establecimiento"
                                    name="phone"
                                    onChange={
                                        (evt) => {
                                            console.log("you have typed: ", evt.target.value);
                                            console.log(this.state.formFields.phone.data.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>
                            <div style={{ margin: "16px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.bankaccountnumber.data = c }} id="bankaccountnumber" label="Número de cuenta bancaría"
                                    name="bankaccountnumber"
                                    type="number"
                                    onChange={
                                        (evt) => {
                             
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>
                            <div style={{ margin: "16px 0px" }}>

                                <InputLabel id="it-label">Tipo de producto</InputLabel>
                                <Select
                                    required
                                    labelId="tp-label"
                                    id="tp-select"
                                    inputRef={(c) => { this.state.formFields.productid.data = c }}
                                    className="col-sm-12 col-md-12 col-lg-12"
                                >
                                    <MenuItem value={1}>Café</MenuItem>
                                    <MenuItem value={2}>Cacao</MenuItem>
                                </Select>
                            </div>
                            <div style={{ margin: "16px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.maxvolume.data = c }} id="maxvolume" label="Cantidad máxima (Kg)"
                                    name="maxvolume"
                                    type="number"
                                    onChange={
                                        (evt) => {
                                            console.log("you have typed: ", evt.target.value);
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>

                        </form>
                    </DialogContent>

                    <DialogActions>

                        <Button onClick={this.handleToggle} color="primary"> Cancelar </Button>
                        <Button onClick={this.create} variant="contained" color="primary">Crear Almacen</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>

        )
    }

}

export default CreateWarehouseComponent