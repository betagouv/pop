import React from "react";
import { Switch, Route } from "react-router-dom";

import Merimee from "./Merimee";
import Joconde from "./Joconde";
import Mnr from "./Mnr";
import Memoire from "./Memoire";
import Palissy from "./Palissy";

import "../simple/index.css";

export default () => {
  return (
    <div>
      <Switch>
        <Route
          path={`/recherche-avancee/merimee`}
          component={() => <Merimee />}
        />
        <Route
          path={`/recherche-avancee/palissy`}
          component={() => <Palissy />}
        />
        <Route path={`/recherche-avancee/mnr`} component={() => <Mnr />} />
        <Route
          path={`/recherche-avancee/joconde`}
          component={() => <Joconde />}
        />
        <Route
          path={`/recherche-avancee/memoire`}
          component={() => <Memoire />}
        />
      </Switch>
    </div>
  );
};
