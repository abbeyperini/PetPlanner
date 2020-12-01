import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import CreatePet from './components/CreatePet';
import EditPet from './components/EditPet';
import IndexPage from './components/IndexPage';
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './store/reducer';
import { Provider } from 'react-redux';
import RegisterPage from './components/RegisterPage';
import thunk from 'redux-thunk';
import { history } from './store/helpers/history';
import { PrivateRoute } from './components/PrivateRoute';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter history={history}>
      <Provider store={store}>
        <BaseLayout>
          <Switch>
            <Route exact path="/">
              <Redirect to="/index"></Redirect>
            </Route>
            <Route component = {IndexPage} path="/index" exact />
            <Route component = {RegisterPage} path="/register" exact />
            <PrivateRoute component = {App} path="/dashboard" exact/>
            <PrivateRoute component = {CreatePet} path="/dashboard/create-pet" exact/>
            <PrivateRoute component = {EditPet} path="/dashboard/pet/edit/:id" exact/>
          </Switch>
        </BaseLayout>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
