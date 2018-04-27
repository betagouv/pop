import React from 'react';
import { Row, Col, Input, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import API from '../../services/api'

import Card from './card'

import './index.css';

export default class Home extends React.Component {

    state = {
        modal: false,
        entities : [],
        search:''
    }

    componentWillMount() {
        API.get().then((entities) =>{
            this.setState({entities})
        })
    }

    search(e) {
        const value = e.target.value;
        this.setState({search:value})
        API.search(value).then((entities) =>{
            this.setState({entities})
        })
    }

    renderResults(){
        return this.state.entities.map((data,i) => {
            return <Card key={i} data={data}/>
        })
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
                        <Input 
                            value={this.state.search} 
                            onChange={this.search.bind(this)}
                        />
                    </div>
                    <div className='results'>
                        {this.renderResults()}
                    </div>
                </Container>
            </div>
        );
    }
}

