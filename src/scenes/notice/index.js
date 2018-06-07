import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Merimee from './merimee';
// import Joconde from './joconde';
// import Mnr from './mnr';
// import Palissy from './palissy';

import './index.css';

export default () => {
    return (
        <Switch>
            <Route path={`/notice/merimee/:ref`} component={Merimee} />
            {/* <Route path={`/notice/palissy/:ref`} component={Palissy} /> */}
            {/* <Route path={`/notice/mnr/:ref`} component={Mnr} /> */}
            {/* <Route path={`/notice/joconde/:ref`} component={Joconde} /> */}
        </Switch>
    );
}


