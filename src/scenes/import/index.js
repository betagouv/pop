import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MerimeeMH from './merimeeMH';
import PalissyMH from './palissyMH';
import Joconde from './joconde';
import Mnr from './mnr';
import InventaireGertrude from './inventaireGertrude';
import InventaireRenable from './inventaireRenable';

export default () => {
    return (
        <div>
            <Switch>
                {/* <Route path={`/import/merimee`} component={Merimee} />
                <Route path={`/import/palissy`} component={Palissy} />*/}
                <Route path={`/import/mnr`} component={Mnr} />
                <Route path={`/import/joconde`} component={Joconde} />
                <Route path={`/import/merimeeMH`} component={MerimeeMH} />
                <Route path={`/import/palissyMH`} component={PalissyMH} />
                <Route path={`/import/inventaire_gertrude`} component={InventaireGertrude} />
                <Route path={`/import/inventaire_renable`} component={InventaireRenable} />
            </Switch>
        </div>
    );
}


