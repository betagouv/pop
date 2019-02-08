import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import dotenv from "dotenv";
import App from "./app";
import registerServiceWorker from "./registerServiceWorker";
import { store } from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

dotenv.load();

if (process.env.NODE_ENV === "production") {
  Raven.config("https://9cca185065d74dbd9e05987036f2d16d@sentry.data.gouv.fr/21", {
    release: "pop-production-" + require("../package.json").version
  }).install();
}

if (process.env.NODE_ENV === "production") {
  amplitude.getInstance().init("91193206fbbafb6ab42aebba6c765819");
} else {
  amplitude.getInstance().init("e67834238a49cf416bacf47c3d8055c4");
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
