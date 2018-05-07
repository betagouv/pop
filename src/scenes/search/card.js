import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import './card.css';

export default ({ data }) => {
    return (
        <div className='card' >
            <Row>
                <Col className="">
                    <p>{data.REF}</p>
                </Col>
                <Col className="">
                    <p>{data.DENO}</p>
                </Col>
                <Col className="">
                    <p>{data.LOCA}</p>
                </Col>
                <Col className="">
                    <p>{data.DOMN}</p>
                </Col>
                <Col className="">
                    <p>{data.DMAJ}</p>
                </Col>
                <Col className="actions">
                    <Link to={`/notice/${data.REF}`} >
                        <Button color="primary">Voir</Button>
                    </Link>
                    <Link to={`/notice/${data.REF}`} >
                        <Button color="primary">Editer</Button>
                    </Link>
                    <Link to={`/notice/${data.REF}`} >
                        <Button color="primary">Télécharger</Button>
                    </Link>
                </Col>
            </Row>
        </div>
    );
}

