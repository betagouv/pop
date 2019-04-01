import React from "react";
import { Switch, Route } from "react-router-dom";

import Merimee from "./Merimee";
import Joconde from "./Joconde";
import Mnr from "./Mnr";
import Memoire from "./Memoire";
import Palissy from "./Palissy";
import Museo from "./Museo";
import Enluminures from "./Enluminures";
import Autor from "./Autor";

import "../simple/index.css";

export default () => {
  return (
    <div>
      <Switch>
        <Route path={`/recherche-avancee/merimee`} component={Merimee} />
        <Route path={`/recherche-avancee/palissy`} component={Palissy} />
        <Route path={`/recherche-avancee/mnr`} component={Mnr} />
        <Route path={`/recherche-avancee/joconde`} component={Joconde} />
        <Route path={`/recherche-avancee/memoire`} component={Memoire} />
        <Route path={`/recherche-avancee/museo`} component={Museo} />
        <Route path={`/recherche-avancee/enluminures`} component={Enluminures} />
        <Route path={`/recherche-avancee/autor`} component={Autor} />
      </Switch>
    </div>
  );
};
