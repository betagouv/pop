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

import Button from './components/button';
import ExportComponent from './components/export';

import { es_url } from '../../config.js';

const FILTER = ["mainSearch", "domn", "deno", "periode", "image", "tech", "inv", "domn"]

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
                            <Button icon={require('../../assets/import.png')} to='/import/joconde' text='Importer des notices' />
                            <Button icon={require('../../assets/edit.png')} to='/new' text='Saisir une notice' />
                            <Button icon={require('../../assets/edit.png')} to='/new' text='Recherche avancée' />
                        </div>
                    </div>
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
                                columns={['REF',
                                    'DOMN',
                                    'DENO',
                                    'APPL',
                                    'TITR',
                                    'AUTR',
                                    'PAUT',
                                    'ECOL',
                                    'ATTR',
                                    'PERI',
                                    'MILL',
                                    'EPOQ',
                                    'PEOC',
                                    'TECH',
                                    'DIMS',
                                    'INSC',
                                    'PINS',
                                    'ONOM',
                                    'DESC',
                                    'ETAT',
                                    'REPR',
                                    'PREP',
                                    'DREP',
                                    'SREP',
                                    'GENE',
                                    'HIST',
                                    'LIEUX',
                                    'PLIEUX',
                                    'GEOHI',
                                    'UTIL',
                                    'PERU',
                                    'MILU',
                                    'DECV',
                                    'PDEC',
                                    'NSDA',
                                    'STAT',
                                    'DACQ',
                                    'APTN',
                                    'DEPO',
                                    'DDPT',
                                    'ADPT',
                                    'COMM',
                                    'EXPO',
                                    'BIBL',
                                    'REDA',
                                    'PHOT',
                                    'REF',
                                    'REFMIS',
                                    'REFIM',
                                    'LABEL',
                                    'COPY',
                                    'MGSCOM',
                                    'CONTACT',
                                    'WWW',
                                    'LVID',
                                    'MUSEO',
                                    'COOR']}
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
                                title="Denomination"
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
                                title="Periode"
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
                                componentId="inv"
                                dataField="INV.keyword"
                                title="Inventaire"
                                className="filters"
                                showSearch={true}
                                URLParams={true}
                                react={{
                                    and: FILTER
                                }}
                            />

                            <MultiList
                                componentId="domn"
                                dataField="DOMN.keyword"
                                title="Domaines"
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
                </ReactiveBase >
            </Container >
        );
    }
}


const Card = ({ data }) => {
    const image = data.IMG.length ? data.IMG[0] : require('../../assets/noimage.jpg');
    return (
        <Link style={{ textDecoration: 'none' }} to={`/notice/joconde/${data.REF}`} className="card" key={data.REF}>
            <img src={image} alt={data.TITR} />
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
