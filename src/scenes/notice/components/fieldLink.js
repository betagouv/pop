import React from 'react';
import { Field } from 'redux-form'
import { Input, Modal, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import './fieldLink.css';

export default class NoticeField extends React.Component {

    state = {
        modal: false
    }
    addNotice() {
        this.setState({ modal: true })
    }
    render() {
        console.log('this.props.name', this.props.name)
        return (
            <div className='fieldLink' style={styles.container}>
                <NoticeModal isOpen={this.state.modal} toggle={() => { this.setState({ modal: !this.state.modal }) }} />
                {this.props.title && <div style={styles.title} >{this.props.title}</div>}
                <Field addNotice={this.addNotice.bind(this)} component={Notices} name={this.props.name} />
            </div >
        );
    }
}
const Notices = ({ input, addNotice }) => {
    if (Array.isArray(input.value)) {
        const notices = input.value.map((url, i) => {
            return (
                <Link key={i} to={url} >
                    <img className='notice-link' src={require('../../../assets/notice.png')} />
                </Link >
            );
        })
        notices.push(<div key='notice' onClick={addNotice}>Ajouter une notice</div>)
        return notices;
    } else {
        return <div>This field should be an array</div>
    }
}

const NoticeModal = ({ isOpen, toggle }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} className='notice-field-modal'>
            <div>Ajouter une notice par sa reference</div>
            <Input />
            <Button color='primary'>Ajouter</Button>
        </Modal>
    )
}


const styles = {
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
    },
    title: {
        paddingRight: '15px',
        whiteSpace: 'nowrap',
        minWidth: '100px',
        color: '#5a5a5a',
        fontStyle: 'italic'
    }
}
