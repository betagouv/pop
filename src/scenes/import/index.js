import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Joconde from './joconde';
import Mnr from './mnr';
import Inventaire from './inventaire';

export default (props) => {
    return (
        <div>
            <Switch>
                {/* <Route path={`/import/merimee`} component={Merimee} />
                <Route path={`/import/palissy`} component={Palissy} />*/}
                <Route path={`/import/mnr`} component={Mnr} />
                <Route path={`/import/joconde`} component={Joconde} />
                <Route path={`/import/inventaire`} component={Inventaire} />
            </Switch>
        </div>
    );
}


