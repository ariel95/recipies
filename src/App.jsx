import React from 'react';

import {auth} from './firebase'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import RouterApp from './components/Router'

function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged(user => {
          console.log(user)
          if(user){
              setFirebaseUser(user)
          }else{
              setFirebaseUser(null)
          }
      })
    }
    fetchUser()
  }, [])

  return firebaseUser !== false ? (
    <Router>
        <Switch>
          <Route component={SignIn} path="/signIn" exact/>
          <Route component={SignUp} path="/signUp" exact/>
          <Route component={RouterApp} path="*" />
        </Switch>
    </Router>
  ) : (<div>Cargando...</div>)

}

export default App;
