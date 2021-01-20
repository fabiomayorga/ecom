import { React, Fragment, Component } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class CreateUserComponent extends Component {

    state = {
        open: false,
        scroll: 'paper'
    }

    handleToggle = () => {
        this.setState({ open: !this.state.open })
    }

    render() {

        const { open, scroll } = this.state;

        return (
            <Fragment>

                <Button onClick={this.handleToggle} color="primary">
                    Crear usuario
          </Button>

                <Dialog
                    open={open}
                    onClose={this.handleToggle}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText
                            id="scroll-dialog-description"

                            tabIndex={-1}
                        >
                            {[...new Array(50)]
                                .map(
                                    () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                                )
                                .join('\n')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleToggle} color="primary">
                            Cancel
          </Button>
                        <Button onClick={this.handleToggle} color="primary">
                            Subscribe
          </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>

        )
    }

}

export default CreateUserComponent