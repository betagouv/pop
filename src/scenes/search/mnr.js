import React from 'react';
import { Row, Col, Input, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    ReactiveBase,
    DataSearch,
    ReactiveList,
    MultiList,
    SingleList,
    SelectedFilters,
    ReactiveComponent
} from '@appbaseio/reactivesearch';


import Button from './components/button';
import ExportComponent from './components/export';

import { es_url } from '../../config.js';

const FILTER = ["mainSearch"]

export default class Search extends React.Component {
    render() {
        return (
            <Container className='search'>
                <div className='header'>
                    <div className='buttons'>
                        <Button icon={require('../../assets/import.png')} to='/import/mnr' text='Importer des notices' />
                        <Button icon={require('../../assets/edit.png')} to='/new' text='Saisir une notice' />
                    </div>
                </div>
                <ReactiveBase
                    url={`${es_url}/mnr`}
                    app="mnr"
                >
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
                                filename='mnr.csv'
                                columns={['REF']}
                            />
                        </ReactiveComponent>
                    </div>
                    <Row>
                        <Col xs="3">

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
                                dataField=''
                                URLParams={true}
                                size={20}
                                onData={(data) => <Card key={data.REF} data={data} />}
                                pagination={true}
                            />
                        </Col>
                    </Row>
                </ReactiveBase >
            </Container >
        );
    }
}


const Card = ({ data }) => {
    const image = data.VIDEO.length ? data.VIDEO[0] : require('../../assets/noimage.jpg');
    return (
        <Link style={{ textDecoration: 'none' }} to={`/notice/mnr/${data.REF}`} className="card" key={data.REF}>
            <img src={image} alt="Book Cover" />
            <div className='content'>
                <div style={{ display: 'flex' }}><h2>{data.TITR}</h2><span>{data.REF}</span></div>
                <div>
                    <p>{data.DOMN}</p>
                    <p>{data.DENO}</p>
                    <p>{data.LOCA}</p>
                    <p>{data.AUTR}</p>
                </div>
            </div>
        </Link>
    );
}