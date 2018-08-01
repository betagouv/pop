import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MH from './MH';
import Joconde from './joconde';
import Mnr from './mnr';
import Inv from './inv';
import InventaireGertrude from './inventaireGertrude';

export default () => {
    return (
        <div>
            <Switch>
                {/* <Route path={`/import/merimee`} component={Merimee} />
                <Route path={`/import/palissy`} component={Palissy} />*/}
                <Route path={`/import/mnr`} component={Mnr} />
                <Route path={`/import/joconde`} component={Joconde} />
                <Route path={`/import/mh`} component={MH} />
                <Route path={`/import/inv`} component={Inv} />
                <Route path={`/import/inventairegertrude`} component={InventaireGertrude} />
            </Switch>
        </div>
    );
}


