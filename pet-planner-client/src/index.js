import React from 'react';
import ReactDOM from 'react-dom';
import IndexPage from './components/IndexPage';
import CreatePet from './components/CreatePet';
import reportWebVitals from './reportWebVitals';
import { Router, Switch, Route } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './store/reducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { history } from './helpers/history';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider store={store}>
        <BaseLayout>
          <Switch>
            <Route path='/index' component={IndexPage} />
            <Route path='/dashboard' component={CreatePet} />
          </Switch>
        </BaseLayout>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
