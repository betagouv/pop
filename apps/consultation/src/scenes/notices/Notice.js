import React from "react";
import { Switch, Route } from "react-router-dom";
import Merimee from "./Merimee";
import Palissy from "./Palissy";
import Joconde from "./Joconde";
import Mnr from "./Mnr";
import Memoire from "./Memoire";
import NotFound from "../../components/NotFound";
import "./Notice.css";

const Notice = () => (
  <div>
    <Switch>
      <Route path={`/notice/merimee/:ref`} component={Merimee} />
      <Route path={`/notice/palissy/:ref`} component={Palissy} />
      <Route path={`/notice/mnr/:ref`} component={Mnr} />
      <Route path={`/notice/joconde/:ref`} component={Joconde} />
      <Route path={`/notice/memoire/:ref`} component={Memoire} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default Notice;
