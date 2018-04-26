import React from 'react';
import { Row, Col, Input, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import './index.css';

export default class Home extends React.Component {

    state = {
        modal: false,
    }

    componentWillMount() {

    }
    componentWillUnmount() {

    }

    render() {
        return (
            <div className='home'>
                <Container>
                    <div className='search'>
                        <Input className='select' type="select" name="select" >
                            <option>Memoire</option>
                            <option>Merimee</option>
                            <option>MNR</option>
                            <option>Palissy</option>
                            <option>Joconde</option>
                        </Input>
                        <Input />
                    </div>
                </Container>
            </div>
        );
    }
}

