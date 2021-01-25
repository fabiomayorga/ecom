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

class EditUserComponent extends Component {

    constructor() {
        super()
        this.state = {
            open: false,
            scroll: 'paper',

            openTooltip: false,
            tooltopSeverity: 'success',
            tooltopMessage: 'Usuario editado satisfactoriamente',

            formFields: {
                names: {
                    data: 'Fabio',
                    stateError: false
                },
                lastname: {
                    data: 'Duarte',
                    stateError: false
                },
                surname: {
                    data: 'Mayorga',
                    stateError: false
                },
                phone: {
                    data: '123456481',
                    stateError: false
                },
                email: {
                    data: 'fabio@ecom.co',
                    stateError: false
                },
                identificationnumber: {
                    data: '1235487',
                    stateError: false
                },
                identificationtype: {
                    data: 1,
                    stateError: false
                },
                bankaccounttype: {
                    data: 1,
                    stateError: false
                },
                accountnumber: {
                    data: '123123123',
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

    handleToggle = () => {
        this.setState({ open: !this.state.open })
        console.log(this.props.data)

        this.setState({
            formFields: {
                names: {
                    data: this.props.data.name,
                    stateError: false
                },
                lastname: {
                    data: this.props.data.lastname,
                    stateError: false
                },
                surname: {
                    data: this.props.data.surname,
                    stateError: false
                },
                phone: {
                    data: this.props.data.phone,
                    stateError: false
                },
                email: {
                    data: this.props.data.email,
                    stateError: false
                },
                identificationnumber: {
                    data: this.props.data.identificationnumber,
                    stateError: false
                },
                identificationtype: {
                    data: this.props.data.identificationtype,
                    stateError: false
                },
                bankaccounttype: {
                    data: this.props.data.bankaccounttype,
                    stateError: false
                },
                accountnumber: {
                    data: this.props.data.accountnumber,
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
            names: this.state.formFields.names.data.value,
            surname: this.state.formFields.surname.data.value,
            lastname: this.state.formFields.lastname.data.value,
            email: this.state.formFields.email.data.value,
            identificationnumber: this.state.formFields.identificationnumber.data.value,
            identificationtype: this.state.formFields.identificationtype.data.value,
            accountnumber: this.state.formFields.accountnumber.data.value,
            bankaccounttype: this.state.formFields.bankaccounttype.data.value,
            phone: this.state.formFields.phone.data.value,
        }
        console.log(data)
        let o = await fetch('http://localhost:4200/user/edit', {
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
                    this.setState({ openTooltip: true, tooltopMessage: 'Usuario editado satisfactoriamente.', tooltopSeverity: 'success' })
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

    editField(key, value) {
        console.log(value)
        let state = this.state
        state.formFields[key].data = 'asdasd';

        console.log(state)
        console.log(state.formFields.accountnumber.data.value)

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

                <IconButton variant="contained" color="primary"  style={{margin: 'auto'}} onClick={this.handleToggle}>
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

                            <div style={{ margin: "8px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.names.data = c }} id="names" label="Nombres"
                                    name="names"
                                    value={this.state.formFields.names.data}
                                    onChange={
                                        (evt) => {
                                            this.editField('names', evt.target.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>
                            <div style={{ margin: "16px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.surname.data = c }} id="surname" label="Primer Apellido"
                                    name="surname"
                                    value={this.state.formFields.surname.data}
                                    onChange={
                                        (evt) => {
                                            this.editField('surname', evt.target.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>

                            <div style={{ margin: "16px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.lastname.data = c }} id="lastname" label="Segundo Apellido"
                                    name="lastname"
                                    value={this.state.formFields.lastname.data}
                                    onChange={
                                        (evt) => {
                                            this.editField('lastname', evt.target.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>
                            <div style={{ margin: "16px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.email.data = c }} id="email" label="Email"
                                    name="email"
                                    value={this.state.formFields.email.data}
                                    onChange={
                                        (evt) => {
                                            this.editField('email', evt.target.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>

                            <div style={{ margin: "16px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.phone.data = c }} id="phone" label="Teléfono"
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

                                <InputLabel id="it-label">Tipo de documento</InputLabel>
                                <Select
                                    required
                                    labelId="it-label"
                                    id="it-select"
                                    value={this.state.formFields.identificationtype.data}
                                    inputRef={(c) => { this.state.formFields.identificationtype.data = c }}
                                    className="col-sm-12 col-md-12 col-lg-12"
                                    onChange={
                                        (evt) => {
                                            this.editField('identificationtype', evt.target.value)
                                        }
                                    }
                                >
                                    <MenuItem value={1}>Cédula de ciudadanía</MenuItem>
                                    <MenuItem value={2}>Cédula de extrangería</MenuItem>
                                    <MenuItem value={3}>Pasaporte</MenuItem>
                                </Select>
                            </div>
                            <div style={{ margin: "16px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.identificationnumber.data = c }} id="identificationnumber" label="Número documento"
                                    name="identificationnumber"
                                    value={this.state.formFields.identificationnumber.data}
                                    type="number"
                                    onChange={
                                        (evt) => {
                                            this.editField('identificationnumber', evt.target.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>

                            <div style={{ margin: "16px 0px" }}>
                                <InputLabel id="ac-label">Tipo de cuenta</InputLabel>
                                <Select
                                    required
                                    labelId="ac-label"
                                    id="ac-select"
                                    value={this.state.formFields.bankaccounttype.data}
                                    inputRef={(c) => { this.state.formFields.bankaccounttype.data = c }}
                                    className="col-sm-12 col-md-12 col-lg-12"
                                    onChange={
                                        (evt) => {
                                            this.editField('bankaccounttype', evt.target.value)
                                        }
                                    }
                                >
                                    <MenuItem value={1}>Ahorros</MenuItem>
                                    <MenuItem value={2}>Corriente</MenuItem>
                                </Select>
                            </div>
                            <div style={{ margin: "16px 0px" }}>
                                <TextField required number inputRef={(c) => { this.state.formFields.accountnumber.data = c }} id="accountnumber" label="Número de cuenta bancaría"
                                    name="accountnumber"
                                    type="number"
                                    value={this.state.formFields.accountnumber.data}
                                    onChange={
                                        (evt) => {
                                            this.editField('accountnumber', evt.target.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>

                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleToggle} color="primary"> Cancelar </Button>
                        <Button onClick={this.edit} variant="contained" color="primary">Editar Usuario</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>

        )
    }

}

export default EditUserComponent