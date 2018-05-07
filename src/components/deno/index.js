import React from 'react';

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import data from './data'

const arr = data.map((e) => {
    return { value: e, label: e }
});

export default ({ value, onChange }) => {
    return (
        <Select
            name="deno-select"
            value={value}
            onChange={onChange}
            options={arr}
            clearable={false}
        />
    )
}