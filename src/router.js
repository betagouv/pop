import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import PiwikReactRouter from "piwik-react-router";

import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./scenes/header";
import Footer from "./scenes/footer";
import NotFound from "./components/NotFound";
import Helmet from "./components/Helmet";

import Home from "./scenes/home";
import Search from "./scenes/search";
import Opendata from "./scenes/opendata";
import Notice from "./scenes/notice"
import Museo from "./scenes/museo"

import ScrollToTop from "./components/ScrollToTop";

const piwik = PiwikReactRouter({
  url: "https://stats.data.gouv.fr",
  siteId: 63
});
piwik.push([
  "setDomains",
  ["*.pop.beta.gouv", "*.pop.culture.gouv.fr", "*.production.pop.beta.gouv.fr"]
]);

export default class PublicRoutes extends React.Component {
  render() {
    return (
      <ConnectedRouter history={piwik.connectToHistory(this.props.history)}>
        <div className="main">
          <Helmet
            title="POP - Plateforme Ouverte du Patrimoine"
            description="POP propose de faire des données patrimoniales un bien commun dont il sera aussi simple de se servir que d’y contribuer."
          />
          <ScrollToTop />
          <Header />
          <ErrorBoundary>
            <Switch>
              <Route exact path={"/"} component={Home} />
              <Route path={"/search"} component={Search} />
              <Route exact path={"/opendata"} component={Opendata} />
              <Route path={"/notice/:ref"} component={Notice} />
              <Route path={"/museo/:ref"} component={Museo} />
              <Route component={NotFound} />
            </Switch>
          </ErrorBoundary>
          <Footer />
        </div>
      </ConnectedRouter>
    );
  }
}
