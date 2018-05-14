import React from 'react';
import { Row, Col, Input, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    ReactiveBase,
    DataSearch,
    SingleRange,
    ResultCard
} from '@appbaseio/reactivesearch';

import { history } from '../../redux/store';
import API from '../../services/api';

import exportData from './export';
import Card from './card';

import './index.css';

export default class Search extends React.Component {

    state = {
        collection: 'merimee',
    }

    componentWillMount() {


    }

    renderResults() {

        return (
            <div>
                hey
            </div>
        )
    }

    export() {
        const columns = ['REF', 'TOUT', 'ACTU', 'ADRS', 'AFFE', 'AIRE', 'APPL', 'APRO', 'ARCHEO', 'AUTP', 'AUTR', 'CADA', 'CANT', 'COLL', 'COM', 'COOR', 'COORM', 'COPY', 'COUV', 'DATE', 'DBOR', 'DOMN', 'DENO', 'DENQ', 'DEPL', 'DESC', 'DIMS', 'DMAJ', 'DMIS', 'DOSS', 'DPRO', 'DPT', 'EDIF', 'ELEV', 'ENER', 'ESCA', 'ETAG', 'ETAT', 'ETUD', 'GENR', 'HIST', 'HYDR', 'IMPL', 'INSEE', 'INTE', 'JATT', 'JDAT', 'LBASE2', 'LIEU', 'LOCA', 'MFICH', 'MOSA', 'MHPP', 'MICR', 'MURS', 'NBOR', 'NOMS', 'OBS', 'PAFF', 'PART', 'PARN', 'PDEN', 'PERS', 'PLAN', 'PLOC', 'PPRO', 'PREP', 'PROT', 'PSTA', 'REFE', 'REFO', 'REFP', 'REG', 'REMA', 'REMP', 'RENV', 'REPR', 'RFPA', 'SCLD', 'SCLE', 'SCLX', 'SITE', 'STAT', 'TECH', 'TICO', 'TOIT', 'TYPO', 'VERT', 'REFIM', 'IMG', 'VIDEO', 'DOSURL', 'DOSURLP', 'DOSADRS', 'LIENS', 'IMAGE', 'VISI', 'VOCA', 'VOUT', 'WEB', 'ZONE', 'THEM', 'ACMH', 'ACURL', 'WADRS', 'WCOM', 'WRENV', 'REFM', 'CONTACT', 'IDAGR', 'LMDP', 'PINT', 'DLAB', 'APPL'];
        //memoire : ['REF','TOUT','ADRESSE','AUTOEU','AUTG','AUTP','AUTOR','AUTTI','COM','DOM','EDIF','EXPO','JDATPV','LIEUCOR','COTECOR','LIEUCTI','COTECTI','LIEUCP','COTECP','LEG','OBJT','OBS','OBSOR','OBSTI','PAYS','PUBLI','TIREDE','ROLE','PRECOR','SERIE','THEATRE','TITRE','DMAJ','DMIS','IDPROD','NUMCD','NUMF','INSEE','NVD','MARQ','ACC','ACQU','ADPHOT','AIRE','ANUMP','COPY','COULEUR','COSTUME','DATIMM','DATOEU','DATPV','DATOR','DATTI','DATG','DATD','DIFF','DPT','EDIARCH','ECH','FORMAT','FORMATOR','FORMATTI','LBASE','WEB','LIB','LOCA','LIEUORIG','MCGEO','MCL','MENTIONS','MENTOR','MENTTI','MCPER','VUECD','NUMAUTP','NUMCAF','ANUMOR','NUMOR','NUMP','ANUMTI','NUMTI','RENV','REG','SENS','SCLE','SUP','TECH','TECHOR','TECHTI','TOILE','TYP','TYPDOC','TYPEIMG','TYPSUPP','VIDEO','LBASE2','LEG2','REFIM','REFIMG','MOSA','SITE','NUMSITE','NUMOP','CHRONO','STRUCT','SUJET','TICO','NUMI','LIEU','ADRS','CONTACT','EMET','NUM','IMG','WCOM','LIENS','LAUTP']
        //joconde 'REF','TOUT','LABO','ADPT','APTN','APPL','ATTR','AUTR','BIBL','COMM','CONTACT','COOR','COPY','DATA','DACQ','DDPT','DMAJ','DMIS','DREP','DESY','DECV','DENO','DESC','REPR','DIMS','DOMN','ECOL','EPOQ','ETAT','EXPO','GENE','HIST','IMAGE','IMG','LABEL','INSC','DEPO','LIEUX','GEOHI','LOCA','LOCA2','LOCA3','MILL','MILU','MUSEO','INV','NSDA','ONOM','PERI','PERU','PHOT','MSGCOM','PAUT','PDAT','PDEC','PINS','PLIEUX','PREP','PUTI','REDA','REFIM','PEOC','SREP','STAT','TECH','TITR','TICO','UTIL','VIDEO','WWW','MOSA','DATION','DIFFU','LARC','RANG','RETIF'
        //palissy 'REF','TOUT','ACQU','ADRS','AIRE','DATE','APPL','ATEL','AUTP','AUTR','AFIG','PARN','BIBL','ETUD','CANT','CATE','COM','COOR','COORM','COPY','DBOR','DENQ','DMAJ','DMIS','DPRO','DENO','DPT','DEPL','DIMS','EDIF','EMPL','ETAT','EXPO','HIST','VIDEO','IMG','IMPL','INSC','INTE','JDAT','RENP','EXEC','LIEU','ORIG','LOCA','MATR','MICR','RENV','NINV','NUMP','NUMA','INSEE','MFICH','NART','OBS','PART','PERS','PHOTO','PAPP','PDEN','PLOC','PDIM','PETA','PINS','DESC','PPRO','PREP','PROT','NOMS','REFA','REFE','REFP','REG','REPR','SCLD','SCLX','SCLE','SOUR','STAD','STAT','STRU','TICO','TITR','DOSS','VOLS','ZONE','WEB','COM2','INSEE2','ADRS2','EDIF2','EMPL2','IMAGE','LBASE2','DOSURL','DOSURLP','DOSADRS','LIENS','MOSA','THEM','WADRS','WCOM','DOMN','WRENV','REFM','CONTACT','IDAGR','LMDP','PINT','HIST'
        //mnr : 'REF','TOUT','AUTR','PAUT','ATTR','ECOL','TITR','ATIT','PTIT','DENO','DESC','DOMN','LOCA','INSC','MARQ','OBSE','ETAT','GENE','PROV','HIST','HIST2','HIST3','HIST4','HIST5','HIST6','SCLE','STYL','MILL','TECH','DIMS','VIDEO','INV','EXPO','BIBL','AATT','AUTI','CATE','NOTE','REDC','DREP','PREP','REPR','SREP','REFIM','DMAJ','NUMS','SUITE','COMM','NOTE2','RESUME','PHOT','ATTR','AUTI'
        exportData('Merimee.csv', columns, { collection: 'merimee', value: this.state.value });
    }

    render() {
        return (
            <Container className='search'>
                <ReactiveBase
                    url='http://127.0.0.1:9200'
                    app="pop"
                >
                    <DataSearch
                        componentId="mainSearch"
                        dataField={["HIST"]}
                        queryFormat="and"
                        iconPosition="left"
                    />

                    <ResultCard
                        componentId="results"
                        dataField="original_title"
                        react={{
                            "and": ["mainSearch"]
                        }}
                        onData={(res) => {
                            console.log('RES', res)
                            return ({
                                "image": res.image,
                                "title": res.original_title,
                                "description": res.average_rating + " ★ "
                            })
                        }}
                    />
                    Hello from Reactive Search!
                </ReactiveBase>
            </Container >
        );
    }
}