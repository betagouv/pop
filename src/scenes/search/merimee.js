import React from 'react';
import { Row, Col, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ReactiveBase, DataSearch, ReactiveList, MultiList, SelectedFilters } from '@appbaseio/reactivesearch';

import CustomButton from './components/button';
import ExportComponent from './components/export';

import Merimee from '../../entities/merimee';

import QueryBuilder from './components/queryBuilder';

import { es_url, bucket_url } from '../../config.js';

const FILTER = ["mainSearch", "region", "auteurs", "denomination", "producteur", "departement", "commune", "image", "location", "date", "zone"]

export default class Search extends React.Component {

    constructor(props) {
        super(props);

        const fieldsToExport = [];
        const obj = new Merimee({});
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
                    entity={Merimee}
                    componentId="advancedSearch"
                />
                <ReactiveList
                    componentId="results"
                    react={{ and: "advancedSearch" }}
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
                            componentId="image"
                            dataField="CONTIENT_IMAGE.keyword"
                            title="Contient une image"
                            className="filters"
                            showSearch={false}
                            URLParams={true}
                            react={{ and: FILTER }}
                        />
                        <MultiList
                            componentId="location"
                            dataField="POP_HAS_LOCATION.keyword"
                            title="Contient une localisation"
                            className="filters"
                            showSearch={false}
                            URLParams={true}
                            react={{ and: FILTER }}
                        />
                        <MultiList
                            componentId="producteur"
                            dataField="PRODUCTEUR.keyword"
                            title="Producteur"
                            className="filters"
                            showSearch={false}
                            URLParams={true}
                            react={{ and: FILTER }}
                        />
                        <MultiList
                            componentId="denomination"
                            dataField="DENO.keyword"
                            title="Dénominations"
                            className="filters"
                            placeholder="Rechercher une dénomination"
                            URLParams={true}
                            react={{ and: FILTER }}
                        />
                        <MultiList
                            componentId="auteurs"
                            dataField="AUTR.keyword"
                            showMissing={true}
                            size={100}
                            title="Auteurs"
                            className="filters"
                            placeholder="Rechercher un auteur"
                            URLParams={true}
                            react={{ and: FILTER }}
                        />
                        <hr />
                        <MultiList
                            componentId="region"
                            dataField="REG.keyword"
                            title="Region"
                            showCount={true}
                            className="filters"
                            placeholder="Rechercher une région"
                            URLParams={true}
                            react={{ and: FILTER }}
                        />
                        <MultiList
                            componentId="departement"
                            dataField="DPT.keyword"
                            title="Departements"
                            showCount={true}
                            className="filters"
                            placeholder="Rechercher un département"
                            URLParams={true}
                            react={{ and: FILTER }}
                        />

                        <MultiList
                            componentId="commune"
                            dataField="COM.keyword"
                            title="Communes"
                            showCount={true}
                            className="filters"
                            placeholder="Rechercher une commune"
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
                    url={`${es_url}/merimee`}
                    app="merimee"
                >
                    {this.state.normalMode ? this.renderNormal() : this.renderAdvanced()}
                </ReactiveBase >
            </Container >
        );
    }
}


const Card = ({ data }) => {
    const image = data.IMG.length ? data.IMG[0] : require('../../assets/noimage.jpg');
    return (
        <Link style={{ textDecoration: 'none' }} to={`/notice/merimee/${data.REF}`} className="card" key={data.REF}>
            <img src={image} alt="Lien cassé" />
            <div className='content'>
                <div style={{ display: 'flex' }}><h2>{data.TICO}</h2><span>{data.REF}</span></div>
                <div>
                    <p>{data.DOMN}</p>
                    <p>{data.DENO.join(', ')}</p>
                    <p>{data.LOCA}</p>
                    <p>{data.AUTR.join(', ')}</p>
                </div>
            </div>
        </Link>
    );
}