import React from 'react';
import { Row, Col, Container, Collapse, Badge } from 'reactstrap';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';


export default class Table extends React.Component {

    state = {
        expandedRef: null,
        activePage: 1,
    }

    expandRef(expandedRef) {
        if (this.state.expandedRef === expandedRef) {
            this.setState({ expandedRef: null })
        } else {
            this.setState({ expandedRef })
        }
    }

    render() {
        const { dataSource, title, collection } = this.props;
        if (!dataSource.length) { return <div /> }

        const columnsJSX = [];
        columnsJSX.push(<Col className='col' md='2' key='1'><b>REF</b></Col>)
        columnsJSX.push(<Col className='col' md='7' key='2'><b>TICO</b></Col>)
        columnsJSX.push(<Col className='col' md='2' key='3'><b>DENO</b></Col>)

        const data = [];

        for (var i = (this.state.activePage - 1) * 10; i < (this.state.activePage * 10) && i < dataSource.length; i++) ((i) => {
            //Affichage notices modifiées.
            const r = [];

            r.push(<Col className='col' md='2' key='1'><Link to={`/notice/${collection}/${dataSource[i].notice.REF}`}>{dataSource[i].notice.REF}</Link></Col>)
            r.push(<Col className='col' md='7' key='2'>{dataSource[i].notice.TICO}</Col>)
            r.push(<Col className='col' md='2' key='3'>{dataSource[i].notice.DENO}</Col>)

            if (dataSource[i].messages && dataSource[i].messages.length) {
                r.push(<Col md='1' className='visu' key='visu' >
                    <Badge color="success">
                        {dataSource[i].messages.length}
                    </Badge>
                    {
                        dataSource[i].warnings.length ? <Badge color="warning">
                            {dataSource[i].warnings.length}
                        </Badge> : <div />
                    }
                </Col>)
            }

            data.push(
                <Row key={i} onClick={() => { this.expandRef(dataSource[i].notice.REF) }} >
                    {r}
                </Row>
            )

            const messages = [];
            //Affichage des messages
            if (dataSource[i].messages && dataSource[i].messages.length) {
                for (var j = 0; j < dataSource[i].messages.length; j++) {
                    messages.push(dataSource[i].messages[j])
                }
                for (var j = 0; j < dataSource[i].warnings.length; j++) {
                    messages.push(dataSource[i].warnings[j])
                }
            }

            if (messages.length) {
                data.push(
                    <Collapse key={dataSource[i].notice.REF} isOpen={this.state.expandedRef === dataSource[i].notice.REF}>
                        <div className='col content' >
                            {messages}
                        </div>
                    </Collapse>
                )
            }
        })(i);

        return (
            <div className='section'>
                <h3 style={{ marginBottom: 16 }}>{title} ({dataSource.length})</h3>
                <div className='table'>
                    <Row>{columnsJSX}</Row>
                    {data}
                </div>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={dataSource.length}
                    pageRangeDisplayed={5}
                    onChange={(p) => { this.setState({ activePage: p }) }}
                />
            </div >
        )
    }
}
