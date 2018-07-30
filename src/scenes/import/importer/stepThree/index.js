import React from 'react';

import './index.css';

export default (props) => (
    <div className="step-three">
        <h4>Confrimation de I’import</h4>
        <div className="step-box d-flex flex-column justify-content-center align-items-center">
            <p className="contribution-text">Vous avez importe avec succes 456 notices. Merci pour votre contribution!</p>
            <p>Vous pouvez recuperer le rapport d'import en nous laissant vos coordonnees mail</p>
            <div className="mb-5 d-flex w-100">
                <input type="email" placeholder="Saisissez votre mail" className="form-control mr-2" />
                <button onClick={() => props.submitEmail()} className="btn envoyer px-4">Envoyer!</button>
            </div>
            <p className="mb-1">Vous pouvez consulter les notices importees au lien suivant:</p>
            <a href="/" className="underlined-text">Lien vers la consultation avec criteres de recherche pre-remplis (etablissement + date)</a>
        </div>
    </div>
);
