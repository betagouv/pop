import React from 'react';
import { Field } from 'redux-form'
import { Input } from 'reactstrap';

const makeField = ({ input, meta, children, hasFeedback, label, ...rest }) => {
    return (
        <Input  {...rest} value={input.value} onChange={(e) => input.onChange(e.target.value)} />
    );
}

export default ({ title, ...rest }) => {
    return (
        <div style={styles.container}>
            {title && <strong style={styles.title} >{title}</strong>}
            <Field component={makeField} {...rest} />
        </div>
    )
};


const styles = {
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10px',
        paddingBottom: '10px',
    },
    title: {
        paddingRight: '15px',
        whiteSpace: 'nowrap',
        minWidth: '100px'
    }
}