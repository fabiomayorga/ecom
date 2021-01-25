import { React, Fragment, Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';

import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import { Delete } from '@material-ui/icons';

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

class DeleteUserComponent extends Component {


    constructor() {
        super()
        this.state = {
            open: false,
            scroll: 'paper',

            openTooltip: false,
            tooltopSeverity: 'success',
            tooltopMessage: 'Usuario Creado satisfactoriamente',

        }
    }

    handleToggle = () => {
        this.setState({ open: !this.state.open })
    }

    delete = async () => {

        let o = await fetch('http://localhost:4200/user/'+this.props.data.id, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'default',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {

               console.log(response)
                if (response.status == 200 || response.status == 202) {
                    this.setState({ openTooltip: true, tooltopMessage: 'Usuario eliminado satisfactoriamente.', tooltopSeverity: 'success' })
                    this.handleToggle();
                    this.props.edited();
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

            
                    <IconButton variant="contained" color="primary" style={{margin: 'auto'}} onClick={this.handleToggle}>
                        <Delete color="primary" />
                    </IconButton>
            

                <Dialog
                    open={open}
                    onClose={this.handleToggle}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"¿Seguro que deseas borrar este registro?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">Eliminar el registro asociado a <b>{this.props.data.identificationnumber}</b>  lo borrará permanenetemente Y <b style={{ color : 'tomato'}}>TODOS LOS ALMACENES QUE ESTEN ASOCIADOS A EL.</b></DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleToggle} color="primary">Cancelar</Button>
                        <Button onClick={this.delete} color="primary" autoFocus>ELIMINAR REGISTRO</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>

        )
    }

}

export default DeleteUserComponent