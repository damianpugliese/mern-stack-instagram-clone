import React from 'react';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Header from './ui/layout/Header/Header';
import Main from './ui/layout/Main/Main';
import Home from './ui/components/Home/Home';
import Profile from './ui/components/Profile/Profile';
import Login from './ui/components/Login/Login';
import Signup from './ui/components/Signup/Signup';
import ResetPassword from './ui/components/ResetPassword/ResetPassword';
import Footer from './ui/layout/Footer/Footer';

const App = () => {
    return (
        <div className="App">
            <Router>
                <CssBaseline />
                {/* <Header /> */}
                <Main>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/password/reset" component={ResetPassword} />
                        {/* <Route path="/profile" component={Profile} /> */}
                    </Switch>
                </Main>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;
