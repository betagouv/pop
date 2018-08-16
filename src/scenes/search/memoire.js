import React from 'react';
import { Row, Col, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ReactiveBase, DataSearch, ReactiveList, MultiList, SingleList, SelectedFilters } from '@appbaseio/reactivesearch/lib';

import ExportComponent from './components/export';

import QueryBuilder from './components/queryBuilder';

import Memoire from '../../entities/memoire';
import { es_url, bucket_url } from '../../config.js';

const FILTER = ["mainSearch", "dom", "autp"]

export default class Search extends React.Component {

    constructor(props) {
        super(props);

        const fieldsToExport = [];
        const obj = new Memoire({});
        for (var property in obj) {
            if (obj.hasOwnProperty(property) && property.indexOf('_') !== 0 && typeof (obj[property]) === 'object') {
                fieldsToExport.push(property)
            }
        }

        this.state = {
            normalMode: true,
            fieldsToExport
        }
    }

    renderAdvanced() {
        return (
            <div>
                <div className='title'>Rechercher une Notice</div>
                <QueryBuilder
                    entity={Memoire}
                    componentId="advancedSearch"
                />
                <ReactiveList
                    componentId="results"
                    react={{ "and": ['advancedSearch'] }}
                    onResultStats={(total, took) => { return `${total} résultats trouvés en ${took} ms.` }}
                    URLParams={true}
                    dataField=''
                    size={20}
                    onData={(data) => <Card key={data.REF} data={data} />}
                    pagination={true}
                />
            </div >
        )
    }

    renderNormal() {
        return (
            <div>
                <div className='title'>Rechercher une Notice</div>
                <div className='search-and-export-zone'>
                    <DataSearch
                        componentId="mainSearch"
                        dataField={["TICO", "DENO", "REF", "LOCA"]}
                        queryFormat="and"
                        iconPosition="left"
                        className="mainSearch"
                        placeholder="Saisissez un titre, une dénomination, une reference ou une localisation"
                        URLParams={true}
                    />
                    <ExportComponent
                        FILTER={FILTER}
                        filename='merimee.csv'
                        columns={this.state.fieldsToExport}
                    />
                </div>
                <Row>
                    <Col xs="3">
                        <MultiList
                            componentId="dom"
                            dataField="DOM.keyword"
                            title="Domaine"
                            className="filters"
                            showSearch={false}
                            URLParams={true}
                            react={{ and: FILTER }}
                        />
                        <MultiList
                            componentId="autp"
                            dataField="AUTP.keyword"
                            title="Auteurs"
                            className="filters"
                            showSearch={false}
                            URLParams={true}
                            react={{ and: FILTER }}
                        />
                    </Col>
                    <Col xs="9">
                        <SelectedFilters />
                        <ReactiveList
                            componentId="results"
                            react={{ "and": FILTER }}
                            onResultStats={(total, took) => { return `${total} résultats trouvés en ${took} ms.` }}
                            dataField=''
                            URLParams={true}
                            size={20}
                            onData={(data) => <Card key={data.REF} data={data} />}
                            pagination={true}
                        />
                    </Col>
                </Row>
            </div>)

    }


    render() {
        return (
            <Container className='search'>
                <div className='header'>
                    <div className='buttons'>
                        <Button color="secondary" onClick={() => this.setState({ normalMode: !this.state.normalMode })} >{this.state.normalMode ? 'Recherche avancée' : 'Recherche normale'}</Button>
                    </div>
                </div>
                <ReactiveBase
                    url={`${es_url}/memoire`}
                    app="memoire"
                >
                    {this.state.normalMode ? this.renderNormal() : this.renderAdvanced()}
                </ReactiveBase >
            </Container >
        );
    }
}


const Card = ({ data }) => {
    // const image = data.IMG ? `${data.IMG}` : require('../../assets/noimage.jpg');

    let image = "";
    if (data.IMG.indexOf("memoire") === 0) {
        image = `${bucket_url}${data.IMG}`;
    } else if (data.IMG) {
        image = `${data.IMG}`;
    } else {
        image = require('../../assets/noimage.jpg');
    }

    return (
        <Link style={{ textDecoration: 'none' }} to={`/notice/memoire/${data.REF}`} className="card" key={data.REF}>
            <img src={image} alt="Lien cassé" />
            <div className='content'>
                <div style={{ display: 'flex' }}><h2>{data.TICO}</h2><span>{data.REF}</span></div>
                <div>
                    <p>{data.DOMN}</p>
                    <p>{data.LOCA}</p>
                </div>
            </div>
        </Link>
    );
}