import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import ReduxToastr from 'react-redux-toastr'
import { connect } from 'react-redux';
import Header from './scenes/header';

import Home from './scenes/home';
import Search from './scenes/search';
import Notice from './scenes/notice';
import Admin from './scenes/admin';
import Import from './scenes/import';
import Thesaurus from './scenes/thesaurus';
import Auth from './scenes/auth';

class PublicRoutes extends React.Component {

  componentWillReceiveProps(newProps) {
    console.log(newProps);
  }

  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div className='main'>
          <ReduxToastr
            timeOut={2000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
          />
          <Header />
          <Switch>
            <RestrictedRoute exact path={'/'} component={Home} isLoggedIn={this.props.isLoggedIn} />
            <Route path={'/auth/'} component={Auth} />
            <RestrictedRoute exact path={'/thesaurus'} component={Thesaurus} isLoggedIn={this.props.isLoggedIn} />
            <RestrictedRoute path={'/recherche/'} component={Search} isLoggedIn={this.props.isLoggedIn} />
            <RestrictedRoute path={'/admin/'} component={Admin} isLoggedIn={this.props.isLoggedIn} />
            <RestrictedRoute path={'/import/'} component={Import} isLoggedIn={this.props.isLoggedIn} />
            <RestrictedRoute path={'/notice/:collection/:ref'} component={Notice} isLoggedIn={this.props.isLoggedIn} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) =>
  (<Route
    {...rest}
    render={(props) => {
      if (isLoggedIn) {
        return (
          <div>
            <Component {...props} />
          </div>
        );
      }
      return <Redirect to={{ pathname: '/auth/signin', state: { from: props.location } }} />;
    }}
  />);

const mapstatetoprops = ({ Auth }) => {
  return ({
    isLoggedIn: !!Auth.user
  })
}
export default connect(mapstatetoprops, {})(PublicRoutes);
