import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import IndexPage from './components/IndexPage';
import RegisterPage from './components/RegisterPage';
import CreatePet from './components/CreatePet';
import Dashboard from './components/Dashboard';
import './App.css'
import userReducer from './store/reducers/userReducer';
import petReducer from './store/reducers/petReducer';

const rootReducer = combineReducers({
  userR: userReducer,
  petsR: petReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
      applyMiddleware(thunk) // middleware 
    ));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <BaseLayout>
          <Switch>
            <Route path="/index" component={IndexPage} />
            <Route path="/register" component={RegisterPage} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/dashboard/create-pet" component={CreatePet} />
            <Redirect from='/' to='/index' />
          </Switch>
        </BaseLayout>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
