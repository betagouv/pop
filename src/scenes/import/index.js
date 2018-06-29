import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HeaderBase from './../headerBase';

import Merimee from './merimee';
import Joconde from './joconde';
import Mnr from './mnr';
import Palissy from './palissy';

export default (props) => {
    return (
        <div>
            <HeaderBase collection={props.match.params.collection} />
            <Switch>
                {/* <Route path={`/search/merimee`} component={Merimee} />
                <Route path={`/search/palissy`} component={Palissy} />
                <Route path={`/search/mnr`} component={Mnr} /> */}
                <Route path={`/import/joconde`} component={Joconde} />
            </Switch>
        </div>
    );
}


