import React from 'react';
import { Row, Col, Input, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from './button'

import {
    ReactiveBase,
    DataSearch,
    SingleRange,
    ReactiveList,
    MultiList,
    SingleList,
    MultiDropdownList,
    SelectedFilters,
    ReactiveComponent
} from '@appbaseio/reactivesearch';

import { es_url } from '../../config.js';

import exportData from './export';
import './index.css';

const FILTER = ["mainSearch", "region", "auteurs", "denomination", "domaine", "departement", "commune", "image", "location"]

export default class Search extends React.Component {

    state = {
        collection: 'merimee',
    }
    componentWillMount() {


    }
    render() {
        return (
            <Container className='search'>
                <div className='header'>
                    <div className='title-zone'>
                        <img className='logo' src={require('../../assets/merimee.jpg')} />
                        <div className='title'>Vous travaillez dans la base mérimée</div>
                        <Link to='/'>Changer de base</Link>
                    </div>
                    <div className='buttons'>
                        <Button icon={require('../../assets/import.png')} to='/import' text='Importer des notices' />
                        <Button icon={require('../../assets/edit.png')} to='/new' text='Saisir une notice' />
                    </div>
                </div>
                <ReactiveBase
                    url={es_url}
                    app="merimee"
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
                            <ExportComponent />
                        </ReactiveComponent>
                    </div>
                    <Row>
                        <Col xs="3">
                            <SingleList
                                componentId="image"
                                dataField="POP_HAS_IMAGE.keyword"
                                title="Contient une image"
                                className="filters"
                                showSearch={false}
                                URLParams={true}
                                react={{
                                    and: FILTER.filter((e) => e !== "image")
                                }}
                            />
                            <SingleList
                                componentId="location"
                                dataField="POP_HAS_LOCATION.keyword"
                                title="Contient une localisation"
                                className="filters"
                                showSearch={false}
                                URLParams={true}
                                react={{
                                    and: FILTER.filter((e) => e !== "location")
                                }}
                            />
                            <MultiList
                                componentId="domaine"
                                dataField="POP_DOMAINE.keyword"
                                title="Domaines"
                                className="filters"
                                showSearch={false}
                                URLParams={true}
                                react={{
                                    and: FILTER.filter((e) => e !== "domaine")
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
                                    and: FILTER.filter((e) => e !== "denomination")
                                }}
                            />
                            <MultiList
                                componentId="auteurs"
                                dataField="AUTR.keyword"
                                showMissing={true}
                                size={1000}
                                title="Auteurs"
                                className="filters"
                                placeholder="Rechercher un auteur"
                                URLParams={true}
                                react={{
                                    and: FILTER.filter((e) => e !== "auteurs")
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
                                    and: FILTER.filter((e) => e !== "region")
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
                                    and: FILTER.filter((e) => e !== "departement")
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
                                    and: FILTER.filter((e) => e !== "commune")
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
    const image = data.IMG ? data.IMG : require('../../assets/noimage.jpg');
    return (
        <Link style={{ textDecoration: 'none' }} to={`/notice/${data.REF}`} className="card" key={data.REF}>
            <img src={image} alt="Book Cover" />
            <div className='content'>
                <div style={{ display: 'flex' }}><h2>{data.TICO}</h2><span>{data.REF}</span></div>
                <div>
                    <p>{data.DENO.join(', ')}</p>
                    <p>{data.LOCA}</p>
                    <p>{data.AUTR.join(', ')}</p>
                </div>
            </div>
        </Link>
    );
}


class ExportComponent extends React.Component {
    exportData() {
        const columns = ['REF', 'TOUT', 'ACTU', 'ADRS', 'AFFE', 'AIRE', 'APPL', 'APRO', 'ARCHEO', 'AUTP', 'AUTR', 'CADA', 'CANT', 'COLL', 'COM', 'COOR', 'COORM', 'COPY', 'COUV', 'DATE', 'DBOR', 'DOMN', 'DENO', 'DENQ', 'DEPL', 'DESC', 'DIMS', 'DOSS', 'DPRO', 'DPT', 'EDIF', 'ELEV', 'ENER', 'ESCA', 'ETAG', 'ETAT', 'ETUD', 'GENR', 'HIST', 'HYDR', 'IMPL', 'INSEE', 'INTE', 'JATT', 'JDAT', 'LBASE2', 'LIEU', 'LOCA', 'MFICH', 'MOSA', 'MHPP', 'MICR', 'MURS', 'NBOR', 'NOMS', 'OBS', 'PAFF', 'PART', 'PARN', 'PDEN', 'PERS', 'PLAN', 'PLOC', 'PPRO', 'PREP', 'PROT', 'PSTA', 'REFE', 'REFO', 'REFP', 'REG', 'REMA', 'REMP', 'RENV', 'REPR', 'RFPA', 'SCLD', 'SCLE', 'SCLX', 'SITE', 'STAT', 'TECH', 'TICO', 'TOIT', 'TYPO', 'VERT', 'REFIM', 'IMG', 'VIDEO', 'DOSURL', 'DOSURLP', 'DOSADRS', 'LIENS', 'IMAGE', 'VISI', 'VOCA', 'VOUT', 'WEB', 'ZONE', 'THEM', 'ACMH', 'ACURL', 'WADRS', 'WCOM', 'WRENV', 'REFM', 'CONTACT', 'IDAGR', 'LMDP', 'PINT', 'DLAB', 'APPL'];
        //memoire : ['REF','TOUT','ADRESSE','AUTOEU','AUTG','AUTP','AUTOR','AUTTI','COM','DOM','EDIF','EXPO','JDATPV','LIEUCOR','COTECOR','LIEUCTI','COTECTI','LIEUCP','COTECP','LEG','OBJT','OBS','OBSOR','OBSTI','PAYS','PUBLI','TIREDE','ROLE','PRECOR','SERIE','THEATRE','TITRE','DMAJ','DMIS','IDPROD','NUMCD','NUMF','INSEE','NVD','MARQ','ACC','ACQU','ADPHOT','AIRE','ANUMP','COPY','COULEUR','COSTUME','DATIMM','DATOEU','DATPV','DATOR','DATTI','DATG','DATD','DIFF','DPT','EDIARCH','ECH','FORMAT','FORMATOR','FORMATTI','LBASE','WEB','LIB','LOCA','LIEUORIG','MCGEO','MCL','MENTIONS','MENTOR','MENTTI','MCPER','VUECD','NUMAUTP','NUMCAF','ANUMOR','NUMOR','NUMP','ANUMTI','NUMTI','RENV','REG','SENS','SCLE','SUP','TECH','TECHOR','TECHTI','TOILE','TYP','TYPDOC','TYPEIMG','TYPSUPP','VIDEO','LBASE2','LEG2','REFIM','REFIMG','MOSA','SITE','NUMSITE','NUMOP','CHRONO','STRUCT','SUJET','TICO','NUMI','LIEU','ADRS','CONTACT','EMET','NUM','IMG','WCOM','LIENS','LAUTP']
        //joconde 'REF','TOUT','LABO','ADPT','APTN','APPL','ATTR','AUTR','BIBL','COMM','CONTACT','COOR','COPY','DATA','DACQ','DDPT','DMAJ','DMIS','DREP','DESY','DECV','DENO','DESC','REPR','DIMS','DOMN','ECOL','EPOQ','ETAT','EXPO','GENE','HIST','IMAGE','IMG','LABEL','INSC','DEPO','LIEUX','GEOHI','LOCA','LOCA2','LOCA3','MILL','MILU','MUSEO','INV','NSDA','ONOM','PERI','PERU','PHOT','MSGCOM','PAUT','PDAT','PDEC','PINS','PLIEUX','PREP','PUTI','REDA','REFIM','PEOC','SREP','STAT','TECH','TITR','TICO','UTIL','VIDEO','WWW','MOSA','DATION','DIFFU','LARC','RANG','RETIF'
        //palissy 'REF','TOUT','ACQU','ADRS','AIRE','DATE','APPL','ATEL','AUTP','AUTR','AFIG','PARN','BIBL','ETUD','CANT','CATE','COM','COOR','COORM','COPY','DBOR','DENQ','DMAJ','DMIS','DPRO','DENO','DPT','DEPL','DIMS','EDIF','EMPL','ETAT','EXPO','HIST','VIDEO','IMG','IMPL','INSC','INTE','JDAT','RENP','EXEC','LIEU','ORIG','LOCA','MATR','MICR','RENV','NINV','NUMP','NUMA','INSEE','MFICH','NART','OBS','PART','PERS','PHOTO','PAPP','PDEN','PLOC','PDIM','PETA','PINS','DESC','PPRO','PREP','PROT','NOMS','REFA','REFE','REFP','REG','REPR','SCLD','SCLX','SCLE','SOUR','STAD','STAT','STRU','TICO','TITR','DOSS','VOLS','ZONE','WEB','COM2','INSEE2','ADRS2','EDIF2','EMPL2','IMAGE','LBASE2','DOSURL','DOSURLP','DOSADRS','LIENS','MOSA','THEM','WADRS','WCOM','DOMN','WRENV','REFM','CONTACT','IDAGR','LMDP','PINT','HIST'
        //mnr : 'REF','TOUT','AUTR','PAUT','ATTR','ECOL','TITR','ATIT','PTIT','DENO','DESC','DOMN','LOCA','INSC','MARQ','OBSE','ETAT','GENE','PROV','HIST','HIST2','HIST3','HIST4','HIST5','HIST6','SCLE','STYL','MILL','TECH','DIMS','VIDEO','INV','EXPO','BIBL','AATT','AUTI','CATE','NOTE','REDC','DREP','PREP','REPR','SREP','REFIM','DMAJ','NUMS','SUITE','COMM','NOTE2','RESUME','PHOT','ATTR','AUTI'
        exportData('Merimee.csv', columns, this.props.hits);
    }

    render() {
        return (
            <Button icon={require('../../assets/export.png')}  text='Exporter les résultats' to='' onClick={this.exportData.bind(this)} />
        );
    }
}

// const mapStateToProps = (state, props) => ({
// 	hits: state.hits[props.componentId] && state.hits[props.componentId].hits,
// 	isLoading: state.isLoading[props.componentId] || false,
// 	streamHits: state.streamHits[props.componentId] || [],
// 	time: (state.hits[props.componentId] && state.hits[props.componentId].time) || 0,
// 	total: state.hits[props.componentId] && state.hits[props.componentId].total,
// 	url: state.config.url,
// });


// const mapDispatchtoProps = dispatch => ({
// 	loadMore: (component, options, append) => dispatch(loadMore(component, options, append)),
// 	setStreaming: (component, stream) => dispatch(setStreaming(component, stream)),
// });

// ExportComponent = connect(mapStateToProps, mapDispatchtoProps)(ExportComponent);
