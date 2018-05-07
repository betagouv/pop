import React from 'react';
import { Row, Col, Input, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';


import Autocomplete from './autocomplete';

import { history } from '../../redux/store';
import API from '../../services/api';

import exportData from './export';
import Card from './card';

import DenoSelect from '../../components/deno'

const ITEMSPERPAGES = 30;

import './index.css';

export default class Search extends React.Component {

    state = {
        entities: [],
        offset: 0,
        totalCount: 0,
        value: '',
        selectedDeno: '',
        collection: 'merimee',
    }

    componentWillMount() {
        this.search();
    }

    search() {
        API.search("merimee", { value: this.state.value, limit: ITEMSPERPAGES, offset: this.state.offset, deno: this.state.selectedDeno }).then((res) => {
            this.setState({
                entities: res.docs,
                totalCount: res.total
            })
        })
    }


    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * ITEMSPERPAGES);
        this.setState({ offset }, () => {
            this.search();
        });
    };


    renderResults() {
        const arr = this.state.entities.map((data, i) => {
            return <Card key={i} data={data} />
        })

        return (
            <div>
                {arr}
                <ReactPaginate previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={<a href="">...</a>}
                    breakClassName={"break-me"}
                    pageCount={Math.ceil(this.state.totalCount / ITEMSPERPAGES)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                />
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
            <div className='search'>
                <Container>
                    <h2 className='title'>Vous recherchez dans la base Mérimée</h2>
                    <Link to='/import'>Import</Link>
                    <Autocomplete
                        onSelect={(item) => {
                            history.push(`/notice/${item.REF}`)
                        }}
                        onSearch={(value) => {
                            this.setState({ value }, () => {
                                this.search();
                            })
                        }}
                    />
                    <div className='advancedfilters'>
                        <div className='filter'>
                            <p>Localisation</p>
                            <Input type="select" >
                                <option>?</option>
                                <option>???</option>
                                <option>???</option>
                                <option>???</option>
                            </Input>
                        </div>

                        <div className='filter'>
                            <p>Denomination</p>
                            <DenoSelect
                                value={{ label: this.state.selectedDeno, value: this.state.selectedDeno }}
                                onChange={(e) => {
                                    this.setState({ selectedDeno: e ? e.value : '' }, () => {
                                        this.search()
                                    })
                                }}
                            />
                        </div>

                        <div className='filter'>
                            <p>Niveau de completion</p>
                            <Input type="select" >
                                <option>Sans photo</option>
                                <option>Incomplet</option>
                                <option>Complet</option>
                            </Input>
                        </div>
                    </div>
                    <div className='results'>
                        <div className='header'>
                            <p>{`${this.state.totalCount} resultats pour votre recherche`}</p>
                            <Button onClick={this.export.bind(this)}>Export</Button>
                        </div>
                        {this.renderResults()}
                    </div>
                </Container>
            </div >
        );
    }
}

        /*
<option>palissy</option>
                <option>merimee</option>
                <option>memoire</option>
                <option>joconde</option>
                */