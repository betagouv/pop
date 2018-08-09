import React from 'react';
import { Row, Col } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Signin from './signin';
import Forget from './forget';
import UpdatePassword from './updatePassword';

import './index.css';

export default (props) => {

  const { url } = props.match;
  return (
    <div className="auth" >
      <Switch >
        <Route exact path={`${url}/signin`} render={() => <Signin />} />
        <Route exact path={`${url}/forget`} render={() => <Forget />} />
        <Route exact path={`${url}/updatePassword`} render={() => <UpdatePassword />} />
      </Switch>
    </div>
  );
}