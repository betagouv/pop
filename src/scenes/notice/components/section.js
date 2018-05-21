import React from 'react';
import { Row, Col, Button} from 'reactstrap';
import './section.css';


export default ({ title }) => {
    return (
        <div className='section'>
            <Row>
                <Col md="8">
                    <div className='sectionheader'>
                        <img src={require('../../../assets/info.png')} alt="GENERALES INFORMATIONS" />
                        <div className='title'>GENERALES INFORMATIONS</div>
                    </div>
                    <hr />
                </Col>
            </Row>
            <Row>
                <Col md="8">
                    hey
                </Col>
                <Col md="4">
                    <span className='verticalLine' />
                    <div className='subtitle'>Comment remplir cette section</div>
                    <div>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugia
                                </div>
                    <Button >En savoir plus</Button>
                </Col>
            </Row>
        </div>
    )
}
