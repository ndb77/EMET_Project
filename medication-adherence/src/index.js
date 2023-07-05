import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap/css/bootstrap.min.css'
import './css/styles.css'

import App from './App';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import {StoreProvider} from 'easy-peasy'
import store from './store'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <StoreProvider store={store}>
  <Router>
    <Route path='/' component={App}>
    </Route>
  </Router>
  </StoreProvider>
);


