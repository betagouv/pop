import React from 'react';
import { Row, Col } from 'reactstrap';
import './section.css';


export default ({ title, icon, description, color, children }) => {
    return (
        <div className='section'>
            <Row>
                <Col md="8">
                    <div className='sectionheader'>
                        <img className='icon' src={icon} alt={title} style={{ backgroundColor: color }} />
                        <div className='title'>{title}</div>
                    </div>
                    <hr />
                </Col>
            </Row>
            <Row>
                {children}
            </Row>
        </div>
    )
}
