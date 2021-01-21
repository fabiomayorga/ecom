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

function CustomizedSnackbars() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(true);
    };

    return (
        <div className={classes.root}>
            <Button variant="outlined" onClick={handleClick}>
                Open success snackbar
        </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    This is a success message!
          </Alert>
            </Snackbar>
            <Alert severity="error">This is an error message!</Alert>
            <Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert>
        </div>
    );
}

class CreateUserComponent extends Component {


    constructor() {
        super()
        this.state = {
            open: false,
            scroll: 'paper',

            openTooltip: false,
            tooltopSeverity: 'success',
            tooltopMessage: 'Usuario Creado satisfactoriamente',

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
    }



    handleToggle = () => {
        this.setState({ open: !this.state.open })
    }

    restat = () => {
        console.log(this.state.formFields.names.data.value)
    }

    create = async () => {
        /*  this.setState({
             formFields: {
                 names: {
                     data: '',
                     stateError: false
                 },
                 lastname: {
                     data: '',
                     stateError: false
                 },
                 surname: {
                     data: '',
                     stateError: false
                 },
                 phone: {
                     data: '',
                     stateError: false
                 },
                 email: {
                     data: '',
                     stateError: false
                 },
                 identificationnumber: {
                     data: '',
                     stateError: false
                 },
                 identificationtype: {
                     data: 1,
                     stateError: false
                 },
                 bankaccounttype: {
                     data: '',
                     stateError: false
                 },
                 accountnumber: {
                     data: '',
                     stateError: false
                 },
             }
         }) */

         
        let data = {
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
        let o = await fetch('http://localhost:4200/user', {
            method: 'POST',
            mode: 'cors', // <---
            cache: 'default',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                return response.json();
            })
            .then(error => {
                this.setState({ openTooltip: true, tooltopMessage: error.message, tooltopSeverity: 'error' })
            });



        //this.props.creation

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

                <Button onClick={this.handleToggle} color="primary">Crear usuario</Button>
                <Dialog open={open} onClose={this.handleToggle} scroll={scroll} fullWidth={true}>
                    <DialogTitle id="scroll-dialog-title">Creación de usuarios</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'} >

                        <form noValidate autoComplete="off">

                            <div style={{ margin: "8px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.names.data = c }} id="names" label="Nombres"
                                    name="names"
                                    value={"Fabio"}
                                    onChange={
                                        (evt) => {
                                            console.log("you have typed: ", evt.target.value);
                                            console.log(this.state.formFields.names.data.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>
                            <div style={{ margin: "16px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.surname.data = c }} id="surname" label="Primer Apellido"
                                    name="surname"
                                    value={"Mayorga"}
                                    onChange={
                                        (evt) => {
                                            console.log("you have typed: ", evt.target.value);
                                            console.log(this.state.formFields.surname.data.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>

                            <div style={{ margin: "16px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.lastname.data = c }} id="lastname" label="Segundo Apellido"
                                    name="lastname"
                                    value={"Duarte"}
                                    onChange={
                                        (evt) => {
                                            console.log("you have typed: ", evt.target.value);
                                            console.log(this.state.formFields.lastname.data.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>
                            <div style={{ margin: "16px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.email.data = c }} id="email" label="Email"
                                    name="email"
                                    value={"fabio@ecom.co"}
                                    onChange={
                                        (evt) => {
                                            console.log("you have typed: ", evt.target.value);
                                            console.log(this.state.formFields.email.data.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>

                            <div style={{ margin: "16px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.phone.data = c }} id="phone" label="Teléfono"
                                    name="phone"
                                    value={"123123123"}
                                    onChange={
                                        (evt) => {
                                            console.log("you have typed: ", evt.target.value);
                                            console.log(this.state.formFields.phone.data.value)
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
                                    value="1"
                                    inputRef={(c) => { this.state.formFields.identificationtype.data = c }}
                                    className="col-sm-12 col-md-12 col-lg-12"
                                >
                                    <MenuItem value={1}>Cédula de ciudadanía</MenuItem>
                                    <MenuItem value={2}>Cédula de extrangería</MenuItem>
                                    <MenuItem value={3}>Pasaporte</MenuItem>
                                </Select>
                            </div>
                            <div style={{ margin: "16px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.identificationnumber.data = c }} id="identificationnumber" label="Número documento"
                                    name="identificationnumber"
                                    value={"3123123123"}
                                    onChange={
                                        (evt) => {
                                            console.log("you have typed: ", evt.target.value);
                                            console.log(this.state.formFields.identificationnumber.data.value)
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
                                    value={"1"}
                                    inputRef={(c) => { this.state.formFields.bankaccounttype.data = c }}
                                    className="col-sm-12 col-md-12 col-lg-12"
                                >
                                    <MenuItem value={1}>Ahorros</MenuItem>
                                    <MenuItem value={2}>Corriente</MenuItem>
                                </Select>
                            </div>
                            <div style={{ margin: "16px 0px" }}>
                                <TextField required number inputRef={(c) => { this.state.formFields.accountnumber.data = c }} id="accountnumber" label="Número de cuenta bancaría"
                                    name="accountnumber"
                                    value={"0000000"}                                    onChange={
                                        (evt) => {
                                            console.log("you have typed: ", evt.target.value);
                                            console.log(this.state.formFields.accountnumber.data.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>

                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.restat} color="primary"> Cancel </Button>
                        <Button onClick={this.create} color="primary">Subscribe</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>

        )
    }

}

export default CreateUserComponent