import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app";
import "./index.css";
import configureStore from "./redux/store";
import registerServiceWorker from "./registerServiceWorker";

if (process.env.SENTRY_DSN) {
	Raven.config(process.env.SENTRY_DSN, {
		release: `pop-production-${require("../package.json").version}`,
	}).install();
}

if (process.env.AMPLITUDE_API_KEY) {
	amplitude.getInstance().init(AMPLITUDE_API_KEY);
}
const store = configureStore({});

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root"),
);

registerServiceWorker();
