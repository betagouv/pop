import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Merimee from './merimee';
import Palissy from './palissy';
import Joconde from './joconde';
import Mnr from './mnr';
import Memoire from './memoire';
import NotFound from "../../components/NotFound";
import Helmet from "../../components/Helmet";
import './index.css';


const Notice = () => (
    <div>
        <Helmet 
            title="POP - Plateforme Ouverte du Patrimoine"
            description="POP propose de faire des données patrimoniales un bien commun dont il sera aussi simple de se servir que d’y contribuer."
        />
        <Switch>
            <Route path={`/notice/merimee/:ref`} component={Merimee} />
            <Route path={`/notice/palissy/:ref`} component={Palissy} />
            <Route path={`/notice/mnr/:ref`} component={Mnr} />
            <Route path={`/notice/joconde/:ref`} component={Joconde} />
            <Route path={`/notice/memoire/:ref`} component={Memoire} />
            <Route component={NotFound} />
        </Switch>
    </div>
);

export default Notice;
