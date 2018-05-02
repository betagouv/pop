import React from 'react';
import { Field } from 'redux-form'

const makeField = ({ input, meta, children, hasFeedback, label, ...rest }) => {
    return (
        <FormItem
            label={label}
            validateStatus={meta.error ? 'error' : 'success'}
            hasFeedback={hasFeedback}
            help={meta.error}
            style={{ margin: '0px' }}
        >
            <Input  {...rest} value={input.value} onChange={(e) => input.onChange(e.target.value)} />
        </FormItem>
    );
}

export default ({ title, ...rest }) => {
    return (
        <div style={{ width: '100%' }}>
            {title && <p className="isoInfoLabel" style={{ margin: '0px' }}>{title}</p>}
            <Field component={makeField} {...rest} />
        </div>
    )

};
