import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import RouterApp from './components/Router'

function App() {

  return (
    <Router>
        <Switch>
          <Route component={SignIn} path="/SignIn" exact/>
          <Route component={SignUp} path="/SignUp" exact/>
          <Route component={RouterApp} path="*" />
        </Switch>
    </Router>
  )

}

export default App;
