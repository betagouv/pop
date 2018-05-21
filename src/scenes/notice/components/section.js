import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import './section.css';


export default ({ title, icon, description, children }) => {
    return (
        <div className='section'>
            <Row>
                <Col md="8">
                    <div className='sectionheader'>
                        <img src={icon} alt={title} />
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
                    <span className='verticalLine' />
                    <div className='subtitle'>Comment remplir cette section</div>
                    <div>{description}</div>
                    <Button >En savoir plus</Button>
                </Col>
            </Row>
        </div>
    )
}
