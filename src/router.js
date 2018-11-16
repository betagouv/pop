import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import Header from './scenes/header';
import Footer from './scenes/footer';
import NotFound from "./components/NotFound";

import Home from './scenes/home';
import Search from './scenes/search';
import Opendata from './scenes/opendata';
import Notice from './scenes/notice';

import PiwikReactRouter from 'piwik-react-router';

import ScrollToTop from "./components/ScrollToTop";

const piwik = PiwikReactRouter({
	url: 'https://stats.data.gouv.fr',
	siteId: 63
});
piwik.push(["setDomains", ["*.pop.beta.gouv","*.pop.culture.gouv.fr","*.production.pop.beta.gouv.fr"]]);

export default class PublicRoutes extends React.Component {

  componentWillReceiveProps(newProps){
  }

  render() {
    return (
      <ConnectedRouter history={piwik.connectToHistory(this.props.history)}>
        <div className='main'>
          <ScrollToTop />
          <Header />
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route path={'/search'} component={Search} />
            <Route path={'/opendata'} component={Opendata} />
            <Route path={'/notice/:ref'} component={Notice} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </ConnectedRouter>
    );
  }
}
