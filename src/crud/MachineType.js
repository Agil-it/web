import React, { Component } from 'react';
import {
  Button,
  DialogContainer,
  Divider,
  TextField,
  Toolbar,
} from 'react-md';

class CreateMachineType extends Component {

    constructor(props){
        super(props);

        this.state = { visible: this.props.visible };
    }



    show = (e) => {
        this.setState({ visible: true});
    };

    hide = () => {
        this.setState({ visible: false });
    };

    render() {
        const { visible } = this.state;

        return (
            <div>
            <Button raised onClick={this.show} aria-controls="simple-full-page-dialog">
                Open the Dialog
            </Button>
            <DialogContainer
                id="simple-full-page-dialog"
                visible={visible}
                fullPage
                onHide={this.hide}
                aria-labelledby="simple-full-page-dialog-title"
            >
                <Toolbar
                fixed
                colored
                title="Cadastrar Tipo de Máquina"
                titleId="simple-full-page-dialog-title"
                nav={<Button icon onClick={this.hide}>close</Button>}
                actions={<Button flat onClick={this.hide}>SALVAR</Button>}
                />
                <section className="md-toolbar-relative">
                <TextField id="event-email" placeholder="Email" block paddedBlock />
                <Divider />
                <TextField id="event-name" placeholder="Event name" block paddedBlock />
                <Divider />
                <TextField id="event-desc" placeholder="Description" block paddedBlock rows={4} />
                </section>
            </DialogContainer>
            </div>
        );
    }
}

export default CreateMachineType;