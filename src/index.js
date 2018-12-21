import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import dotenv from "dotenv";
import WebFont from "webfontloader";
import registerServiceWorker from "./registerServiceWorker";
import { store, history } from "./redux/store";
import PublicRoutes from "./router";
import "./index.css";

dotenv.load();

if (process.env.NODE_ENV === "production") {
  Raven.config(
    "https://9cca185065d74dbd9e05987036f2d16d@sentry.data.gouv.fr/21",
    {
      release: "pop-consultation-" + require("../package.json").version
    }
  ).install();
}

WebFont.load({
  google: {
    families: ["Open Sans", "Comfortaa:400,700", "sans-serif"]
  }
});

ReactDOM.render(
  <Provider store={store}>
    <PublicRoutes history={history} />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
