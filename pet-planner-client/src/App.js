import './App.css';
import React from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import RegisterPage from './components/RegisterPage';
import IndexPage from './components/IndexPage';
import PrivateRoute from './components/PrivateRoute';
import CreatePet from './components/CreatePet';
import EditPet from './components/EditPet';

function App() {
  return (

    <Switch>
      <Route path='/index' component={IndexPage} />
      <Route path='/dashboard' component={Dashboard} />
      </Switch>

  )
  
}

export default withRouter(App);
