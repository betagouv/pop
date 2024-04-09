import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../redux/sagas";
import createRootReducer from "./reducers";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const routeMiddleware = routerMiddleware(history);

export default function configureStore(preloadedState) {
	const composedEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const store = createStore(
		createRootReducer(history), // root reducer with router state
		preloadedState,
		composedEnhancers(
			applyMiddleware(
				routerMiddleware(history), // for dispatching history actions
				sagaMiddleware,
				routeMiddleware,
			),
		),
	);
	sagaMiddleware.run(rootSaga);
	return store;
}
