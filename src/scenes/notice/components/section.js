import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import './section.css';


export default ({ title, icon, description, color, children }) => {
    return (
        <div className='section'>
            <Row>
                <Col md="8">
                    <div className='sectionheader'>
                        <img src={icon} alt={title} style={{ backgroundColor: color }} />
                        <div className='title'>{title}</div>
                    </div>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col md="8">
                    {children}
                </Col>
                <Col md="4">
                    <div className='subtitle' style={{ borderColor: color }}>Comment remplir cette section</div>
                    <div>{description}</div>
                    <Button >En savoir plus</Button>
                </Col>
            </Row>
        </div>
    )
}
