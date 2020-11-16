import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import CreatePet from './components/CreatePet';
import EditPet from './components/EditPet';
import IndexPage from './components/IndexPage';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <BaseLayout>
      <Switch>
        <Route exact path="/">
          <Redirect to="/index"></Redirect>
        </Route>
        <Route component = {IndexPage} path="/index" exact />
        <Route component = {App} path="/dashboard" exact/>
        <Route component = {CreatePet} path="/dashboard/create-pet" exact/>
        <Route component = {EditPet} path="/dashboard/pet/edit/:id" exact/>
      </Switch>
    </BaseLayout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
