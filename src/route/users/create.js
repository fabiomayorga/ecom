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

function Tooltip() {

    const [state, setState] = React.useState({
        open: true,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    const handleClick = (newState) => () => {
        setState({ open: true, ...newState });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    return (
        <div>

            {/*           <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open
                onClose={handleClose}
                message="I love snacks"
                key={vertical + horizontal}
            /> */}



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
                    data: 12222,
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
            .then(text => {
                this.setState({openTooltip: true})
            });



        //this.props.creation

    }

    componentDidMount() {
        console.log(this.state)
    }

    render() {

        const { open, scroll } = this.state;

        return (

            <Fragment>

                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.openTooltip}
                    message="I love snacks"
                    autoHideDuration={6000}
                    onClose={() => this.setState({openTooltip: false})}
                />

                <Button onClick={this.handleToggle} color="primary">Crear usuario</Button>
                <Dialog open={open} onClose={this.handleToggle} scroll={scroll} fullWidth={true}>
                    <DialogTitle id="scroll-dialog-title">Creación de usuarios</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'} >

                        <form noValidate autoComplete="off">

                            <div style={{ margin: "8px 0px" }}>
                                <TextField required inputRef={(c) => { this.state.formFields.names.data = c }} id="names" label="Nombres"
                                    name="names"
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
                                    onChange={
                                        (evt) => {
                                            console.log("you have typed: ", evt.target.value);
                                            console.log(this.state.formFields.email.data.value)
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
                                <TextField required inputRef={(c) => { this.state.formFields.identificationnumber.data = c }} id="email" label="Número documento"
                                    name="email"
                                    onChange={
                                        (evt) => {
                                            console.log("you have typed: ", evt.target.value);
                                            console.log(this.state.formFields.identificationnumber.data.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />
                            </div>

                            <div style={{ margin: "16px 0px" }}>
                                <InputLabel id="ac-label">Tipo de documento</InputLabel>
                                <Select
                                    required
                                    labelId="ac-label"
                                    id="ac-select"
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
                                    onChange={
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