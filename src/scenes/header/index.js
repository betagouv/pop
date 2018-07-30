import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Container } from 'reactstrap';

import User from './user.js'
import Logo from './logo.js'

import './index.css';

export default class NavComponent extends React.Component {

    render() {
        return (
            <div className='header'>
                <Container className='NavContainer'>
                    <Logo />
                    {/* <User /> */}
                </Container>
            </div>
        )

    }
}
