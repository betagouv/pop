import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HeaderBase from './components/headerBase';

import Merimee from './merimee';
import Joconde from './joconde';
import Mnr from './mnr';
import Memoire from './memoire';
import Palissy from './palissy';

import './index.css';

export default (props) => {
    return (
        <div>
            <HeaderBase collection={props.match.params.collection} />
            <Switch>
                <Route path={`/search/merimee`} component={Merimee} />
                <Route path={`/search/palissy`} component={Palissy} />
                <Route path={`/search/mnr`} component={Mnr} />
                <Route path={`/search/joconde`} component={Joconde} />
                <Route path={`/search/memoire`} component={Memoire} />
            </Switch>
        </div>
    );
}


