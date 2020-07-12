import React from 'react';

import { auth } from '../firebase'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from '../components/Home'
import NotFound from '../components/NotFound';
import TopNavbar from './TopNavbar';
import DownNavbar from './DownNavbar';
import Profile from './Profile';
import EditProfile from './EditProfile';
import NewRecipie from './NewRecipie';
import Loading from './Loading'

function RouterApp() {
  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged(user => {
        console.log(user)
        if (user) {
          setFirebaseUser(user)
        } else {
          setFirebaseUser(null)
        }
      })
    }
    fetchUser()
  }, [])


  const PrivateRoute = ({ component, path, ...rest }) => {
    if (localStorage.getItem('user')) {
      const usuarioStorage = JSON.parse(localStorage.getItem('user'))
      console.log("lstorage: ", usuarioStorage.uid);
      console.log("firebase: ", firebaseUser.uid);
      if (usuarioStorage.uid === firebaseUser.uid) {
        return <Route component={component} path={path} {...rest} />
      } else {
        window.location.href = "/SignIn"
        return;
      }
    } else {
      window.location.href = "/SignIn"
      return;
    }
  }

  return (
    <Router>

      {
        firebaseUser !== false ? (
          <Switch>
            <Route component={Home} path="/" exact />
            <PrivateRoute component={Profile} path="/Profile" exact />
            <PrivateRoute component={EditProfile} path="/EditProfile" exact />
            <PrivateRoute component={NewRecipie} path="/NewRecipie" exact />
            <Route component={NotFound} path="*" />
          </Switch>
        ) : (
          <div>
            <TopNavbar />
            <Loading />
          </div>
          )
      }

      <DownNavbar />
    </Router>
  )

}

export default RouterApp;
