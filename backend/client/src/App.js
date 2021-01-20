import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbars from './components/Navbar/Nav';
import LandingPage from './components/Landing_Page/LandingPage';
import LoginForm from './components/Login/login';
import RegisterForm from './components/Register/register';
import Profile from './components/Profile/Profile';
import { useEffect } from 'react';



function App() {
  useEffect(() => {
    sessionStorage.getItem("uname")
  }, [])
  return (


    <Router>
      <div>
        <Navbars />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/profile" component={Profile} />

        </Switch>
      </div>
    </Router>


  );
}

export default App;
