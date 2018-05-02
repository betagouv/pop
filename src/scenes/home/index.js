import React from 'react';
import { Row, Col, Input, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import API from '../../services/api'

import Card from './card'

import './index.css';

export default class Home extends React.Component {

    state = {
        modal: false,
        entities: [],
        search: '',
        collection: 'mnrDMF'
    }

    componentWillMount() {

    }

    search(e) {
        API.search(this.state.collection, this.state.search).then((entities) => {
            this.setState({ entities })
        })
    }

    renderResults() {
        return this.state.entities.map((data, i) => {
            return <Card key={i} data={data} />
        })
    }

    render() {
        return (
            <div className='home'>
                <Container>
                    <div className='search'>
                        <Input
                            className='select'
                            type="select"
                            name="select"
                            value={this.state.collection}
                            onChange={(e) => this.setState({ collection: e.target.value })}
                        >
                            <option>palissyMH</option>
                            <option>palissyINV</option>
                            <option>palissyETAT</option>
                            <option>mnrDMF</option>
                            <option>merimeeMH</option>
                            <option>merimeeINV</option>
                            <option>merimeeETAT</option>
                            <option>memoireSDAP</option>
                            <option>memoireSAP</option>
                            <option>memoireIVR</option>
                            <option>memoireCRMH</option>
                            <option>memoireCAOA</option>
                            <option>memoireARCHEO</option>
                            <option>jocondeMUSEES</option>
                        </Input>
                        <Input
                            value={this.state.search}
                            onChange={(e) => this.setState({ search: e.target.value })}
                        />
                        <Button
                            onClick={this.search.bind(this)}
                        >
                            Search
                        </Button>
                    </div>
                    <div className='results'>
                        {this.renderResults()}
                    </div>
                </Container>
            </div >
        );
    }
}

