import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import dotenv from 'dotenv';
import WebFont from 'webfontloader';

import registerServiceWorker from './registerServiceWorker';

import { store, history } from './redux/store';
import PublicRoutes from './router';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

dotenv.load();

WebFont.load({
  google: {
    families: ['Open Sans', 'Comfortaa:400,700', 'sans-serif'],
  },
});

ReactDOM.render(
  <Provider store={store}>
    <PublicRoutes history={history} />
  </Provider>
  , document.getElementById('root')
);

registerServiceWorker();
