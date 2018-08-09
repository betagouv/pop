import React from 'react';
import { Row, Col } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Signin from './signin';
import Forget from './forget';

import './index.css';

export default (props) => {

  const { url } = props.match;

  console.log(props, `${url}/signin`)
  return (
    <div className="auth" >
      <Switch >
        <Route exact path={`${url}/signin`} render={() => <Signin />} />
        <Route exact path={`${url}/forget`} render={() => <Forget />} />
      </Switch>
    </div>
  );
}