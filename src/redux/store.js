import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createBrowserHistory, createMemoryHistory } from 'history';

import { routerReducer, routerMiddleware } from 'react-router-redux';

import createSagaMiddleware from 'redux-saga';
import reducers from '../redux/reducers';
import rootSaga from '../redux/sagas';

export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export default (url = '/') => {  
  const history = isServer
    ? createMemoryHistory({
        initialEntries: [url]
      })
    : createBrowserHistory();

  const sagaMiddleware = createSagaMiddleware();
  const routerMiddlewareWithHistory = routerMiddleware(history);
  const middlewares = [sagaMiddleware, routerMiddlewareWithHistory];

  const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer
    }),
    compose(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(rootSaga);
  return {
    store,
    history
  };
};
