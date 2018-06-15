import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Container } from 'reactstrap';

import User from './user.js'
import Logo from './logo.js'

import './index.css';

export default class NavComponent extends React.Component {

    constructor(props) {
        super(props);
        this.loadHeader();
    }

    loadHeader() {

        let collection = '';
        let icon = '';

        console.log('window.location.href', window.location.href)
        //Not really sexy and clean. Todo refactor later
        if (window.location.href.includes('/joconde')) {
            collection = 'joconde';
            icon = require('../../assets/joconde.jpg')
        }

        if (window.location.href.includes('/merimee')) {
            collection = 'merimee';
            icon = require('../../assets/merimee.jpg')
        }
        if (window.location.href.includes('/mnr')) {
            collection = 'mnr';
            icon = require('../../assets/mnr.jpg')
        }
        if (window.location.href.includes('/palissy')) {
            collection = 'palissy';
            icon = require('../../assets/palissy.jpg')
        }
        if (window.location.href.includes('/memoire')) {
            collection = 'memoire';
            icon = require('../../assets/memoire.jpg')
        }
        this.state = { collection, icon }
    }

    componentWillReceiveProps() {
        this.loadHeader()
    }

    render() {
        return (
            <div className='header'>
                <Container className='NavContainer'>
                    <Logo />
                    <User />
                </Container>
                <div className='subHeader'>
                    <div className='title-zone'>
                        <img className='logo' src={this.state.icon} />
                        <div className='title'>Vous travaillez dans la base {this.state.collection}</div>
                        <Link to='/'>Changer de base</Link>
                    </div>
                </div>
            </div>
        )

    }
}
