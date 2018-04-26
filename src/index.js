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

ReactDOM.render(
  <Provider store={store}>
    <PublicRoutes history={history} />
  </Provider>
  , document.getElementById('root')
);

registerServiceWorker();
