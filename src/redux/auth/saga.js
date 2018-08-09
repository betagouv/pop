import { all, takeEvery, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from './actions';

import api from '../../services/api';

export function* signin({ email, password }) {

  try {
    const { user, token, success, msg } = yield api.signin(email, password);
    if (!success) {
      console.log(user);
      yield put({ type: actions.SIGNIN_ERROR, error: msg });
      return;
    }

    yield put({ type: actions.SIGNIN_SUCCESS, user, token });
    yield put(push('/'));
    
    console.log(user);
  } catch (e) {
    console.log(e);
  }
  // lsigninse.getUser(account.uid);
  // console.log('USER', user)
  // if (process.env.NODE_ENV === 'production') {
  //   Raven.setUserContext({ email: account.email, id: account.uid })
  // }

  // 
  //console.log('LOGIN, redirect to /')
}

export function* logOut() {
  // yield put(push('/'));
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.SIGNIN_REQUEST, signin),
    takeEvery(actions.LOGOUT, logOut),
  ]);
}

