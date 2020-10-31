import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import PravitRoute from './components/PravitRoute';
import User from './components/User';
import Login from './components/Login';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const onLogout = () => {
    setIsAuthenticated(false);
  };
  const onLogin = () => {
    setIsAuthenticated(true);
  };
  return (
    <Fragment>
      <Router className='App'>
        <Navbar
          onLogin={onLogin}
          onLogout={onLogout}
          isAuthenticated={isAuthenticated}
        />

        <Switch>
          <Route
            exact
            path='/'
            render={(props) => <Login {...props} onLogin={onLogin} />}
          />
          <PravitRoute
            exact
            path='/users'
            isAuthenticated={isAuthenticated}
            component={Dashboard}
          />
          <PravitRoute
            exact
            path='/users/:id'
            isAuthenticated={isAuthenticated}
            component={User}
          />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
