import React from 'react';
import { Row, Col, Container, ButtonGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ReactiveBase, DataSearch, ReactiveList, MultiList, SelectedFilters } from '@appbaseio/reactivesearch';

import ExportComponent from './components/export';

import Palissy from '../../entities/palissy';

import QueryBuilder from './components/queryBuilder';

import { es_url, bucket_url } from '../../config.js';

const FILTER = ["mainSearch", "producteur", "image", "denomination", "auteurs", "region", "departement", "commune"];

export default class Search extends React.Component {

    constructor(props) {
        super(props);
        const fieldsToExport = [];
        const obj = new Palissy({});
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
                <QueryBuilder
                    entity={Palissy}
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
                <div className='search-and-export-zone'>
                    <DataSearch
                        componentId="mainSearch"
                        fuzziness={2}
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
                            react={{
                                and: FILTER
                            }}
                        />
                        <MultiList
                            componentId="producteur"
                            dataField="PRODUCTEUR.keyword"
                            title="Producteur"
                            className="filters"
                            showSearch={false}
                            URLParams={true}
                            react={{
                                and: FILTER
                            }}
                        />
                        <MultiList
                            componentId="denomination"
                            dataField="DENO.keyword"
                            title="Dénominations"
                            className="filters"
                            placeholder="Rechercher une dénomination"
                            URLParams={true}
                            react={{
                                and: FILTER
                            }}
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
                            react={{
                                and: FILTER
                            }}
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
                            react={{
                                and: FILTER
                            }}
                        />
                        <MultiList
                            componentId="departement"
                            dataField="DPT.keyword"
                            title="Departements"
                            showCount={true}
                            className="filters"
                            placeholder="Rechercher un département"
                            URLParams={true}
                            react={{
                                and: FILTER
                            }}
                        />

                        <MultiList
                            componentId="commune"
                            dataField="COM.keyword"
                            title="Communes"
                            showCount={true}
                            className="filters"
                            placeholder="Rechercher une commune"
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
                    <div className='title'>Rechercher une Notice</div>
                    <div className='buttons'>
                        <ButtonGroup>
                            <Button color="primary" onClick={() => this.setState({ normalMode: !this.state.normalMode })} active={this.state.normalMode}>Recherche simple</Button>
                            <Button color="primary" onClick={() => this.setState({ normalMode: !this.state.normalMode })} active={!this.state.normalMode}>Recherche experte</Button>
                        </ButtonGroup>
                    </div>
                </div>
                <ReactiveBase url={`${es_url}/palissy`} app="palissy" >
                    {this.state.normalMode ? this.renderNormal() : this.renderAdvanced()}
                </ReactiveBase >
            </Container >
        );
    }
}

function getMemoireImage(memoire) {
    if (!memoire.length || !memoire[0].url) {
        return require('../../assets/noimage.jpg')
    }
    let image = memoire[0].url;
    image = image.indexOf("www") === -1 ? `${bucket_url}${image}` : image;
    return image;
}



const Card = ({ data }) => {
    const image = getMemoireImage(data.MEMOIRE);

    if (data.REF.startsWith("PA") || data.REF.startsWith("PM")) {
        return (
            <Link style={{ textDecoration: 'none' }} to={`/notice/palissy/${data.REF}`} className="card" key={data.REF}>
                <img src={image} alt="Lien cassé" />
                <div className='content'>
                    <div style={{ display: 'flex' }}><h2>{data.TICO}</h2><span>{data.REF}</span></div>
                    <div>
                        <p>{data.LOCA}</p>
                        <p>{data.EDIF}</p>
                        <p>{data.AUTR}</p>
                        <p>{data.CATE}</p>
                        <p>{data.MATR}</p>
                        <p>{data.SCLE}</p>
                        <p>{data.DEPL}</p>
                        <p>{data.STAT}</p>
                        <p>{data.DPRO}</p>
                        <p>{data.DOMN}</p>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link style={{ textDecoration: 'none' }} to={`/notice/palissy/${data.REF}`} className="card" key={data.REF}>
            <img src={image} alt="Lien cassé" />
            <div className='content'>
                <div style={{ display: 'flex' }}><h2>{data.TICO}</h2><span>{data.REF}</span></div>
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
