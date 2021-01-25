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
import IconButton from '@material-ui/core/IconButton';
import { Edit } from '@material-ui/icons';
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

class EditWarehouseComponent extends Component {

    constructor() {
        super()
        this.state = {
            open: false,
            scroll: 'paper',
            users: [],
            openTooltip: false,
            tooltopSeverity: 'success',
            tooltopMessage: 'Almacen editado satisfactoriamente',
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

        console.log("construc")

        //this.getAlert = this.getAlert.bind(this);
    }

    componentDidMount() {
        //this.props.setClick(this.getAlert);
        console.log("cdm")

    }

    getAlert() {
        this.handleToggle();
    }

     handleToggle = async () => {
        this.setState({ open: !this.state.open })
        console.log(this.props.data.nit)

        let o = await fetch('http://localhost:4200/user', {
            method: 'GET',
            mode: 'cors', // <---
            cache: 'default'
        }).then(response => {
            return response.json();
        })
       

        this.setState({
            users: o,
            formFields: {
                name: {
                    data: this.props.data.name,
                    stateError: false
                },
                address: {
                    data: this.props.data.address,
                    stateError: false
                },
                bankaccountnumber: {
                    data: this.props.data.bankaccountnumber,
                    stateError: false
                },
                phone: {
                    data: this.props.data.phone,
                    stateError: false
                },
                productid: {
                    data: this.props.data.productid,
                    stateError: false
                },
                maxvolume: {
                    data: this.props.data.maxvolume,
                    stateError: false
                },
                userid: {
                    data: this.props.data.userid,
                    stateError: false
                },
                nit: {
                    data: this.props.data.nit,
                    stateError: false
                },
            }
        })

        console.log(this.state)

    }

    restat = () => {
        console.log(this.state.formFields.names.data.value)
    }


    edit = async () => {

        let data = {
            id: this.props.data.id,
            name: this.state.formFields.name.data.value,
            address : this.state.formFields.address.data.value,
            bankaccountnumber: this.state.formFields.bankaccountnumber.data.value,
            phone: this.state.formFields.phone.data.value,
            productid: this.state.formFields.productid.data.value,
            userid: this.state.formFields.userid.data.value,
            maxvolume: this.state.formFields.maxvolume.data.value,
            nit: this.state.formFields.nit.data.value,
        }
        console.log(data)
        let o = await fetch('http://localhost:4200/warehouses/edit', {
            method: 'POST',
            cache: 'default',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {

                console.log(response)
                if (response.status == 200 || response.status == 202) {
                    this.setState({ openTooltip: true, tooltopMessage: 'Almacen editado satisfactoriamente.', tooltopSeverity: 'success' })
                    this.handleToggle();
                    this.props.edited();
                } else {

                    let error = response.json().then(e => {
                        let state = this.state;
                        state.openTooltip = true;
                        state.open = false;
                        state.tooltopMessage = e.message;
                        state.tooltopSeverity = 'error';
                        console.log(state)
                        this.setState(state)
                    });

                }
            })
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


    editField(key, value) {
        let state = this.state;

        let keys = Object.keys(state.formFields)

        for (let k of keys) {
            if (k != key) {
                state.formFields[k].data = state.formFields[k].data.value;
            } else {
                state.formFields[key].data = value;
            }
        }
        console.log(state)
        this.setState(state);
    }

    render() {

        const { open, scroll } = this.state;

        return (

            <Fragment>

                <IconButton variant="contained" color="primary" style={{ margin: 'auto' }} onClick={this.handleToggle}>
                    <Edit color="primary" />
                </IconButton>


                <Snackbar open={this.state.openTooltip} autoHideDuration={6000} onClose={() => this.setState({ openTooltip: false })}>
                    <Alert onClose={() => this.setState({ openTooltip: false })} severity={this.state.tooltopSeverity}>
                        {this.state.tooltopMessage}
                    </Alert>
                </Snackbar>

                <Dialog open={open} onClose={this.handleToggle} scroll={scroll} fullWidth={true}>
                    <DialogTitle id="scroll-dialog-title">Edición de usuario</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'} >
                        <form noValidate autoComplete="off">


                            <div style={{ margin: "16px 0px" }}>

                                <InputLabel id="it-label">Usuario dueño del almacen</InputLabel>
                                <Select
                                    required
                                    labelId="tp-label"
                                    id="u-select"
                                    onChange={
                                        (evt) => {
                                            this.editField('userid', evt.target.value)
                                        }
                                    }
                                    inputRef={(c) => { this.state.formFields.userid.data = c }}
                                    value={this.state.formFields.userid.data}
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
                                    value={this.state.formFields.nit.data}
                                    onChange={
                                        (evt) => {
                                            this.editField('nit', evt.target.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>


                            <div style={{ margin: "8px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.name.data = c }} id="name" label="Nombre del Almacen"
                                    name="name"
                                    value={this.state.formFields.name.data}
                                    onChange={
                                        (evt) => {
                                            this.editField('name', evt.target.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>
                            <div style={{ margin: "16px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.address.data = c }} id="address" label="Dirección"
                                    name="address"
                                    value={this.state.formFields.address.data}
                                    onChange={
                                        (evt) => {
                                            this.editField('address', evt.target.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>

                            <div style={{ margin: "16px 0px" }}>
                                <TextField type="number" required inputRef={(c) => { this.state.formFields.phone.data = c }} id="phone" label="Teléfono del establecimiento"
                                    name="phone"
                                    value={this.state.formFields.phone.data}
                                    onChange={
                                        (evt) => {
                                            this.editField('phone', evt.target.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>
                            <div style={{ margin: "16px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.bankaccountnumber.data = c }} id="bankaccountnumber" label="Número de cuenta bancaría"
                                    name="bankaccountnumber"
                                    type="number"
                                    value={this.state.formFields.bankaccountnumber.data}
                                    onChange={
                                        (evt) => {
                                            this.editField('bankaccountnumber', evt.target.value)
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
                                    value={this.state.formFields.productid.data}
                                    inputRef={(c) => { this.state.formFields.productid.data = c }}
                                    className="col-sm-12 col-md-12 col-lg-12"
                                    onChange={
                                        (evt) => {
                                            this.editField('productid', evt.target.value)
                                        }
                                    }
                                >
                                    <MenuItem value={1}>Café</MenuItem>
                                    <MenuItem value={2}>Cacao</MenuItem>
                                </Select>
                            </div>
                            <div style={{ margin: "16px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.maxvolume.data = c }} id="maxvolume" label="Cantidad máxima (Kg)"
                                    name="maxvolume"
                                    type="number"
                                    value={this.state.formFields.maxvolume.data}
                                    onChange={
                                        (evt) => {
                                            this.editField('maxvolume', evt.target.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>

                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleToggle} color="primary"> Cancelar </Button>
                        <Button onClick={this.edit} variant="contained" color="primary">Editar Almacen</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>

        )
    }

}

export default EditWarehouseComponent