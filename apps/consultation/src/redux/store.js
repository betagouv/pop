import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createHistory from "history/createBrowserHistory";
import { routerReducer, routerMiddleware } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import reducers from "../redux/reducers";
import rootSaga from "../redux/sagas";

const history = createHistory();
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
export { store, history };
