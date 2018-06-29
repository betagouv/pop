import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import dotenv from 'dotenv';

import registerServiceWorker from './registerServiceWorker';

import { store, history } from './redux/store';
import PublicRoutes from './router';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

dotenv.load();

Raven.config('https://35972ad83fff46c69b160ad6bde8e96d@sentry.io/1235014').install()

Raven.context(function () { initMyApp(); });

ReactDOM.render(
  <Provider store={store}>
    <PublicRoutes history={history} />
  </Provider>
  , document.getElementById('root')
);

registerServiceWorker();
