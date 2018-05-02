import React from 'react';
import { Row, Col, Input, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import Autocomplete from 'react-autocomplete'

import { history } from '../../redux/store';
import API from '../../services/api'

import Card from './card'

import './index.css';

export default class Home extends React.Component {

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

    // renderResults() {
    //     return this.state.entities.map((data, i) => {
    //         return <Card key={i} data={data} />
    //     })
    // }

    render() {
        return (
            <div className='search'>
                <Container>
                    <h2 className='title'>Vous recherchez dans la base Mérimée</h2>
                    <div className='search-section'>
                        <Autocomplete
                            inputProps={{
                                id: 'autocomplete',
                                placeholder: 'Saississez un auteur, une référence, une localisation, un mot-clé...'
                            }}
                            className='autocomplete'
                            wrapperStyle={{ position: 'relative', display: 'inline-block' }}
                            value={this.state.search}
                            items={this.state.entities}
                            getItemValue={(item) => {
                                console.log('getItemValue', item)
                                return item.TICO
                            }}
                            onSelect={(value, item) => {
                                history.push(`/notice/${item.REF}`)
                           
                            }}
                            onChange={(event, value) => {
                                this.setState({ search: value })
                                this.search(value)
                            }}
                            renderMenu={(children) => {
                                return (
                                    < div className="menu" >
                                        {children}
                                    </div>
                                )
                            }}
                            renderItem={(item, isHighlighted) => {
                                return (
                                    <div
                                        className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                                        key={item.abbr}
                                    >
                                        {`(${item.REF}) ${item.TICO}`}
                                    </div>
                                )
                            }}
                        />
                        <div>
                            <Button
                                onClick={this.search.bind(this)}
                            >
                                Search
                        </Button>
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