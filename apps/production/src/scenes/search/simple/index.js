import React from "react";
import { Switch, Route } from "react-router-dom";

import Merimee from "./Merimee";
import Joconde from "./Joconde";
import Mnr from "./Mnr";
import Memoire from "./Memoire";
import Palissy from "./Palissy";
import Museo from "./Museo";
import Autor from "./Autor";
import Enluminures from "./Enluminures";
import Home from "./Home";

import "./index.css";
import "../search.css";

const search_message = "Cliquez sur la loupe pour lancer la recherche";

export default () => {
  return (
    <div>
      <Switch>
        <Route path={`/recherche/`} exact component={Home} />
        <Route path={`/recherche/merimee`} component={() => <Merimee message={search_message}/>} />
        <Route path={`/recherche/palissy`} component={() => <Palissy  message={search_message}/>} />
        <Route path={`/recherche/mnr`} component={() => <Mnr message={search_message}/>} />
        <Route path={`/recherche/joconde`} component={() => <Joconde message={search_message}/>} />
        <Route path={`/recherche/memoire`} component={() => <Memoire message={search_message}/>} />
        <Route path={`/recherche/museo`} component={() => <Museo message={search_message}/>} />
        <Route path={`/recherche/autor`} component={() => <Autor message={search_message}/>} />
        <Route path={`/recherche/enluminures`} component={() => <Enluminures message={search_message}/>} />
      </Switch>
    </div>
  );
};
