import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ReactiveBase, DataSearch, ReactiveList, MultiList, SingleList, SelectedFilters } from '@appbaseio/reactivesearch';

import CustomButton from './components/button';
import ExportComponent from './components/export';

import AdvancedSearch from './components/advancedSearch';

import { es_url } from '../../config.js';

const FILTER = ["mainSearch", "region", "auteurs", "denomination", "producteur", "departement", "commune", "image", "location", "date", "zone"]

export default class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            normalMode: true
        }
    }

    renderAdvanced() {
        return (
            <div>
                <div className='title'>Rechercher une Notice</div>
                <AdvancedSearch className='yi' style={{ width: "100%" }} />
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
                        columns={['REF', 'TOUT', 'ACTU', 'ADRS', 'AFFE', 'AIRE', 'APPL', 'APRO', 'ARCHEO', 'AUTP', 'AUTR', 'CADA', 'CANT', 'COLL', 'COM', 'COOR', 'COORM', 'COPY', 'COUV', 'DATE', 'DBOR', 'DOMN', 'DENO', 'DENQ', 'DEPL', 'DESC', 'DIMS', 'DOSS', 'DPRO', 'DPT', 'EDIF', 'ELEV', 'ENER', 'ESCA', 'ETAG', 'ETAT', 'ETUD', 'GENR', 'HIST', 'HYDR', 'IMPL', 'INSEE', 'INTE', 'JATT', 'JDAT', 'LBASE2', 'LIEU', 'LOCA', 'MFICH', 'MOSA', 'MHPP', 'MICR', 'MURS', 'NBOR', 'NOMS', 'OBS', 'PAFF', 'PART', 'PARN', 'PDEN', 'PERS', 'PLAN', 'PLOC', 'PPRO', 'PREP', 'PROT', 'PSTA', 'REFE', 'REFO', 'REFP', 'REG', 'REMA', 'REMP', 'RENV', 'REPR', 'RFPA', 'SCLD', 'SCLE', 'SCLX', 'SITE', 'STAT', 'TECH', 'TICO', 'TOIT', 'TYPO', 'VERT', 'REFIM', 'IMG', 'VIDEO', 'DOSURL', 'DOSURLP', 'DOSADRS', 'LIENS', 'IMAGE', 'VISI', 'VOCA', 'VOUT', 'WEB', 'ZONE', 'THEM', 'ACMH', 'ACURL', 'WADRS', 'WCOM', 'WRENV', 'REFM', 'CONTACT', 'IDAGR', 'LMDP', 'PINT', 'DLAB', 'APPL']}
                    />
                </div>
                <Row>
                    <Col xs="3">
                        <SingleList
                            componentId="image"
                            dataField="CONTIENT_IMAGE.keyword"
                            title="Contient une image"
                            className="filters"
                            showSearch={false}
                            URLParams={true}
                            react={{ and: FILTER }}
                        />
                        <SingleList
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
                        <CustomButton onClick={() => this.setState({ normalMode: !this.state.normalMode })} icon={require('../../assets/advanced.png')} text={this.state.normalMode ? 'Recherche avancée' : 'Recherche normale'} />
                        <CustomButton icon={require('../../assets/import.png')} to='/import/merimee' text='Importer des notices' />
                        <CustomButton icon={require('../../assets/edit.png')} to='/new' text='Saisir une notice' />
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
    const image = data.IMG ? data.IMG : require('../../assets/noimage.jpg');
    return (
        <Link style={{ textDecoration: 'none' }} to={`/notice/merimee/${data.REF}`} className="card" key={data.REF}>
            <img src={image} alt="Book Cover" />
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