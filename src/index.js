import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import dotenv from "dotenv";
import WebFont from "webfontloader";
import { BrowserRouter, matchPath } from "react-router-dom";

import registerServiceWorker from "./registerServiceWorker";
import createStore, { isServer } from "./redux/store";
import { onFetch, onCollectionFetch } from './redux/sagas';
import PublicRoutes from "./router";
import ContextProvider from "./ContextProvider";

const { store, history } = createStore();

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

const css = new Set(); // CSS for all rendered React components
const injectCssContext = {
  insertCss: (...styles) => {
    return styles.forEach(style => {
        if(style) {
          css.add(style._getCss());
        }
    })
  }
};

const promises = [];
if(!isServer && location) {
  const pathName = location.pathname;
  const matchNotice = matchPath( pathName, {
    path: `/notice/:baseNotice/:ref`,
    exact: false,
    strict: false
  });

  if(matchNotice 
    && matchNotice.params 
    && matchNotice.params.ref 
    && matchNotice.params.baseNotice
    && ( 
      matchNotice.params.baseNotice === "joconde" 
      || matchNotice.params.baseNotice === "memoire" 
      || matchNotice.params.baseNotice === "merimee"
      || matchNotice.params.baseNotice === "mnr"
      || matchNotice.params.baseNotice === "palissy"
    )
  ) {
    if(matchNotice.params.baseNotice === "joconde" || matchNotice.params.baseNotice === "mnr") {
      promises.push(new Promise(
        (resolve) => {
          onFetch({base: matchNotice.params.baseNotice, ref: matchNotice.params.ref}).then(
            (notice) => {
              store.dispatch({
                type: "notice/DID_FETCH",
                notice,
                links: null,
              })
              resolve();
            }
          )
        }
      ));
    } else if(matchNotice.params.baseNotice === "memoire" || matchNotice.params.baseNotice === "merimee" || matchNotice.params.baseNotice === "palissy") {
      promises.push(new Promise(
        (resolve) => {
          let notice = null;
          onFetch({base: matchNotice.params.baseNotice, ref: matchNotice.params.ref}).then(
            (resultNotice) => {
              notice = resultNotice;
              return onCollectionFetch(notice, matchNotice.params.baseNotice);
            }
          ).then(
            (links) => {
              store.dispatch({
                type: "notice/DID_FETCH",
                notice,
                links,
              })
              resolve();
            }
          );
        }
      ));
    }
  }
}

Promise.all( promises ).then(
  ()=>{
    ReactDOM.hydrate(
      <Provider store={store}>
            <ContextProvider context={injectCssContext}>
              <PublicRoutes history={history} />
            </ContextProvider>
      </Provider>,
      document.getElementById("root")
    );
    
    registerServiceWorker();
  }
);
