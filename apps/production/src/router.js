import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import ReduxToastr from "react-redux-toastr";
import { connect } from "react-redux";
import Header from "./scenes/header";

import Home from "./scenes/home";
import SimpleSearch from "./scenes/search/simple";
import AdvancedSearch from "./scenes/search/advanced";
import Notice from "./scenes/notice";
import Admin from "./scenes/admin";
import Producteur from "./scenes/producteur";
import Groups from "./scenes/groups";
import Import from "./scenes/import";
import Gallery from "./scenes/gallery";
import Thesaurus from "./scenes/thesaurus";
import Auth from "./scenes/auth";
import ScrollTop from "./components/ScrollTop";

class PublicRoutes extends React.Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <ScrollTop>
          <div className="main">
            <ReduxToastr
              timeOut={2000}
              newestOnTop={false}
              preventDuplicates
              position="top-right"
              transitionIn="fadeIn"
              transitionOut="fadeOut"
              confirmOptions={{ okText: "Oui", cancelText: "Annuler" }}
            />
            <Header />
            <Switch>
              <RestrictedRoute
                exact
                path={"/"}
                component={Home}
                isLoggedIn={this.props.isLoggedIn}
                hasResetPassword={this.props.hasResetPassword}
              />
              <Route path={"/auth/"} component={Auth} />
              <Route
                exact
                path={"/thesaurus"}
                component={Thesaurus}
                isLoggedIn={this.props.isLoggedIn}
                hasResetPassword={this.props.hasResetPassword}
              />
              <RestrictedRoute
                path={"/recherche/"}
                component={SimpleSearch}
                isLoggedIn={this.props.isLoggedIn}
                hasResetPassword={this.props.hasResetPassword}
              />
              <RestrictedRoute
                path={"/recherche-avancee/"}
                component={AdvancedSearch}
                isLoggedIn={this.props.isLoggedIn}
                hasResetPassword={this.props.hasResetPassword}
              />
              <RestrictedRoute
                path={"/admin/"}
                component={Admin}
                isLoggedIn={this.props.isLoggedIn}
                hasResetPassword={this.props.hasResetPassword}
              />
              <RestrictedRoute
                path={"/producteur/"}
                component={Producteur}
                isLoggedIn={this.props.isLoggedIn}
                hasResetPassword={this.props.hasResetPassword}
              />
              <RestrictedRoute
                path={"/groups/"}
                component={Groups}
                isLoggedIn={this.props.isLoggedIn}
                hasResetPassword={this.props.hasResetPassword}
              />
              <RestrictedRoute
                path={"/import/"}
                component={Import}
                isLoggedIn={this.props.isLoggedIn}
                hasResetPassword={this.props.hasResetPassword}
              />
              <RestrictedRoute
                path={"/gallery/"}
                component={Gallery}
                isLoggedIn={this.props.isLoggedIn}
                hasResetPassword={this.props.hasResetPassword}
              />
              <RestrictedRoute
                path={"/notice/:collection/:ref"}
                component={Notice}
                isLoggedIn={this.props.isLoggedIn}
                hasResetPassword={this.props.hasResetPassword}
              />
            </Switch>
          </div>
        </ScrollTop>
      </ConnectedRouter>
    );
  }
}

const RestrictedRoute = ({ component: Component, isLoggedIn, hasResetPassword, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (isLoggedIn) {
        if (!hasResetPassword) {
          return (
            <Redirect to={{ pathname: "/auth/updatePassword", state: { from: props.location } }} />
          );
        }
        return (
          <div>
            <Component {...props} />
          </div>
        );
      }
      return <Redirect to={{ pathname: "/auth/signin", state: { from: props.location } }} />;
    }}
  />
);

const mapstatetoprops = ({ Auth }) => {
  return {
    isLoggedIn: !!Auth.user,
    hasResetPassword: !!Auth.user && Auth.user.hasResetPassword
  };
};
export default connect(
  mapstatetoprops,
  {}
)(PublicRoutes);
