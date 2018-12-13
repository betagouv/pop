import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./scenes/header";
import Footer from "./scenes/footer";
import NotFound from "./components/NotFound";
import Helmet from "./components/Helmet";

import Home from "./scenes/home";
import Search from "./scenes/search";
import Opendata from "./scenes/opendata";
import Notice from "./scenes/notice";

import PiwikReactRouter from "piwik-react-router";

import ScrollToTop from "./components/ScrollToTop";

import routerStyles from './index.css';
import viewerStyles from  "!!isomorphic-style-loader!css-loader!react-viewer/dist/index.css";
import galleryStyles from '!!isomorphic-style-loader!css-loader!react-image-gallery/styles/css/image-gallery.css';
import multiListStyles from "!!isomorphic-style-loader!css-loader!pop-shared/dist/MultiList.css";
import notFoundStyles from './components/NotFound/index.css';
import loaderStyles from './components/loader/index.css';
import homeStyles from './scenes/home/index.css';
import searchStyles from './scenes/search/index.css';
import listCardStyles from "./scenes/search/subComponents/List/CardList.css";
import mapStyles from "./scenes/search/subComponents/Map/map.css";
import cardMapStyles from "./scenes/search/subComponents/Map/CardMap.css";
import mapLinkedNoticesStyles from "./scenes/search/subComponents/Map/subComponents/LinkedNotices/LinkedNotices.css";
import mapSingleNoticeStyles from "./scenes/search/subComponents/Map/subComponents/SingleNotice/singleNotice.css";
import mosaiqueCardStyles from "./scenes/search/subComponents/Mosaique/CardMosaique.css";
import noticeStyles from './scenes/notice/index.css';
import titleNoticeStyles from "./scenes/notice/components/title.css";
import fieldNoticeStyles from "./scenes/notice/components/field.css";
import fieldImagesStyles from "./scenes/notice/components/fieldImages.css";
import noticeMapStyles from "./scenes/notice/components/map.css";
import linkedNoticesStyles from "./scenes/notice/components/LinkedNotices.css";
import openDataStyles from './scenes/opendata/index.css';

 const piwik = PiwikReactRouter({
  url: "https://stats.data.gouv.fr",
   siteId: 63
 });
 piwik.push([
   "setDomains",
   ["*.pop.beta.gouv", "*.pop.culture.gouv.fr", "*.production.pop.beta.gouv.fr"]
 ]);

class PublicRoutes extends React.Component {
  componentWillReceiveProps(newProps) {}

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
              <Route component={NotFound} />
            </Switch>
          </ErrorBoundary>
          <Footer />
        </div>
      </ConnectedRouter>
    );
  }
}

export default withStyles(
  routerStyles,
  viewerStyles,
  galleryStyles,
  multiListStyles,
  notFoundStyles,
  loaderStyles,
  homeStyles,
  searchStyles,
  listCardStyles, 
  mapStyles, 
  cardMapStyles, 
  mapLinkedNoticesStyles, 
  mapSingleNoticeStyles, 
  mosaiqueCardStyles,
  noticeStyles,
  titleNoticeStyles,
  fieldNoticeStyles,
  fieldImagesStyles,
  noticeMapStyles,
  linkedNoticesStyles,
  openDataStyles,
)(PublicRoutes);
