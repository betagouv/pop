import React from 'react';
import { Row, Col, Input, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import {
    ReactiveBase,
    DataSearch,
    ReactiveList,
    SingleList,
    SelectedFilters,
    ReactiveComponent
} from '@appbaseio/reactivesearch';


import Button from './components/button';
import ExportComponent from './components/export';

import { es_url } from '../../config.js';

const FILTER = ["mainSearch", "domn", "deno", "periode", "image", "tech"]

export default class Search extends React.Component {
    render() {
        return (
            <Container className='search'>
                <ReactiveBase
                    url={`${es_url}/joconde`}
                    app="joconde"
                >
                    <div className='header'>
                        <div className='buttons'>
                            <Button icon={require('../../assets/import.png')} to='/import/merimee' text='Importer des notices' />
                            <Button icon={require('../../assets/edit.png')} to='/new' text='Saisir une notice' />
                            <Button icon={require('../../assets/edit.png')} to='/new' text='Recherche avancée' />
                        </div>
                    </div>
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
                            <SingleList
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

                            <SingleList
                                componentId="deno"
                                dataField="DENO.keyword"
                                title="Denomination"
                                className="filters"
                                showSearch={true}
                                URLParams={true}
                                react={{
                                    and: FILTER
                                }}
                            />

                            <SingleList
                                componentId="periode"
                                dataField="PERI.keyword"
                                title="Periode"
                                className="filters"
                                showSearch={true}
                                URLParams={true}
                                react={{
                                    and: FILTER
                                }}
                            />
                            <SingleList
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

                            <SingleList
                                componentId="tech"
                                dataField="TECH.keyword"
                                title="techniques"
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
    const image = data.IMG.length ? data.IMG[0] : require('../../assets/noimage.jpg');
    return (
        <Link style={{ textDecoration: 'none' }} to={`/notice/joconde/${data.REF}`} className="card" key={data.REF}>
            <img src={image} alt="Book Cover" />
            <div className='content'>
                <div style={{ display: 'flex' }}><h2>{data.TICO}</h2><span>{data.REF}</span></div>
                <div>
                    <p>{data.DOMN}</p>
                    <p>{data.DENO}</p>
                    <p>{data.DOMN}</p>
                    <p>{data.AUTR}</p>
                </div>
            </div>
        </Link>
    );
}