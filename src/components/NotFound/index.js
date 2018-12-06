import React from 'react';
import { Container } from 'reactstrap';
import courbet from '../../assets/courbet.jpeg';

const NotFound = () => (
    <Container className="notice-not-found" fluid>
        <div className="notice-not-found-left">
            <h1>POPSI !</h1>
            <p>
                La page que vous recherchez est introuvable...<br/><br/>
                Ne désespérez pas, nos archéobogues sont sur le coup !<br/>
                Vous pouvez{" "}
                <a href="/">essayer une nouvelle recherche</a>
            </p>
        </div>
        <div className="notice-not-found-right">
            <img src={courbet} alt="Gustave courbet, le désespéré"/><br/>
            Gustave courbet, le désespéré
        </div>
    </Container>
);

export default NotFound;