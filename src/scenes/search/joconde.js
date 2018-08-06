import React from 'react';
import { Row, Col, Input, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
    ReactiveBase,
    DataSearch,
    ReactiveList,
    MultiList,
    SelectedFilters,
    ReactiveComponent
} from '@appbaseio/reactivesearch';


import CustomButton from './components/button';
import ExportComponent from './components/export';
import QueryBuilder from './components/queryBuilder';

import { es_url, bucket_url } from '../../config.js';

import Joconde from '../../entities/joconde';

const FILTER = ["mainSearch", "domn", "deno", "periode", "image", "tech", "loca", "autr"]

export default class Search extends React.Component {

    constructor(props) {
        super(props);

        const fieldsToExport = [];
        const obj = new Joconde({});
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


    render() {
        return (
            <Container className='search'>
                <div className='header'>
                    <div className='buttons'>
                        <CustomButton onClick={() => this.setState({ normalMode: !this.state.normalMode })} icon={require('../../assets/advanced.png')} text={this.state.normalMode ? 'Recherche avancée' : 'Recherche normale'} />
                        {/* <CustomButton icon={require('../../assets/import.png')} to='/import/joconde' text='Importer des notices' /> */}
                        {/* <CustomButton icon={require('../../assets/edit.png')} to='/new' text='Saisir une notice' /> */}
                    </div>
                </div>
                <ReactiveBase
                    url={`${es_url}/joconde`}
                    app="joconde"
                >
                    {this.state.normalMode ? this.renderNormal() : this.renderAdvanced()}
                </ReactiveBase >
            </Container >
        );
    }

    renderAdvanced() {
        return (
            <div>
                <div className='title'>Rechercher une Notice</div>
                <QueryBuilder
                    entity={Joconde}
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
                        dataField={["TICO", "INV", "DENO", "REF", "LOCA"]}
                        queryFormat="and"
                        iconPosition="left"
                        className="mainSearch"
                        placeholder="Saisissez un titre, une dénomination, une reference ou une localisation"
                        URLParams={true}
                    />

                    <ReactiveComponent
                        componentId='export'
                        react={{
                            and: FILTER
                        }}
                        defaultQuery={() => ({
                            size: 100,
                            aggs: {},
                        })}
                    >
                        <ExportComponent
                            FILTER={FILTER}
                            filename='joconde.csv'
                            columns={this.state.fieldsToExport}
                        />
                    </ReactiveComponent>
                </div>
                <Row>
                    <Col xs="3">
                        <MultiList
                            componentId="domn"
                            dataField="DOMN.keyword"
                            title="Domaine"
                            className="filters"
                            showSearch={true}
                            URLParams={true}
                            react={{
                                and: FILTER
                            }}
                        />

                        <MultiList
                            componentId="deno"
                            dataField="DENO.keyword"
                            title="Dénomination"
                            className="filters"
                            showSearch={true}
                            URLParams={true}
                            react={{
                                and: FILTER
                            }}
                        />

                        <MultiList
                            componentId="periode"
                            dataField="PERI.keyword"
                            title="Période"
                            className="filters"
                            showSearch={true}
                            URLParams={true}
                            react={{
                                and: FILTER
                            }}
                        />
                        <MultiList
                            componentId="image"
                            dataField="CONTIENT_IMAGE.keyword"
                            title="Contient une image"
                            className="filters"
                            showSearch={true}
                            URLParams={true}
                            react={{
                                and: FILTER
                            }}
                        />

                        <MultiList
                            componentId="tech"
                            dataField="TECH.keyword"
                            title="Techniques"
                            className="filters"
                            showSearch={true}
                            URLParams={true}
                            react={{
                                and: FILTER
                            }}
                        />

                        <MultiList
                            componentId="loca"
                            dataField="LOCA.keyword"
                            title="Localisation"
                            className="filters"
                            showSearch={true}
                            URLParams={true}
                            react={{
                                and: FILTER
                            }}
                        />

                        <MultiList
                            componentId="autr"
                            dataField="AUTR.keyword"
                            title="Auteurs"
                            className="filters"
                            showSearch={true}
                            URLParams={true}
                            react={{
                                and: FILTER
                            }}
                        />
                    </Col>
                    <Col xs="9">
                        <SelectedFilters />
                        <ReactiveList
                            componentId="results"
                            react={{
                                "and": FILTER
                            }}
                            onResultStats={(total, took) => {
                                return `${total} résultats trouvés en ${took} ms.`
                            }}
                            loader="Chargement ..."
                            dataField=''
                            URLParams={true}
                            size={20}
                            onData={(data) => <Card key={data.REF} data={data} />}
                            pagination={true}
                        />
                    </Col>
                </Row>
            </div >
        );
    }
}


const Card = ({ data }) => {
    const image = data.IMG.length ? `${bucket_url}${data.IMG[0]}` : require('../../assets/noimage.jpg');
    return (
        <Link style={{ textDecoration: 'none' }} to={`/notice/joconde/${data.REF}`} className="card" key={data.REF}>
            <img src={image} alt="Lien cassé" />
            <div className='content'>
                <div style={{ display: 'flex' }}><h2>{data.TITR}</h2><span>{data.REF}</span></div>
                <div>
                    <p>{data.DOMN.join(', ')}</p>
                    <p>{data.DENO.join(', ')}</p>
                    <p>{data.AUTR}</p>
                    <p>{data.PERI.join(', ')}</p>
                    <p>{data.LOCA}</p>
                    <p>{data.INV}</p>
                </div>
            </div>
        </Link>
    );
}
