import React from 'react';
import { Link } from 'react-router-dom';

import './button.css'

export default ({ to, text, icon }) => {
    return (
        <Link style={{ textDecoration: 'none' }} className='button' to={to}>
            {icon ? <img src={icon} /> : <div />}
            <div> {text}</div>
        </Link>
    )
}