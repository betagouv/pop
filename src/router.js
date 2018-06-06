import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import { connect } from 'react-redux';
import ReduxToastr from 'react-redux-toastr'
import Header from './scenes/header';

import Home from './scenes/home';
import Search from './scenes/search';
import Notice from './scenes/notice';
import Import from './scenes/import';

export default class PublicRoutes extends React.Component {
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
            <Route exact path={'/search'} component={Search} />
            <Route exact path={'/import'} component={Import} />
            <Route exact path={'/notice/:ref'} component={Notice} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

