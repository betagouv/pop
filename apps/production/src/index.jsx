import "./instrumentation";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app";
import "./index.css";
import configureStore from "./redux/store";
import registerServiceWorker from "./registerServiceWorker";

if (process.env.AMPLITUDE_API_KEY) {
	amplitude.getInstance().init(AMPLITUDE_API_KEY);
}
const store = configureStore({});

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root"),
);

registerServiceWorker();
