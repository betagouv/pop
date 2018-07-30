import React from 'react';

import './index.css';

export default (props) => (
    <div className="step-two">
        <h4>Controle et validation de import</h4>
        <div className="step-box d-flex flex-column justify-content-center align-items-center p-3">
            <p>Vous vous appertez verser dans la base Jeconde les fichier suivants:</p>
            <p className="lead mb-1">davinci.txt</p>
            <p className="lead">louvre.txt</p>
            <div className="details d-flex flex-column text-left">
                <p>Ces fichiers totalisent 456 notices, dont 245 dont illustrees. Parmi ces 456 notices: </p>
                <ul className="list-unstyled">
                    <li className="green">395 sont des nouvelles notices (non creees precedemment)</li>
                    <li className="orange">63 sont des notices modifiees (par rapport aux precedents imports dans Jaconde)</li>
                    <li className="red">7 notices ne peuvent etre importees car non conformes </li>
                    <li className="yellow" >234 notices presentent un avertissement non bloquant pout I'import</li>
                </ul>
                <button className="btn btn-sm d-inline-block align-self-end">+ de details</button>
            </div>
        </div>
    </div>
)
