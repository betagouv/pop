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
                    <div className='title-zone'>
                        <img className='logo' src={require('../../assets/mnr.jpg')} />
                        <div className='title'>Vous travaillez dans la base MNR</div>
                        <Link to='/'>Changer de base</Link>
                    </div>
                    <div className='buttons'>
                        <Button icon={require('../../assets/import.png')} to='/import' text='Importer des notices' />
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
                                column={['REF', 'TOUT', 'LABO', 'ADPT', 'APTN', 'APPL', 'ATTR', 'AUTR', 'BIBL', 'COMM', 'CONTACT', 'COOR', 'COPY', 'DATA', 'DACQ', 'DDPT', 'DMAJ', 'DMIS', 'DREP', 'DESY', 'DECV', 'DENO', 'DESC', 'REPR', 'DIMS', 'DOMN', 'ECOL', 'EPOQ', 'ETAT', 'EXPO', 'GENE', 'HIST', 'IMAGE', 'IMG', 'LABEL', 'INSC', 'DEPO', 'LIEUX', 'GEOHI', 'LOCA', 'LOCA2', 'LOCA3', 'MILL', 'MILU', 'MUSEO', 'INV', 'NSDA', 'ONOM', 'PERI', 'PERU', 'PHOT', 'MSGCOM', 'PAUT', 'PDAT', 'PDEC', 'PINS', 'PLIEUX', 'PREP', 'PUTI', 'REDA', 'REFIM', 'PEOC', 'SREP', 'STAT', 'TECH', 'TITR', 'TICO', 'UTIL', 'VIDEO', 'WWW', 'MOSA', 'DATION', 'DIFFU', 'LARC', 'RANG', 'RETIF']}
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