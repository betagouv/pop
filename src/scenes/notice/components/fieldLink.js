import React from 'react';
import { Field } from 'redux-form'
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

import './fieldLink.css';

class NoticeField extends React.Component {

    state = {
        modal: false,
        input: 'hey'
    }

    // addLink() {
    //     const arr = [this.state.input].concat(this.props.input.value)
    //     this.props.input.onChange(arr)
    //     this.setState({ modal: false })
    // }

    // renderModal() {
    //     return (
    //         <Modal isOpen={this.state.modal} toggle={() => this.setState({ modal: !this.state.modal })} className='notice-field-modal'>
    //             <div>Ajouter une notice par sa reference</div>
    //             <Input value={this.state.input} onChange={(e) => this.setState({ input: e.target.value })} />
    //             <Button color='primary' onClick={this.addLink.bind(this)}>Ajouter</Button>
    //         </Modal>
    //     )
    // }

    renderNotices() {
        if (Array.isArray(this.props.input.value)) {
            const notices = this.props.input.value.map(value => {
                return (<Col m={3} key={value} ><Link to={this.props.url + value} >{value}</Link ></Col>);
            })
            // notices.push(<Col m={3} key='new' ><div className='notice-new' key='notice' onClick={() => { this.setState({ modal: true }) }}>Ajouter une notice</div> </Col>)
            return notices;
        } else {
            return <div>This field should be an array</div>
        }
    }

    render() {
        return (
            <Row className='field-link'>
                {/* {this.renderModal()} */}
                {this.renderNotices()}
            </Row >
        );
    }
}

export default ({ title, ...rest }) => {
    return (
        <div style={styles.container}>
            {title && <div style={styles.title} >{title}</div>}
            <Field component={NoticeField} {...rest} />
        </div>
    )
};


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
