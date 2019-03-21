import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from './ducks/store'




ReactDOM.render(
<Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <HashRouter>
      <App />
    </HashRouter>
  </PersistGate>
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
