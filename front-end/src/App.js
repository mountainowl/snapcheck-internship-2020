import {lazy, Suspense} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch} from 'react-router-dom';


import AuthProvider from './context/authcontext';
import DataProvider from './context/datacontext';
import {OpenRoute, ProtectRoute} from './AuthRoute';


// import Landing from './layout/landing';
// import AuthPage from './layout/auth';
// import Dashboard from './layout/dashboard';
//import Edit from './layout/edit';

const Landing = lazy(() => import('./layout/landing'))
const AuthPage = lazy(() => import('./layout/auth'))
const Dashboard = lazy(() => import('./layout/dashboard'))
const Edit = lazy(() => import('./layout/edit'))


function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <ProtectRoute path="/dashboard" exact component={Dashboard} />
              <ProtectRoute path="/user/:userId" component={Edit} />
              <OpenRoute path="/auth" exact component={AuthPage} />
              <OpenRoute path="/" exact component={Landing} />
            </Switch>
          </Suspense>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
