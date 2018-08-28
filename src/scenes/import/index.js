import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Mh from './mh';
import Joconde from './joconde';
import Mnr from './mnr';
import Inv from './inv';
import Sap from './sap';
    
export default () => {
    return (
        <div>
            <Switch>
                <Route path={`/import/sap`} component={Sap} />
                <Route path={`/import/mnr`} component={Mnr} />
                <Route path={`/import/joconde`} component={Joconde} />
                <Route path={`/import/mh`} component={Mh} />
                <Route path={`/import/inv`} component={Inv} />
            </Switch>
        </div>
    );
}


