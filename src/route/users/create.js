import { React, Fragment, Component } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';

class CreateUserComponent extends Component {

    constructor() {
        super()
        this.state = {
            open: false,
            scroll: 'paper',
            formFields: {
                names: {
                    data: '',
                    stateError: false
                }
            }
        }
    }



    handleToggle = () => {
        this.setState({ open: !this.state.open })
    }

    restat = () => {
        console.log(this.state.formFields.names.data.value)
    }

    create = () => {
        this.setState({
            formFields: {
                names: {
                    data: '',
                    stateError: false
                }
            }
        })
    }

    componentDidMount() {
        console.log(this.state)
    }

    render() {

        const { open, scroll } = this.state;

        return (
            <Fragment>
                <Button onClick={this.handleToggle} color="primary">Crear usuario</Button>
                <Dialog open={open} onClose={this.handleToggle} scroll={scroll} fullWidth="true">
                    <DialogTitle id="scroll-dialog-title">Creación de usuarios</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'} >
                        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                            <form noValidate autoComplete="off">

                                <TextField required inputRef={(c) => { this.state.formFields.names.data = c }} id="names" label="Nombres"
                                    name="names"
                                    onChange={
                                        (evt) => {
                                            console.log("you have typed: ", evt.target.value);
                                            console.log(this.state.formFields.names.data.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />

                                <TextField required inputRef={(c) => { this.state.formFields.surname.data = c }} id="surname" label="Primer Apellido"
                                    name="surname"
                                    onChange={
                                        (evt) => {
                                            console.log("you have typed: ", evt.target.value);
                                            console.log(this.state.formFields.surname.data.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />

                                <TextField required inputRef={(c) => { this.state.formFields.lastname.data = c }} id="lastname" label="Segundo Apellido"
                                    name="lastname"
                                    onChange={
                                        (evt) => {
                                            console.log("you have typed: ", evt.target.value);
                                            console.log(this.state.formFields.lastname.data.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />

                                <TextField required inputRef={(c) => { this.state.formFields.email.data = c }} id="email" label="Email"
                                    name="email"
                                    onChange={
                                        (evt) => {
                                            console.log("you have typed: ", evt.target.value);
                                            console.log(this.state.formFields.email.data.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />

                                <TextField required inputRef={(c) => { this.state.formFields.document.data = c }} id="email" label="Número documento"
                                    name="email"
                                    onChange={
                                        (evt) => {
                                            console.log("you have typed: ", evt.target.value);
                                            console.log(this.state.formFields.email.data.value)
                                        }
                                    }
                                    className="col-sm-12 col-md-12 col-lg-12" />


                            </form>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.restat} color="primary"> Cancel </Button>
                        <Button onClick={this.props.creation} color="primary">Subscribe</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>

        )
    }

}

export default CreateUserComponent