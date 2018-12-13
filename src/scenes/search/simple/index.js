import React from "react";
import { Switch, Route } from "react-router-dom";

import Merimee from "./Merimee";
import Joconde from "./Joconde";
import Mnr from "./Mnr";
import Memoire from "./Memoire";
import Palissy from "./Palissy";
import Home from "./Home";

import "./index.css";

export default () => {
  return (
    <div>
      <Switch>
        <Route path={`/recherche/`} exact component={Home} />
        <Route path={`/recherche/merimee`} component={() => <Merimee />} />
        <Route path={`/recherche/palissy`} component={() => <Palissy />} />
        <Route path={`/recherche/mnr`} component={() => <Mnr />} />
        <Route path={`/recherche/joconde`} component={() => <Joconde />} />
        <Route path={`/recherche/memoire`} component={() => <Memoire />} />
      </Switch>
    </div>
  );
};
