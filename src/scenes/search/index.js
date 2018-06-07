import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Merimee from './merimee';
import Joconde from './joconde';
import Mnr from './mnr';
import Palissy from './palissy';

import './index.css';

export default () => {
    return (
        <Switch>
            <Route path={`/search/merimee`} component={Merimee} />
            <Route path={`/search/palissy`} component={Palissy} />
            <Route path={`/search/mnr`} component={Mnr} />
            <Route path={`/search/joconde`} component={Joconde} />
        </Switch>
    );
}


