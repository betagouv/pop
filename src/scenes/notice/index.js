import React from 'react';
import { Switch, Route } from 'react-router-dom';

// import HeaderBase from '../headerBase'

import Merimee from './merimee';
import Palissy from './palissy';
import Joconde from './joconde';
import Mnr from './mnr';
import Memoire from './memoire';

import './index.css';

export default () => (
    <div>
        <Switch>
            <Route path={`/notice/merimee/:ref`} component={Merimee} />
            <Route path={`/notice/palissy/:ref`} component={Palissy} />
            <Route path={`/notice/mnr/:ref`} component={Mnr} />
            <Route path={`/notice/joconde/:ref`} component={Joconde} />
            <Route path={`/notice/memoire/:ref`} component={Memoire} />
        </Switch>
    </div>
);
