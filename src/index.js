import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import dotenv from 'dotenv';
import WebFont from 'webfontloader';
import App from './app'

import registerServiceWorker from './registerServiceWorker';

import { store } from './redux/store';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

WebFont.load({
  google: {
    families: ['Open Sans', 'Work Sans:400,500,700', 'Quicksand', 'sans-serif', 'Comfortaa', 'Nunito']
  }
});

dotenv.load();

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  console.log("RUN RAVEN")
  Raven.config('https://35972ad83fff46c69b160ad6bde8e96d@sentry.io/1235014').install()
}

if (process.env.NODE_ENV === 'production') {
  amplitude.getInstance().init("91193206fbbafb6ab42aebba6c765819");
} else {
  amplitude.getInstance().init("e67834238a49cf416bacf47c3d8055c4");
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);

registerServiceWorker();
