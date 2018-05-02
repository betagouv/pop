import React from 'react';
import { Link } from 'react-router-dom';

import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Container, Row, Col } from 'reactstrap';

import User from './user.js'
import Logo from './logo.js'

import './index.css';

export default class NavComponent extends React.Component {
    render() {
        return (
            <Container className='NavContainer'>
                <Logo />
                <User />
            </Container>
        )

    }
}
