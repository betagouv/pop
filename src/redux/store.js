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
  const enhancers = [];

  if (process.env.NODE_ENV === 'dev' && typeof window !== 'undefined') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
  }

  const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer
    }),
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  );
  sagaMiddleware.run(rootSaga);
  return {
    store,
    history
  };
};
