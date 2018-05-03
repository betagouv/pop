import React from 'react';
import { Row, Col, Input, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import Autocomplete from './autocomplete'

import { history } from '../../redux/store';
import API from '../../services/api'

import Card from './card'

import './index.css';

export default class Search extends React.Component {

    state = {
        modal: false,
        entities: [],
        search: '',
        collection: 'merimeeMH'
    }

    componentWillMount() {

    }

    search(value) {
        API.search("merimeeMH", value).then((entities) => {
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
            <div className='search'>
                <Container>
                    <h2 className='title'>Vous recherchez dans la base Mérimée</h2>
                    <Autocomplete
                        onSelect={(item) => {
                            history.push(`/notice/${item.REF}`)
                        }}
                        onSearch={(value) => {
                            console.log('VALUE', value)
                        }}
                    />

                    <div className='advancedfilters'>
                        <div>
                            <p>Localisation</p>
                            <Input type="select" >
                                <option>?</option>
                                <option>???</option>
                                <option>???</option>
                                <option>???</option>
                            </Input>
                        </div>

                        <div>
                            <p>Dernière mise à jour</p>
                            <Input type="select" >
                                <option>Aujourd'hui</option>
                                <option>Cette semaine</option>
                                <option>Ce mois</option>
                                <option>Cette année</option>
                            </Input>
                        </div>

                        <div>
                            <p>Niveau de completion</p>
                            <Input type="select" >
                                <option>Sans photo</option>
                                <option>Incomplet</option>
                                <option>Complet</option>
                            </Input>
                        </div>
                    </div>
                    <div className='results'>
                        {/* {this.renderResults()} */}
                    </div>
                </Container>
            </div >
        );
    }
}

/*
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
                        */