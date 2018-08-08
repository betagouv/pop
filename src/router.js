import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import ReduxToastr from 'react-redux-toastr'
import Header from './scenes/header';

import Home from './scenes/home';
import Search from './scenes/search';
import Notice from './scenes/notice';
import Admin from './scenes/admin';
import Import from './scenes/import';
import Thesaurus from './scenes/thesaurus';
import Auth from './scenes/auth';

export default class PublicRoutes extends React.Component {

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
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/auth/:step'} component={Auth} />
            <Route exact path={'/thesaurus'} component={Thesaurus} />
            <Route path={'/recherche/'} component={Search} />
            <Route path={'/admin/'} component={Admin} />
            <Route path={'/import/:collection'} component={Import} />
            <Route path={'/notice/:collection/:ref'} component={Notice} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

