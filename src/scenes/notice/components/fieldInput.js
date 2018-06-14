import React from 'react';
import { Field } from 'redux-form'
import { Input } from 'reactstrap';

import './fieldInput.css';

const makeField = ({ input, meta, children, hasFeedback, label, ...rest }) => {
    if (Array.isArray(input.value)) {
        return <div>The data is an array and should be a string</div>
    }
    return (
        <Input  {...rest} value={input.value} onChange={(e) => input.onChange(e.target.value)} />
    );
}

export default ({ title, ...rest }) => {

    return (
        <div style={styles.container}>
            {title && <div style={styles.title} >{title}</div>}
            <Field component={makeField} {...rest} />
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
        minWidth: '100px',
        color: '#5a5a5a',
        fontStyle: 'italic'
    }
}